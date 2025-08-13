import { NextRequest, NextResponse } from 'next/server';
import { vendorApi, convertStrapiVendor } from '@/lib/strapi-api';

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

    const strapiVendor = await vendorApi.getVendorById(id);

    if (!strapiVendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    const vendor = convertStrapiVendor(strapiVendor);

    return NextResponse.json({
      success: true,
      data: vendor
    });
  } catch (error) {
    console.error('Error fetching vendor:', error);
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

    // Check if vendor exists
    const existingVendor = await vendorApi.getVendorById(id);
    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
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

    if (body.company !== undefined && !body.company.trim()) {
      return NextResponse.json(
        { error: 'Company cannot be empty' },
        { status: 400 }
      );
    }

    if (body.location !== undefined && !body.location.trim()) {
      return NextResponse.json(
        { error: 'Location cannot be empty' },
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
      if (!body.contact.email?.trim() || !body.contact.phone?.trim() || !body.contact.address?.trim()) {
        return NextResponse.json(
          { error: 'Contact email, phone, and address are required' },
          { status: 400 }
        );
      }
    }

    // Update the vendor
    const updateData: Partial<{
      name: string;
      company: string;
      services: string[];
      location: string;
      rating: number;
      projects: number;
      experience: string;
      description: string;
      specialties: string[];
      status: string;
      image: string;
      contact: {
        email: string;
        phone: string;
        address: string;
      };
    }> = {};
    
    if (body.name !== undefined) updateData.name = body.name;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.services !== undefined) updateData.services = body.services;
    if (body.location !== undefined) updateData.location = body.location;
    if (body.rating !== undefined) updateData.rating = body.rating;
    if (body.projects !== undefined) updateData.projects = body.projects;
    if (body.experience !== undefined) updateData.experience = body.experience;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.specialties !== undefined) updateData.specialties = body.specialties;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.image !== undefined) updateData.image = body.image || '';
    if (body.contact !== undefined) {
      updateData.contact = {
        email: body.contact.email,
        phone: body.contact.phone,
        address: body.contact.address
      };
    }

    const updatedStrapiVendor = await vendorApi.updateVendor(id, updateData);

    const updatedVendor = convertStrapiVendor(updatedStrapiVendor);

    return NextResponse.json({
      success: true,
      data: updatedVendor,
      message: 'Vendor updated successfully'
    });
  } catch (error) {
    console.error('Error updating vendor:', error);
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

    // Get vendor before deleting for response
    const existingVendor = await vendorApi.getVendorById(id);
    if (!existingVendor) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    await vendorApi.deleteVendor(id);
    const deletedVendor = convertStrapiVendor(existingVendor);

    return NextResponse.json({
      success: true,
      data: deletedVendor,
      message: 'Vendor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
