'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
import SSOBanner from '../../components/SSOBanner';

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
  image: string;
  status: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

export default function VendorsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<string>('all');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch vendors from API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams();
        if (searchTerm) params.append('search', searchTerm);
        if (selectedService !== 'all') params.append('service', selectedService);
        
        const response = await fetch(`/api/vendors?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch vendors');
        }
        
        const result = await response.json();
        
        if (result.success) {
          setVendors(result.data);
        } else {
          throw new Error(result.error || 'Failed to fetch vendors');
        }
      } catch (err) {
        console.error('Error fetching vendors:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch vendors');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [searchTerm, selectedService]);

  // Filter vendors based on search and service selection
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = selectedService === 'all' || vendor.services.includes(selectedService);
    
    return matchesSearch && matchesService;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
          <div className="px-4 py-6 sm:px-0">
            <SSOBanner />
            
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

            {/* Loading State */}
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B40101] mx-auto mb-4"></div>
              <p className="text-[#FCEBDC]/70">Loading vendors...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
          <div className="px-4 py-6 sm:px-0">
            <SSOBanner />
            
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

            {/* Error State */}
            <div className="text-center py-12">
              <div className="text-[#FCEBDC]/40 text-6xl mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-[#FCEBDC] mb-2">Error loading vendors</h3>
              <p className="text-[#FCEBDC]/70 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-[#B40101] text-white py-2 px-4 rounded-md hover:bg-[#e0651a] transition font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* SSO Banner */}
          <SSOBanner />
          
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
          <div className="bg-black border border-[#273F4F]/30 rounded-xl shadow-2xl p-4 sm:p-6 mb-6 sm:mb-8">
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
            {filteredVendors.map((vendor) => (
              <div key={vendor.id} className="bg-black border border-[#273F4F]/30 rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl hover:border-[#273F4F]/50 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-[#273F4F]/20">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#03809c]/10 rounded-full flex items-center justify-center mr-3 sm:mr-4 overflow-hidden">
                        <Image
                          src={vendor.image || '/images/vendors/default-vendor.svg'}
                          alt={`${vendor.name} logo`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            // Fallback to a default icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallbackIcon = document.createElement('div');
                              fallbackIcon.className = 'w-full h-full flex items-center justify-center';
                              fallbackIcon.innerHTML = '<svg class="h-6 w-6 text-[#03809c]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>';
                              parent.appendChild(fallbackIcon);
                            }
                          }}
                        />
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
                </div>

                {/* Description */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
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
            ))}
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