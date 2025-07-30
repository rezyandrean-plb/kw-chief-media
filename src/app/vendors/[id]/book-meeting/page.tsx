'use client';

import { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useEnquiries } from '@/lib/enquiries';
import { 
  ClockIcon,
  UserIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import AnimatedBackground from '../../../../components/AnimatedBackground';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface MeetingDate {
  date: string;
  day: string;
  available: boolean;
  timeSlots: TimeSlot[];
}

export default function BookMeetingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { enquiries, updateEnquiryStatus } = useEnquiries();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState<string>('video');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const offerings = searchParams.get('offerings')?.split(',') || [];

  // Mock available dates and times - in real app, fetch from vendor's calendar
  const availableDates: MeetingDate[] = [
    {
      date: '2024-01-15',
      day: 'Mon',
      available: true,
      timeSlots: [
        { id: '1', time: '09:00', available: true },
        { id: '2', time: '10:00', available: true },
        { id: '3', time: '11:00', available: false },
        { id: '4', time: '14:00', available: true },
        { id: '5', time: '15:00', available: true },
        { id: '6', time: '16:00', available: true },
      ]
    },
    {
      date: '2024-01-16',
      day: 'Tue',
      available: true,
      timeSlots: [
        { id: '7', time: '09:00', available: true },
        { id: '8', time: '10:00', available: false },
        { id: '9', time: '11:00', available: true },
        { id: '10', time: '14:00', available: true },
        { id: '11', time: '15:00', available: true },
        { id: '12', time: '16:00', available: false },
      ]
    },
    {
      date: '2024-01-17',
      day: 'Wed',
      available: true,
      timeSlots: [
        { id: '13', time: '09:00', available: true },
        { id: '14', time: '10:00', available: true },
        { id: '15', time: '11:00', available: true },
        { id: '16', time: '14:00', available: false },
        { id: '17', time: '15:00', available: true },
        { id: '18', time: '16:00', available: true },
      ]
    },
    {
      date: '2024-01-18',
      day: 'Thu',
      available: true,
      timeSlots: [
        { id: '19', time: '09:00', available: false },
        { id: '20', time: '10:00', available: true },
        { id: '21', time: '11:00', available: true },
        { id: '22', time: '14:00', available: true },
        { id: '23', time: '15:00', available: true },
        { id: '24', time: '16:00', available: true },
      ]
    },
    {
      date: '2024-01-19',
      day: 'Fri',
      available: true,
      timeSlots: [
        { id: '25', time: '09:00', available: true },
        { id: '26', time: '10:00', available: true },
        { id: '27', time: '11:00', available: true },
        { id: '28', time: '14:00', available: true },
        { id: '29', time: '15:00', available: false },
        { id: '30', time: '16:00', available: true },
      ]
    }
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Find the most recent enquiry for this vendor and user
    const userEnquiries = enquiries.filter(e => 
      e.vendorId === params.id && e.realtorId === user?.id
    );
    
    if (userEnquiries.length > 0) {
      const latestEnquiry = userEnquiries[userEnquiries.length - 1];
      // Update the enquiry with meeting details
      updateEnquiryStatus(latestEnquiry.id, 'approved');
      // In a real app, you'd also update the meeting details
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const selectedDateData = availableDates.find(d => d.date === selectedDate);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        <AnimatedBackground />
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#B40101] relative z-10"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
          <div className="px-4 py-6 sm:px-0">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <CheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-[#FCEBDC] mb-4">
                Meeting Booked Successfully!
              </h1>
              <p className="text-xl text-[#FCEBDC]/80 mb-8">
                Your meeting has been scheduled. You&apos;ll receive a confirmation email shortly.
              </p>
              <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold text-[#FCEBDC] mb-4">Meeting Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-sm text-[#FCEBDC]/60">Date</p>
                    <p className="text-[#FCEBDC]">{selectedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#FCEBDC]/60">Time</p>
                    <p className="text-[#FCEBDC]">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#FCEBDC]/60">Meeting Type</p>
                    <p className="text-[#FCEBDC] capitalize">{meetingType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#FCEBDC]/60">Vendor</p>
                    <p className="text-[#FCEBDC]">TUBEAR</p>
                  </div>
                </div>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-[#B40101] text-white px-6 py-3 rounded-lg hover:bg-[#e0651a] transition font-medium"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => router.push('/vendors')}
                  className="border border-[#273F4F]/20 text-[#FCEBDC] px-6 py-3 rounded-lg hover:bg-[#273F4F]/10 transition"
                >
                  Browse More Vendors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-[#FCEBDC]/80 hover:text-[#FCEBDC] mb-6 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Vendor
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#FCEBDC] mb-4">
              Schedule a Meeting
            </h1>
            <p className="text-xl text-[#FCEBDC]/80">
              Book a consultation with TUBEAR to discuss your project requirements
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#FCEBDC] mb-6">Select Date & Time</h2>
                
                {/* Date Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-[#FCEBDC] mb-4">Available Dates</h3>
                  <div className="grid grid-cols-5 gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date.date}
                        onClick={() => handleDateSelect(date.date)}
                        className={`p-4 rounded-lg border transition-colors ${
                          selectedDate === date.date
                            ? 'border-[#B40101] bg-[#B40101]/10'
                            : 'border-[#273F4F]/20 hover:border-[#273F4F]/40'
                        }`}
                      >
                        <div className="text-sm text-[#FCEBDC]/60">{date.day}</div>
                        <div className="text-lg font-semibold text-[#FCEBDC]">
                          {new Date(date.date).getDate()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && selectedDateData && (
                  <div>
                    <h3 className="text-lg font-medium text-[#FCEBDC] mb-4">Available Times</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedDateData.timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 rounded-lg border transition-colors ${
                            selectedTime === slot.time
                              ? 'border-[#B40101] bg-[#B40101]/10'
                              : slot.available
                              ? 'border-[#273F4F]/20 hover:border-[#273F4F]/40'
                              : 'border-[#273F4F]/10 bg-[#273F4F]/10 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <ClockIcon className="h-4 w-4 mr-2 text-[#FCEBDC]/60" />
                            <span className={`font-medium ${
                              slot.available ? 'text-[#FCEBDC]' : 'text-[#FCEBDC]/40'
                            }`}>
                              {slot.time}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="lg:col-span-1">
              <div className="bg-black border border-[#273F4F]/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-[#FCEBDC] mb-6">Meeting Details</h2>
                
                {/* User Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#FCEBDC] mb-4">Your Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-[#03809c] mr-3" />
                      <div>
                        <p className="text-sm text-[#FCEBDC]/60">Name</p>
                        <p className="text-[#FCEBDC]">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-5 w-5 text-[#03809c] mr-3" />
                      <div>
                        <p className="text-sm text-[#FCEBDC]/60">Email</p>
                        <p className="text-[#FCEBDC]">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selected Services */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#FCEBDC] mb-4">Selected Services</h3>
                  <div className="space-y-2">
                    {offerings.map((offering, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#03809c] rounded-full mr-3"></div>
                        <span className="text-[#FCEBDC] capitalize">
                          {offering.replace('-', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meeting Type */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-[#FCEBDC] mb-4">Meeting Type</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="meetingType"
                        value="video"
                        checked={meetingType === 'video'}
                        onChange={(e) => setMeetingType(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-[#FCEBDC]">Video Call</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="meetingType"
                        value="phone"
                        checked={meetingType === 'phone'}
                        onChange={(e) => setMeetingType(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-[#FCEBDC]">Phone Call</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="meetingType"
                        value="in-person"
                        checked={meetingType === 'in-person'}
                        onChange={(e) => setMeetingType(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-[#FCEBDC]">In-Person</span>
                    </label>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-lg font-medium text-[#FCEBDC] mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any specific requirements or questions..."
                    className="w-full p-3 border border-[#273F4F]/20 rounded-lg bg-black text-[#FCEBDC] focus:outline-none focus:ring-[#B40101] focus:border-[#B40101]"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  className="w-full bg-[#B40101] text-white py-3 px-4 rounded-lg hover:bg-[#e0651a] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Booking...' : 'Book Meeting'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 