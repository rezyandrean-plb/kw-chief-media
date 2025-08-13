export interface Vendor {
  id: string;
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
    email: string;
    phone: string;
    address: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorFormData {
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
    email: string;
    phone: string;
    address: string;
  };
  image: string;
}
