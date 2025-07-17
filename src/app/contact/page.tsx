'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon,
  PhoneIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

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
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center">
        <AnimatedBackground />
        <div className="max-w-md mx-auto text-center">
          <div className="bg-[#fcebdc] rounded-lg shadow-lg p-8">
            <CheckCircleIcon className="h-16 w-16 text-[#f37521] mx-auto mb-4" />
            <h1 className="text-2xl font-semibold text-[#273f4f] mb-4 font-poppins">
              Message Sent!
            </h1>
            <p className="text-[#273f4f]/90 mb-6 font-poppins">
              Thank you for reaching out to Chief Media. Isabelle will get back to you within 24 hours.
            </p>
            <div className="space-y-3 text-sm text-[#273f4f]/80 font-poppins">
              <p>What happens next:</p>
              <ul className="text-left space-y-2">
                <li>• Isabelle will review your message</li>
                <li>• You&apos;ll receive a response within 24 hours</li>
                <li>• If needed, a follow-up call will be scheduled</li>
                <li>• We&apos;ll help you get started with Chief Media</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-semibold text-[#273f4f] mb-4 font-poppins">
              Contact us
            </h1>
            <p className="text-lg text-[#273f4f]/90 max-w-2xl mx-auto font-poppins">
              Get in touch with us - Whether youre a KW Singapore Realtor looking to streamline your media support or a creative looking to join our network, we’re happy to chat
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-medium text-[#273f4f] mb-4 sm:mb-6 font-poppins">
                  Get in Touch
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#f37521]" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-medium text-[#273f4f] font-poppins">Email</h3>
                      <p className="text-sm sm:text-base text-[#273f4f]/90 font-poppins">isabelle@chiefmedia.com</p>
                      <p className="text-xs sm:text-sm text-[#273f4f]/70 font-poppins">Response within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6 text-[#f37521]" />
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className="text-base sm:text-lg font-medium text-[#273f4f] font-poppins">Phone</h3>
                      <p className="text-sm sm:text-base text-[#273f4f]/90 font-poppins">+65 93246195</p>
                      <p className="text-xs sm:text-sm text-[#273f4f]/70 font-poppins">Mon-Fri, 9 AM - 6 PM SGT</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How Isabelle Helps */}
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-[#273f4f] mb-3 sm:mb-4 font-poppins">
                  How We Can Help You
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-[#fcebdc] rounded-lg p-3 sm:p-4 border border-[#f37521]/20">
                    <div className="flex items-start">
                      <UserGroupIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#f37521] mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#273f4f] text-sm sm:text-base font-poppins">For KW Singapore Realtors</h4>
                        <p className="text-xs sm:text-sm text-[#273f4f]/80 font-poppins">
                          Find the perfect vendor for your marketing needs, get matched with verified creatives, 
                          and ensure quality deliverables for your listings.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#fcebdc] rounded-lg p-3 sm:p-4 border border-[#f37521]/20">
                    <div className="flex items-start">
                      <BuildingOfficeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-[#f37521] mr-2 sm:mr-3 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[#273f4f] text-sm sm:text-base font-poppins">For Vendors</h4>
                        <p className="text-xs sm:text-sm text-[#273f4f]/80 font-poppins">
                          Join our exclusive network, get access to KW Singapore’s network, and grow your business with our curated marketplace approach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-[#273f4f] mb-3 sm:mb-4 font-poppins">
                  Quick Actions
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="/vendors"
                    className="block w-full bg-[#f37521] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-[#e0651a] transition-colors text-center font-medium text-sm sm:text-base font-poppins"
                  >
                    Browse Vendors
                  </a>
                  <a
                    href="/vendor-application"
                    className="block w-full bg-[#f37521] text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-[#e0651a] transition-colors text-center font-medium text-sm sm:text-base font-poppins"
                  >
                    Apply as Vendor
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#fcebdc] rounded-lg shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#273f4f] mb-4 sm:mb-6 font-poppins">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm font-poppins"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm font-poppins"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                      Company/Business
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm font-poppins"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                    I am a... *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm font-poppins"
                  >
                    <option value="kw-realtor">KW SingaporeRealtor</option>
                    <option value="potential-vendor">Potential Vendor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What can we help you with?"
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#273f4f] mb-1 sm:mb-2 font-poppins">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your needs, questions, or how we can help you..."
                    className="block w-full border border-[#273f4f]/20 rounded-md px-3 py-2 text-[#273f4f] bg-white focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] text-sm resize-vertical font-poppins"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f37521] text-white py-3 px-4 rounded-lg hover:bg-[#e0651a] disabled:bg-[#f37521]/50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base font-poppins"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-12 sm:mt-16">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-white mb-6 sm:mb-8 font-poppins">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-[#fcebdc] rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-[#273f4f] mb-2 sm:mb-3 font-poppins">
                  How does the vendor matching process work?
                </h3>
                <p className="text-sm text-[#273f4f]/80 font-poppins">
                  Connect directly to the vendors who best suit your media needs, or speak to us for a consultation - our team will perform a social media audit based on your goals and connect you to the right vendors.
                </p>
              </div>
              <div className="bg-[#fcebdc] rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-[#273f4f] mb-2 sm:mb-3 font-poppins">
                  What are the payment terms?
                </h3>
                <p className="text-sm text-[#273f4f]/80 font-poppins">
                  We use a 50% deposit, 50% upon completion payment structure. The revenue split will be paid out to the vendor monthly. There will be platform fee charges.
                </p>
              </div>
              <div className="bg-[#fcebdc] rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-[#273f4f] mb-2 sm:mb-3 font-poppins">
                  How do I become a vendor?
                </h3>
                <p className="text-sm text-[#273f4f]/80 font-poppins">
                Submit an application through our website! After we review your portfolio, you’ll meet the team for a business consultation on how we can support you, as well as how you can add value to our KW Singapore Realtors.
                </p>
              </div>
              <div className="bg-[#fcebdc] rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-[#273f4f] mb-2 sm:mb-3 font-poppins">
                  Is Chief Media exclusive to KW Singapore Realtors?
                </h3>
                <p className="text-sm text-[#273f4f]/80 font-poppins">
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