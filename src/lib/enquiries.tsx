'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Enquiry {
  id: string;
  vendorId: string;
  vendorName: string;
  realtorId: string;
  realtorName: string;
  realtorEmail: string;
  offerings: string[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  meetingDate?: string;
  meetingTime?: string;
  meetingType?: string;
  notes?: string;
}

interface EnquiryContextType {
  enquiries: Enquiry[];
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  getEnquiriesByVendor: (vendorId: string) => Enquiry[];
  getEnquiriesByRealtor: (realtorId: string) => Enquiry[];
}

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load enquiries from localStorage
    if (typeof window !== 'undefined') {
      const storedEnquiries = localStorage.getItem('enquiries');
      if (storedEnquiries) {
        try {
          setEnquiries(JSON.parse(storedEnquiries));
        } catch (error) {
          console.error('Error parsing stored enquiries:', error);
          localStorage.removeItem('enquiries');
        }
      }
    }
  }, []);

  const saveEnquiries = (newEnquiries: Enquiry[]) => {
    setEnquiries(newEnquiries);
    if (typeof window !== 'undefined') {
      localStorage.setItem('enquiries', JSON.stringify(newEnquiries));
    }
  };

  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    saveEnquiries([...enquiries, newEnquiry]);
  };

  const updateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    const updatedEnquiries = enquiries.map(enquiry =>
      enquiry.id === id ? { ...enquiry, status } : enquiry
    );
    saveEnquiries(updatedEnquiries);
  };

  const getEnquiriesByVendor = (vendorId: string) => {
    return enquiries.filter(enquiry => enquiry.vendorId === vendorId);
  };

  const getEnquiriesByRealtor = (realtorId: string) => {
    return enquiries.filter(enquiry => enquiry.realtorId === realtorId);
  };

  if (!mounted) {
    return (
      <EnquiryContext.Provider value={{
        enquiries: [],
        addEnquiry: () => {},
        updateEnquiryStatus: () => {},
        getEnquiriesByVendor: () => [],
        getEnquiriesByRealtor: () => [],
      }}>
        {children}
      </EnquiryContext.Provider>
    );
  }

  return (
    <EnquiryContext.Provider value={{
      enquiries,
      addEnquiry,
      updateEnquiryStatus,
      getEnquiriesByVendor,
      getEnquiriesByRealtor,
    }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiries() {
  const context = useContext(EnquiryContext);
  if (context === undefined) {
    throw new Error('useEnquiries must be used within an EnquiryProvider');
  }
  return context;
} 