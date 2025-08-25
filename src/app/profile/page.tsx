'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  UserCircleIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        bio: ''
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37521] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // In real app, this would update the user profile via API
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      company: user.company || '',
      bio: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="bg-[#273f4f] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
                              <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
                <p className="mt-1 text-sm text-gray-300">
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#273f4f] shadow rounded-lg">
          {/* Profile Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-16 w-16 rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="h-16 w-16 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                                 <h2 className="text-xl font-semibold text-white">{user.name}</h2>
                 <p className="text-sm text-gray-300">{user.email}</p>
                 <p className="text-sm text-gray-300 capitalize">{user.role}</p>
              </div>
              <div>
                {!isEditing ? (
                                       <button
                       onClick={() => setIsEditing(true)}
                       className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-[#273f4f] hover:bg-[#1a2a35]"
                     >
                       Edit Profile
                     </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a] disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                                         <button
                       onClick={handleCancel}
                       className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-white bg-[#273f4f] hover:bg-[#1a2a35]"
                     >
                       Cancel
                     </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Name */}
              <div>
                                 <label htmlFor="name" className="block text-sm font-medium text-white">
                   Full Name
                 </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              {/* Role-specific fields */}
              {user.role === 'vendor' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Vendor Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="specialties" className="block text-sm font-medium text-gray-700">
                        Specialties
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="specialties"
                          id="specialties"
                          disabled={!isEditing}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="e.g., Real Estate Photography, 3D Tours, Video Production"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                        Years of Experience
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="experience"
                          id="experience"
                          disabled={!isEditing}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {user.role === 'realtor' && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Realtor Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="license" className="block text-sm font-medium text-gray-700">
                        License Number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="license"
                          id="license"
                          disabled={!isEditing}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                          placeholder="Enter your real estate license number"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                        Specialization
                      </label>
                      <div className="mt-1">
                        <select
                          name="specialization"
                          id="specialization"
                          disabled={!isEditing}
                          className="block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] disabled:bg-gray-50 disabled:text-gray-500"
                        >
                          <option value="">Select specialization</option>
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                          <option value="luxury">Luxury</option>
                          <option value="investment">Investment</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 