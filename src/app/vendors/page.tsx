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
import AnimatedBackground from '../../components/AnimatedBackground';

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
    <div className="min-h-screen bg-[#273f4f] relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#273f4f] mb-4">
              Our Verified Vendors
            </h1>
            <p className="text-xl text-[#273f4f]/80 max-w-3xl mx-auto">
              Meet our carefully curated network of professional creatives, photographers, and marketing experts. 
              Each vendor has been verified and approved to serve Keller Williams realtors with quality and reliability.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-[#273f4f] mb-2">
                  Search Vendors
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#273f4f]/60" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-[#273f4f]/20 rounded-md text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521]"
                  />
                </div>
              </div>

              {/* Service Filter */}
              <div>
                <label className="block text-sm font-medium text-[#273f4f] mb-2">
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521]"
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
                <label className="block text-sm font-medium text-[#273f4f] mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521]"
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
            <p className="text-[#273f4f]/80 text-sm">
              Showing {filteredVendors.length} of {vendors.length} verified vendors
            </p>
            <div className="flex items-center text-sm text-[#273f4f]/60">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filtered Results
            </div>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredVendors.map((vendor) => {
              const Icon = vendor.icon;
              return (
                <div key={vendor.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-[#fcebdc]">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03809c]/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#03809c]" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-[#273f4f]">
                            {vendor.name}
                          </h3>
                          <p className="text-sm text-[#273f4f]/80">
                            {vendor.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <StarIcon className="h-4 w-4 text-[#f37521] mr-1" />
                        <span className="text-sm font-medium text-[#273f4f]">{vendor.rating}</span>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {vendor.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f37521]/10 text-[#f37521]"
                        >
                          {service.charAt(0).toUpperCase() + service.slice(1).replace('-', ' ')}
                        </span>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-sm text-[#273f4f]/70 mb-3">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {vendor.location}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#273f4f]/70">
                        <span className="font-medium text-[#273f4f]">{vendor.projects}</span> projects
                      </span>
                      <span className="text-[#273f4f]/70">
                        <span className="font-medium text-[#273f4f]">{vendor.experience}</span> experience
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 sm:p-6">
                    <p className="text-sm text-[#273f4f]/80 mb-4">
                      {vendor.description}
                    </p>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-[#273f4f] mb-2">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Contact Button */}
                    <button className="w-full bg-[#f37521] text-white py-2 px-4 rounded-md hover:bg-[#e0651a] transition font-medium text-sm">
                      Contact Vendor
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[#273f4f]/40 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-[#273f4f] mb-2">No vendors found</h3>
              <p className="text-[#273f4f]/70">
                Try adjusting your search criteria or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 