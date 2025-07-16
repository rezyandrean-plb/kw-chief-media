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
  otherServices: string;
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
    otherServices: '',
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
    { id: 'others', label: 'Add Others', icon: DocumentTextIcon },
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
            <h1 className="text-2xl font-bold text-white mb-4">
              Application Submitted!
            </h1>
            <p className="text-white/90 mb-6">
              Thank you for your interest in joining Chief Media. Isabelle will review your application and contact you within 2-3 business days.
            </p>
            <div className="space-y-3 text-sm text-white/80">
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
            <h1 className="text-3xl font-bold text-white mb-4">
              Join Chief Media as a Vendor
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Become part of our exclusive network of verified creatives serving <br /> KW Singapore Realtors. 
              Showcase your talent and grow your business with our curated marketplace.
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white/10 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Why Join Chief Media?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Curated Vendors</h3>
                  <p className="text-sm text-white/80">Exclusive access to a curated marketplace of verified creatives, all tailored for KW agents.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Quality Guaranteed</h3>
                  <p className="text-sm text-white/80">We guarantee quality as all our vendors are thoroughly vetted, ensuring consistent, high-standard service.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Efficient Communication</h3>
                  <p className="text-sm text-white/80">Work directly with your chosen vendors via WhatsApp for seamless and efficient project communication.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 text-[#03809c] mr-3 mt-0.5" />
                <div>
                  <h3 className="font-medium text-white">Transparent Transactions</h3>
                  <p className="text-sm text-white/80">Benefit from our secure payment system with a clear 50% deposit and 50% upon completion structure.</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Company/Business Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Website/Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
                    />
                  </div>
                </div>

                {/* Services */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
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
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service.id)}
                            onChange={() => handleServiceToggle(service.id)}
                            className="sr-only"
                          />
                          <Icon className={`h-5 w-5 mr-2 ${
                            formData.services.includes(service.id) ? 'text-[#f37521]' : 'text-gray-500'
                          }`} />
                          <span className={`text-sm font-medium ${
                            formData.services.includes(service.id) ? 'text-[#f37521]' : 'text-gray-700'
                          }`}>
                            {service.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  
                  {/* Other Services Input */}
                  {formData.services.includes('others') && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Please specify other services you offer
                      </label>
                      <input
                        name="otherServices"
                        value={formData.otherServices}
                        onChange={handleChange}
                        placeholder="Describe the additional services you provide..."
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm resize-vertical"
                      />
                    </div>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Years of Experience *
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Portfolio Description *
                  </label>
                  <textarea
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Describe your portfolio, notable projects, and the types of real estate work you've done..."
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm resize-vertical"
                  />
                </div>

                {/* Why Join */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Why do you want to join Chief Media? *
                  </label>
                  <textarea
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    required
                    rows={3}
                    placeholder="Tell us why you want to join our network and how you can contribute to KW realtors..."
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm resize-vertical"
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Availability for Projects *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm"
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