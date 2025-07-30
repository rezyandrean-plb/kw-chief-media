'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useEnquiries } from '@/lib/enquiries';
import { useRouter } from 'next/navigation';
import { 
  EnvelopeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ClockIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

interface Enquiry {
  id: string;
  vendorId: string;
  vendorName: string;
  realtorId: string;
  realtorName: string;
  realtorEmail: string;
  offerings: string[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  meetingDate?: string;
  meetingTime?: string;
  meetingType?: string;
  notes?: string;
}

export default function EnquiriesPage() {
  const { user, loading } = useAuth();
  const { getEnquiriesByRealtor } = useEnquiries();
  const router = useRouter();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'realtor')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <AnimatedBackground />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B40101] relative z-10"></div>
      </div>
    );
  }

  if (!user || user.role !== 'realtor') {
    return null;
  }

  const userEnquiries = getEnquiriesByRealtor(user.id);
  const filteredEnquiries = userEnquiries.filter(enquiry => {
    if (filter === 'all') return true;
    return enquiry.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ClockIcon;
      case 'approved': return CheckIcon;
      case 'rejected': return XMarkIcon;
      case 'completed': return CheckIcon;
      default: return ClockIcon;
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#FCEBDC]/80 hover:text-[#FCEBDC] mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </button>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#FCEBDC]">
              My Enquiries
            </h1>
            <p className="mt-2 text-[#FCEBDC]/80">
              Track your vendor connection requests and their status
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6">
              <div className="flex items-center">
                <EnvelopeIcon className="h-8 w-8 text-[#03809c]" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#FCEBDC]">Total Enquiries</h3>
                  <p className="text-2xl font-bold text-[#03809c]">{userEnquiries.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-400" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#FCEBDC]">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-400">
                    {userEnquiries.filter(e => e.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6">
              <div className="flex items-center">
                <CheckIcon className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#FCEBDC]">Approved</h3>
                  <p className="text-2xl font-bold text-green-400">
                    {userEnquiries.filter(e => e.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-400" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-[#FCEBDC]">Completed</h3>
                  <p className="text-2xl font-bold text-purple-400">
                    {userEnquiries.filter(e => e.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'all'
                    ? 'bg-[#B40101] text-white'
                    : 'bg-[#273F4F]/20 text-[#FCEBDC] hover:bg-[#273F4F]/40'
                }`}
              >
                All Enquiries
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-[#273F4F]/20 text-[#FCEBDC] hover:bg-[#273F4F]/40'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-[#273F4F]/20 text-[#FCEBDC] hover:bg-[#273F4F]/40'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#273F4F]/20 text-[#FCEBDC] hover:bg-[#273F4F]/40'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="bg-black border border-[#273F4F]/20 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-[#273F4F]/20">
              <h2 className="text-lg font-semibold text-[#FCEBDC]">Enquiries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#273F4F]/20">
                <thead className="bg-[#273F4F]/10">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FCEBDC]/60 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FCEBDC]/60 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FCEBDC]/60 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FCEBDC]/60 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#FCEBDC]/60 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black divide-y divide-[#273F4F]/20">
                  {filteredEnquiries.map((enquiry) => {
                    const StatusIcon = getStatusIcon(enquiry.status);
                    return (
                      <tr key={enquiry.id} className="hover:bg-[#273F4F]/10">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#f37521]/10 flex items-center justify-center">
                                <BuildingOfficeIcon className="h-5 w-5 text-[#f37521]" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#FCEBDC]">
                                {enquiry.vendorName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {enquiry.offerings.map((offering) => (
                              <span
                                key={offering}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                              >
                                {offering.replace('-', ' ')}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {enquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#FCEBDC]/60">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="text-[#03809c] hover:text-[#03809c]/80"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enquiry Detail Modal */}
          {selectedEnquiry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-[#FCEBDC]">Enquiry Details</h2>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-[#FCEBDC]/40 hover:text-[#FCEBDC]/60"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-[#FCEBDC]">Vendor</h3>
                    <p className="text-[#FCEBDC]/80">{selectedEnquiry.vendorName}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-[#FCEBDC]">Requested Services</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedEnquiry.offerings.map((offering) => (
                        <span
                          key={offering}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                        >
                          {offering.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedEnquiry.notes && (
                    <div>
                      <h3 className="font-medium text-[#FCEBDC]">Notes</h3>
                      <p className="text-[#FCEBDC]/80">{selectedEnquiry.notes}</p>
                    </div>
                  )}
                  
                  {selectedEnquiry.meetingDate && (
                    <div>
                      <h3 className="font-medium text-[#FCEBDC]">Meeting Details</h3>
                      <p className="text-[#FCEBDC]/80">
                        {selectedEnquiry.meetingDate} at {selectedEnquiry.meetingTime}
                      </p>
                      <p className="text-[#FCEBDC]/80 capitalize">
                        Type: {selectedEnquiry.meetingType}
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-[#FCEBDC]">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedEnquiry.status)}`}>
                      {selectedEnquiry.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 