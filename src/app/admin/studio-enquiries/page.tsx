'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useStudioEnquiries } from '@/lib/studio-enquiries';
import { useRouter } from 'next/navigation';
import { 
  EnvelopeIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../components/AnimatedBackground';
import Notification from '../../../components/Notification';
import AdminSidebar from '../../../components/AdminSidebar';

interface StudioEnquiry {
  id: string;
  studioName: string;
  studioAddress: string;
  realtorName: string;
  realtorEmail: string;
  realtorPhone: string;
  selectedDate: string;
  selectedTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  notes?: string;
}

export default function AdminStudioEnquiriesPage() {
  const { user, loading } = useAuth();
  const { studioEnquiries, updateStudioEnquiryStatus } = useStudioEnquiries();
  const router = useRouter();
  const [selectedEnquiry, setSelectedEnquiry] = useState<StudioEnquiry | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleStatusUpdate = (enquiryId: string, newStatus: StudioEnquiry['status']) => {
    updateStudioEnquiryStatus(enquiryId, newStatus);
    setNotification({
      isVisible: true,
      message: `Enquiry status updated to ${newStatus}`,
      type: 'success'
    });
  };

  const filteredEnquiries = studioEnquiries.filter(enquiry => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
        <AnimatedBackground />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 relative z-10"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="flex relative z-10">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-[#273f4f]">
                    Studio Enquiries Management
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Welcome, {user?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.push('/admin')}
                    className="text-sm text-[#B40101] hover:text-[#e0651a] transition"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#273f4f]">
                Studio Enquiries Management
              </h1>
              <p className="mt-2 text-[#273f4f]/80">
                Manage and track studio booking enquiries from KW Singapore realtors.
              </p>
            </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <EnvelopeIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Enquiries</h3>
                  <p className="text-2xl font-bold text-blue-600">{studioEnquiries.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {studioEnquiries.filter(e => e.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {studioEnquiries.filter(e => e.status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {studioEnquiries.filter(e => e.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'all'
                    ? 'bg-[#B40101] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Enquiries
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 rounded-md font-medium transition ${
                  filter === 'completed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Enquiries List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Studio Enquiries</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Realtor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Studio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiryItem) => {
                    const StatusIcon = getStatusIcon(enquiryItem.status);
                    return (
                      <tr key={enquiryItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#03809c]/10 flex items-center justify-center">
                                <UserIcon className="h-5 w-5 text-[#03809c]" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {enquiryItem.realtorName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {enquiryItem.realtorEmail}
                              </div>
                              <div className="text-sm text-gray-500">
                                {enquiryItem.realtorPhone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#f37521]/10 flex items-center justify-center">
                                <BuildingOfficeIcon className="h-5 w-5 text-[#f37521]" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {enquiryItem.studioName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {enquiryItem.studioAddress}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-gray-400" />
                              {enquiryItem.selectedDate}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <ClockIcon className="h-4 w-4 text-gray-400" />
                              {enquiryItem.selectedTime}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(enquiryItem.status)}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {enquiryItem.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(enquiryItem.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedEnquiry(enquiryItem)}
                              className="text-[#03809c] hover:text-[#03809c]/80"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            {enquiryItem.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(enquiryItem.id, 'approved')}
                                  className="text-green-600 hover:text-green-800"
                                  title="Approve"
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(enquiryItem.id, 'rejected')}
                                  className="text-red-600 hover:text-red-800"
                                  title="Reject"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            {enquiryItem.status === 'approved' && (
                              <button
                                onClick={() => handleStatusUpdate(enquiryItem.id, 'completed')}
                                className="text-blue-600 hover:text-blue-800"
                                title="Mark as Completed"
                              >
                                <CheckIcon className="h-4 w-4" />
                              </button>
                            )}
                          </div>
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
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Studio Enquiry Details</h2>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Realtor Information</h3>
                    <p className="text-gray-600">{selectedEnquiry.realtorName}</p>
                    <p className="text-gray-600">{selectedEnquiry.realtorEmail}</p>
                    <p className="text-gray-600">{selectedEnquiry.realtorPhone}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Studio</h3>
                    <p className="text-gray-600">{selectedEnquiry.studioName}</p>
                    <p className="text-gray-600">{selectedEnquiry.studioAddress}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Booking Details</h3>
                    <p className="text-gray-600">Date: {selectedEnquiry.selectedDate}</p>
                    <p className="text-gray-600">Time: {selectedEnquiry.selectedTime}</p>
                  </div>
                  
                  {selectedEnquiry.notes && (
                    <div>
                      <h3 className="font-medium text-gray-900">Notes</h3>
                      <p className="text-gray-600">{selectedEnquiry.notes}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Status</h3>
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

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        duration={3000}
      />
    </div>
  );
} 