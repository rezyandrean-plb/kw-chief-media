'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  PlusIcon, 
  PencilIcon, 
  EyeIcon,
  CurrencyDollarIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface Gig {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  status: string;
  views: number;
  orders: number;
  rating: number;
  image: string;
}

export default function VendorGigs() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [gigs, setGigs] = useState<Gig[]>([]);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'vendor')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mock data - in real app, this would come from API
  const mockGigs = useMemo(() => [
    {
      id: 1,
      title: 'Professional Real Estate Photography',
      description: 'High-quality photography services for real estate listings',
      price: 150,
      category: 'Photography',
      status: 'active',
      views: 245,
      orders: 12,
      rating: 4.8,
      image: '/images/vendors/chief-media.webp'
    },
    {
      id: 2,
      title: '3D Virtual Tour Creation',
      description: 'Interactive 3D virtual tours for immersive property viewing',
      price: 300,
      category: '3D Tours',
      status: 'active',
      views: 189,
      orders: 8,
      rating: 4.9,
      image: '/images/vendors/chief-media.webp'
    },
    {
      id: 3,
      title: 'Video Walkthrough Services',
      description: 'Professional video walkthroughs with drone footage',
      price: 250,
      category: 'Video',
      status: 'draft',
      views: 0,
      orders: 0,
      rating: 0,
      image: '/images/vendors/chief-media.webp'
    }
  ], []);

  useEffect(() => {
    setGigs(mockGigs);
  }, [mockGigs]);

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
              <h1 className="text-3xl font-bold text-gray-900">My Gigs</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your service offerings and portfolio
              </p>
            </div>
            <Link
              href="/vendor/gigs/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a]"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create New Gig
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <EyeIcon className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Views
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {gigs.reduce((sum, gig) => sum + gig.views, 0)}
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
                  <CurrencyDollarIcon className="h-6 w-6 text-green-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Orders
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {gigs.reduce((sum, gig) => sum + gig.orders, 0)}
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
                  <StarIcon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Rating
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {gigs.filter(gig => gig.rating > 0).length > 0 
                        ? (gigs.filter(gig => gig.rating > 0).reduce((sum, gig) => sum + gig.rating, 0) / gigs.filter(gig => gig.rating > 0).length).toFixed(1)
                        : 'N/A'
                      }
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
                  <PencilIcon className="h-6 w-6 text-purple-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Gigs
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {gigs.filter(gig => gig.status === 'active').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div key={gig.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    gig.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {gig.status.charAt(0).toUpperCase() + gig.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">{gig.category}</span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">{gig.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{gig.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{gig.rating}</span>
                    <span className="ml-2 text-sm text-gray-500">({gig.orders} orders)</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">${gig.price}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {gig.views} views
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      href={`/vendor/gigs/${gig.id}/edit`}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <Link
                      href={`/vendor/gigs/${gig.id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-[#f37521] hover:bg-[#e0651a]"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {gigs.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <PencilIcon className="h-12 w-12" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No gigs yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first service offering.
            </p>
            <div className="mt-6">
              <Link
                href="/vendor/gigs/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a]"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create Your First Gig
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
