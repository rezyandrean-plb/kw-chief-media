'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

interface Project {
  id: number;
  title: string;
  client: string;
  status: string;
  amount: number;
  dueDate?: string;
  completedDate?: string;
  progress: number;
  description: string;
}

export default function VendorProjects() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'vendor')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mock data - in real app, this would come from API
  const mockProjects = useMemo(() => [
    {
      id: 1,
      title: 'Real Estate Photography - Marina Bay',
      client: 'John Smith',
      status: 'active',
      amount: 800,
      dueDate: '2024-01-15',
      progress: 75,
      description: 'Professional photography for luxury condo listing'
    },
    {
      id: 2,
      title: '3D Virtual Tour - Orchard Road',
      client: 'Sarah Johnson',
      status: 'completed',
      amount: 1200,
      completedDate: '2024-01-10',
      progress: 100,
      description: 'Interactive 3D tour for commercial property'
    },
    {
      id: 3,
      title: 'Video Walkthrough - Sentosa Cove',
      client: 'Mike Chen',
      status: 'pending',
      amount: 1500,
      dueDate: '2024-01-20',
      progress: 0,
      description: 'Drone video walkthrough with aerial shots'
    },
    {
      id: 4,
      title: 'Property Photography - East Coast',
      client: 'Lisa Wong',
      status: 'active',
      amount: 600,
      dueDate: '2024-01-18',
      progress: 50,
      description: 'Standard photography package for residential property'
    }
  ], []);

  useEffect(() => {
    setProjects(mockProjects);
  }, [mockProjects]);

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    return project.status === filter;
  });

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

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="bg-[#273f4f] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track all your client projects
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Projects', count: projects.length },
                { key: 'active', label: 'Active', count: projects.filter(p => p.status === 'active').length },
                { key: 'pending', label: 'Pending', count: projects.filter(p => p.status === 'pending').length },
                { key: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-[#f37521] text-[#f37521]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{project.description}</p>
                    <p className="text-sm text-gray-600">Client: {project.client}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${project.amount}</div>
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

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#f37521] h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>
                    {project.status === 'completed' ? 'Completed' : 'Due'}: {project.dueDate}
                  </span>
                  <span>Project #{project.id}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    href={`/vendor/projects/${project.id}`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a]"
                  >
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                  <Link
                    href={`/vendor/messages?project=${project.id}`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <ClockIcon className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'all' 
                ? "You don't have any projects yet. Start by creating gigs to attract clients."
                : `No ${filter} projects at the moment.`
              }
            </p>
            {filter === 'all' && (
              <div className="mt-6">
                <Link
                  href="/vendor/gigs"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a]"
                >
                  Create Your First Gig
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
