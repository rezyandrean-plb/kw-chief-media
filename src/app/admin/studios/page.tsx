'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  TrashIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../components/AnimatedBackground';
import Notification from '../../../components/Notification';
import AdminSidebar from '../../../components/AdminSidebar';
import OperatingHoursPicker from '../../../components/OperatingHoursPicker';

interface Studio {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  status: 'active' | 'inactive' | 'maintenance';
  equipment: string[];
  operatingHours: string;
  contact: {
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface StudioFormData {
  name: string;
  address: string;
  description: string;
  image: string;
  status: 'active' | 'inactive' | 'maintenance';
  equipment: string[];
  operatingHours: string;
  contact: {
    email: string;
    phone: string;
  };
}

export default function AdminStudiosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [studios, setStudios] = useState<Studio[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudioId, setEditingStudioId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudioFormData>({
    name: '',
    address: '',
    description: '',
    image: '',
    status: 'active',
    equipment: [],
    operatingHours: '',
    contact: {
      email: '',
      phone: ''
    }
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newEquipment, setNewEquipment] = useState('');
  const [showEquipmentSuggestions, setShowEquipmentSuggestions] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
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

  const availableEquipment = [
    'Professional Cameras',
    'Lighting Equipment',
    'Audio Equipment',
    'Green Screen',
    'Video Cameras',
    'Drone Equipment',
    'Editing Suite',
    'Sound System',
    'Backdrop Stands',
    'Reflectors',
    'Tripods',
    'Microphones',
    'Monitors',
    'Props',
    'Furniture'
  ];

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
    
    // Mock studio data based on the studio page
    const mockStudios: Studio[] = [
      {
        id: '1',
        name: 'North Studio',
        address: '5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760',
        description: 'High-quality property photography with professional lighting and state-of-the-art equipment.',
        image: '/images/studio/north-studio.webp',
        status: 'active',
        equipment: ['Professional Cameras', 'Lighting Equipment', 'Audio Equipment', 'Green Screen'],
        operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
        contact: {
          email: 'north@chiefmedia.sg',
          phone: '+65 9123 4567'
        },
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20'
      },
      {
        id: '2',
        name: 'East Studio',
        address: '47 Kallang Pudding Road #09-13',
        description: 'Cinematic property videos with drone footage and professional video production services.',
        image: '/images/studio/east-studio.webp',
        status: 'active',
        equipment: ['Video Cameras', 'Drone Equipment', 'Editing Suite', 'Sound System'],
        operatingHours: 'Monday - Friday: 9:00 AM - 6:00 PM',
        contact: {
          email: 'east@chiefmedia.sg',
          phone: '+65 9876 5432'
        },
        createdAt: '2024-01-10',
        updatedAt: '2024-01-18'
      }
    ];
    
    setStudios(mockStudios);
  }, [user, loading, router]);

  const handleStatusUpdate = (studioId: string, newStatus: Studio['status']) => {
    setStudios(prev => prev.map(studio => 
      studio.id === studioId ? { ...studio, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : studio
    ));
    setNotification({
      isVisible: true,
      message: `Studio status updated to ${newStatus}`,
      type: 'success'
    });
  };

  const handleDeleteStudio = (studioId: string) => {
    setStudios(prev => prev.filter(studio => studio.id !== studioId));
    setNotification({
      isVisible: true,
      message: 'Studio deleted successfully',
      type: 'success'
    });
  };

  const filteredStudios = studios.filter(studio => {
    const matchesSearch = studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studio.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         studio.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || studio.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      description: '',
      image: '',
      status: 'active',
      equipment: [],
      operatingHours: '',
      contact: {
        email: '',
        phone: ''
      }
    });
    setFormErrors({});
    setNewEquipment('');
    setSelectedImageFile(null);
    setImagePreview('');
    setIsDragOver(false);
  };

  const openCreateForm = () => {
    setIsEditing(false);
    setEditingStudioId(null);
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (studio: Studio) => {
    setIsEditing(true);
    setEditingStudioId(studio.id);
    setFormData({
      name: studio.name,
      address: studio.address,
      description: studio.description,
      image: studio.image,
      status: studio.status,
      equipment: studio.equipment,
      operatingHours: studio.operatingHours,
      contact: studio.contact
    });
    setFormErrors({});
    setSelectedImageFile(null);
    setImagePreview(studio.image);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditing(false);
    setEditingStudioId(null);
    resetForm();
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.contact.email.trim()) errors.email = 'Email is required';
    if (!formData.contact.phone.trim()) errors.phone = 'Phone is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isEditing && editingStudioId) {
      setStudios(prev => prev.map(studio => 
        studio.id === editingStudioId 
          ? { ...studio, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
          : studio
      ));
      setNotification({
        isVisible: true,
        message: 'Studio updated successfully',
        type: 'success'
      });
    } else {
      const newStudio: Studio = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setStudios(prev => [...prev, newStudio]);
      setNotification({
        isVisible: true,
        message: 'Studio created successfully',
        type: 'success'
      });
    }

    closeForm();
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
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



  const removeEquipment = (equipment: string) => {
    setFormData(prev => ({
      ...prev,
      equipment: prev.equipment.filter(e => e !== equipment)
    }));
  };

  const addEquipment = () => {
    if (newEquipment.trim()) {
      const equipmentToAdd = newEquipment
        .split(',')
        .map(item => item.trim())
        .filter(item => item && !formData.equipment.includes(item));
      
      if (equipmentToAdd.length > 0) {
        setFormData(prev => ({
          ...prev,
          equipment: [...prev.equipment, ...equipmentToAdd]
        }));
      }
      
      setNewEquipment('');
      setShowEquipmentSuggestions(false);
    }
  };

  const selectEquipmentSuggestion = (equipment: string) => {
    if (!formData.equipment.includes(equipment)) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipment]
      }));
    }
    setNewEquipment('');
    setShowEquipmentSuggestions(false);
  };

  const getEquipmentSuggestions = () => {
    if (!newEquipment.trim()) {
      return availableEquipment.filter(equipment => !formData.equipment.includes(equipment));
    }
    const input = newEquipment.toLowerCase();
    return availableEquipment.filter(equipment => 
      equipment.toLowerCase().includes(input) && 
      !formData.equipment.includes(equipment)
    );
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const removeImageFile = () => {
    setSelectedImageFile(null);
    setImagePreview('');
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

    setSelectedImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
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
        <AdminSidebar />

        <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
          <div className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-[#273f4f]">
                    Studio Management
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
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-[#273f4f]">
                    Studio Management
                  </h1>
                  <p className="mt-2 text-[#273f4f]/80">
                    Manage studio facilities and their equipment
                  </p>
                </div>
                <button
                  onClick={openCreateForm}
                  className="bg-[#B40101] hover:bg-[#e0651a] text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Studio</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <VideoCameraIcon className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Total Studios</h3>
                    <p className="text-2xl font-bold text-blue-600">{studios.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <CheckIcon className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Active</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {studios.filter(s => s.status === 'active').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <XMarkIcon className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                      {studios.filter(s => s.status === 'maintenance').length}
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
                      {studios.filter(s => s.status === 'inactive').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search studios by name, address, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] text-sm"
                    />
                  </div>
                </div>
                <div className="lg:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Studios</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Studio
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
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
                    {filteredStudios.map((studio) => (
                      <tr key={studio.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 rounded-lg bg-[#f37521]/10 flex items-center justify-center overflow-hidden">
                                <Image
                                  src={studio.image}
                                  alt={`${studio.name} image`}
                                  width={48}
                                  height={48}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {studio.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {studio.equipment.length} equipment items
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <MapPinIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-900 leading-relaxed">{studio.address}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(studio.status)}`}>
                            {studio.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{studio.contact.email}</div>
                            <div className="text-gray-500">{studio.contact.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {studio.updatedAt}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setSelectedStudio(studio)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View Details"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openEditForm(studio)}
                              className="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50"
                              title="Edit Studio"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(studio.id, studio.status === 'active' ? 'inactive' : 'active')}
                              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                              title="Toggle Status"
                            >
                              {studio.status === 'active' ? <XMarkIcon className="h-4 w-4" /> : <CheckIcon className="h-4 w-4" />}
                            </button>
                            <button
                              onClick={() => handleDeleteStudio(studio.id)}
                              className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
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

          {/* Studio Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[95vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isEditing ? 'Edit Studio' : 'Create New Studio'}
                  </h2>
                  <button
                    onClick={closeForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Studio Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`block w-full border rounded-md px-3 py-3 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter studio name"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-3 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Operating Hours
                    </label>
                    <OperatingHoursPicker
                      value={formData.operatingHours}
                      onChange={(value) => handleInputChange('operatingHours', value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`block w-full border rounded-md px-3 py-3 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                        formErrors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter studio address"
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Studio Image
                    </label>
                    
                    {/* File Upload Area */}
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-2">
                        Upload Image File
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
                          onChange={handleImageFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        
                        {selectedImageFile ? (
                          <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 rounded-lg border border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                              <img
                                src={imagePreview}
                                alt="Image preview"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {selectedImageFile.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Size: {(selectedImageFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={removeImageFile}
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
                        Or Enter Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => {
                          handleInputChange('image', e.target.value);
                          if (e.target.value) {
                            setSelectedImageFile(null);
                            setImagePreview(e.target.value);
                          }
                        }}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Enter studio image URL"
                      />
                    </div>

                    {/* Image Preview */}
                    {(imagePreview || formData.image) && (
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 mb-2">
                          Image Preview
                        </label>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg border border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img
                              src={imagePreview || formData.image}
                              alt="Image preview"
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  parent.innerHTML = '<svg class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>';
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">
                              {selectedImageFile ? selectedImageFile.name : 'URL Image'}
                            </p>
                            {selectedImageFile && (
                              <p className="text-xs text-gray-500">
                                Size: {(selectedImageFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`block w-full border rounded-md px-3 py-3 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                        formErrors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter studio description"
                    />
                    {formErrors.description && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.equipment.map((equipment) => (
                        <span
                          key={equipment}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#f2a16d]/10 text-[#f2a16d]"
                        >
                          {equipment}
                          <button
                            type="button"
                            onClick={() => removeEquipment(equipment)}
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
                        value={newEquipment}
                        onChange={(e) => {
                          setNewEquipment(e.target.value);
                          setShowEquipmentSuggestions(true);
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addEquipment())}
                        onFocus={() => setShowEquipmentSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowEquipmentSuggestions(false), 200)}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                        placeholder="Add equipment (separate multiple with commas)"
                      />
                      
                      {/* Equipment Suggestions Dropdown */}
                      {showEquipmentSuggestions && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                          {getEquipmentSuggestions().length > 0 ? (
                            getEquipmentSuggestions().map((equipment) => (
                              <button
                                key={equipment}
                                type="button"
                                onClick={() => selectEquipmentSuggestion(equipment)}
                                className="w-full text-left px-3 py-2 hover:bg-gray-100 text-black"
                              >
                                {equipment}
                              </button>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => addEquipment()}
                              className="w-full text-left px-3 py-2 text-gray-500 hover:bg-gray-100"
                            >
                              Add &apos;{newEquipment}&apos;
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={formData.contact.email}
                          onChange={(e) => handleContactChange('email', e.target.value)}
                          className={`block w-full border rounded-md px-3 py-3 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
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
                          className={`block w-full border rounded-md px-3 py-3 text-black focus:outline-none focus:ring-[#B40101] focus:border-[#B40101] ${
                            formErrors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Enter phone number"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={closeForm}
                      className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#B40101] hover:bg-[#e0651a] text-white rounded-md transition-colors font-medium"
                    >
                      {isEditing ? 'Update Studio' : 'Create Studio'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Studio Detail Modal */}
          {selectedStudio && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[95vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Studio Details</h2>
                  <button
                    onClick={() => setSelectedStudio(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Studio Information</h3>
                    <p className="text-gray-600">{selectedStudio.name}</p>
                    <p className="text-gray-600">{selectedStudio.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Address</h3>
                    <p className="text-gray-600">{selectedStudio.address}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Equipment</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedStudio.equipment.map((equipment) => (
                        <span
                          key={equipment}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f37521]/10 text-[#f37521]"
                        >
                          {equipment}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Operating Hours</h3>
                    <p className="text-gray-600">{selectedStudio.operatingHours}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Contact Information</h3>
                    <p className="text-gray-600">Email: {selectedStudio.contact.email}</p>
                    <p className="text-gray-600">Phone: {selectedStudio.contact.phone}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedStudio.status)}`}>
                      {selectedStudio.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
