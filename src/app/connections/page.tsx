'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { 
  UserCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  ChatBubbleLeftIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

interface Connection {
  id: string;
  realtorId: string;
  realtorName: string;
  realtorCompany: string;
  realtorEmail: string;
  realtorPhone: string;
  realtorLocation: string;
  realtorRating: number;
  realtorReviewCount: number;
  status: 'pending' | 'active' | 'inactive';
  connectedDate: string;
  lastActivity: string;
  projectsCompleted: number;
  totalRevenue: number;
}

export default function ConnectionsPage() {
  const { } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const [connections] = useState<Connection[]>([
    {
      id: '1',
      realtorId: 'r1',
      realtorName: 'Jennifer Martinez',
      realtorCompany: 'Martinez Real Estate',
      realtorEmail: 'jennifer@martinezreal.com',
      realtorPhone: '+1 (555) 111-2222',
      realtorLocation: 'New York, NY',
      realtorRating: 4.8,
      realtorReviewCount: 156,
      status: 'active',
      connectedDate: '2024-01-15',
      lastActivity: '2024-01-28',
      projectsCompleted: 12,
      totalRevenue: 8500,
    },
    {
      id: '2',
      realtorId: 'r2',
      realtorName: 'Robert Wilson',
      realtorCompany: 'Wilson Properties',
      realtorEmail: 'robert@wilsonproperties.com',
      realtorPhone: '+1 (555) 222-3333',
      realtorLocation: 'Los Angeles, CA',
      realtorRating: 4.6,
      realtorReviewCount: 89,
      status: 'active',
      connectedDate: '2024-01-10',
      lastActivity: '2024-01-25',
      projectsCompleted: 8,
      totalRevenue: 6200,
    },
    {
      id: '3',
      realtorId: 'r3',
      realtorName: 'Amanda Davis',
      realtorCompany: 'Davis & Associates',
      realtorEmail: 'amanda@davisassociates.com',
      realtorPhone: '+1 (555) 333-4444',
      realtorLocation: 'Miami, FL',
      realtorRating: 4.9,
      realtorReviewCount: 203,
      status: 'pending',
      connectedDate: '2024-01-20',
      lastActivity: '2024-01-20',
      projectsCompleted: 0,
      totalRevenue: 0,
    },
  ]);

  const filteredConnections = statusFilter === 'all' 
    ? connections 
    : connections.filter(connection => connection.status === statusFilter);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Pending' },
      active: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Active' },
      inactive: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', label: 'Inactive' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#273f4f]">
              My Connections
            </h1>
            <p className="mt-2 text-[#273f4f]/80">
              Manage your connections with realtors and track your collaborations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {connections.length}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Connections</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {connections.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {connections.filter(c => c.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">$</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(connections.reduce((sum, c) => sum + c.totalRevenue, 0))}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                      {connections.reduce((sum, c) => sum + c.projectsCompleted, 0)}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Projects</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {connections.reduce((sum, c) => sum + c.projectsCompleted, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by status:
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConnections.map((connection) => (
              <div key={connection.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Connection Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <UserCircleIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {connection.realtorName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {connection.realtorCompany}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(connection.status)}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          className={`h-4 w-4 ${
                            star <= connection.realtorRating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      {connection.realtorRating} ({connection.realtorReviewCount} reviews)
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {connection.realtorLocation}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <EnvelopeIcon className="h-4 w-4 mr-2" />
                      {connection.realtorEmail}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <PhoneIcon className="h-4 w-4 mr-2" />
                      {connection.realtorPhone}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Projects</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {connection.projectsCompleted}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(connection.totalRevenue)}
                      </p>
                    </div>
                  </div>

                  {/* Connection Info */}
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Connected: {formatDate(connection.connectedDate)}
                    </div>
                    <div className="flex items-center">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                      Last activity: {formatDate(connection.lastActivity)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                        Message
                      </button>
                      <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredConnections.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <UserCircleIcon className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No connections found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {statusFilter !== 'all' 
                  ? `No ${statusFilter} connections found.`
                  : 'You haven\'t connected with any realtors yet.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 