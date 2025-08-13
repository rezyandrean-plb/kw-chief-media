import { NextRequest, NextResponse } from 'next/server';
import { strapiApi, convertStrapiStudio } from '@/lib/strapi-api';

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

    const strapiStudios = await strapiApi.getStudios({ 
      status: status || undefined, 
      search: search || undefined 
    });

    const studios = strapiStudios.map(convertStrapiStudio);

    return NextResponse.json({
      success: true,
      data: studios,
      total: studios.length
    });
  } catch (error) {
    console.error('Error fetching studios:', error);
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
    const requiredFields = ['name', 'address', 'description', 'contact'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate contact fields
    if (!body.contact.email || !body.contact.phone) {
      return NextResponse.json(
        { error: 'Contact email and phone are required' },
        { status: 400 }
      );
    }

    // Create new studio
    const strapiStudio = await strapiApi.createStudio({
      name: body.name,
      address: body.address,
      description: body.description,
      image: body.image || '',
      status: body.status || 'active',
      equipment: body.equipment || [],
      operatingHours: body.operatingHours || '',
      contact: {
        email: body.contact.email,
        phone: body.contact.phone
      }
    });

    const newStudio = convertStrapiStudio(strapiStudio);

    return NextResponse.json({
      success: true,
      data: newStudio,
      message: 'Studio created successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating studio:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
