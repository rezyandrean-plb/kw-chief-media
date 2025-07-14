'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { 
  CheckIcon, 
  StarIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CameraIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

interface ServicePackage {
  id: string;
  name: string;
  category: 'listing-marketing' | 'personal-branding';
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  icon: any;
}

export default function ServicesPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const servicePackages: ServicePackage[] = [
    {
      id: '1',
      name: 'Basic Listing Marketing',
      category: 'listing-marketing',
      description: 'Essential marketing package for property listings with professional photos and basic promotion.',
      price: 299,
      features: [
        'Professional photography (10 photos)',
        'Virtual tour creation',
        'Social media promotion',
        'Listing optimization',
        'Basic analytics report',
        '30-day support'
      ],
      icon: BuildingOfficeIcon,
    },
    {
      id: '2',
      name: 'Premium Listing Marketing',
      category: 'listing-marketing',
      description: 'Comprehensive marketing solution with advanced features and extended reach.',
      price: 599,
      features: [
        'Professional photography (20 photos)',
        'Virtual tour + drone footage',
        'Social media campaign',
        'Email marketing campaign',
        'Listing optimization',
        'Advanced analytics',
        'Video walkthrough',
        '90-day support'
      ],
      popular: true,
      icon: BuildingOfficeIcon,
    },
    {
      id: '3',
      name: 'Elite Listing Marketing',
      category: 'listing-marketing',
      description: 'Ultimate marketing package with maximum exposure and premium features.',
      price: 999,
      features: [
        'Professional photography (30+ photos)',
        'Virtual tour + drone footage',
        'Comprehensive social media campaign',
        'Email marketing campaign',
        'Listing optimization',
        'Advanced analytics dashboard',
        'Video walkthrough',
        'Print marketing materials',
        'Press release',
        '180-day support'
      ],
      icon: BuildingOfficeIcon,
    },
    {
      id: '4',
      name: 'Starter Personal Branding',
      category: 'personal-branding',
      description: 'Begin your personal branding journey with essential tools and guidance.',
      price: 199,
      features: [
        'Professional headshots (5 photos)',
        'LinkedIn profile optimization',
        'Basic brand guidelines',
        'Social media templates',
        '30-day consultation',
        'Email signature design'
      ],
      icon: UserGroupIcon,
    },
    {
      id: '5',
      name: 'Professional Personal Branding',
      category: 'personal-branding',
      description: 'Comprehensive personal branding package for established professionals.',
      price: 499,
      features: [
        'Professional headshots (10 photos)',
        'LinkedIn profile optimization',
        'Complete brand guidelines',
        'Social media templates',
        'Website design consultation',
        'Content strategy plan',
        '90-day consultation',
        'Email signature design',
        'Business card design'
      ],
      popular: true,
      icon: UserGroupIcon,
    },
    {
      id: '6',
      name: 'Executive Personal Branding',
      category: 'personal-branding',
      description: 'Premium personal branding for executives and thought leaders.',
      price: 899,
      features: [
        'Professional headshots (15+ photos)',
        'LinkedIn profile optimization',
        'Complete brand guidelines',
        'Social media templates',
        'Website design consultation',
        'Content strategy plan',
        'Video content creation',
        '180-day consultation',
        'Email signature design',
        'Business card design',
        'Press kit creation',
        'Speaking engagement support'
      ],
      icon: UserGroupIcon,
    },
  ];

  const filteredPackages = selectedCategory === 'all' 
    ? servicePackages 
    : servicePackages.filter(pkg => pkg.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Services', icon: BuildingOfficeIcon },
    { id: 'listing-marketing', name: 'Listing Marketing', icon: BuildingOfficeIcon },
    { id: 'personal-branding', name: 'Personal Branding', icon: UserGroupIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose from our comprehensive range of media services designed to help you grow your brand and business.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <category.icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Service Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <pkg.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {pkg.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              className="h-4 w-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          (4.9/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {pkg.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        ${pkg.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        /package
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    {user ? (
                      <Link
                        href={`/services/${pkg.id}/book`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block font-medium"
                      >
                        Book Now
                      </Link>
                    ) : (
                      <Link
                        href="/signup"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block font-medium"
                      >
                        Sign Up to Book
                      </Link>
                    )}
                    <Link
                      href={`/services/${pkg.id}`}
                      className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center block font-medium"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Additional Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                <CameraIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Photography
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Professional photography for any occasion
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                <VideoCameraIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Videography
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  High-quality video production services
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                <BuildingOfficeIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Virtual Tours
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Immersive 360° virtual tour creation
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                <UserGroupIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Consulting
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Strategic marketing consultation
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their business with our media services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  href="/dashboard"
                  className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/login"
                    className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 