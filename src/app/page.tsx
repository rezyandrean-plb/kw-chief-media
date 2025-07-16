'use client';

import Link from "next/link";
import { useState, useMemo } from "react";
import { 
  UserGroupIcon, 
  DocumentTextIcon,
  CameraIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import CurrentYear from "../components/CurrentYear";
import AnimatedIcon from "../components/AnimatedIcon";
import ScrollAnimation from "../components/ScrollAnimation";
import AnimatedBackground from "../components/AnimatedBackground";
import HeroAnimatedBackground from "../components/HeroAnimatedBackground";
import Counter from "../components/Counter";

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  // Project data with categories
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Rondo Group",
      category: "Digital Marketing",
      tab: "marketing",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Sonos",
      category: "Design",
      tab: "design",
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Content Studio",
      category: "Copywriting",
      tab: "marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Visual Stories",
      category: "Videography",
      tab: "marketing",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "TechFlow",
      category: "Development",
      tab: "development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 6,
      title: "Brand Identity",
      category: "Design",
      tab: "design",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 7,
      title: "Social Campaign",
      category: "Digital Marketing",
      tab: "marketing",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop&crop=center"
    },
    {
      id: 8,
      title: "Web Platform",
      category: "Development",
      tab: "development",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center"
    }
  ], []);

  // Filter projects based on active tab
  const filteredProjects = useMemo(() => {
    if (activeTab === 'all') {
      return projects;
    }
    return projects.filter(project => project.tab === activeTab);
  }, [activeTab, projects]);

  // Reset to first page when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-[#fcebdc]">
      {/* Hero Section */}
      <section className="relative bg-[#273f4f] min-h-screen flex items-center justify-center overflow-hidden">
        <HeroAnimatedBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation delay={200}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <AnimatedIcon color="#03809c" size={64} delay={500}>
                  <ShieldCheckIcon className="h-8 w-8" />
                </AnimatedIcon>
                <h1 className="text-4xl lg:text-6xl font-bold text-white">
                  Chief Media
                </h1>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
                Where Creativity Meets Strategy
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
              <p className="text-lg lg:text-xl text-white mb-8 max-w-3xl mx-auto">
                The <span className="font-semibold">exclusive curated marketplace</span> for Keller Williams realtors. 
                Connect with verified creatives, photographers, and marketing experts.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={800}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/vendors" className="inline-flex items-center gap-2 bg-[#f37521] text-white px-8 py-4 rounded-lg hover:bg-[#e0651a] transition font-medium text-lg hover:scale-105 transform duration-200">
                  Browse Vendors
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>
                <Link href="/vendor-application" className="inline-flex items-center gap-2 bg-white text-[#273f4f] px-8 py-4 rounded-lg hover:bg-[#fcebdc] transition font-medium text-lg border-2 border-white hover:scale-105 transform duration-200">
                  Become a Vendor
                </Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={1000}>
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white">
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <StarIcon className="h-4 w-4 text-[#f37521] animate-pulse" />
                  <span>Exclusive to KW Realtors</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <CheckCircleIcon className="h-4 w-4 text-[#03809c] animate-pulse" />
                  <span>Verified Vendors Only</span>
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <ShieldCheckIcon className="h-4 w-4 text-[#f37521] animate-pulse" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Remarkable Results & Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#fcebdc] to-[#f2a16d]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <ScrollAnimation delay={200}>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#273f4f] mb-6 lg:mb-0">
                  Remarkable Results
                </h2>
              </ScrollAnimation>
              <ScrollAnimation delay={400}>
                <Link href="/about" className="inline-flex items-center gap-2 text-[#273f4f] hover:text-[#f37521] font-medium text-lg transition-colors duration-200 underline">
                  About Us
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </ScrollAnimation>
            </div>
          </div>
          
          {/* Video Box */}
          <ScrollAnimation delay={300}>
            <div className="max-w-6xl mx-auto mb-16">
              <div className="relative bg-gray-300 rounded-2xl p-6 lg:p-8 shadow-2xl">
                {/* Video Player Container */}
                <div className="relative bg-gray-200 rounded-xl overflow-hidden h-64 lg:h-80">
                  <img 
                    src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop&crop=center" 
                    alt="Video thumbnail" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer">
                      <div className="w-0 h-0 border-l-[12px] border-l-[#03809c] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Stats Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <ScrollAnimation delay={200}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Counter target={100} color="#f37521" />
                  <p className="text-[#273f4f] font-semibold text-lg">Verified Vendors</p>
                  <p className="text-sm text-[#273f4f]/70 mt-2">We have a proven track record of delivering exceptional results across various industries.</p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={400}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Counter target={1000} color="#03809c" />
                  <p className="text-[#273f4f] font-semibold text-lg">Projects Completed</p>
                  <p className="text-sm text-[#273f4f]/70 mt-2">We have a proven track record of delivering exceptional results across various industries.</p>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={600}>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <Counter target={500} color="#f2a16d" />
                  <p className="text-[#273f4f] font-semibold text-lg">Happy Clients</p>
                  <p className="text-sm text-[#273f4f]/70 mt-2">We have a proven track record of delivering exceptional results across various industries.</p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 bg-[#fcebdc] relative overflow-hidden">
        <AnimatedBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollAnimation delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#273f4f] mb-6">
                How Chief Media Works
              </h2>
              <p className="text-lg text-[#273f4f]/80 max-w-2xl mx-auto">
                From curated vendors to quality delivery, unlock the potential of your real estate marketing journey.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <ScrollAnimation delay={400} direction="left">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#03809c]/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                  <span className="text-2xl font-bold text-[#03809c]">01</span>
                </div>
                <h3 className="text-2xl font-bold text-[#273f4f] mb-4">Curated Vendors</h3>
                <p className="text-[#273f4f]/80 text-lg">
                  We carefully select and verify the best creatives, photographers, and marketing experts.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={600} direction="up">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#f37521]/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                  <span className="text-2xl font-bold text-[#f37521]">02</span>
                </div>
                <h3 className="text-2xl font-bold text-[#273f4f] mb-4">Direct Connection</h3>
                <p className="text-[#273f4f]/80 text-lg">
                  Isabelle matches you with the perfect vendor and creates a direct WhatsApp group.
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={800} direction="right">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#f2a16d]/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                  <span className="text-2xl font-bold text-[#f2a16d]">03</span>
                </div>
                <h3 className="text-2xl font-bold text-[#273f4f] mb-4">Quality Delivery</h3>
                <p className="text-[#273f4f]/80 text-lg">
                  Get professional results with our 50% deposit, 50% completion payment structure.
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollAnimation delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#273f4f] mb-6">
                Powerful Solutions
              </h2>
              <p className="text-lg text-[#273f4f]/80 max-w-2xl mx-auto">
                From photography and videography to copywriting and social media, unlock the potential of your digital journey.
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollAnimation delay={300} direction="left">
              <div className="group bg-[#fcebdc] rounded-2xl p-8 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#03809c]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse">
                  <CameraIcon className="h-8 w-8 text-[#03809c]" />
                </div>
                <h3 className="text-xl font-bold text-[#273f4f] mb-4">Photography</h3>
                <p className="text-[#273f4f]/80">
                  Professional real estate photography and virtual tours
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={500} direction="up">
              <div className="group bg-[#fcebdc] rounded-2xl p-8 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#f37521]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse">
                  <VideoCameraIcon className="h-8 w-8 text-[#f37521]" />
                </div>
                <h3 className="text-xl font-bold text-[#273f4f] mb-4">Videography</h3>
                <p className="text-[#273f4f]/80">
                  Property videos, drone footage, and marketing content
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={700} direction="up">
              <div className="group bg-[#fcebdc] rounded-2xl p-8 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#f2a16d]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse">
                  <DocumentTextIcon className="h-8 w-8 text-[#f2a16d]" />
                </div>
                <h3 className="text-xl font-bold text-[#273f4f] mb-4">Copywriting</h3>
                <p className="text-[#273f4f]/80">
                  Compelling property descriptions and marketing copy
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={900} direction="right">
              <div className="group bg-[#fcebdc] rounded-2xl p-8 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#03809c]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform animate-pulse">
                  <UserGroupIcon className="h-8 w-8 text-[#03809c]" />
                </div>
                <h3 className="text-xl font-bold text-[#273f4f] mb-4">Social Media</h3>
                <p className="text-[#273f4f]/80">
                  Social media management and content creation
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Why Choose Chief Media */}
      <section className="py-16 lg:py-24 bg-[#fcebdc]">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollAnimation delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#273f4f] mb-6">
                Why Choose Chief Media?
              </h2>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollAnimation delay={400} direction="left">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#273f4f] mb-8 text-center">
                  For KW Realtors
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#03809c] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Exclusive Access</h4>
                      <p className="text-[#273f4f]/80">Curated vendors exclusively for KW agents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#03809c] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Quality Guaranteed</h4>
                      <p className="text-[#273f4f]/80">All vendors pre-screened and verified</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#03809c] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Direct Communication</h4>
                      <p className="text-[#273f4f]/80">Work directly with vendors via WhatsApp</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#03809c] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Secure Payments</h4>
                      <p className="text-[#273f4f]/80">50% deposit, 50% upon completion</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/vendors" className="inline-flex items-center gap-2 bg-[#f37521] text-white px-6 py-3 rounded-lg hover:bg-[#e0651a] transition font-medium hover:scale-105 transform duration-200">
                    Browse Vendors
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={600} direction="right">
              <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-[#273f4f] mb-8 text-center">
                  For Vendors
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#f37521] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Exclusive Market</h4>
                      <p className="text-[#273f4f]/80">Access to KW&apos;s extensive realtor network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#f37521] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Fair Revenue Split</h4>
                      <p className="text-[#273f4f]/80">85% vendor, 15% platform fee</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#f37521] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Direct Client Contact</h4>
                      <p className="text-[#273f4f]/80">Work directly with clients, not through platform</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 hover:scale-105 transition-transform duration-200">
                    <CheckCircleIcon className="h-6 w-6 text-[#f37521] mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="font-bold text-[#273f4f] text-lg mb-2">Quality Standards</h4>
                      <p className="text-[#273f4f]/80">Maintain high standards, build reputation</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/vendor-application" className="inline-flex items-center gap-2 bg-[#03809c] text-white px-6 py-3 rounded-lg hover:bg-[#027085] transition font-medium hover:scale-105 transform duration-200">
                    Apply to Join
                    <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Crafting Experiences Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <ScrollAnimation delay={200}>
              <h2 className="text-3xl lg:text-5xl font-bold text-[#273f4f] mb-6 lg:mb-0">
                Crafting Experiences
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-[#273f4f] hover:text-[#f37521] font-medium text-lg transition-colors duration-200 underline">
                All Works
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </ScrollAnimation>
          </div>
          
          <ScrollAnimation delay={300}>
            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => handleTabChange('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === 'all' 
                    ? 'bg-[#03809c] text-white' 
                    : 'text-[#273f4f] hover:text-[#f37521]'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => handleTabChange('design')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === 'design' 
                    ? 'bg-[#03809c] text-white' 
                    : 'text-[#273f4f] hover:text-[#f37521]'
                }`}
              >
                Design
              </button>
              <button 
                onClick={() => handleTabChange('marketing')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === 'marketing' 
                    ? 'bg-[#03809c] text-white' 
                    : 'text-[#273f4f] hover:text-[#f37521]'
                }`}
              >
                Digital Marketing
              </button>
              <button 
                onClick={() => handleTabChange('development')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  activeTab === 'development' 
                    ? 'bg-[#03809c] text-white' 
                    : 'text-[#273f4f] hover:text-[#f37521]'
                }`}
              >
                Development
              </button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProjects.map((project, index) => (
              <ScrollAnimation key={project.id} delay={400 + (index * 200)} direction={index % 2 === 0 ? "left" : "right"}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="h-80 relative overflow-hidden">
                    <div className="absolute inset-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[#273f4f]/90 backdrop-blur-sm p-6 rounded-t-2xl transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80">{project.category}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <ScrollAnimation delay={600}>
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-[#273f4f] hover:text-[#f37521]"
                >
                  Previous
                </button>
                
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                        currentPage === page
                          ? 'bg-[#03809c] text-white'
                          : 'text-[#273f4f] hover:text-[#f37521] hover:bg-[#03809c]/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-[#273f4f] hover:text-[#f37521]"
                >
                  Next
                </button>
              </div>
            </ScrollAnimation>
          )}
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollAnimation delay={200}>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-[#273f4f] mb-6">
                Recent Projects
              </h2>
              <p className="text-lg text-[#273f4f]/80 max-w-2xl mx-auto">
                Recent work from our verified vendors
              </p>
            </div>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={300} direction="left">
              <div className="group bg-[#fcebdc] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-[#03809c] to-[#f37521] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <CameraIcon className="h-16 w-16 text-white animate-pulse" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#273f4f] mb-3">Luxury Home Photography</h3>
                  <p className="text-[#273f4f]/80 mb-4">
                    Professional photography for a $2.5M luxury property in Orchard Road
                  </p>
                  <div className="flex items-center text-sm text-[#273f4f]/60">
                    <span>Photography</span>
                    <span className="mx-2">•</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={500} direction="up">
              <div className="group bg-[#fcebdc] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-[#f37521] to-[#f2a16d] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <VideoCameraIcon className="h-16 w-16 text-white animate-pulse" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#273f4f] mb-3">Property Video Tour</h3>
                  <p className="text-[#273f4f]/80 mb-4">
                    Cinematic video tour with drone footage for modern townhouse in Marina Bay
                  </p>
                  <div className="flex items-center text-sm text-[#273f4f]/60">
                    <span>Videography</span>
                    <span className="mx-2">•</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={700} direction="right">
              <div className="group bg-[#fcebdc] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-64 bg-gradient-to-br from-[#f2a16d] to-[#03809c] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <DocumentTextIcon className="h-16 w-16 text-white animate-pulse" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#273f4f] mb-3">Marketing Copy</h3>
                  <p className="text-[#273f4f]/80 mb-4">
                    Compelling property descriptions and social media content for Sentosa properties
                  </p>
                  <div className="flex items-center text-sm text-[#273f4f]/60">
                    <span>Copywriting</span>
                    <span className="mx-2">•</span>
                    <span>Completed</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
          <ScrollAnimation delay={900}>
            <div className="text-center mt-12">
              <Link href="/portfolio" className="inline-flex items-center gap-2 text-[#f37521] hover:text-[#e0651a] font-medium text-lg hover:scale-105 transform duration-200">
                View Full Portfolio
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-[#273f4f]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollAnimation delay={200}>
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Elevate your digital presence. Contact us today!
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={400}>
              <p className="text-xl text-[#fcebdc] mb-8 max-w-2xl mx-auto">
                Whether you&apos;re a KW realtor looking for quality vendors or a creative professional wanting to join our exclusive network, 
                Isabelle is here to help you get started.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#f37521] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#e0651a] transition text-lg hover:scale-105 transform duration-200"
                >
                  <EnvelopeIcon className="h-5 w-5" />
                  Contact Isabelle
                </Link>
                <Link
                  href="/vendor-application"
                  className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-[#273f4f] transition text-lg hover:scale-105 transform duration-200"
                >
                  <UserGroupIcon className="h-5 w-5" />
                  Apply as Vendor
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#273f4f] text-white py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-[#f37521]" />
                <h3 className="text-2xl font-bold">Chief Media</h3>
              </div>
              <p className="text-[#fcebdc] mb-4">
                The exclusive curated marketplace for Keller Williams realtors. Connect with verified creatives, photographers, and marketing experts.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-[#fcebdc]">
                <li><Link href="/vendors" className="hover:text-[#f37521] transition">Browse Vendors</Link></li>
                <li><Link href="/vendor-application" className="hover:text-[#f37521] transition">Become a Vendor</Link></li>
                <li><Link href="/portfolio" className="hover:text-[#f37521] transition">Portfolio</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-[#fcebdc]">
                <li><Link href="/contact" className="hover:text-[#f37521] transition">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-[#f37521] transition">About</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#fcebdc]/20 mt-8 pt-8 text-center text-[#fcebdc]">
            <p>&copy; <CurrentYear /> Chief Media. Exclusive to Keller Williams Realtors.</p>
          </div>
        </div>
      </footer>


    </div>
  );
}
