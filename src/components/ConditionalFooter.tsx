'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';
  const isDashboardPage = pathname === '/admin';

  if (isAdminPage || isAuthPage || isDashboardPage) {
    return null;
  }

  return <Footer />;
} 