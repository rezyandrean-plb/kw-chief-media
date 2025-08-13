import { NextRequest, NextResponse } from 'next/server';
import { strapiApi, convertStrapiStudio } from '@/lib/strapi-api';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Check authentication via custom headers
    const userEmail = request.headers.get('X-User-Email');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userEmail || userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const strapiStudio = await strapiApi.getStudioById(id);

    if (!strapiStudio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      );
    }

    const studio = convertStrapiStudio(strapiStudio);

    return NextResponse.json({
      success: true,
      data: studio
    });
  } catch (error) {
    console.error('Error fetching studio:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Check authentication via custom headers
    const userEmail = request.headers.get('X-User-Email');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userEmail || userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();

    // Check if studio exists
    const existingStudio = await strapiApi.getStudioById(id);
    if (!existingStudio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      );
    }

    // For updates, only validate fields that are provided
    if (body.name !== undefined && !body.name.trim()) {
      return NextResponse.json(
        { error: 'Name cannot be empty' },
        { status: 400 }
      );
    }

    if (body.address !== undefined && !body.address.trim()) {
      return NextResponse.json(
        { error: 'Address cannot be empty' },
        { status: 400 }
      );
    }

    if (body.description !== undefined && !body.description.trim()) {
      return NextResponse.json(
        { error: 'Description cannot be empty' },
        { status: 400 }
      );
    }

    if (body.contact !== undefined) {
      if (!body.contact.email || !body.contact.phone) {
        return NextResponse.json(
          { error: 'Contact email and phone are required' },
          { status: 400 }
        );
      }
    }

    // Update the studio
    const updateData: Partial<{
      name: string;
      address: string;
      description: string;
      image: string;
      status: string;
      equipment: string[];
      operatingHours: string;
      contact: {
        email: string;
        phone: string;
      };
    }> = {};
    
    if (body.name !== undefined) updateData.name = body.name;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.image !== undefined) updateData.image = body.image || '';
    if (body.status !== undefined) updateData.status = body.status;
    if (body.equipment !== undefined) updateData.equipment = body.equipment;
    if (body.operatingHours !== undefined) updateData.operatingHours = body.operatingHours;
    if (body.contact !== undefined) {
      updateData.contact = {
        email: body.contact.email,
        phone: body.contact.phone
      };
    }

    const updatedStrapiStudio = await strapiApi.updateStudio(id, updateData);

    const updatedStudio = convertStrapiStudio(updatedStrapiStudio);

    return NextResponse.json({
      success: true,
      data: updatedStudio,
      message: 'Studio updated successfully'
    });
  } catch (error) {
    console.error('Error updating studio:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Check authentication via custom headers
    const userEmail = request.headers.get('X-User-Email');
    const userRole = request.headers.get('X-User-Role');
    
    if (!userEmail || userRole !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get studio before deleting for response
    const existingStudio = await strapiApi.getStudioById(id);
    if (!existingStudio) {
      return NextResponse.json(
        { error: 'Studio not found' },
        { status: 404 }
      );
    }

    await strapiApi.deleteStudio(id);
    const deletedStudio = convertStrapiStudio(existingStudio);

    return NextResponse.json({
      success: true,
      data: deletedStudio,
      message: 'Studio deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting studio:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
