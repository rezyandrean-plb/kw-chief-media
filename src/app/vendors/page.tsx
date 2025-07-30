'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CameraIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
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
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');

  const vendors: Vendor[] = [
    {
      id: '1',
      name: 'TUBEAR',
      company: 'TUBEAR',
      services: ['virtual-staging', 'photography', 'virtual-tours', '3d-rendering'],
      location: 'Singapore',
      rating: 5.0,
      projects: 50,
      experience: '5+ years',
      description: 'Specializing in virtual staging, digital decluttering, and 3D rendering services. Expert in creating immersive 360° virtual tours and virtual renovation simulations.',
      specialties: ['Virtual Staging', 'Digital Decluttering', '3D Rendering', '360° Virtual Tours', 'Virtual Renovation', 'Professional Photography'],
      icon: CameraIcon,
    },
    {
      id: '2',
      name: 'Chief Media',
      company: 'Chief Media',
      services: ['brand-consulting'],
      location: 'Singapore',
      rating: 5.0,
      projects: 35,
      experience: '8+ years',
      description: 'Realtor brand consulting firm specializing in strategic brand development and marketing solutions for real estate professionals.',
      specialties: ['Brand Strategy', 'Realtor Consulting', 'Marketing Solutions', 'Brand Development'],
      icon: UserGroupIcon,
    },
    {
      id: '3',
      name: 'LFG Content Co.',
      company: 'LFG Content Co.',
      services: ['videography', 'podcast-production', 'live-streaming'],
      location: 'Singapore',
      rating: 5.0,
      projects: 28,
      experience: '6+ years',
      description: 'Full-service content production company offering podcast production, video content creation, and live streaming services with professional multi-camera setups.',
      specialties: ['Podcast Production', 'Multi-camera Setup', 'Live Editing', 'Cinematic Videos', 'Live Streaming', 'Webinars'],
      icon: VideoCameraIcon,
    },
    {
      id: '4',
      name: 'CC Creative',
      company: 'CC Creative',
      services: ['graphic-design', 'web-design', 'content-writing'],
      location: 'Singapore',
      rating: 5.0,
      projects: 45,
      experience: '7+ years',
      description: 'Comprehensive creative services including digital assets, logo design, website development, and content creation for real estate professionals.',
      specialties: ['Digital Assets', 'Logo Design', 'Graphic Design', 'Website Design', 'Content Writing', 'Book Creation'],
      icon: DocumentTextIcon,
    },
    {
      id: '5',
      name: 'WIN Media Studios',
      company: 'WIN Media Studios',
      services: ['personal-branding', 'content-creation', 'web-design'],
      location: 'Singapore',
      rating: 5.0,
      projects: 32,
      experience: '4+ years',
      description: 'Personal branding content system specialists offering full content creation, distribution, and landing page development with funnel automation.',
      specialties: ['Personal Branding', 'Content Strategy', 'Batch Creation', 'Landing Pages', 'Funnel Automation'],
      icon: BuildingOfficeIcon,
    },
  ];

  const services = [
    { id: 'all', name: 'All Services', icon: BuildingOfficeIcon },
    { id: 'photography', name: 'Photography', icon: CameraIcon },
    { id: 'videography', name: 'Videography', icon: VideoCameraIcon },
    { id: 'virtual-staging', name: 'Virtual Staging', icon: CameraIcon },
    { id: 'virtual-tours', name: 'Virtual Tours', icon: BuildingOfficeIcon },
    { id: '3d-rendering', name: '3D Rendering', icon: BuildingOfficeIcon },
    { id: 'brand-consulting', name: 'Brand Consulting', icon: UserGroupIcon },
    { id: 'podcast-production', name: 'Podcast Production', icon: VideoCameraIcon },
    { id: 'live-streaming', name: 'Live Streaming', icon: VideoCameraIcon },
    { id: 'graphic-design', name: 'Graphic Design', icon: DocumentTextIcon },
    { id: 'web-design', name: 'Web Design', icon: DocumentTextIcon },
    { id: 'content-writing', name: 'Content Writing', icon: DocumentTextIcon },
    { id: 'personal-branding', name: 'Personal Branding', icon: UserGroupIcon },
    { id: 'content-creation', name: 'Content Creation', icon: VideoCameraIcon },
  ];



  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || vendor.services.includes(selectedService);
    
    return matchesSearch && matchesService;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <h1 className="text-4xl font-bold text-[#FCEBDC] mb-4">
              Our Verified Vendors
            </h1>
            <p className="text-xl text-[#FCEBDC]/80 max-w-3xl mx-auto">
              Meet our carefully curated network of professional creatives, photographers, and marketing experts. 
              Each vendor has been verified and approved to serve Keller Williams realtors with quality and reliability.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-black border border-[#273F4F]/20 rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-10 gap-4">
              {/* Search */}
              <div className="sm:col-span-7">
                <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                  Search Vendors
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#FCEBDC]/60" />
                  <input
                    type="text"
                    placeholder="Search by name, company, or specialty..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-[#273F4F]/20 rounded-md text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                  />
                </div>
              </div>

              {/* Service Filter */}
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                  Service Type
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <p className="text-[#FCEBDC]/80 text-sm">
              Showing {filteredVendors.length} of {vendors.length} verified vendors
            </p>
            <div className="flex items-center text-sm text-[#FCEBDC]/60">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filtered Results
            </div>
          </div>

          {/* Vendors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredVendors.map((vendor) => {
              const Icon = vendor.icon;
              return (
                <div key={vendor.id} className="bg-black border border-[#273F4F]/20 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
                  {/* Header */}
                  <div className="p-4 sm:p-6 border-b border-[#273F4F]/20">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#03809c]/10 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#03809c]" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-[#FCEBDC]">
                            {vendor.name}
                          </h3>
                          <p className="text-sm text-[#FCEBDC]/80">
                            {vendor.company}
                          </p>
                        </div>
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

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#FCEBDC]/70">
                        <span className="font-medium text-[#FCEBDC]">{vendor.projects}</span> projects
                      </span>
                      <span className="text-[#FCEBDC]/70">
                        <span className="font-medium text-[#FCEBDC]">{vendor.experience}</span> experience
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="p-4 sm:p-6 flex-1 flex flex-col">
                    <p className="text-sm text-[#FCEBDC]/80 mb-4">
                      {vendor.description}
                    </p>

                    {/* Specialties */}
                    <div className="mb-4 flex-1">
                      <h4 className="text-sm font-medium text-[#FCEBDC] mb-2">Specialties:</h4>
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
                    <button 
                      onClick={() => router.push(`/vendors/${vendor.id}`)}
                      className="w-full bg-[#B40101] text-white py-2 px-4 rounded-md hover:bg-[#e0651a] transition font-medium text-sm mt-auto"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-[#FCEBDC]/40 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-[#FCEBDC] mb-2">No vendors found</h3>
              <p className="text-[#FCEBDC]/70">
                Try adjusting your search criteria or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 