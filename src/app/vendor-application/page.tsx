'use client';

import { useState } from 'react';
import { 
  CameraIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  services: string[];
  experience: string;
  portfolio: string;
  whyJoin: string;
  availability: string;
}

export default function VendorApplicationPage() {
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    services: [],
    experience: '',
    portfolio: '',
    whyJoin: '',
    availability: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const serviceOptions = [
    { id: 'photography', label: 'Photography', icon: CameraIcon },
    { id: 'videography', label: 'Videography', icon: VideoCameraIcon },
    { id: 'copywriting', label: 'Copywriting', icon: DocumentTextIcon },
    { id: 'social-media', label: 'Social Media Management', icon: UserGroupIcon },
    { id: 'virtual-tours', label: 'Virtual Tours', icon: BuildingOfficeIcon },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#273f4f] relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <CheckCircleIcon className="h-16 w-16 text-[#03809c] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#273f4f] mb-4">
              Application Submitted!
            </h1>
            <p className="text-[#273f4f]/80 mb-6">
              Thank you for your interest in joining Chief Media. Isabelle will review your application and contact you within 2-3 business days.
            </p>
            <div className="space-y-3 text-sm text-[#273f4f]/70">
              <p>What happens next:</p>
              <ul className="text-left space-y-2">
                <li>• Isabelle will review your portfolio and experience</li>
                <li>• You&apos;ll receive a call to discuss your services</li>
                <li>• If approved, you&apos;ll be onboarded to our platform</li>
                <li>• You&apos;ll gain access to KW&apos;s realtor network</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#273f4f] relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#273f4f] mb-4">
              Join Chief Media as a Vendor
            </h1>
            <p className="text-lg text-[#273f4f]/80 max-w-2xl mx-auto">
              Become part of our exclusive network of verified creatives serving Keller Williams realtors. 
              Showcase your talent and grow your business with our curated marketplace.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-[#03809c]/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#273f4f] mb-4">
              Why Join Chief Media?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#273f4f]">Exclusive KW Network</h3>
                  <p className="text-sm text-[#273f4f]/80">Access to thousands of KW realtors</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#273f4f]">Fair Revenue Split</h3>
                  <p className="text-sm text-[#273f4f]/80">85% vendor, 15% platform fee</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#273f4f]">Direct Client Contact</h3>
                  <p className="text-sm text-[#273f4f]/80">Work directly with clients via WhatsApp</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-[#273f4f]">Quality Standards</h3>
                  <p className="text-sm text-[#273f4f]/80">Maintain high standards, build reputation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-[#273f4f] mb-4 sm:mb-6">
                Vendor Application
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                      Company/Business Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                      Website/Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-2 sm:mb-3">
                    Services Offered * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                    {serviceOptions.map((service) => {
                      const Icon = service.icon;
                      return (
                        <label
                          key={service.id}
                          className={`flex items-center p-2 sm:p-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.services.includes(service.id)
                              ? 'border-[#f37521] bg-[#f37521]/10'
                              : 'border-[#273f4f]/20 hover:border-[#273f4f]/40'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            className="sr-only"
                          />
                          <Icon className={`h-5 w-5 mr-2 ${
                            formData.services.includes(service.id) ? 'text-[#f37521]' : 'text-[#273f4f]/60'
                          }`} />
                          <span className={`text-sm font-medium ${
                            formData.services.includes(service.id) ? 'text-[#f37521]' : 'text-[#273f4f]'
                          }`}>
                            {service.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                  >
                    <option value="">Select experience level</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                {/* Portfolio */}
                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                    Portfolio Description *
                  </label>
                  <textarea
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your portfolio, notable projects, and the types of real estate work you've done..."
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm resize-vertical"
                  />
                </div>

                {/* Why Join */}
                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                    Why do you want to join Chief Media? *
                  </label>
                  <textarea
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Tell us why you want to join our network and how you can contribute to KW realtors..."
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm resize-vertical"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2">
                    Availability for Projects *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                  >
                    <option value="">Select availability</option>
                    <option value="immediate">Immediate availability</option>
                    <option value="within-week">Within 1 week</option>
                    <option value="within-month">Within 1 month</option>
                    <option value="flexible">Flexible scheduling</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f37521] text-white py-3 px-4 rounded-lg hover:bg-[#e0651a] disabled:bg-[#f37521]/50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 