'use client';

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/lib/auth";
import { EnquiryProvider } from "@/lib/enquiries";
import { StudioEnquiryProvider } from "@/lib/studio-enquiries";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <EnquiryProvider>
          <StudioEnquiryProvider>
            {children}
          </StudioEnquiryProvider>
        </EnquiryProvider>
      </AuthProvider>
    </SessionProvider>
  );
} 