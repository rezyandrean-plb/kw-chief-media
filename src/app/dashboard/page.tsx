'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'vendor':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <UserGroupIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Connections</h3>
                  <p className="text-2xl font-bold text-blue-600">12</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Invoices</h3>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Revenue</h3>
                  <p className="text-2xl font-bold text-yellow-600">$8,450</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'realtor':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Connected Vendors</h3>
                  <p className="text-2xl font-bold text-purple-600">8</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h3>
                  <p className="text-2xl font-bold text-blue-600">15</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Success Rate</h3>
                  <p className="text-2xl font-bold text-green-600">94%</p>
                </div>
              </div>
            </div>
          </div>
        );

      default: // client
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h3>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Spent</h3>
                  <p className="text-2xl font-bold text-green-600">$2,450</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Deadlines</h3>
                  <p className="text-2xl font-bold text-purple-600">2</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const getQuickActions = () => {
    const actions = [
      {
        title: 'Create Invoice',
        href: '/invoices/create',
        icon: DocumentTextIcon,
        color: 'bg-blue-600 hover:bg-blue-700',
      },
      {
        title: 'Browse Services',
        href: '/services',
        icon: BuildingOfficeIcon,
        color: 'bg-green-600 hover:bg-green-700',
      },
    ];

    if (user.role === 'vendor') {
      actions.push({
        title: 'View Connections',
        href: '/connections',
        icon: UserGroupIcon,
        color: 'bg-purple-600 hover:bg-purple-700',
      });
    }

    if (user.role === 'realtor') {
      actions.push({
        title: 'Find Vendors',
        href: '/vendors',
        icon: UserGroupIcon,
        color: 'bg-purple-600 hover:bg-purple-700',
      });
    }

    return actions;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user.name}!
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Here's what's happening with your {user.role} account.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8">
            {getDashboardContent()}
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {getQuickActions().map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`${action.color} text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
                >
                  <action.icon className="h-5 w-5" />
                  <span className="font-medium">{action.title}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Invoice #INV-001 created
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <UserGroupIcon className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    New connection request
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <BuildingOfficeIcon className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Service package updated
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    3 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 