import { NextRequest, NextResponse } from 'next/server';
import { vendorApi, convertStrapiVendor } from '@/lib/strapi-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ location: string }> }
) {
  const { location } = await params;
  try {
    // Check authentication via custom headers
    const userEmail = request.headers.get('X-User-Email');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userEmail || userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get status filter from query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const filters: { location: string; status?: string } = { location };
    if (status) filters.status = status;

    const strapiVendors = await vendorApi.getVendors(filters);
    const vendors = strapiVendors.map(convertStrapiVendor);

    return NextResponse.json({
      success: true,
      data: vendors,
      message: `Found ${vendors.length} vendors in ${location}`
    });
  } catch (error) {
    console.error('Error fetching vendors by location:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
