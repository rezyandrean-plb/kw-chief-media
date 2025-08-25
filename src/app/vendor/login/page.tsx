'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../components/AnimatedBackground';

export default function VendorLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, getRedirectPath } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          // Check if the user is actually a vendor
          if (user.role === 'vendor') {
            const redirectPath = getRedirectPath(user);
            router.push(redirectPath);
          } else {
            setError('This login is for vendors only. Please use the main login page.');
            // Clear the user from localStorage if they're not a vendor
            localStorage.removeItem('user');
          }
        } else {
          router.push('/vendor/dashboard');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Vendor Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Sign in to your vendor account
          </p>
          
          {/* Vendor-specific info */}
          <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">Vendor Access:</h3>
            <div className="space-y-1 text-xs text-gray-300">
              <p>• Access your vendor dashboard</p>
              <p>• Manage your gigs and projects</p>
              <p>• View earnings and messages</p>
            </div>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-gray-800 shadow-sm transition-colors duration-200"
                placeholder="Enter your vendor email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 pr-12 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-gray-800 shadow-sm transition-colors duration-200"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f37521] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in as Vendor'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[#f37521] hover:text-[#e0651a]">
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm">
              <Link href="/login" className="font-medium text-[#f37521] hover:text-[#e0651a]">
                Back to main login
              </Link>
            </div>
          </div>
        </form>

        {/* Vendor application link */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            Don&apos;t have a vendor account?{' '}
            <Link href="/vendor-application" className="font-medium text-[#f37521] hover:text-[#e0651a]">
              Apply to become a vendor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
