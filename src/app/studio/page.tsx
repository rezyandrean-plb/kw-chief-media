'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  StarIcon,
  VideoCameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import ScrollAnimation from "../../components/ScrollAnimation";
import AnimatedBackground from "../../components/AnimatedBackground";
import { useStudioEnquiries } from "../../lib/studio-enquiries";
import Notification from "../../components/Notification";

export default function Studio() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudio, setSelectedStudio] = useState<{
    name: string;
    address: string;
    description: string;
    image: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [notification, setNotification] = useState<{
    isVisible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  }>({
    isVisible: false,
    message: '',
    type: 'info'
  });

  const { addStudioEnquiry } = useStudioEnquiries();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudio || !selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.email) {
      setNotification({
        isVisible: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    // Format the date for storage
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';

    // Add the studio enquiry
    addStudioEnquiry({
      studioName: selectedStudio.name,
      studioAddress: selectedStudio.address,
      realtorName: formData.name,
      realtorEmail: formData.email,
      realtorPhone: formData.phone,
      selectedDate: formattedDate,
      selectedTime,
      notes: formData.notes,
      status: 'pending'
    });

    // Show success notification
    setNotification({
      isVisible: true,
      message: `Studio booking enquiry submitted successfully for ${selectedStudio.name}`,
      type: 'success'
    });

    // Reset form and close dialog
    setFormData({
      name: '',
      phone: '',
      email: '',
      notes: ''
    });
    setSelectedDate(null);
    setSelectedTime('');
    setIsDialogOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const studios = [
    {
      name: "North Studio",
      address: "5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760",
      description: "High-quality property photography with professional lighting and state-of-the-art equipment.",
      image: "/images/studio/north-studio.webp"
    },
    {
      name: "East Studio", 
      address: "47 Kallang Pudding Road #09-13",
      description: "Cinematic property videos with drone footage and professional video production services.",
      image: "/images/studio/east-studio.webp"
    }
  ];



  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 flex items-center justify-center">
          <div className="w-full px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <ScrollAnimation delay={400}>
                  <h1 className="text-4xl lg:text-6xl font-bold text-[#FCEBDC] mb-6">
                    Book Our<br />
                    <span className="text-[#B40101]">Professional Studio</span>
                  </h1>
                </ScrollAnimation>
                
                <ScrollAnimation delay={600}>
                  <p className="text-xl text-[#FCEBDC]/80 max-w-3xl mx-auto mb-8">
                    State-of-the-art studio facilities for all your real estate media needs. Professional equipment, expert guidance, and stunning results.
                  </p>
                </ScrollAnimation>
                
                <ScrollAnimation delay={800}>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[#FCEBDC]">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-[#B40101]" />
                      <span>Professional Equipment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-[#B40101]" />
                      <span>Expert Support</span>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Services Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollAnimation delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-[#FCEBDC] mb-6">
                  Studio Services
                </h2>
                <p className="text-lg text-[#FCEBDC]/70 max-w-2xl mx-auto">
                  Choose from our range of professional studio services designed for real estate media production.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {studios.map((studio, index) => (
                <ScrollAnimation key={studio.name} delay={300 + index * 100}>
                  <div className="group bg-black border border-[#273F4F]/20 rounded-xl overflow-hidden hover:border-[#B40101]/30 transition-all duration-300 shadow-lg">
                    <div className="relative h-64 overflow-hidden">
                      {studio.image && studio.image.trim() !== '' ? (
                        <Image 
                          src={studio.image}
                          alt={studio.name}
                          width={600}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#273F4F]/20 flex items-center justify-center">
                          <VideoCameraIcon className="h-16 w-16 text-[#B40101]" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-[#B40101] mb-4">{studio.name}</h3>
                      <p className="text-[#FCEBDC]/70 mb-6 leading-relaxed">
                        {studio.description}
                      </p>
                      <div className="flex items-center gap-3 text-[#FCEBDC]/80 mb-6">
                        <MapPinIcon className="h-5 w-5 flex-shrink-0" />
                        <span className="text-sm">{studio.address}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedStudio(studio);
                          setIsDialogOpen(true);
                        }}
                        className="w-full bg-[#B40101] text-white py-4 px-6 rounded-lg hover:bg-[#e0651a] transition-colors font-semibold text-lg"
                      >
                        Book {studio.name}
                      </button>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Details Dialog */}
        {isDialogOpen && selectedStudio && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-black border border-[#273F4F]/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-[#B40101]/10">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-[#FCEBDC]">{selectedStudio.name} Details</h2>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="text-[#FCEBDC] hover:text-[#B40101] transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="relative h-64 rounded-lg overflow-hidden">
                    {selectedStudio.image && selectedStudio.image.trim() !== '' ? (
                      <Image 
                        src={selectedStudio.image}
                        alt={selectedStudio.name}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#273F4F]/20 flex items-center justify-center">
                        <VideoCameraIcon className="h-16 w-16 text-[#B40101]" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#B40101] mb-4">Studio Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="h-5 w-5 text-[#B40101] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[#FCEBDC] font-semibold">Address</p>
                          <p className="text-[#FCEBDC]/70 text-sm">{selectedStudio.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <VideoCameraIcon className="h-5 w-5 text-[#B40101] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[#FCEBDC] font-semibold">Equipment</p>
                          <p className="text-[#FCEBDC]/70 text-sm">Professional cameras, lighting, and audio equipment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <ClockIcon className="h-5 w-5 text-[#B40101] mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-[#FCEBDC] font-semibold">Operating Hours</p>
                          <p className="text-[#FCEBDC]/70 text-sm">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-[#273F4F]/20 pt-6">
                  <h3 className="text-xl font-bold text-[#FCEBDC] mb-4">Book Your Session</h3>
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#FCEBDC] font-semibold mb-2">Select Date</label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: Date | null) => setSelectedDate(date)}
                          minDate={new Date()}
                          dateFormat="MMMM d, yyyy"
                          placeholderText="Choose a date"
                          className="w-full p-3 bg-black border-2 border-[#273F4F]/30 rounded-lg text-[#FCEBDC] focus:border-[#B40101] focus:outline-none transition-colors"
                          wrapperClassName="w-full"
                          popperClassName="!bg-black !border !border-[#273F4F]/30 !text-[#FCEBDC]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#FCEBDC] font-semibold mb-2">Select Time</label>
                        <select
                          value={selectedTime}
                          onChange={(e) => setSelectedTime(e.target.value)}
                          className="w-full p-3 bg-black border-2 border-[#273F4F]/30 rounded-lg text-[#FCEBDC] focus:border-[#B40101] focus:outline-none transition-colors"
                        >
                          <option value="">Choose a time</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[#FCEBDC] font-semibold mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full p-3 bg-black border-2 border-[#273F4F]/30 rounded-lg text-[#FCEBDC] focus:border-[#B40101] focus:outline-none transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-[#FCEBDC] font-semibold mb-2">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full p-3 bg-black border-2 border-[#273F4F]/30 rounded-lg text-[#FCEBDC] focus:border-[#B40101] focus:outline-none transition-colors"
                          placeholder="Your phone number"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[#FCEBDC] font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 bg-black border-2 border-[#273F4F]/30 rounded-lg text-[#FCEBDC] focus:border-[#B40101] focus:outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#FCEBDC] font-semibold mb-2">Additional Notes</label>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        className="w-full p-3 bg-black border-2 border-[#273F4F]/30 rounded-lg text-[#FCEBDC] focus:border-[#B40101] focus:outline-none transition-colors resize-none"
                        placeholder="Any special requirements or notes..."
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 bg-[#FCEBDC] text-[#273F4F] py-3 px-6 rounded-lg hover:bg-[#FCEBDC]/90 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#B40101] text-white py-3 px-6 rounded-lg hover:bg-[#e0651a] transition-colors font-semibold"
                      >
                        Book Session
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Studio Features Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <ScrollAnimation delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-5xl font-bold text-[#FCEBDC] mb-6">
                  Why Choose Our Studio?
                </h2>
                <p className="text-lg text-[#FCEBDC]/70 max-w-2xl mx-auto">
                  Professional equipment, expert guidance, and a dedicated space for your real estate media needs.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollAnimation delay={300}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-[#B40101]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <VideoCameraIcon className="h-8 w-8 text-[#B40101]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#B40101] mb-4">Professional Equipment</h3>
                  <p className="text-[#FCEBDC]/70">
                    State-of-the-art cameras, lighting, and audio equipment for professional results.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={400}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-[#03809c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <StarIcon className="h-8 w-8 text-[#03809c]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#03809c] mb-4">Expert Support</h3>
                  <p className="text-[#FCEBDC]/70">
                    Professional guidance and support throughout your entire session.
                  </p>
                </div>
              </ScrollAnimation>

              <ScrollAnimation delay={500}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 bg-[#f2a16d]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPinIcon className="h-8 w-8 text-[#f2a16d]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#f2a16d] mb-4">Convenient Location</h3>
                  <p className="text-[#FCEBDC]/70">
                    Centrally located studio with easy access and parking facilities.
                  </p>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollAnimation delay={200}>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#FCEBDC] mb-6">
                  Questions About Studio Booking?
                </h2>
                <p className="text-lg text-[#FCEBDC]/70 mb-8">
                  Get in touch with our studio team for any inquiries or special requests.
                </p>
              </ScrollAnimation>

              <ScrollAnimation delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="tel:+6512345678" 
                    className="inline-flex items-center gap-2 bg-[#B40101] text-white px-6 py-3 rounded-lg hover:bg-[#e0651a] transition"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    Call Us
                  </Link>
                  <Link 
                    href="mailto:studio@chiefmedia.com" 
                    className="inline-flex items-center gap-2 bg-[#FCEBDC] text-[#273F4F] px-6 py-3 rounded-lg hover:bg-[#FCEBDC]/90 transition"
                  >
                    <EnvelopeIcon className="h-5 w-5" />
                    Email Us
                  </Link>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </section>
      </div>

      {/* Notification */}
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