'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password';
  const isDashboardPage = pathname === '/dashboard';

  if (isAdminPage || isAuthPage || isDashboardPage) {
    return null;
  }

  return <Navigation />;
} 