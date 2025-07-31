'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { 
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  CameraIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../components/AnimatedBackground';
import Notification from '../../../components/Notification';
import AdminSidebar from '../../../components/AdminSidebar';

interface Vendor {
  id: string;
  name: string;
  company: string;
  services: string[];
  location: string;
  rating: number;
  projects: number;
  experience: string;
  description: string;
  specialties: string[];
  status: 'active' | 'inactive' | 'pending';
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminVendorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
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
    
    // Mock vendor data - in real app, fetch from API
    const mockVendors: Vendor[] = [
      {
        id: '1',
        name: 'TUBEAR',
        company: 'TUBEAR',
        services: ['virtual-staging', 'photography', 'virtual-tours', '3d-rendering'],
        location: 'Singapore',
        rating: 5.0,
        projects: 50,
        experience: '5+ years',
        description: 'Specializing in virtual staging, digital decluttering, and 3D rendering services. Expert in creating immersive 360° virtual tours and virtual renovation simulations.',
        specialties: ['Virtual Staging', 'Digital Decluttering', '3D Rendering', '360° Virtual Tours', 'Virtual Renovation', 'Professional Photography'],
        status: 'active',
        contact: {
          email: 'hello@tubear.sg',
          phone: '+65 9123 4567',
          address: 'Singapore'
        },
        icon: 'CameraIcon',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        name: 'Chief Media',
        company: 'Chief Media',
        services: ['brand-consulting'],
        location: 'Singapore',
        rating: 5.0,
        projects: 35,
        experience: '8+ years',
        description: 'Realtor brand consulting firm specializing in strategic brand development and marketing solutions for real estate professionals.',
        specialties: ['Brand Strategy', 'Realtor Consulting', 'Marketing Solutions', 'Brand Development'],
        status: 'active',
        contact: {
          email: 'isabelle@chiefmedia.sg',
          phone: '+65 9876 5432',
          address: 'Singapore'
        },
        icon: 'UserGroupIcon',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
      },
      {
        id: '3',
        name: 'LFG Content Co.',
        company: 'LFG Content Co.',
        services: ['videography', 'podcast-production', 'live-streaming'],
        location: 'Singapore',
        rating: 5.0,
        projects: 28,
        experience: '6+ years',
        description: 'Full-service content production company offering podcast production, video content creation, and live streaming services with professional multi-camera setups.',
        specialties: ['Podcast Production', 'Multi-camera Setup', 'Live Editing', 'Cinematic Videos', 'Live Streaming', 'Webinars'],
        status: 'active',
        contact: {
          email: 'hello@lfgcontent.sg',
          phone: '+65 8765 4321',
          address: 'Singapore'
        },
        icon: 'VideoCameraIcon',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-19'
      },
      {
        id: '4',
        name: 'CC Creative',
        company: 'CC Creative',
        services: ['graphic-design', 'web-design', 'content-writing'],
        location: 'Singapore',
        rating: 5.0,
        projects: 45,
        experience: '7+ years',
        description: 'Comprehensive creative services including digital assets, logo design, website development, and content creation for real estate professionals.',
        specialties: ['Digital Assets', 'Logo Design', 'Graphic Design', 'Website Design', 'Content Writing', 'Book Creation'],
        status: 'pending',
        contact: {
          email: 'hello@cccreative.sg',
          phone: '+65 7654 3210',
          address: 'Singapore'
        },
        icon: 'DocumentTextIcon',
        createdAt: '2024-01-25',
        updatedAt: '2024-01-25'
      },
      {
        id: '5',
        name: 'WIN Media Studios',
        company: 'WIN Media Studios',
        services: ['personal-branding', 'content-creation', 'web-design'],
        location: 'Singapore',
        rating: 5.0,
        projects: 32,
        experience: '4+ years',
        description: 'Personal branding content system specialists offering full content creation, distribution, and landing page development with funnel automation.',
        specialties: ['Personal Branding', 'Content Strategy', 'Batch Creation', 'Landing Pages', 'Funnel Automation'],
        status: 'inactive',
        contact: {
          email: 'hello@winmedia.sg',
          phone: '+65 6543 2109',
          address: 'Singapore'
        },
        icon: 'BuildingOfficeIcon',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-22'
      },
    ];
    
    // Load vendors
    setVendors(mockVendors);
  }, [user, loading, router]);

  const handleStatusUpdate = (vendorId: string, newStatus: Vendor['status']) => {
    setVendors(prev => prev.map(vendor => 
      vendor.id === vendorId ? { ...vendor, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : vendor
    ));
    setNotification({
      isVisible: true,
      message: `Vendor status updated to ${newStatus}`,
      type: 'success'
    });
  };

  const handleDeleteVendor = (vendorId: string) => {
    setVendors(prev => prev.filter(vendor => vendor.id !== vendorId));
    setNotification({
      isVisible: true,
      message: 'Vendor deleted successfully',
      type: 'success'
    });
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'CameraIcon': return CameraIcon;
      case 'VideoCameraIcon': return VideoCameraIcon;
      case 'DocumentTextIcon': return DocumentTextIcon;
      case 'UserGroupIcon': return UserGroupIcon;
      case 'BuildingOfficeIcon': return BuildingOfficeIcon;
      default: return BuildingOfficeIcon;
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
        <div className="flex-1">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-[#273f4f]">
                    Vendor Management
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
                Vendor Management
              </h1>
              <p className="mt-2 text-[#273f4f]/80">
                Manage vendor profiles and their service offerings
              </p>
              
              {/* Login Credentials Note */}
              <div className="mt-4 p-3 bg-[#B40101]/10 border border-[#B40101]/20 rounded-lg">
                <h3 className="text-sm font-medium text-[#273f4f] mb-1">Admin Login:</h3>
                <p className="text-xs text-[#273f4f]/80">
                  <strong>Email:</strong> isabelle@chiefmedia.sg | <strong>Password:</strong> admin123
                </p>
              </div>
            </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Vendors</h3>
                  <p className="text-2xl font-bold text-blue-600">{vendors.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <CheckIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {vendors.filter(v => v.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <XMarkIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vendors.filter(v => v.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <XMarkIcon className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Inactive</h3>
                  <p className="text-2xl font-bold text-red-600">
                    {vendors.filter(v => v.status === 'inactive').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

            </div>
          </div>

          {/* Vendors List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Vendors</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Services
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVendors.map((vendor) => {
                    const IconComponent = getIconComponent(vendor.icon);
                    return (
                      <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#f37521]/10 flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-[#f37521]" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {vendor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {vendor.company}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {vendor.services.slice(0, 3).map((service) => (
                              <span
                                key={service}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                              >
                                {service.replace('-', ' ')}
                              </span>
                            ))}
                            {vendor.services.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{vendor.services.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vendor.status)}`}>
                            {vendor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{vendor.contact.email}</div>
                          <div className="text-sm text-gray-500">{vendor.contact.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(vendor.updatedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedVendor(vendor)}
                              className="text-[#03809c] hover:text-[#03809c]/80"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            {vendor.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleStatusUpdate(vendor.id, 'active')}
                                  className="text-green-600 hover:text-green-800"
                                  title="Approve"
                                >
                                  <CheckIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleStatusUpdate(vendor.id, 'inactive')}
                                  className="text-red-600 hover:text-red-800"
                                  title="Reject"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => handleDeleteVendor(vendor.id)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vendor Detail Modal */}
          {selectedVendor && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Vendor Details</h2>
                  <button
                    onClick={() => setSelectedVendor(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Vendor Information</h3>
                    <p className="text-gray-600">{selectedVendor.name}</p>
                    <p className="text-gray-600">{selectedVendor.company}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Description</h3>
                    <p className="text-gray-600">{selectedVendor.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Services</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedVendor.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f2a16d]/10 text-[#f2a16d]"
                        >
                          {service.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Specialties</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedVendor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f37521]/10 text-[#f37521]"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Contact Information</h3>
                    <p className="text-gray-600">Email: {selectedVendor.contact.email}</p>
                    <p className="text-gray-600">Phone: {selectedVendor.contact.phone}</p>
                    <p className="text-gray-600">Address: {selectedVendor.contact.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedVendor.status)}`}>
                      {selectedVendor.status}
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