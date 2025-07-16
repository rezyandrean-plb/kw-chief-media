'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'client' as 'vendor' | 'realtor' | 'client',
    company: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        email: formData.email,
        name: formData.name,
        role: formData.role,
        company: formData.company || undefined,
        phone: formData.phone || undefined,
      };

      const success = await signup(userData);
      if (success) {
        router.push('/dashboard');
      } else {
        setError('Failed to create account');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#273f4f] relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#273f4f]">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-[#273f4f]/80">
            Or{' '}
            <Link href="/login" className="font-medium text-[#f37521] hover:text-[#e0651a]">
              sign in to your existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#273f4f]">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#273f4f]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-[#273f4f]">
                I am a
              </label>
              <select
                id="role"
                name="role"
                required
                className="mt-1 block w-full px-3 py-2 border border-[#273f4f]/20 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="client">Client</option>
                <option value="vendor">Vendor</option>
                <option value="realtor">Realtor</option>
              </select>
            </div>

            {(formData.role === 'vendor' || formData.role === 'realtor') && (
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#273f4f]">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            )}

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#273f4f]">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#273f4f]">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-[#273f4f]/60" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-[#273f4f]/60" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#273f4f]">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  className="mt-1 appearance-none relative block w-full px-3 py-2 pr-10 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] sm:text-sm bg-white"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-[#273f4f]/60" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-[#273f4f]/60" />
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
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 