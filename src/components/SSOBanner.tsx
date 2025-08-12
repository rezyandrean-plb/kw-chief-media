'use client';

import React from 'react';
import Link from 'next/link';

export default function SSOBanner() {
  return (
    <div className="bg-gradient-to-r from-[#03809c]/10 to-[#B40101]/10 border border-[#03809c]/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome to Chief Media
          </h2>
          <p className="text-white/90 mb-4">
            Sign in with your @kwsingapore.com or @propertylimbrothers.com email for seamless access to vendor connections and exclusive services.
          </p>
          <div className="flex items-center space-x-4 text-xs text-[#273f4f]/70">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Secure Email Authentication</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>No Password Required</span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f37521] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
} 