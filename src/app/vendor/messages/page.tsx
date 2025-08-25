'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

interface Conversation {
  id: number;
  client: string;
  project: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

export default function VendorMessages() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && (!user || user.role !== 'vendor')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mock data - in real app, this would come from API
  const conversations = [
    {
      id: 1,
      client: 'John Smith',
      project: 'Marina Bay Condo Photography',
      lastMessage: 'Hi! I have some questions about the photography requirements.',
      timestamp: '2 hours ago',
      unread: true,
      avatar: '/images/vendors/default-vendor.svg'
    },
    {
      id: 2,
      client: 'Sarah Johnson',
      project: 'Orchard Road 3D Tour',
      lastMessage: 'The 3D tour is ready for your review. Please check the link I sent.',
      timestamp: '1 day ago',
      unread: false,
      avatar: '/images/vendors/default-vendor.svg'
    },
    {
      id: 3,
      client: 'Mike Chen',
      project: 'Sentosa Cove Video Walkthrough',
      lastMessage: 'Thank you for the feedback! I\'ll make those adjustments.',
      timestamp: '3 days ago',
      unread: false,
      avatar: '/images/vendors/default-vendor.svg'
    }
  ];

  const messages = selectedConversation ? [
    {
      id: 1,
      sender: 'client',
      message: 'Hi! I have some questions about the photography requirements for the Marina Bay project.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      sender: 'user',
      message: 'Sure! What would you like to know?',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      sender: 'client',
      message: 'I was wondering about the specific areas you want photographed and if there are any particular angles or features you want to highlight.',
      timestamp: '30 minutes ago'
    }
  ] : [];

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

  const handleSendMessage = () => {
    if (message.trim()) {
      // In real app, this would send the message via API
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Header */}
      <div className="bg-[#273f4f] shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="mt-1 text-sm text-gray-500">
                Communicate with clients and team members
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-96">
            {/* Conversations List */}
            <div className="border-r border-gray-200 bg-gray-50">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Conversations</h2>
              </div>
              <div className="overflow-y-auto h-full">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-white transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-white' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={conversation.avatar}
                        alt={conversation.client}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {conversation.client}
                          </p>
                          {conversation.unread && (
                            <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 truncate">{conversation.project}</p>
                        <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-1">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="md:col-span-2 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConversation.avatar}
                        alt={selectedConversation.client}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {selectedConversation.client}
                        </h3>
                        <p className="text-sm text-gray-500">{selectedConversation.project}</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.sender === 'user'
                              ? 'bg-[#f37521] text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f37521] focus:border-transparent"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#f37521] hover:bg-[#e0651a] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <PaperAirplaneIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Choose a conversation from the list to start messaging.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
