'use client';

import { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }[];
}

export default function Notification({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 5000,
  actions = []
}: NotificationProps) {
  const [isShowing, setIsShowing] = useState(isVisible);

  useEffect(() => {
    setIsShowing(isVisible);
    
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsShowing(false);
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckIcon className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XMarkIcon className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-400" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90 border-green-700';
      case 'error':
        return 'bg-red-900/90 border-red-700';
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-700';
      case 'info':
        return 'bg-blue-900/90 border-blue-700';
      default:
        return 'bg-blue-900/90 border-blue-700';
    }
  };

  if (!isShowing) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className={`${getBgColor()} border rounded-lg p-4 shadow-lg max-w-sm`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1">
            <p className="text-sm text-white">{message}</p>
            {actions.length > 0 && (
              <div className="flex space-x-2 mt-3">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick();
                      setIsShowing(false);
                      onClose();
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      action.variant === 'primary'
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'bg-transparent border border-white/30 text-white hover:bg-white/10'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                setIsShowing(false);
                onClose();
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 