'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const { } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/chief-media-logo.webp"
                alt="Chief Media"
                width={120}
                height={40}
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/vendors" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Browse Vendors
            </Link>
            <Link href="/portfolio" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Portfolio
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              Contact
            </Link>
            <Link href="/vendor-application" className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition">
              Become a Vendor
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/vendors"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Vendors
              </Link>
              <Link
                href="/portfolio"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/vendor-application"
                className="block px-3 py-2 bg-green-600 text-white hover:bg-green-700 transition rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Become a Vendor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 