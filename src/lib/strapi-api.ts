const STRAPI_BASE_URL = 'https://cheerful-bouquet-5ddcfa597e.strapiapp.com';

interface OperatingHour {
  open: string;
  close: string;
  closed: boolean;
}

interface OperatingHours {
  monday?: OperatingHour;
  tuesday?: OperatingHour;
  wednesday?: OperatingHour;
  thursday?: OperatingHour;
  friday?: OperatingHour;
  saturday?: OperatingHour;
  sunday?: OperatingHour;
}

export interface StrapiStudio {
  id: number;
  documentId: string;
  name: string;
  status: 'active' | 'inactive' | 'maintenance';
  operatingHours: OperatingHours;
  address: string;
  image: string | null;
  description: string;
  equipment: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  contact: {
    id: number;
    email: string;
    phone: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    filters?: Record<string, unknown>;
  };
}

// Vendor interfaces
export interface StrapiVendor {
  id: number;
  documentId: string;
  name: string;
  company: string;
  services: string[];
  location: string;
  rating: number;
  projects: number;
  experience: string;
  description: string;
  specialties: string[];
  status: 'active' | 'inactive' | 'pending';
  contact: {
    id: number;
    email: string;
    phone: string;
    address: string;
  };
  image: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

// Helper function to convert Strapi studio to our app format
export const convertStrapiStudio = (strapiStudio: StrapiStudio) => ({
  id: strapiStudio.id.toString(),
  name: strapiStudio.name,
  address: strapiStudio.address,
  description: strapiStudio.description,
  image: strapiStudio.image || '',
  status: strapiStudio.status,
  equipment: strapiStudio.equipment || [],
  operatingHours: formatOperatingHours(strapiStudio.operatingHours),
  contact: {
    email: strapiStudio.contact.email,
    phone: strapiStudio.contact.phone
  },
  createdAt: new Date(strapiStudio.createdAt).toISOString().split('T')[0],
  updatedAt: new Date(strapiStudio.updatedAt).toISOString().split('T')[0]
});

// Helper function to format operating hours
const formatOperatingHours = (operatingHours: OperatingHours): string => {
  if (!operatingHours || Object.keys(operatingHours).length === 0) {
    return '';
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const formattedDays: string[] = [];

  days.forEach(day => {
    const dayData = operatingHours[day as keyof OperatingHours];
    if (dayData && !dayData.closed) {
      formattedDays.push(`${day.charAt(0).toUpperCase() + day.slice(1)}: ${dayData.open} - ${dayData.close}`);
    }
  });

  return formattedDays.join(', ');
};

// API functions
export const strapiApi = {
  // Get all studios
  async getStudios(filters?: { status?: string; search?: string }): Promise<StrapiStudio[]> {
    let url = `${STRAPI_BASE_URL}/api/studios`;
    const params = new URLSearchParams();
    
    if (filters?.status && filters.status !== 'all') {
      params.append('filters[status][$eq]', filters.status);
    }
    
    if (filters?.search) {
      params.append('filters[$or][0][name][$containsi]', filters.search);
      params.append('filters[$or][1][address][$containsi]', filters.search);
      params.append('filters[$or][2][description][$containsi]', filters.search);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch studios: ${response.statusText}`);
    }
    
    const result: StrapiListResponse<StrapiStudio> = await response.json();
    return result.data;
  },

  // Get studio by ID
  async getStudioById(id: string): Promise<StrapiStudio | null> {
    const response = await fetch(`${STRAPI_BASE_URL}/api/studios/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch studio: ${response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiStudio> = await response.json();
    return result.data;
  },

  // Create studio
  async createStudio(studioData: {
    name: string;
    address: string;
    description: string;
    image?: string;
    status?: string;
    equipment?: string[];
    operatingHours?: string;
    contact: {
      email: string;
      phone: string;
    };
  }): Promise<StrapiStudio> {
    // Convert operating hours string to Strapi format
    const operatingHours = parseOperatingHours(studioData.operatingHours || '');

    const response = await fetch(`${STRAPI_BASE_URL}/api/studios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: studioData.name,
          address: studioData.address,
          description: studioData.description,
          image: studioData.image || null,
          status: studioData.status || 'active',
          equipment: studioData.equipment || [],
          operatingHours,
          contact: {
            email: studioData.contact.email,
            phone: studioData.contact.phone
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create studio: ${error.error?.message || response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiStudio> = await response.json();
    return result.data;
  },

  // Update studio
  async updateStudio(id: string, studioData: {
    name?: string;
    address?: string;
    description?: string;
    image?: string;
    status?: string;
    equipment?: string[];
    operatingHours?: string;
    contact?: {
      email: string;
      phone: string;
    };
  }): Promise<StrapiStudio> {
    const updateData: Partial<{
      name: string;
      address: string;
      description: string;
      image: string | null;
      status: string;
      equipment: string[];
      operatingHours: OperatingHours;
      contact: {
        email: string;
        phone: string;
      };
    }> = {};
    
    if (studioData.name !== undefined) updateData.name = studioData.name;
    if (studioData.address !== undefined) updateData.address = studioData.address;
    if (studioData.description !== undefined) updateData.description = studioData.description;
    if (studioData.image !== undefined) updateData.image = studioData.image || null;
    if (studioData.status !== undefined) updateData.status = studioData.status;
    if (studioData.equipment !== undefined) updateData.equipment = studioData.equipment;
    if (studioData.operatingHours !== undefined) {
      updateData.operatingHours = parseOperatingHours(studioData.operatingHours);
    }
    if (studioData.contact !== undefined) {
      updateData.contact = {
        email: studioData.contact.email,
        phone: studioData.contact.phone
      };
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/studios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: updateData
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update studio: ${error.error?.message || response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiStudio> = await response.json();
    return result.data;
  },

  // Delete studio
  async deleteStudio(id: string): Promise<void> {
    const response = await fetch(`${STRAPI_BASE_URL}/api/studios/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to delete studio: ${error.error?.message || response.statusText}`);
    }
  }
};

// Helper function to parse operating hours string to Strapi format
const parseOperatingHours = (operatingHoursStr: string): OperatingHours => {
  if (!operatingHoursStr.trim()) {
    return {};
  }

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const result: OperatingHours = {};

  days.forEach(day => {
    result[day] = {
      open: '',
      close: '',
      closed: true
    };
  });

  // Simple parsing - you might want to enhance this based on your format
  const parts = operatingHoursStr.split(',');
  parts.forEach(part => {
    const trimmed = part.trim();
    if (trimmed.includes(':')) {
      const [dayPart, timePart] = trimmed.split(':');
      const day = dayPart.trim().toLowerCase();
      const timeRange = timePart.trim();
      
      if (days.includes(day as typeof days[number]) && timeRange.includes('-')) {
        const [open, close] = timeRange.split('-').map(t => t.trim());
        result[day as keyof OperatingHours] = {
          open,
          close,
          closed: false
        };
      }
    }
  });

  return result;
};

// Helper function to convert Strapi vendor to our app format
export const convertStrapiVendor = (strapiVendor: StrapiVendor) => ({
  id: strapiVendor.id.toString(),
  name: strapiVendor.name,
  company: strapiVendor.company,
  services: strapiVendor.services || [],
  location: strapiVendor.location,
  rating: strapiVendor.rating,
  projects: strapiVendor.projects,
  experience: strapiVendor.experience,
  description: strapiVendor.description,
  specialties: strapiVendor.specialties || [],
  status: strapiVendor.status,
  contact: {
    email: strapiVendor.contact.email,
    phone: strapiVendor.contact.phone,
    address: strapiVendor.contact.address
  },
  image: strapiVendor.image || '',
  createdAt: new Date(strapiVendor.createdAt).toISOString().split('T')[0],
  updatedAt: new Date(strapiVendor.updatedAt).toISOString().split('T')[0]
});

// Vendor API functions
export const vendorApi = {
  // Get all vendors
  async getVendors(filters?: { status?: string; search?: string; location?: string }): Promise<StrapiVendor[]> {
    let url = `${STRAPI_BASE_URL}/api/vendors`;
    const params = new URLSearchParams();
    
    if (filters?.status && filters.status !== 'all') {
      params.append('filters[status][$eq]', filters.status);
    }
    
    if (filters?.search) {
      params.append('filters[$or][0][name][$containsi]', filters.search);
      params.append('filters[$or][1][company][$containsi]', filters.search);
      params.append('filters[$or][2][description][$containsi]', filters.search);
      params.append('filters[$or][3][location][$containsi]', filters.search);
    }

    if (filters?.location) {
      params.append('filters[location][$containsi]', filters.location);
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch vendors: ${response.statusText}`);
    }
    
    const result: StrapiListResponse<StrapiVendor> = await response.json();
    return result.data;
  },

  // Get vendor by ID
  async getVendorById(id: string): Promise<StrapiVendor | null> {
    const response = await fetch(`${STRAPI_BASE_URL}/api/vendors/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error(`Failed to fetch vendor: ${response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiVendor> = await response.json();
    return result.data;
  },

  // Create vendor
  async createVendor(vendorData: {
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
    contact: {
      email: string;
      phone: string;
      address: string;
    };
    image?: string;
  }): Promise<StrapiVendor> {
    const response = await fetch(`${STRAPI_BASE_URL}/api/vendors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          name: vendorData.name,
          company: vendorData.company,
          services: vendorData.services || [],
          location: vendorData.location,
          rating: vendorData.rating,
          projects: vendorData.projects,
          experience: vendorData.experience,
          description: vendorData.description,
          specialties: vendorData.specialties || [],
          status: vendorData.status || 'pending',
          image: vendorData.image || null,
          contact: {
            email: vendorData.contact.email,
            phone: vendorData.contact.phone,
            address: vendorData.contact.address
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create vendor: ${error.error?.message || response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiVendor> = await response.json();
    return result.data;
  },

  // Update vendor
  async updateVendor(id: string, vendorData: {
    name?: string;
    company?: string;
    services?: string[];
    location?: string;
    rating?: number;
    projects?: number;
    experience?: string;
    description?: string;
    specialties?: string[];
    status?: string;
    contact?: {
      email: string;
      phone: string;
      address: string;
    };
    image?: string;
  }): Promise<StrapiVendor> {
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
      image: string | null;
      contact: {
        email: string;
        phone: string;
        address: string;
      };
    }> = {};
    
    if (vendorData.name !== undefined) updateData.name = vendorData.name;
    if (vendorData.company !== undefined) updateData.company = vendorData.company;
    if (vendorData.services !== undefined) updateData.services = vendorData.services;
    if (vendorData.location !== undefined) updateData.location = vendorData.location;
    if (vendorData.rating !== undefined) updateData.rating = vendorData.rating;
    if (vendorData.projects !== undefined) updateData.projects = vendorData.projects;
    if (vendorData.experience !== undefined) updateData.experience = vendorData.experience;
    if (vendorData.description !== undefined) updateData.description = vendorData.description;
    if (vendorData.specialties !== undefined) updateData.specialties = vendorData.specialties;
    if (vendorData.status !== undefined) updateData.status = vendorData.status;
    if (vendorData.image !== undefined) updateData.image = vendorData.image || null;
    if (vendorData.contact !== undefined) {
      updateData.contact = {
        email: vendorData.contact.email,
        phone: vendorData.contact.phone,
        address: vendorData.contact.address
      };
    }

    const response = await fetch(`${STRAPI_BASE_URL}/api/vendors/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: updateData
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to update vendor: ${error.error?.message || response.statusText}`);
    }
    
    const result: StrapiResponse<StrapiVendor> = await response.json();
    return result.data;
  },

  // Delete vendor
  async deleteVendor(id: string): Promise<void> {
    const response = await fetch(`${STRAPI_BASE_URL}/api/vendors/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to delete vendor: ${error.error?.message || response.statusText}`);
    }
  }
};
