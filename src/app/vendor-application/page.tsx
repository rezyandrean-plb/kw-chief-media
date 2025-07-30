'use client';

import { useState } from 'react';
import { 
  BuildingOfficeIcon,
  CameraIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';
import Notification from '../../components/Notification';

interface VendorApplication {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  services: string[];
  description: string;
  specialties: string[];
  experience: string;
  portfolio: string;
  website?: string;
  socialMedia?: string;
}

export default function VendorApplicationPage() {
  const [step, setStep] = useState(1);
  const [application, setApplication] = useState<VendorApplication>({
    name: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    services: [],
    description: '',
    specialties: [],
    experience: '',
    portfolio: '',
    website: '',
    socialMedia: ''
  });
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const availableServices = [
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

  const handleServiceToggle = (serviceId: string) => {
    setApplication(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSpecialtyAdd = (specialty: string) => {
    if (specialty.trim() && !application.specialties.includes(specialty.trim())) {
      setApplication(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty.trim()]
      }));
    }
  };

  const handleSpecialtyRemove = (specialty: string) => {
    setApplication(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!application.name || !application.company || !application.email || 
        !application.phone || !application.services.length || !application.description) {
      setNotification({
        isVisible: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    // Simulate API call - in real app, send to backend
    console.log('Vendor application submitted:', application);
    
    setNotification({
      isVisible: true,
      message: 'Application submitted successfully! We will review your application and get back to you within 3-5 business days.',
      type: 'success'
    });

    // Reset form after successful submission
    setTimeout(() => {
      setApplication({
        name: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        services: [],
        description: '',
        specialties: [],
        experience: '',
        portfolio: '',
        website: '',
        socialMedia: ''
      });
      setStep(1);
    }, 3000);
  };

  const nextStep = () => {
    if (step === 1 && (!application.name || !application.company || !application.email || !application.phone)) {
      setNotification({
        isVisible: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }
    if (step === 2 && (!application.services.length || !application.description)) {
      setNotification({
        isVisible: true,
        message: 'Please select at least one service and provide a description',
        type: 'error'
      });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#FCEBDC] mb-4">
              Vendor Application
            </h1>
            <p className="text-xl text-[#FCEBDC]/80 max-w-3xl mx-auto">
              Join our network of verified vendors serving KW Singapore realtors. 
                              Submit your application and we&apos;ll review it within 3-5 business days.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#FCEBDC]/80">Step {step} of 3</span>
              <span className="text-sm text-[#FCEBDC]/80">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-[#273F4F]/20 rounded-full h-2">
              <div 
                className="bg-[#B40101] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="bg-black border border-[#273F4F]/20 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#FCEBDC] mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    value={application.name}
                    onChange={(e) => setApplication(prev => ({ ...prev, name: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={application.company}
                    onChange={(e) => setApplication(prev => ({ ...prev, company: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={application.email}
                    onChange={(e) => setApplication(prev => ({ ...prev, email: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={application.phone}
                    onChange={(e) => setApplication(prev => ({ ...prev, phone: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="+65 9123 4567"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Business Address
                  </label>
                  <input
                    type="text"
                    value={application.address}
                    onChange={(e) => setApplication(prev => ({ ...prev, address: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="Your business address"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Services and Description */}
          {step === 2 && (
            <div className="bg-black border border-[#273F4F]/20 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#FCEBDC] mb-6">Services & Description</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#FCEBDC] mb-4">
                  Services Offered *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableServices.map((service) => {
                    const Icon = service.icon;
                    const isSelected = application.services.includes(service.id);
                    return (
                      <div
                        key={service.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          isSelected
                            ? 'border-[#B40101] bg-[#B40101]/10'
                            : 'border-[#273F4F]/20 hover:border-[#273F4F]/40'
                        }`}
                        onClick={() => handleServiceToggle(service.id)}
                      >
                        <div className="flex items-center">
                          <Icon className={`h-5 w-5 mr-3 ${isSelected ? 'text-[#B40101]' : 'text-[#FCEBDC]/60'}`} />
                          <span className={`text-sm font-medium ${isSelected ? 'text-[#FCEBDC]' : 'text-[#FCEBDC]/80'}`}>
                            {service.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                  Company Description *
                </label>
                <textarea
                  value={application.description}
                  onChange={(e) => setApplication(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                  placeholder="Describe your company, services, and what makes you unique..."
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={application.experience}
                  onChange={(e) => setApplication(prev => ({ ...prev, experience: e.target.value }))}
                  className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                  placeholder="e.g., 5+ years"
                />
              </div>
            </div>
          )}

          {/* Step 3: Additional Information */}
          {step === 3 && (
            <div className="bg-black border border-[#273F4F]/20 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-[#FCEBDC] mb-6">Additional Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                  Specialties
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {application.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                    >
                      {specialty}
                      <button
                        onClick={() => handleSpecialtyRemove(specialty)}
                        className="ml-2 text-[#f2a16d] hover:text-[#f2a16d]/80"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Add a specialty..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSpecialtyAdd(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 border border-[#273F4F]/20 rounded-l-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                  />
                  <button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      handleSpecialtyAdd(input.value);
                      input.value = '';
                    }}
                    className="bg-[#B40101] text-white px-4 py-2 rounded-r-md hover:bg-[#e0651a] transition"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={application.website}
                    onChange={(e) => setApplication(prev => ({ ...prev, website: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                    Social Media
                  </label>
                  <input
                    type="text"
                    value={application.socialMedia}
                    onChange={(e) => setApplication(prev => ({ ...prev, socialMedia: e.target.value }))}
                    className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    placeholder="Instagram, LinkedIn, etc."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#FCEBDC] mb-2">
                  Portfolio Link
                </label>
                <input
                  type="url"
                  value={application.portfolio}
                  onChange={(e) => setApplication(prev => ({ ...prev, portfolio: e.target.value }))}
                  className="block w-full border border-[#273F4F]/20 rounded-md px-3 py-2 text-[#FCEBDC] bg-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                  placeholder="Link to your portfolio or sample work"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className="px-6 py-2 border border-[#273F4F]/20 text-[#FCEBDC] rounded-md hover:bg-[#273F4F]/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-4">
              {step < 3 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-[#B40101] text-white rounded-md hover:bg-[#e0651a] transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-[#B40101] text-white rounded-md hover:bg-[#e0651a] transition flex items-center"
                >
                  <CheckIcon className="h-5 w-5 mr-2" />
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        duration={5000}
      />
    </div>
  );
} 