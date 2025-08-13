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
