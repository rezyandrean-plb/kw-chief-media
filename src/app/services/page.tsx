'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  CheckIcon, 
  UserGroupIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

interface ServicePackage {
  id: string;
  name: string;
  category: 'listing-marketing' | 'personal-branding';
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

export default function ServicesPage() {
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#FCEBDC] mb-4">
              Our Services
            </h1>
            <p className="text-xl text-[#FCEBDC]/80 max-w-3xl mx-auto">
              Choose from our comprehensive range of media services designed to help you grow your brand and business.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-black border border-[#273F4F]/20 rounded-lg p-1 shadow">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#B40101] text-white'
                      : 'text-[#FCEBDC] hover:text-[#B40101]'
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
                className={`relative bg-black border border-[#273F4F]/20 rounded-lg shadow-lg overflow-hidden ${
                  pkg.popular ? 'ring-2 ring-[#B40101]' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-[#B40101] text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                    Most Popular
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#B40101]/10 rounded-lg flex items-center justify-center mr-4">
                      <pkg.icon className="h-6 w-6 text-[#B40101]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#FCEBDC]">{pkg.name}</h3>
                      <p className="text-[#FCEBDC]/60 text-sm">{pkg.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-[#FCEBDC] mb-1">
                      ${pkg.price}
                    </div>
                    <p className="text-[#FCEBDC]/60 text-sm">One-time payment</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-[#B40101] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-[#FCEBDC]/80 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/contact"
                    className="block w-full bg-[#B40101] text-white py-3 px-4 rounded-lg hover:bg-[#e0651a] transition-colors text-center font-medium"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[#FCEBDC]/40 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-[#FCEBDC] mb-2">No services found</h3>
              <p className="text-[#FCEBDC]/70">
                Try selecting a different category to see more services.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 