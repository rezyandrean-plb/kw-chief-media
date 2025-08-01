'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useEnquiries } from '@/lib/enquiries';
import Notification from '../../../components/Notification';
import Image from 'next/image';
import { 
  CameraIcon,
  ArrowLeftIcon,
  StarIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../components/AnimatedBackground';

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
  portfolio: PortfolioItem[];
  offerings: Offering[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface Offering {
  id: string;
  name: string;
  description: string;
  features: string[];
  price?: string;
  duration: string;
  category: string;
}

export default function VendorDetailPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { addEnquiry } = useEnquiries();
  const [showPricing, setShowPricing] = useState(false);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
    actions?: {
      label: string;
      onClick: () => void;
      variant?: 'primary' | 'secondary';
    }[];
  }>({
    message: '',
    type: 'info',
    isVisible: false,
    actions: []
  });

  // Mock vendor data - in real app, fetch from API
  const vendor: Vendor = {
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
    image: '/images/vendors/tubear.svg',
    portfolio: [
      {
        id: '1',
        title: 'Luxury Condo Virtual Staging',
        description: 'Complete virtual staging transformation for a 3-bedroom luxury condo',
        imageUrl: '/api/placeholder/400/300',
        category: 'Virtual Staging'
      },
      {
        id: '2',
        title: '360° Virtual Tour',
        description: 'Interactive virtual tour with hotspots and floor plans',
        imageUrl: '/api/placeholder/400/300',
        category: 'Virtual Tours'
      },
      {
        id: '3',
        title: '3D Rendering Project',
        description: 'Photorealistic 3D rendering of proposed renovations',
        imageUrl: '/api/placeholder/400/300',
        category: '3D Rendering'
      }
    ],
    offerings: [
      {
        id: '1',
        name: 'Basic Virtual Staging',
        description: 'Professional virtual staging for up to 5 rooms',
        features: ['Up to 5 rooms', 'Standard furniture selection', 'Basic lighting', '2 revisions'],
        price: 'SGD 800',
        duration: '3-5 business days',
        category: 'Virtual Staging'
      },
      {
        id: '2',
        name: 'Premium Virtual Staging',
        description: 'Advanced virtual staging with custom furniture and lighting',
        features: ['Up to 10 rooms', 'Custom furniture selection', 'Advanced lighting', 'Unlimited revisions', 'Before/after comparison'],
        price: 'SGD 1,500',
        duration: '5-7 business days',
        category: 'Virtual Staging'
      },
      {
        id: '3',
        name: '360° Virtual Tour',
        description: 'Complete virtual tour with interactive elements',
        features: ['360° photography', 'Interactive hotspots', 'Floor plan integration', 'Mobile optimized', 'Social media ready'],
        price: 'SGD 1,200',
        duration: '2-3 business days',
        category: 'Virtual Tours'
      }
    ],
    contact: {
      email: 'hello@tubear.sg',
      phone: '+65 9123 4567',
      address: 'Singapore'
    }
  };

  const handleConnect = () => {
    if (!user) {
      setNotification({
        message: 'Please login with your KW Singapore email to connect with vendors',
        type: 'warning',
        isVisible: true,
        actions: [
          {
            label: 'Login',
            onClick: () => router.push('/login'),
            variant: 'primary'
          },
          {
            label: 'Signup',
            onClick: () => router.push('/signup'),
            variant: 'secondary'
          }
        ]
      });
      return;
    }
    
    // Check if user has KW Singapore email
    if (!user.email.endsWith('@kwsingapore.com')) {
      setNotification({
        message: 'Only KW Singapore realtors can connect with vendors. Please use your @kwsingapore.com email.',
        type: 'error',
        isVisible: true,
        actions: [
          {
            label: 'Login with KW Email',
            onClick: () => router.push('/login'),
            variant: 'primary'
          },
          {
            label: 'Signup with KW Email',
            onClick: () => router.push('/signup'),
            variant: 'secondary'
          }
        ]
      });
      return;
    }
    
    // Show selection form for logged-in users
    setShowEnquiryForm(true);
    
    // Show notification to select services
    setNotification({
      message: 'Please select Services & Offerings',
      type: 'info',
      isVisible: true
    });
    
    // Scroll to Services & Offerings section with a small delay to ensure DOM is ready
    setTimeout(() => {
      const offeringsSection = document.getElementById('services-offerings');
      if (offeringsSection) {
        offeringsSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleOfferingSelect = (offeringId: string) => {
    setSelectedOfferings(prev => 
      prev.includes(offeringId) 
        ? prev.filter(id => id !== offeringId)
        : [...prev, offeringId]
    );
  };

  const handleSubmitEnquiry = () => {
    if (!user) return;
    
    // Add enquiry to the system
    addEnquiry({
      vendorId: vendor.id,
      vendorName: vendor.name,
      realtorId: user.id,
      realtorName: user.name,
      realtorEmail: user.email,
      offerings: selectedOfferings,
      status: 'pending',
      notes: `Interested in: ${selectedOfferings.join(', ')}`
    });
    
    // Show success notification
    setNotification({
      message: `Enquiry submitted successfully to ${vendor.name}! We'll get back to you soon.`,
      type: 'success',
      isVisible: true
    });
    
    setShowPricing(true);
    setShowEnquiryForm(false);
  };

  const handleBookMeeting = () => {
    router.push(`/vendors/${vendor.id}/book-meeting?offerings=${selectedOfferings.join(',')}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <AnimatedBackground />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B40101] relative z-10"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        actions={notification.actions}
      />
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#FCEBDC]/80 hover:text-[#FCEBDC] mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Vendors
          </button>

          {/* Vendor Header */}
          <div className="bg-black border border-[#273F4F]/30 rounded-xl shadow-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start mb-6 lg:mb-0">
                <div className="w-16 h-16 bg-[#03809c]/10 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <Image
                    src={vendor.image}
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
                        fallbackIcon.innerHTML = '<svg class="h-8 w-8 text-[#03809c]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>';
                        parent.appendChild(fallbackIcon);
                      }
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#FCEBDC] mb-2">
                    {vendor.name}
                  </h1>
                  <p className="text-xl text-[#FCEBDC]/80 mb-3">
                    {vendor.company}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-[#FCEBDC]/70">
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{vendor.rating} ({vendor.projects} projects)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span>{vendor.location}</span>
                    </div>
                    <div>
                      <span>{vendor.experience} experience</span>
                    </div>
                  </div>
                </div>
              </div>

              {!showPricing && !showEnquiryForm && (
                <button
                  onClick={handleConnect}
                  className="bg-[#B40101] text-white px-6 py-3 rounded-lg hover:bg-[#e0651a] transition font-medium"
                >
                  Connect with {vendor.name}
                </button>
              )}
            </div>

            <p className="text-[#FCEBDC]/80 mt-6 leading-relaxed">
              {vendor.description}
            </p>

            {/* Specialties */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#FCEBDC] mb-3">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {vendor.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCEBDC] mb-6">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendor.portfolio.map((item) => (
                <div key={item.id} className="bg-black border border-[#273F4F]/30 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-[#273F4F]/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-[#273F4F]/20 to-[#03809c]/20 flex items-center justify-center">
                    <span className="text-[#FCEBDC]/40 text-sm">Portfolio Image</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#FCEBDC] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#FCEBDC]/70 mb-2">{item.description}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f37521]/10 text-[#f37521]">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offerings Section */}
          <div id="services-offerings" className="mb-8">
            <h2 className="text-2xl font-bold text-[#FCEBDC] mb-6">Services & Offerings</h2>
            
            {showEnquiryForm ? (
              <div className="bg-black border border-[#273F4F]/30 rounded-xl shadow-2xl p-6">
                <h3 className="text-xl font-semibold text-[#FCEBDC] mb-4">Select Services You&apos;re Interested In</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {vendor.offerings.map((offering) => (
                    <div
                      key={offering.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedOfferings.includes(offering.id)
                          ? 'border-[#B40101] bg-[#B40101]/10'
                          : 'border-[#273F4F]/20 hover:border-[#273F4F]/40'
                      }`}
                      onClick={() => handleOfferingSelect(offering.id)}
                    >
                      <h4 className="font-semibold text-[#FCEBDC] mb-2">{offering.name}</h4>
                      <p className="text-sm text-[#FCEBDC]/70 mb-3">{offering.description}</p>
                      <div className="space-y-1">
                        {offering.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-[#FCEBDC]/60">
                            <div className="w-1 h-1 bg-[#FCEBDC]/40 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowEnquiryForm(false)}
                    className="px-4 py-2 border border-[#273F4F]/20 text-[#FCEBDC] rounded-md hover:bg-[#273F4F]/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitEnquiry}
                    disabled={selectedOfferings.length === 0}
                    className="px-6 py-2 bg-[#B40101] text-white rounded-md hover:bg-[#e0651a] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Enquiry
                  </button>
                </div>
              </div>
            ) : showPricing ? (
              <div className="bg-black border border-[#273F4F]/30 rounded-xl shadow-2xl p-6">
                <h3 className="text-xl font-semibold text-[#FCEBDC] mb-4">Pricing & Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {vendor.offerings
                    .filter(offering => selectedOfferings.includes(offering.id))
                    .map((offering) => (
                      <div key={offering.id} className="border border-[#273F4F]/30 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <h4 className="font-semibold text-[#FCEBDC] mb-2">{offering.name}</h4>
                        <p className="text-sm text-[#FCEBDC]/70 mb-4">{offering.description}</p>
                        <div className="text-2xl font-bold text-[#B40101] mb-2">{offering.price}</div>
                        <div className="text-sm text-[#FCEBDC]/60 mb-4">Duration: {offering.duration}</div>
                        <div className="space-y-2">
                          {offering.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-[#FCEBDC]/80">
                              <div className="w-1.5 h-1.5 bg-[#03809c] rounded-full mr-2"></div>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  onClick={handleBookMeeting}
                  className="bg-[#B40101] text-white px-6 py-3 rounded-lg hover:bg-[#e0651a] transition font-medium"
                >
                  Book a Meeting
                </button>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {vendor.offerings.map((offering) => (
                    <div key={offering.id} className="bg-black border border-[#273F4F]/30 rounded-xl shadow-lg p-6 hover:shadow-xl hover:border-[#273F4F]/50 transition-all duration-300">
                      <h3 className="font-semibold text-[#FCEBDC] mb-2">{offering.name}</h3>
                      <p className="text-sm text-[#FCEBDC]/70 mb-4">{offering.description}</p>
                      <div className="text-sm text-[#FCEBDC]/60 mb-4">Duration: {offering.duration}</div>
                      <div className="space-y-2">
                        {offering.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-[#FCEBDC]/80">
                            <div className="w-1.5 h-1.5 bg-[#03809c] rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                        {offering.features.length > 3 && (
                          <div className="text-sm text-[#FCEBDC]/60">
                            +{offering.features.length - 3} more features
                          </div>
                        )}
                      </div>
                      <div className="mt-4 text-sm text-[#FCEBDC]/60">
                        Pricing available after enquiry
                      </div>
                    </div>
                  ))}
                </div>
                {user && user.email.endsWith('@kwsingapore.com') && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowEnquiryForm(true)}
                      className="bg-[#B40101] text-white px-6 py-3 rounded-lg hover:bg-[#e0651a] transition font-medium"
                    >
                      Submit Enquiry
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-black border border-[#273F4F]/30 rounded-xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-[#FCEBDC] mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-[#03809c] mr-3" />
                <div>
                  <p className="text-sm text-[#FCEBDC]/60">Email</p>
                  <p className="text-[#FCEBDC]">{vendor.contact.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-[#03809c] mr-3" />
                <div>
                  <p className="text-sm text-[#FCEBDC]/60">Phone</p>
                  <p className="text-[#FCEBDC]">{vendor.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-[#03809c] mr-3" />
                <div>
                  <p className="text-sm text-[#FCEBDC]/60">Location</p>
                  <p className="text-[#FCEBDC]">{vendor.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 