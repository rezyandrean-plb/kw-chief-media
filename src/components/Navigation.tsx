'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/lib/auth';

export default function Navigation() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
  };

  // Public navigation links (visible to all users)
  const publicLinks = [
    { href: '/vendors', label: 'Browse Vendors' },
    { href: '/studio', label: 'Studio' },
    { href: '/contact', label: 'Contact' },
  ];

  // Conditional links based on user role
  const getConditionalLinks = () => {
    if (!user) {
      // Public user - show "Become a Vendor" link
      return [
        { href: '/vendor-application', label: 'Become a Vendor', isButton: false }
      ];
    }

    if (user.role === 'vendor') {
      // Vendor user - show "My Gigs" link instead of "Become a Vendor"
      return [
        { href: '/vendor/gigs', label: 'My Gigs', isButton: false }
      ];
    }

    // Realtor and admin users - no additional links in main nav
    return [];
  };

  const conditionalLinks = getConditionalLinks();

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
            {/* Public Links */}
            {publicLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`transition-colors duration-300 ${linkClassName}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Conditional Links */}
            {conditionalLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={link.isButton 
                  ? "px-4 py-2 rounded bg-[#f37521] text-white hover:bg-[#e0651a] transition"
                  : `transition-colors duration-300 ${linkClassName}`
                }
              >
                {link.label}
              </Link>
            ))}

            {/* User Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                {/* Notifications Icon */}
                <button className={`transition-colors duration-300 ${linkClassName}`}>
                  <BellIcon className="h-6 w-6" />
                </button>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center space-x-2 transition-colors duration-300"
                  >
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    ) : (
                      <UserCircleIcon className={`h-8 w-8 ${linkClassName}`} />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>

                      {/* Navigation Links */}
                      {user.role === 'realtor' && (
                        <>
                          <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            My Dashboard
                          </Link>
                          <Link
                            href="/projects"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            My Projects
                          </Link>
                          <Link
                            href="/messages"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Messages
                          </Link>
                        </>
                      )}

                      {user.role === 'vendor' && (
                        <>
                          <Link
                            href="/vendor/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            My Dashboard
                          </Link>
                          <Link
                            href="/vendor/gigs"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            My Gigs
                          </Link>
                          <Link
                            href="/vendor/projects"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            My Projects
                          </Link>
                          <Link
                            href="/vendor/messages"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Messages
                          </Link>
                          <Link
                            href="/vendor/earnings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setUserDropdownOpen(false)}
                          >
                            Earnings
                          </Link>
                        </>
                      )}

                      {/* Common Links */}
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Profile Settings
                      </Link>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Login for public users
              <div className="flex items-center">
                <Link href="/login" className="px-4 py-2 rounded bg-[#f37521] text-white hover:bg-[#e0651a] transition">
                  Login
                </Link>
              </div>
            )}
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
              {/* Public Links */}
              {publicLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Conditional Links */}
              {conditionalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 rounded-md ${
                    link.isButton
                      ? 'bg-[#f37521] text-white hover:bg-[#e0651a]'
                      : 'text-gray-700 hover:text-[#f37521] hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* User Authentication Section */}
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    
                    {/* User-specific mobile links */}
                    {user.role === 'realtor' && (
                      <>
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Dashboard
                        </Link>
                        <Link
                          href="/projects"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Projects
                        </Link>
                        <Link
                          href="/messages"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Messages
                        </Link>
                      </>
                    )}

                    {user.role === 'vendor' && (
                      <>
                        <Link
                          href="/vendor/dashboard"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Dashboard
                        </Link>
                        <Link
                          href="/vendor/gigs"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Gigs
                        </Link>
                        <Link
                          href="/vendor/projects"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          My Projects
                        </Link>
                        <Link
                          href="/vendor/messages"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Messages
                        </Link>
                        <Link
                          href="/vendor/earnings"
                          className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Earnings
                        </Link>
                      </>
                    )}

                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-[#f37521] hover:bg-gray-50 rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 bg-[#f37521] text-white hover:bg-[#e0651a] transition rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 