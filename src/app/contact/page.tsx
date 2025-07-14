'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: 'kw-realtor' | 'potential-vendor' | 'other';
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: 'kw-realtor',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting contact form:', error);
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Message Sent!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for reaching out to Chief Media. Isabelle will get back to you within 24 hours.
            </p>
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <p>What happens next:</p>
              <ul className="text-left space-y-2">
                <li>• Isabelle will review your message</li>
                <li>• You'll receive a response within 24 hours</li>
                <li>• If needed, a follow-up call will be scheduled</li>
                <li>• We'll help you get started with Chief Media</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Isabelle
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get in touch with Isabelle, our vendor-relationship manager and agent liaison. 
              Whether you're a KW realtor looking for quality vendors or a creative professional wanting to join our network, 
              Isabelle is here to help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">isabelle@chiefmedia.com</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">+65 9123 4567</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Mon-Fri, 9 AM - 6 PM SGT</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white">Location</h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Serving KW realtors in Singapore</p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Virtual meetings available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Isabelle Helps */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  How Isabelle Can Help You
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <UserGroupIcon className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">For KW Realtors</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Find the perfect vendor for your marketing needs, get matched with verified creatives, 
                          and ensure quality deliverables for your listings.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <BuildingOfficeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">For Vendors</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Join our exclusive network, get access to KW's realtor base, and grow your business 
                          with our curated marketplace approach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="/vendors"
                    className="block w-full bg-blue-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium text-sm sm:text-base"
                  >
                    Browse Vendors
                  </a>
                  <a
                    href="/vendor-application"
                    className="block w-full bg-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-green-700 transition-colors text-center font-medium text-sm sm:text-base"
                  >
                    Apply as Vendor
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                      Company/Business
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    I am a... *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="kw-realtor">KW Realtor</option>
                    <option value="potential-vendor">Potential Vendor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What can we help you with?"
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your needs, questions, or how we can help you..."
                    className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 sm:mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  How does the vendor matching process work?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Isabelle meets with KW realtors to understand their specific needs, then matches them with the most suitable vendors from our curated network. 
                  A WhatsApp group is created for direct communication between the realtor and vendor.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  What are the payment terms?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We use a 50% deposit, 50% upon completion payment structure. The revenue split is 85% to the vendor and 15% to Chief Media for platform management.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  How do I become a vendor?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Submit an application through our website. Isabelle will review your portfolio and experience, then schedule a call to discuss your services and the platform requirements.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  Is Chief Media exclusive to KW realtors?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Yes, Chief Media is exclusively for Keller Williams realtors. Vendors must work only through our platform when serving KW agents to maintain quality standards and exclusivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 