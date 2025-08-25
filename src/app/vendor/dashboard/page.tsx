'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function VendorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'vendor')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37521] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'vendor') {
    return null;
  }

  // Mock data - in real app, this would come from API
  const stats = {
    totalEarnings: 12500,
    activeProjects: 3,
    completedProjects: 12,
    pendingMessages: 2
  };

  const recentProjects = [
    {
      id: 1,
      title: 'Real Estate Photography - Marina Bay',
      client: 'John Smith',
      status: 'active',
      amount: 800,
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      title: '3D Virtual Tour - Orchard Road',
      client: 'Sarah Johnson',
      status: 'completed',
      amount: 1200,
      completedDate: '2024-01-10'
    },
    {
      id: 3,
      title: 'Video Walkthrough - Sentosa Cove',
      client: 'Mike Chen',
      status: 'pending',
      amount: 1500,
      dueDate: '2024-01-20'
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="bg-[#273f4f] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
                             <h1 className="text-3xl font-bold text-white">Dashboard</h1>
               <p className="mt-1 text-sm text-gray-300">
                Welcome back, {user.name}
              </p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/vendor/gigs"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a]"
              >
                Manage Gigs
              </Link>
              <Link
                href="/vendor/projects"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Earnings
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${stats.totalEarnings.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ClockIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Projects
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.activeProjects}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Completed Projects
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.completedProjects}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Messages
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.pendingMessages}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
              <Link
                href="/vendor/projects"
                className="text-sm font-medium text-[#f37521] hover:text-[#e0651a]"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentProjects.map((project) => (
              <div key={project.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-500">Client: {project.client}</p>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'active' 
                          ? 'bg-blue-100 text-blue-800'
                          : project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${project.amount}</p>
                    <p className="text-sm text-gray-500">
                      {project.status === 'completed' ? 'Completed' : 'Due'}: {project.dueDate}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/vendor/gigs"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-[#f37521]" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Gigs</h3>
                <p className="text-sm text-gray-500">Update your service offerings and pricing</p>
              </div>
            </div>
          </Link>

          <Link
            href="/vendor/earnings"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-[#f37521]" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">View Earnings</h3>
                <p className="text-sm text-gray-500">Track your income and payment history</p>
              </div>
            </div>
          </Link>

          <Link
            href="/vendor/messages"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-[#f37521]" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                <p className="text-sm text-gray-500">Communicate with clients and team</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
