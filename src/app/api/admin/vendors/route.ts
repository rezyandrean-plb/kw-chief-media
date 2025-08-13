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

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const location = searchParams.get('location');

    const filters: { status?: string; search?: string; location?: string } = {};
    if (status) filters.status = status;
    if (search) filters.search = search;
    if (location) filters.location = location;

    const strapiVendors = await vendorApi.getVendors(filters);
    const vendors = strapiVendors.map(convertStrapiVendor);

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

export async function POST(request: NextRequest) {
  try {
    // Check authentication via custom headers
    const userEmail = request.headers.get('X-User-Email');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userEmail || userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!body.company?.trim()) {
      return NextResponse.json({ error: 'Company is required' }, { status: 400 });
    }

    if (!body.location?.trim()) {
      return NextResponse.json({ error: 'Location is required' }, { status: 400 });
    }

    if (!body.description?.trim()) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 });
    }

    if (!body.contact?.email?.trim() || !body.contact?.phone?.trim() || !body.contact?.address?.trim()) {
      return NextResponse.json({ error: 'Contact email, phone, and address are required' }, { status: 400 });
    }

    const strapiVendor = await vendorApi.createVendor({
      name: body.name,
      company: body.company,
      services: body.services || [],
      location: body.location,
      rating: body.rating || 5.0,
      projects: body.projects || 0,
      experience: body.experience || '',
      description: body.description,
      specialties: body.specialties || [],
      status: body.status || 'pending',
      contact: {
        email: body.contact.email,
        phone: body.contact.phone,
        address: body.contact.address
      },
      image: body.image
    });

    const vendor = convertStrapiVendor(strapiVendor);

    return NextResponse.json({
      success: true,
      data: vendor,
      message: 'Vendor created successfully'
    });
  } catch (error) {
    console.error('Error creating vendor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
