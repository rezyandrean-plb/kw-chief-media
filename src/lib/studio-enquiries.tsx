'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StudioEnquiry {
  id: string;
  studioName: string;
  studioAddress: string;
  realtorName: string;
  realtorEmail: string;
  realtorPhone: string;
  selectedDate: string;
  selectedTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  notes?: string;
}

interface StudioEnquiryContextType {
  studioEnquiries: StudioEnquiry[];
  addStudioEnquiry: (enquiry: Omit<StudioEnquiry, 'id' | 'createdAt'>) => void;
  updateStudioEnquiryStatus: (id: string, status: StudioEnquiry['status']) => void;
  getStudioEnquiriesByStudio: (studioName: string) => StudioEnquiry[];
  getStudioEnquiriesByRealtor: (realtorEmail: string) => StudioEnquiry[];
}

const StudioEnquiryContext = createContext<StudioEnquiryContextType | undefined>(undefined);

export function StudioEnquiryProvider({ children }: { children: ReactNode }) {
  const [studioEnquiries, setStudioEnquiries] = useState<StudioEnquiry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load studio enquiries from localStorage
    if (typeof window !== 'undefined') {
      const storedEnquiries = localStorage.getItem('studio-enquiries');
      if (storedEnquiries) {
        try {
          setStudioEnquiries(JSON.parse(storedEnquiries));
        } catch (error) {
          console.error('Error parsing stored studio enquiries:', error);
          localStorage.removeItem('studio-enquiries');
        }
      }
    }
  }, []);

  const saveStudioEnquiries = (newEnquiries: StudioEnquiry[]) => {
    setStudioEnquiries(newEnquiries);
    if (typeof window !== 'undefined') {
      localStorage.setItem('studio-enquiries', JSON.stringify(newEnquiries));
    }
  };

  const addStudioEnquiry = (enquiryData: Omit<StudioEnquiry, 'id' | 'createdAt'>) => {
    const newEnquiry: StudioEnquiry = {
      ...enquiryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveStudioEnquiries([...studioEnquiries, newEnquiry]);
  };

  const updateStudioEnquiryStatus = (id: string, status: StudioEnquiry['status']) => {
    const updatedEnquiries = studioEnquiries.map(enquiry =>
      enquiry.id === id ? { ...enquiry, status } : enquiry
    );
    saveStudioEnquiries(updatedEnquiries);
  };

  const getStudioEnquiriesByStudio = (studioName: string) => {
    return studioEnquiries.filter(enquiry => enquiry.studioName === studioName);
  };

  const getStudioEnquiriesByRealtor = (realtorEmail: string) => {
    return studioEnquiries.filter(enquiry => enquiry.realtorEmail === realtorEmail);
  };

  if (!mounted) {
    return (
      <StudioEnquiryContext.Provider value={{
        studioEnquiries: [],
        addStudioEnquiry: () => {},
        updateStudioEnquiryStatus: () => {},
        getStudioEnquiriesByStudio: () => [],
        getStudioEnquiriesByRealtor: () => [],
      }}>
        {children}
      </StudioEnquiryContext.Provider>
    );
  }

  return (
    <StudioEnquiryContext.Provider value={{
      studioEnquiries,
      addStudioEnquiry,
      updateStudioEnquiryStatus,
      getStudioEnquiriesByStudio,
      getStudioEnquiriesByRealtor,
    }}>
      {children}
    </StudioEnquiryContext.Provider>
  );
}

export function useStudioEnquiries() {
  const context = useContext(StudioEnquiryContext);
  if (context === undefined) {
    throw new Error('useStudioEnquiries must be used within a StudioEnquiryProvider');
  }
  return context;
} 