'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getAuthHeaders } from '@/lib/api-auth';
import { 
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon
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
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface VendorFormData {
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
  image: string;
}

const availableServices = [
  'virtual-staging',
  'photography',
  'virtual-tours',
  '3d-rendering',
  'brand-consulting',
  'videography',
  'podcast-production',
  'live-streaming',
  'graphic-design',
  'web-design',
  'content-writing',
  'personal-branding',
  'content-creation'
];

export default function AdminVendorsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [formData, setFormData] = useState<VendorFormData>({
    name: '',
    company: '',
    services: [],
    location: '',
    rating: 5.0,
    projects: 0,
    experience: '',
    description: '',
    specialties: [],
    status: 'pending',
    contact: {
      email: '',
      phone: '',
      address: ''
    },
    image: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newSpecialty, setNewSpecialty] = useState('');
  const [newService, setNewService] = useState('');
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showSpecialtySuggestions, setShowSpecialtySuggestions] = useState(false);
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
    
    if (user && user.role === 'admin') {
      fetchVendors();
    }
  }, [user, loading, router]);

  const fetchVendors = async () => {
    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch('/api/admin/vendors', {
        headers: {
          'Content-Type': 'application/json',
          ...(authHeaders as Record<string, string>)
        }
      });
      
      if (response.ok) {
        const result = await response.json();
        setVendors(result.data);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch vendors:', errorData);
        setNotification({
          isVisible: true,
          message: errorData.error || 'Failed to fetch vendors',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setNotification({
        isVisible: true,
        message: 'Error fetching vendors',
        type: 'error'
      });
    }
  };

  const handleStatusUpdate = async (vendorId: string, newStatus: Vendor['status']) => {
    try {
      const vendor = vendors.find(v => v.id === vendorId);
      if (!vendor) return;

      const authHeaders = getAuthHeaders();
      const response = await fetch(`/api/admin/vendors/${vendorId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeaders as Record<string, string>)
        },
        body: JSON.stringify({
          ...vendor,
          status: newStatus
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setVendors(prev => prev.map(v => v.id === vendorId ? result.data : v));
        setNotification({
          isVisible: true,
          message: `Vendor status updated to ${newStatus}`,
          type: 'success'
        });
      } else {
        const error = await response.json();
        setNotification({
          isVisible: true,
          message: error.error || 'Failed to update vendor status',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating vendor status:', error);
      setNotification({
        isVisible: true,
        message: 'Error updating vendor status',
        type: 'error'
      });
    }
  };

  const handleDeleteVendor = (vendor: Vendor) => {
    setVendorToDelete(vendor);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteVendor = async () => {
    if (!vendorToDelete) return;

    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch(`/api/admin/vendors/${vendorToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(authHeaders as Record<string, string>)
        }
      });

      if (response.ok) {
        setVendors(prev => prev.filter(vendor => vendor.id !== vendorToDelete.id));
        setNotification({
          isVisible: true,
          message: 'Vendor deleted successfully',
          type: 'success'
        });
      } else {
        const error = await response.json();
        setNotification({
          isVisible: true,
          message: error.error || 'Failed to delete vendor',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting vendor:', error);
      setNotification({
        isVisible: true,
        message: 'Error deleting vendor',
        type: 'error'
      });
    } finally {
      setShowDeleteConfirmation(false);
      setVendorToDelete(null);
    }
  };

  const cancelDeleteVendor = () => {
    setShowDeleteConfirmation(false);
    setVendorToDelete(null);
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

  const resetForm = () => {
    setFormData({
      name: '',
      company: '',
      services: [],
      location: '',
      rating: 5.0,
      projects: 0,
      experience: '',
      description: '',
      specialties: [],
      status: 'pending',
      contact: {
        email: '',
        phone: '',
        address: ''
      },
      image: ''
    });
    setFormErrors({});
    setNewSpecialty('');
    setNewService('');
    setSelectedLogoFile(null);
    setLogoPreview('');
    setIsDragOver(false);
  };

  const openCreateForm = () => {
    setIsEditing(false);
    setEditingVendorId(null);
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (vendor: Vendor) => {
    setIsEditing(true);
    setEditingVendorId(vendor.id);
    setFormData({
      name: vendor.name,
      company: vendor.company,
      services: vendor.services,
      location: vendor.location,
      rating: vendor.rating,
      projects: vendor.projects,
      experience: vendor.experience,
      description: vendor.description,
      specialties: vendor.specialties,
      status: vendor.status,
      contact: vendor.contact,
      image: vendor.image
    });
    setFormErrors({});
    setSelectedLogoFile(null);
    setLogoPreview(vendor.image);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingVendorId(null);
    resetForm();
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.contact.email.trim()) errors.email = 'Email is required';
    if (!formData.contact.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.contact.address.trim()) errors.address = 'Address is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const authHeaders = getAuthHeaders();
      
      if (isEditing && editingVendorId) {
        // Update existing vendor
        const response = await fetch(`/api/admin/vendors/${editingVendorId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(authHeaders as Record<string, string>)
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const result = await response.json();
          setVendors(prev => prev.map(vendor => 
            vendor.id === editingVendorId ? result.data : vendor
          ));
          setNotification({
            isVisible: true,
            message: 'Vendor updated successfully',
            type: 'success'
          });
        } else {
          const error = await response.json();
          setNotification({
            isVisible: true,
            message: error.error || 'Failed to update vendor',
            type: 'error'
          });
        }
      } else {
        // Create new vendor
        const response = await fetch('/api/admin/vendors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(authHeaders as Record<string, string>)
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          const result = await response.json();
          setVendors(prev => [...prev, result.data]);
          setNotification({
            isVisible: true,
            message: 'Vendor created successfully',
            type: 'success'
          });
        } else {
          const error = await response.json();
          setNotification({
            isVisible: true,
            message: error.error || 'Failed to create vendor',
            type: 'error'
          });
        }
      }

      closeForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setNotification({
        isVisible: true,
        message: 'Error submitting form',
        type: 'error'
      });
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
    
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };



  const addSpecialty = () => {
    if (newSpecialty.trim()) {
      // Split by comma and handle multiple specialties
      const specialtiesToAdd = newSpecialty
        .split(',')
        .map(specialty => specialty.trim())
        .filter(specialty => specialty && !formData.specialties.includes(specialty));
      
      if (specialtiesToAdd.length > 0) {
        setFormData(prev => ({
          ...prev,
          specialties: [...prev.specialties, ...specialtiesToAdd]
        }));
      }
      
      setNewSpecialty('');
      setShowSpecialtySuggestions(false);
      
      if (formErrors.specialties) {
        setFormErrors(prev => ({
          ...prev,
          specialties: ''
        }));
      }
    }
  };

  const selectSpecialtySuggestion = (specialty: string) => {
    if (!formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
    setNewSpecialty('');
    setShowSpecialtySuggestions(false);
  };

  const getSpecialtySuggestions = () => {
    if (!newSpecialty.trim()) {
      // Show all available specialties when input is empty
      const allSpecialties = vendors.flatMap(vendor => vendor.specialties);
      const uniqueSpecialties = [...new Set(allSpecialties)];
      return uniqueSpecialties.filter(specialty => !formData.specialties.includes(specialty));
    }
    const input = newSpecialty.toLowerCase();
    // Get all specialties from existing vendors as suggestions
    const allSpecialties = vendors.flatMap(vendor => vendor.specialties);
    const uniqueSpecialties = [...new Set(allSpecialties)];
    return uniqueSpecialties.filter(specialty => 
      specialty.toLowerCase().includes(input) && 
      !formData.specialties.includes(specialty)
    );
  };

  const addService = () => {
    if (newService.trim()) {
      // Split by comma and handle multiple services
      const servicesToAdd = newService
        .split(',')
        .map(service => service.trim())
        .filter(service => service && !formData.services.includes(service));
      
      if (servicesToAdd.length > 0) {
        setFormData(prev => ({
          ...prev,
          services: [...prev.services, ...servicesToAdd]
        }));
      }
      
      setNewService('');
      setShowServiceSuggestions(false);
      
      if (formErrors.services) {
        setFormErrors(prev => ({
          ...prev,
          services: ''
        }));
      }
    }
  };

  const selectServiceSuggestion = (service: string) => {
    if (!formData.services.includes(service)) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    }
    setNewService('');
    setShowServiceSuggestions(false);
  };

  const getServiceSuggestions = () => {
    if (!newService.trim()) {
      // Show all available services when input is empty
      return availableServices.filter(service => !formData.services.includes(service));
    }
    const input = newService.toLowerCase();
    return availableServices.filter(service => 
      service.toLowerCase().includes(input) && 
      !formData.services.includes(service)
    );
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  const removeService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const removeLogoFile = () => {
    setSelectedLogoFile(null);
    setLogoPreview('');
    if (formData.image) {
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileSelection(file);
    }
  };

  const handleFileSelection = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setNotification({
        isVisible: true,
        message: 'Please select an image file',
        type: 'error'
      });
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setNotification({
        isVisible: true,
        message: 'File size must be less than 5MB',
        type: 'error'
      });
      return;
    }

    setSelectedLogoFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Clear URL field when file is selected
    setFormData(prev => ({ ...prev, image: '' }));
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
        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
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

          <div className="flex-1 p-6 overflow-y-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#273f4f]">
                    Vendor Management
                  </h1>
                  <p className="mt-2 text-[#273f4f]/80">
                    Manage vendor profiles and their service offerings
                  </p>
                </div>
                <button
                  onClick={openCreateForm}
                  className="bg-[#B40101] hover:bg-[#e0651a] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Vendor</span>
                </button>
              </div>
              
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
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                    <input
                      type="text"
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] text-black"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] text-black"
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
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-[#f37521]/10 flex items-center justify-center overflow-hidden">
                                {vendor.image && vendor.image.trim() !== '' ? (
                                  <Image
                                    src={vendor.image}
                                    alt={`${vendor.name} logo`}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover rounded-full"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      const parent = target.parentElement;
                                      if (parent) {
                                        const fallbackIcon = document.createElement('div');
                                        fallbackIcon.className = 'w-full h-full flex items-center justify-center';
                                        fallbackIcon.innerHTML = '<svg class="h-5 w-5 text-[#f37521]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>';
                                        parent.appendChild(fallbackIcon);
                                      }
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <svg className="h-5 w-5 text-[#f37521]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                  </div>
                                )}
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vendor.contact.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vendor.updatedAt}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setSelectedVendor(vendor)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openEditForm(vendor)}
                              className="text-yellow-600 hover:text-yellow-900"
                              title="Edit Vendor"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(vendor.id, vendor.status === 'active' ? 'inactive' : 'active')}
                              className="text-green-600 hover:text-green-900"
                              title="Toggle Status"
                            >
                              {vendor.status === 'active' ? <XMarkIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteVendor(vendor)}
                              className="text-red-600 hover:text-red-800"
                              title="Delete"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Vendor Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isEditing ? 'Edit Vendor' : 'Create New Vendor'}
                  </h2>
                  <button
                    onClick={closeForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Vendor Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter vendor name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:ring-[#B40101] focus:border-[#B40101] ${
                          formErrors.company ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter company name"
                      />
                      {formErrors.company && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.company}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                          formErrors.location ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter location"
                      />
                      {formErrors.location && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.location}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                        formErrors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter vendor description"
                    />
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Services
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.services.map((service) => (
                        <span
                          key={service}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f2a16d]/10 text-[#f2a16d]"
                        >
                          {service}
                          <button
                            type="button"
                            onClick={() => removeService(service)}
                            className="ml-2 text-[#f2a16d] hover:text-[#B40101]"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={newService}
                        onChange={(e) => {
                          setNewService(e.target.value);
                          setShowServiceSuggestions(true);
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addService())}
                        onFocus={() => setShowServiceSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowServiceSuggestions(false), 200)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Add service (separate multiple with commas)"
                      />
                      
                      {/* Service Suggestions Dropdown */}
                      {showServiceSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {getServiceSuggestions().length > 0 ? (
                            getServiceSuggestions().map((service) => (
                              <button
                                key={service}
                                type="button"
                                onClick={() => selectServiceSuggestion(service)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-black"
                              >
                                {service.replace('-', ' ')}
                              </button>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => addService()}
                              className="w-full text-left px-3 py-2 text-gray-500 hover:bg-gray-100"
                            >
                              Add &apos;{newService}&apos;
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.services && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.services}</p>
                    )}
                  </div>

                  {/* Specialties */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specialties
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f37521]/10 text-[#f37521]"
                        >
                          {specialty}
                          <button
                            type="button"
                            onClick={() => removeSpecialty(specialty)}
                            className="ml-2 text-[#f37521] hover:text-[#B40101]"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={newSpecialty}
                        onChange={(e) => {
                          setNewSpecialty(e.target.value);
                          setShowSpecialtySuggestions(true);
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialty())}
                        onFocus={() => setShowSpecialtySuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSpecialtySuggestions(false), 200)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Add specialty (separate multiple with commas)"
                      />
                      
                      {/* Specialty Suggestions Dropdown */}
                      {showSpecialtySuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {getSpecialtySuggestions().length > 0 ? (
                            getSpecialtySuggestions().map((specialty) => (
                              <button
                                key={specialty}
                                type="button"
                                onClick={() => selectSpecialtySuggestion(specialty)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-black"
                              >
                                {specialty}
                              </button>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => addSpecialty()}
                              className="w-full text-left px-3 py-2 text-gray-500 hover:bg-gray-100"
                            >
                              Add &apos;{newSpecialty}&apos;
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    {formErrors.specialties && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.specialties}</p>
                    )}
                  </div>



                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.contact.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                            formErrors.email ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter email address"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={formData.contact.phone}
                          onChange={(e) => handleContactChange('phone', e.target.value)}
                          className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter phone number"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          value={formData.contact.address}
                          onChange={(e) => handleContactChange('address', e.target.value)}
                          className={`block w-full border rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                            formErrors.address ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter address"
                        />
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                        )}
                      </div>
                    </div>
                  </div>

                                    {/* Logo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Image
                    </label>
                    
                    {/* File Upload Area */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-2">
                        Upload Logo File
                      </label>
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          isDragOver 
                            ? 'border-[#B40101] bg-[#B40101]/5' 
                            : 'border-gray-300 hover:border-[#B40101] hover:bg-gray-50'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        
                        {selectedLogoFile ? (
                          <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 rounded-lg border border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                              <img
                                src={logoPreview}
                                alt="Logo preview"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {selectedLogoFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Size: {(selectedLogoFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={removeLogoFile}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium text-[#B40101] hover:text-[#e0651a]">
                                  Click to upload
                                </span>{' '}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG, GIF, WebP up to 5MB
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* URL Input */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-2">
                        Or Enter Logo URL
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => {
                          handleInputChange('image', e.target.value);
                          if (e.target.value) {
                            setSelectedLogoFile(null);
                            setLogoPreview(e.target.value);
                          }
                        }}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Enter logo image URL"
                      />
                    </div>

                    {/* Logo Preview */}
                    {(logoPreview || formData.image) && (
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-2">
                          Logo Preview
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg border border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                            {(logoPreview || formData.image) && (logoPreview || formData.image).trim() !== '' ? (
                              <img
                                src={logoPreview || formData.image}
                                alt="Logo preview"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const parent = target.parentElement;
                                  if (parent) {
                                    parent.innerHTML = '<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
                                  }
                                }}
                              />
                            ) : (
                              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">
                              {selectedLogoFile ? selectedLogoFile.name : 'URL Image'}
                            </p>
                            {selectedLogoFile && (
                              <p className="text-xs text-gray-500">
                                Size: {(selectedLogoFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#B40101] hover:bg-[#e0651a] text-white rounded-md transition-colors"
                    >
                      {isEditing ? 'Update Vendor' : 'Create Vendor'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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

          {/* Delete Confirmation Modal */}
          {showDeleteConfirmation && vendorToDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <TrashIcon className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Delete Vendor</h3>
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-700">
                    Are you sure you want to delete <span className="font-semibold">{vendorToDelete.name}</span>?
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    This will permanently remove the vendor and all associated data.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelDeleteVendor}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteVendor}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors font-medium"
                  >
                    Delete Vendor
                  </button>
                </div>
              </div>
            </div>
          )}
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