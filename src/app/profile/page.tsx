'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { 
  UserCircleIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    phone: user?.phone || '',
  });

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call to update profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      // In a real app, you would update the user context here
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      company: user?.company || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#273f4f] relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Profile
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage your account information and preferences.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserCircleIcon className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {user.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <CheckIcon className="h-4 w-4 mr-1" />
                        {loading ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                      >
                        <XMarkIcon className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white py-2">{user.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white py-2">{user.email}</p>
                  )}
                </div>

                {(user.role === 'vendor' || user.role === 'realtor') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white py-2">{user.company || 'Not specified'}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-white py-2">{user.phone || 'Not specified'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Account Type
                  </label>
                  <p className="text-gray-900 dark:text-white py-2 capitalize">{user.role}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Member Since
                  </label>
                  <p className="text-gray-900 dark:text-white py-2">
                    {new Date().toLocaleDateString('en-US')}
                  </p>
                </div>
              </div>

              {/* Account Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Account Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white">Change Password</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Update your account password</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div className="font-medium text-gray-900 dark:text-white">Notification Settings</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Manage your email and push notifications</div>
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                    <div className="font-medium text-red-700 dark:text-red-400">Delete Account</div>
                    <div className="text-sm text-red-600 dark:text-red-300">Permanently delete your account and all data</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 