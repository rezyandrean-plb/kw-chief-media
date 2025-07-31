'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const { } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollTop = window.scrollY;
        setIsScrolled(scrollTop > 10);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      // Set initial scroll state
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Prevent hydration mismatch by using consistent initial state
  const navClassName = mounted && isScrolled 
    ? 'bg-black shadow-sm border-b border-gray-200' 
    : 'bg-transparent';

  const linkClassName = mounted && isScrolled 
    ? 'text-white hover:text-[#f37521]' 
    : 'text-white hover:text-[#f37521]';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/chief-media-logo-dark.webp"
                alt="Chief Media"
                width={120}
                height={40}
                className="h-8 w-auto sm:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/vendors" className={`transition-colors duration-300 ${linkClassName}`}>
              Browse Vendors
            </Link>
            <Link href="/studio" className={`transition-colors duration-300 ${linkClassName}`}>
              Studio
            </Link>
            <Link href="/contact" className={`transition-colors duration-300 ${linkClassName}`}>
              Contact
            </Link>
            <Link href="/vendor-application" className="px-4 py-2 rounded bg-[#B40101] text-white hover:bg-[#e0651a] transition">
              Become a Vendor
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`transition-colors duration-300 ${linkClassName}`}
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                href="/vendors"
                className="block px-3 py-2 text-white hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Vendors
              </Link>
              <Link
                href="/studio"
                className="block px-3 py-2 text-white hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Studio
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-white hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/vendor-application"
                className="block px-3 py-2 bg-[#f37521] text-white hover:bg-[#e0651a] transition rounded-md"
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