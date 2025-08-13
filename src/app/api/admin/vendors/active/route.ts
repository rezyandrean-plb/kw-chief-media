import { NextRequest, NextResponse } from 'next/server';
import { vendorApi, convertStrapiVendor } from '@/lib/strapi-api';

export async function GET(request: NextRequest) {
  try {
    // Check authentication via custom headers
    const userEmail = request.headers.get('X-User-Email');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userEmail || userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const strapiVendors = await vendorApi.getVendors({ status: 'active' });
    const vendors = strapiVendors.map(convertStrapiVendor);

    return NextResponse.json({
      success: true,
      data: vendors,
      message: 'Active vendors fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching active vendors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
