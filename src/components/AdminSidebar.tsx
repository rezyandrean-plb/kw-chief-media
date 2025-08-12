'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  EnvelopeIcon,
  BuildingOfficeIcon,
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: { name: string; href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[];
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Enquiries']);

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { 
      name: 'Enquiries', 
      icon: EnvelopeIcon,
      subItems: [
        { name: 'Vendor Enquiries', href: '/admin/enquiries', icon: EnvelopeIcon },
        { name: 'Studio Enquiries', href: '/admin/studio-enquiries', icon: BuildingOfficeIcon }
      ]
    },
    { name: 'Vendors', href: '/admin/vendors', icon: UserGroupIcon },
    { name: 'Studios', href: '/admin/studios', icon: VideoCameraIcon },
    { name: 'Invoices', href: '/admin/invoices', icon: DocumentTextIcon },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  const isMenuExpanded = (menuName: string) => {
    return expandedMenus.includes(menuName);
  };

  const hasActiveSubItem = (subItems: { name: string; href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[]) => {
    return subItems.some(item => isActive(item.href));
  };

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg h-screen fixed top-0 left-0 z-20 lg:block hidden">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200 flex-shrink-0">
        <h1 className="text-xl font-bold text-[#273f4f]">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          
          if (item.subItems) {
            const isExpanded = isMenuExpanded(item.name);
            const hasActive = hasActiveSubItem(item.subItems);
            
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    hasActive
                      ? 'bg-[#B40101] text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-[#B40101]'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                  {isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const active = isActive(subItem.href);
                      
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                            active
                              ? 'bg-[#B40101]/20 text-[#B40101] border-l-2 border-[#B40101]'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-[#B40101]'
                          }`}
                        >
                          <SubIcon className="mr-3 h-4 w-4" />
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const active = isActive(item.href!);
          
          return (
            <Link
              key={item.name}
              href={item.href!}
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
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="text-xs text-gray-500 text-center">
          Chief Media Admin
        </div>
      </div>
    </div>
  );
} 