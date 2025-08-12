'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { 
  EnvelopeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import AdminSidebar from '@/components/AdminSidebar';
import AnimatedBackground from '@/components/AnimatedBackground';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  const stats = [
    {
      name: 'Total Enquiries',
      value: '24',
      icon: EnvelopeIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/enquiries'
    },
    {
      name: 'Studio Enquiries',
      value: '12',
      icon: BuildingOfficeIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/studio-enquiries'
    },
    {
      name: 'Active Vendors',
      value: '8',
      icon: UserGroupIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/vendors'
    },
    {
      name: 'Active Studios',
      value: '2',
      icon: VideoCameraIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/studios'
    },
    {
      name: 'Total Invoices',
      value: '18',
      icon: DocumentTextIcon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      href: '/admin/invoices'
    }
  ];

  const quickActions = [
    {
      name: 'View Enquiries',
      description: 'Manage vendor enquiries from realtors',
      href: '/admin/enquiries',
      icon: EnvelopeIcon
    },
    {
      name: 'Studio Bookings',
      description: 'Handle studio booking requests',
      href: '/admin/studio-enquiries',
      icon: BuildingOfficeIcon
    },
    {
      name: 'Manage Vendors',
      description: 'Add, edit, or remove vendor profiles',
      href: '/admin/vendors',
      icon: UserGroupIcon
    },
    {
      name: 'Manage Studios',
      description: 'Add, edit, or remove studio facilities',
      href: '/admin/studios',
      icon: VideoCameraIcon
    },
    {
      name: 'Manage Invoices',
      description: 'Create and manage invoices',
      href: '/admin/invoices',
      icon: DocumentTextIcon
    }
  ];

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
                  <h1 className="text-2xl font-bold text-[#273f4f]">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Welcome back, {user?.name}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Link
                    key={stat.name}
                    href={stat.href}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link
                      key={action.name}
                      href={action.href}
                      className="group p-4 border border-gray-200 rounded-lg hover:border-[#B40101] hover:bg-[#B40101]/5 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-[#B40101]/10 transition-colors duration-200">
                            <Icon className="h-5 w-5 text-gray-600 group-hover:text-[#B40101] transition-colors duration-200" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#B40101] transition-colors duration-200">
                              {action.name}
                            </h3>
                            <p className="text-xs text-gray-500">{action.description}</p>
                          </div>
                        </div>
                        <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-[#B40101] group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <EnvelopeIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">New enquiry from John Doe</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <BuildingOfficeIcon className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Studio booking confirmed</p>
                    <p className="text-xs text-gray-500">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 rounded-lg bg-green-100">
                    <UserGroupIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">New vendor added</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 