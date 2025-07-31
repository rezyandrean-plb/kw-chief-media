'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  EnvelopeIcon,
  BuildingOfficeIcon,
  HomeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Enquiries', href: '/admin/enquiries', icon: EnvelopeIcon },
    { name: 'Studio Enquiries', href: '/admin/studio-enquiries', icon: BuildingOfficeIcon },
    { name: 'Vendors', href: '/admin/vendors', icon: UserGroupIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-[#273f4f]">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                active
                  ? 'bg-[#B40101] text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-[#B40101]'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Chief Media Admin
        </div>
      </div>
    </div>
  );
} 