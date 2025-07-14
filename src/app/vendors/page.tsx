'use client';

import { useState } from 'react';
import { 
  CameraIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  StarIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Vendor {
  id: string;
  name: string;
  company: string;
  services: string[];
  location: string;
  rating: number;
  projects: number;
  experience: string;
  description: string;
  specialties: string[];
  icon: React.ComponentType<{ className?: string }>;
}

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      company: 'Chen Creative Studios',
      services: ['photography', 'videography'],
      location: 'Orchard Road, Singapore',
      rating: 5.0,
      projects: 24,
      experience: '5+ years',
      description: 'Specializing in luxury real estate photography and cinematic video tours. Known for capturing the essence of high-end properties with stunning visuals.',
      specialties: ['Luxury Homes', 'Drone Photography', 'Virtual Tours'],
      icon: CameraIcon,
    },
    {
      id: '2',
      name: 'Marcus Rodriguez',
      company: 'Rodriguez Media Group',
      services: ['copywriting', 'social-media'],
      location: 'Marina Bay, Singapore',
      rating: 5.0,
      projects: 18,
      experience: '3+ years',
      description: 'Expert copywriter and social media strategist for real estate. Creates compelling content that drives engagement and generates leads.',
      specialties: ['Property Descriptions', 'Social Media Campaigns', 'Brand Development'],
      icon: DocumentTextIcon,
    },
    {
      id: '3',
      name: 'Jennifer Wang',
      company: 'Wang Photography Co.',
      services: ['photography', 'social-media'],
      location: 'Sentosa, Singapore',
      rating: 5.0,
      projects: 31,
      experience: '7+ years',
      description: 'Professional photographer with expertise in residential and commercial properties. Also provides social media management services.',
      specialties: ['Residential Photography', 'Commercial Properties', 'Social Media Management'],
      icon: CameraIcon,
    },
    {
      id: '4',
      name: 'David Thompson',
      company: 'Thompson Visuals',
      services: ['videography', 'virtual-tours'],
      location: 'Clarke Quay, Singapore',
      rating: 5.0,
      projects: 15,
      experience: '4+ years',
      description: 'Specialist in virtual tours and video production for real estate. Creates immersive experiences that showcase properties effectively.',
      specialties: ['360° Virtual Tours', 'Drone Videography', 'Interactive Tours'],
      icon: VideoCameraIcon,
    },
    {
      id: '5',
      name: 'Amanda Davis',
      company: 'Elite Media Productions',
      services: ['photography', 'videography', 'virtual-tours'],
      location: 'Raffles Place, Singapore',
      rating: 5.0,
      projects: 42,
      experience: '8+ years',
      description: 'Full-service media production company specializing in luxury real estate. Offers comprehensive photography, video, and virtual tour packages.',
      specialties: ['Luxury Properties', 'Aerial Photography', 'Complete Media Packages'],
      icon: BuildingOfficeIcon,
    },
    {
      id: '6',
      name: 'Michael Brown',
      company: 'Brown Creative Solutions',
      services: ['copywriting', 'social-media'],
      location: 'Tanjong Pagar, Singapore',
      rating: 5.0,
      projects: 12,
      experience: '2+ years',
      description: 'Creative copywriter and social media expert focused on modern real estate marketing strategies and engaging content creation.',
      specialties: ['Modern Marketing', 'Content Strategy', 'Lead Generation'],
      icon: UserGroupIcon,
    },
  ];

  const services = [
    { id: 'all', name: 'All Services', icon: BuildingOfficeIcon },
    { id: 'photography', name: 'Photography', icon: CameraIcon },
    { id: 'videography', name: 'Videography', icon: VideoCameraIcon },
    { id: 'copywriting', name: 'Copywriting', icon: DocumentTextIcon },
    { id: 'social-media', name: 'Social Media', icon: UserGroupIcon },
    { id: 'virtual-tours', name: 'Virtual Tours', icon: BuildingOfficeIcon },
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'Orchard Road, Singapore', name: 'Orchard Road, Singapore' },
    { id: 'Marina Bay, Singapore', name: 'Marina Bay, Singapore' },
    { id: 'Sentosa, Singapore', name: 'Sentosa, Singapore' },
    { id: 'Clarke Quay, Singapore', name: 'Clarke Quay, Singapore' },
    { id: 'Raffles Place, Singapore', name: 'Raffles Place, Singapore' },
    { id: 'Tanjong Pagar, Singapore', name: 'Tanjong Pagar, Singapore' },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || vendor.services.includes(selectedService);
    const matchesLocation = selectedLocation === 'all' || vendor.location === selectedLocation;
    
    return matchesSearch && matchesService && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Verified Vendors
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Meet our carefully curated network of professional creatives, photographers, and marketing experts. 
              Each vendor has been verified and approved to serve Keller Williams realtors with quality and reliability.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Vendors
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Showing {filteredVendors.length} of {vendors.length} verified vendors
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filtered Results
            </div>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredVendors.map((vendor) => {
              const Icon = vendor.icon;
              return (
                <div key={vendor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                            {vendor.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {vendor.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-900 dark:text-white">
                          {vendor.rating}
                        </span>
                      </div>
                    </div>

                    {/* Location and Experience */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400 mb-3 gap-1">
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-1" />
                        {vendor.location}
                      </div>
                      <span>{vendor.experience}</span>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {vendor.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {service.charAt(0).toUpperCase() + service.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 sm:p-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 sm:mb-4">
                      {vendor.description}
                    </p>

                    {/* Specialties */}
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Specialties:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500 dark:text-gray-400 mb-4 gap-1">
                      <span>{vendor.projects} projects completed</span>
                      <span>Verified Vendor</span>
                    </div>

                    {/* Contact Button */}
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
                      Contact via Isabelle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <BuildingOfficeIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No vendors found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No vendors match your current filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedService('all');
                  setSelectedLocation('all');
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need a Vendor Not Listed?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              If you don&apos;t see a vendor that matches your specific needs, contact Isabelle. 
              She can help you find the perfect match or connect you with new vendors in our network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Isabelle
              </a>
              <a
                href="/vendor-application"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Apply as Vendor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 