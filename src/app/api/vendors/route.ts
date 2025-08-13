import { NextRequest, NextResponse } from 'next/server';
import { vendorApi, convertStrapiVendor } from '@/lib/strapi-api';

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const location = searchParams.get('location');
    const service = searchParams.get('service');

    const filters: { status?: string; search?: string; location?: string } = {
      status: 'active' // Only return active vendors for public access
    };
    
    if (search) filters.search = search;
    if (location) filters.location = location;

    const strapiVendors = await vendorApi.getVendors(filters);
    let vendors = strapiVendors.map(convertStrapiVendor);

    // Filter by service if specified
    if (service && service !== 'all') {
      vendors = vendors.filter(vendor => vendor.services.includes(service));
    }

    return NextResponse.json({
      success: true,
      data: vendors,
      message: 'Vendors fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
