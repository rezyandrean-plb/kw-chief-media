'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  ChartBarIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function RealtorDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'realtor')) {
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

  if (!user || user.role !== 'realtor') {
    return null;
  }

  // Mock data - in real app, this would come from API
  const stats = {
    activeProjects: 5,
    completedProjects: 18,
    pendingApprovals: 2,
    totalSpent: 8500
  };

  const recentProjects = [
    {
      id: 1,
      title: 'Marina Bay Condo Photography',
      vendor: 'Chief Media',
      status: 'active',
      amount: 800,
      dueDate: '2024-01-15',
      progress: 75
    },
    {
      id: 2,
      title: 'Orchard Road 3D Tour',
      vendor: 'LFG Content',
      status: 'pending_approval',
      amount: 1200,
      dueDate: '2024-01-10',
      progress: 100
    },
    {
      id: 3,
      title: 'Sentosa Cove Video Walkthrough',
      vendor: 'Tubear',
      status: 'completed',
      amount: 1500,
      completedDate: '2024-01-05',
      progress: 100
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'project_update',
      message: 'Marina Bay Condo Photography is 75% complete',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'approval_needed',
      message: 'Orchard Road 3D Tour is ready for your review',
      time: '1 day ago',
      read: false
    },
    {
      id: 3,
      type: 'project_complete',
      message: 'Sentosa Cove Video Walkthrough has been completed',
      time: '2 days ago',
      read: true
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
                href="/vendors"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a]"
              >
                Browse Vendors
              </Link>
              <Link
                href="/projects"
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
           <div className="bg-[#273f4f] overflow-hidden shadow rounded-lg">
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
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Approvals
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.pendingApprovals}
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
                  <ChartBarIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Spent
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      ${stats.totalSpent.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Projects */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Projects</h3>
                <Link
                  href="/projects"
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
                      <p className="text-sm text-gray-500">Vendor: {project.vendor}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-gray-900">{project.progress}%</span>
                        </div>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#f37521] h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'active' 
                            ? 'bg-blue-100 text-blue-800'
                            : project.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status === 'pending_approval' ? 'Pending Approval' : 
                           project.status.charAt(0).toUpperCase() + project.status.slice(1)}
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

          {/* Notifications */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Recent Notifications</h3>
                <Link
                  href="/messages"
                  className="text-sm font-medium text-[#f37521] hover:text-[#e0651a]"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div key={notification.id} className={`px-6 py-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {notification.type === 'project_update' && (
                        <ClockIcon className="h-5 w-5 text-blue-400" />
                      )}
                      {notification.type === 'approval_needed' && (
                        <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                      )}
                      {notification.type === 'project_complete' && (
                        <CheckCircleIcon className="h-5 w-5 text-green-400" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                    {!notification.read && (
                      <div className="ml-3 flex-shrink-0">
                        <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/vendors"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-[#f37521]" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Browse Vendors</h3>
                <p className="text-sm text-gray-500">Find and connect with media service providers</p>
              </div>
            </div>
          </Link>

          <Link
            href="/projects"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-[#f37521]" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">My Projects</h3>
                <p className="text-sm text-gray-500">Track and manage all your ongoing projects</p>
              </div>
            </div>
          </Link>

          <Link
            href="/messages"
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-[#f37521]" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                <p className="text-sm text-gray-500">Communicate with vendors and team members</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
