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

    // Get search query parameter
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const status = searchParams.get('status');

    if (!query?.trim()) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    const filters: { search: string; status?: string } = { search: query };
    if (status) filters.status = status;

    const strapiVendors = await vendorApi.getVendors(filters);
    const vendors = strapiVendors.map(convertStrapiVendor);

    return NextResponse.json({
      success: true,
      data: vendors,
      message: `Found ${vendors.length} vendors matching "${query}"`
    });
  } catch (error) {
    console.error('Error searching vendors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
