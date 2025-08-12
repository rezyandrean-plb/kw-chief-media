'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isKWRealtor, setIsKWRealtor] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  
  const { login, loginWithEmailCode, sendVerificationCode, getRedirectPath } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isKWRealtor && codeSent) {
        // Verify email code
        const success = await loginWithEmailCode(email, verificationCode);
        if (success) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            const redirectPath = getRedirectPath(user);
            router.push(redirectPath);
          } else {
            router.push('/vendors');
          }
        }
      } else {
        // Regular login
        const success = await login(email, password);
        if (success) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            const redirectPath = getRedirectPath(user);
            router.push(redirectPath);
          } else {
            router.push('/admin');
          }
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
    const isAllowedDomain = allowedDomains.some(domain => email.endsWith(domain));
    
    if (!email || !isAllowedDomain) {
      setError('Please enter a valid KW Singapore or Property Lim Brothers email address');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendVerificationCode(email);
      setCodeSent(true);
      setSuccess('Verification code sent to your email!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send verification code';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
    const isAllowedDomain = allowedDomains.some(domain => emailValue.endsWith(domain));
    setIsKWRealtor(isAllowedDomain);
    setCodeSent(false);
    setVerificationCode('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <AnimatedBackground />
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#273f4f]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-[#273f4f]/80">
            Or{' '}
            <Link href="/signup" className="font-medium text-[#f37521] hover:text-[#e0651a]">
              create a new account
            </Link>
          </p>
          
          {/* KW Singapore and Property Lim Brothers Email Code Authentication Section */}
          {isKWRealtor && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Email Code Authentication
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Sign in with your @kwsingapore.com or @propertylimbrothers.com email using a verification code.
              </p>
              
              {!codeSent ? (
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={loading || !email}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Verification Code'}
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-blue-900">
                      Verification Code
                    </label>
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !verificationCode}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Resend Code
                  </button>
                </div>
              )}
            </div>
          )}
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#273f4f]/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#273f4f]/60">Or continue with</span>
            </div>
          </div>
          
          {/* Login Credentials Note */}
          <div className="p-4 bg-[#f37521]/10 border border-[#f37521]/20 rounded-lg">
            <h3 className="text-sm font-medium text-[#273f4f] mb-2">Demo Login Credentials:</h3>
            <div className="space-y-1 text-xs text-[#273f4f]/80">
              <p><strong>Admin:</strong> isabelle@chiefmedia.sg / admin123</p>
              <p><strong>KW Realtor:</strong> realtor@kwsingapore.com (use email code)</p>
              <p><strong>Property Lim Brothers:</strong> realtor@propertylimbrothers.com (use email code)</p>
            </div>
          </div>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-t-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] focus:z-10 sm:text-sm bg-white"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {!isKWRealtor && (
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border border-[#273f4f]/20 placeholder-[#273f4f]/60 text-[#273f4f] rounded-b-md focus:outline-none focus:ring-[#f37521] focus:border-[#f37521] focus:z-10 sm:text-sm bg-white"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f37521] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : (isKWRealtor && codeSent ? 'Verify Code' : 'Sign in')}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-[#f37521] hover:text-[#e0651a]">
                Forgot your password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 