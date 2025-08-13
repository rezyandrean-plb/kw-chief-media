// Shared studios data store
// In a real application, this would be replaced with a database connection

export interface Studio {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  status: 'active' | 'inactive' | 'maintenance';
  equipment: string[];
  operatingHours: string;
  contact: {
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Initial mock data
const studios: Studio[] = [
  {
    id: '1',
    name: 'North Studio',
    address: '5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760',
    description: 'High-quality property photography with professional lighting and state-of-the-art equipment.',
    image: '/images/studio/north-studio.webp',
    status: 'active',
    equipment: ['Professional Cameras', 'Lighting Equipment', 'Audio Equipment', 'Green Screen'],
    operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    contact: {
      email: 'north@chiefmedia.sg',
      phone: '+65 9123 4567'
    },
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '2',
    name: 'East Studio',
    address: '47 Kallang Pudding Road #09-13',
    description: 'Cinematic property videos with drone footage and professional video production services.',
    image: '/images/studio/east-studio.webp',
    status: 'active',
    equipment: ['Video Cameras', 'Drone Equipment', 'Editing Suite', 'Sound System'],
    operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
    contact: {
      email: 'east@chiefmedia.sg',
      phone: '+65 9876 5432'
    },
    createdAt: '2024-01-10',
    updatedAt: '2024-01-18'
  }
];

// CRUD operations
export const getStudios = () => [...studios];

export const getStudioById = (id: string) => studios.find(studio => studio.id === id);

export const createStudio = (studioData: Omit<Studio, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newStudio: Studio = {
    id: Date.now().toString(),
    ...studioData,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  studios.push(newStudio);
  return newStudio;
};

export const updateStudio = (id: string, studioData: Partial<Studio>) => {
  const index = studios.findIndex(studio => studio.id === id);
  if (index === -1) return null;
  
  studios[index] = {
    ...studios[index],
    ...studioData,
    updatedAt: new Date().toISOString().split('T')[0]
  };
  return studios[index];
};

export const deleteStudio = (id: string) => {
  const index = studios.findIndex(studio => studio.id === id);
  if (index === -1) return null;
  
  const deletedStudio = studios[index];
  studios.splice(index, 1);
  return deletedStudio;
};

export const filterStudios = (filters: { status?: string; search?: string }) => {
  let filtered = [...studios];

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(studio => studio.status === filters.status);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(studio =>
      studio.name.toLowerCase().includes(searchLower) ||
      studio.address.toLowerCase().includes(searchLower) ||
      studio.description.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};
