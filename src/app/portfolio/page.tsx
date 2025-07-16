'use client';

import { useState } from 'react';
import { 
  CameraIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  StarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../components/AnimatedBackground';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  vendor: string;
  realtor: string;
  price: string;
  rating: number;
  imageUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      title: 'Luxury Home Photography',
      category: 'photography',
      description: 'Professional photography for a $2.5M luxury property in Orchard Road. Included 25 high-quality photos, virtual tour, and drone footage.',
      location: 'Orchard Road, Singapore',
      vendor: 'Elite Media Productions',
      realtor: 'Jennifer Martinez',
      price: '$1,200',
      rating: 5,
      icon: CameraIcon,
    },
    {
      id: '2',
      title: 'Modern Townhouse Video Tour',
      category: 'videography',
      description: 'Cinematic video tour with drone footage for a modern 3-bedroom townhouse. Perfect for social media marketing and listing promotion.',
      location: 'Marina Bay, Singapore',
      vendor: 'Chen Creative Studios',
      realtor: 'Robert Wilson',
      price: '$1,800',
      rating: 5,
      icon: VideoCameraIcon,
    },
    {
      id: '3',
      title: 'Property Marketing Copy',
      category: 'copywriting',
      description: 'Compelling property descriptions and social media content for a luxury condo development. Increased listing views by 40%.',
      location: 'Sentosa, Singapore',
      vendor: 'Rodriguez Media Group',
      realtor: 'Amanda Davis',
      price: '$450',
      rating: 5,
      icon: DocumentTextIcon,
    },
    {
      id: '4',
      title: 'Social Media Campaign',
      category: 'social-media',
      description: 'Complete social media management for a real estate team. Created engaging content, managed ads, and increased follower engagement.',
      location: 'Clarke Quay, Singapore',
      vendor: 'Wang Photography Co.',
      realtor: 'Michael Brown',
      price: '$2,100',
      rating: 5,
      icon: UserGroupIcon,
    },
    {
      id: '5',
      title: 'Virtual Tour Creation',
      category: 'virtual-tours',
      description: 'Immersive 360° virtual tour for a historic home. Included interactive hotspots and detailed property information.',
      location: 'Raffles Place, Singapore',
      vendor: 'Thompson Visuals',
      realtor: 'Lisa Wang',
      price: '$950',
      rating: 5,
      icon: BuildingOfficeIcon,
    },
    {
      id: '6',
      title: 'Commercial Property Photography',
      category: 'photography',
      description: 'Professional photography for a commercial office building. Included interior and exterior shots, aerial photography.',
      location: 'Tanjong Pagar, Singapore',
      vendor: 'Elite Media Productions',
      realtor: 'David Thompson',
      price: '$1,500',
      rating: 5,
      icon: CameraIcon,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Work', icon: BuildingOfficeIcon },
    { id: 'photography', name: 'Photography', icon: CameraIcon },
    { id: 'videography', name: 'Videography', icon: VideoCameraIcon },
    { id: 'copywriting', name: 'Copywriting', icon: DocumentTextIcon },
    { id: 'social-media', name: 'Social Media', icon: UserGroupIcon },
    { id: 'virtual-tours', name: 'Virtual Tours', icon: BuildingOfficeIcon },
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#273f4f] relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#273f4f] mb-4">
              Our Portfolio
            </h1>
            <p className="text-xl text-[#273f4f]/80 max-w-3xl mx-auto">
              Showcasing successful collaborations between KW realtors and our verified vendors. 
              See the quality and creativity that makes Chief Media the trusted choice for real estate marketing.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2 bg-white rounded-lg p-1 shadow w-full max-w-4xl">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#f37521] text-white'
                      : 'text-[#273f4f] hover:text-[#f37521]'
                  }`}
                >
                  <category.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {/* Image Placeholder */}
                  <div className="h-32 sm:h-48 bg-gradient-to-br from-[#03809c] to-[#f37521] flex items-center justify-center">
                    <Icon className="h-8 w-8 sm:h-16 sm:w-16 text-white" />
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-base sm:text-lg font-semibold text-[#273f4f]">
                        {item.title}
                      </h3>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            className="h-3 w-3 sm:h-4 sm:w-4 text-[#f37521] fill-current"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#273f4f]/80 text-xs sm:text-sm mb-3 sm:mb-4">
                      {item.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <div className="flex items-center text-xs sm:text-sm text-[#273f4f]/60">
                        <MapPinIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        {item.location}
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-[#273f4f]/60">Vendor: </span>
                        <span className="text-[#273f4f] font-medium">{item.vendor}</span>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-[#273f4f]/60">Realtor: </span>
                        <span className="text-[#273f4f] font-medium">{item.realtor}</span>
                      </div>
                      <div className="text-xs sm:text-sm">
                        <span className="text-[#273f4f]/60">Project Value: </span>
                        <span className="text-[#03809c] font-medium">{item.price}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f37521]/10 text-[#f37521]">
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#03809c]/10 text-[#03809c]">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-[#273f4f]/40 mb-4">
                <BuildingOfficeIcon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-[#273f4f] mb-2">
                No projects found
              </h3>
              <p className="text-sm text-[#273f4f]/70">
                No projects match the selected category. Try selecting a different category or view all projects.
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#f37521] mb-1 sm:mb-2">
                {portfolioItems.length}
              </div>
              <p className="text-xs sm:text-sm text-[#273f4f]/80">Projects Completed</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#03809c] mb-1 sm:mb-2">
                5.0
              </div>
              <p className="text-xs sm:text-sm text-[#273f4f]/80">Average Rating</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#f2a16d] mb-1 sm:mb-2">
                $8,000
              </div>
              <p className="text-xs sm:text-sm text-[#273f4f]/80">Total Value</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
              <div className="text-xl sm:text-2xl font-bold text-[#03809c] mb-1 sm:mb-2">
                6
              </div>
              <p className="text-xs sm:text-sm text-[#273f4f]/80">Vendors Used</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 