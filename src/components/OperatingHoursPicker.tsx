'use client';

import { useState, useEffect } from 'react';
import { ClockIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import TimePicker from './TimePicker';

interface OperatingHours {
  [key: string]: {
    isOpen: boolean;
    startTime: string;
    endTime: string;
  };
}

interface OperatingHoursPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export default function OperatingHoursPicker({ value, onChange, className = "" }: OperatingHoursPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [operatingHours, setOperatingHours] = useState<OperatingHours>({
    monday: { isOpen: false, startTime: '', endTime: '' },
    tuesday: { isOpen: false, startTime: '', endTime: '' },
    wednesday: { isOpen: false, startTime: '', endTime: '' },
    thursday: { isOpen: false, startTime: '', endTime: '' },
    friday: { isOpen: false, startTime: '', endTime: '' },
    saturday: { isOpen: false, startTime: '', endTime: '' },
    sunday: { isOpen: false, startTime: '', endTime: '' },
  });

  useEffect(() => {
    // Parse existing value if it exists
    if (value) {
      const parsed = parseOperatingHours(value);
      setOperatingHours(parsed);
    }
  }, [value]);

  const parseOperatingHours = (hoursString: string): OperatingHours => {
    const defaultHours = {
      monday: { isOpen: false, startTime: '', endTime: '' },
      tuesday: { isOpen: false, startTime: '', endTime: '' },
      wednesday: { isOpen: false, startTime: '', endTime: '' },
      thursday: { isOpen: false, startTime: '', endTime: '' },
      friday: { isOpen: false, startTime: '', endTime: '' },
      saturday: { isOpen: false, startTime: '', endTime: '' },
      sunday: { isOpen: false, startTime: '', endTime: '' },
    };

    try {
      // Try to parse as JSON first
      return JSON.parse(hoursString);
    } catch {
      // If not JSON, try to parse simple format like "Monday - Friday: 9:00 AM - 6:00 PM"
      const parts = hoursString.split(':');
      if (parts.length >= 2) {
        const timeRange = parts[parts.length - 1].trim();
        const timeMatch = timeRange.match(/(\d{1,2}:\d{2}\s*[AP]M)\s*-\s*(\d{1,2}:\d{2}\s*[AP]M)/);
        
        if (timeMatch) {
          const startTime = timeMatch[1];
          const endTime = timeMatch[2];
          
          // Determine which days are open based on the text
          const dayText = parts[0].toLowerCase();
          const updatedHours = { ...defaultHours };
          
          if (dayText.includes('monday') && dayText.includes('friday')) {
            ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
              (updatedHours as OperatingHours)[day] = { isOpen: true, startTime, endTime };
            });
          } else if (dayText.includes('weekend')) {
            ['saturday', 'sunday'].forEach(day => {
              (updatedHours as OperatingHours)[day] = { isOpen: true, startTime, endTime };
            });
          } else {
            // Set all days to the same time
            Object.keys(updatedHours).forEach(day => {
              (updatedHours as OperatingHours)[day] = { isOpen: true, startTime, endTime };
            });
          }
          
          return updatedHours;
        }
      }
    }
    
    return defaultHours;
  };

  const formatOperatingHours = (hours: OperatingHours): string => {
    const openDays = Object.entries(hours).filter(([, data]) => data.isOpen);
    
    if (openDays.length === 0) {
      return 'Closed';
    }

    // Group consecutive days with same hours
    const groups: Array<{ days: string[], startTime: string, endTime: string }> = [];
    
    openDays.forEach(([day, data]) => {
      const existingGroup = groups.find(group => 
        group.startTime === data.startTime && group.endTime === data.endTime
      );
      
      if (existingGroup) {
        existingGroup.days.push(day);
      } else {
        groups.push({
          days: [day],
          startTime: data.startTime,
          endTime: data.endTime
        });
      }
    });

    return groups.map(group => {
      const dayLabels = group.days.map(day => 
        DAYS_OF_WEEK.find(d => d.key === day)?.label
      );
      
      if (group.days.length === 1) {
        return `${dayLabels[0]}: ${group.startTime} - ${group.endTime}`;
      } else {
        const firstDay = dayLabels[0];
        const lastDay = dayLabels[group.days.length - 1];
        return `${firstDay} - ${lastDay}: ${group.startTime} - ${group.endTime}`;
      }
    }).join(', ');
  };

  const handleDayToggle = (day: string) => {
    const updated = {
      ...operatingHours,
      [day]: {
        ...operatingHours[day],
        isOpen: !operatingHours[day].isOpen
      }
    };
    setOperatingHours(updated);
    onChange(JSON.stringify(updated));
  };

  const handleTimeChange = (day: string, field: 'startTime' | 'endTime', value: string) => {
    const updated = {
      ...operatingHours,
      [day]: {
        ...operatingHours[day],
        [field]: value
      }
    };
    setOperatingHours(updated);
    onChange(JSON.stringify(updated));
  };

  const getDisplayValue = () => {
    if (!value) return 'Set operating hours';
    return formatOperatingHours(operatingHours);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-3 text-black focus-within:ring-[#B40101] focus-within:border-[#B40101] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-black' : 'text-gray-500'}>
          {getDisplayValue()}
        </span>
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-5 w-5 text-gray-400" />
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-[400px]">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Operating Hours</h3>
            
            <div className="space-y-3">
              {DAYS_OF_WEEK.map(({ key, label }) => (
                <div key={key} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 min-w-[100px]">
                    <input
                      type="checkbox"
                      id={key}
                      checked={operatingHours[key].isOpen}
                      onChange={() => handleDayToggle(key)}
                      className="rounded border-gray-300 text-[#B40101] focus:ring-[#B40101]"
                    />
                    <label htmlFor={key} className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                  </div>
                  
                  {operatingHours[key].isOpen && (
                    <div className="flex items-center space-x-2 flex-1">
                      <TimePicker
                        value={`${operatingHours[key].startTime} - ${operatingHours[key].endTime}`}
                        onChange={(value) => {
                          const [start, end] = value.split(' - ');
                          handleTimeChange(key, 'startTime', start || '');
                          handleTimeChange(key, 'endTime', end || '');
                        }}
                        placeholder="Select time"
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 text-sm bg-[#B40101] text-white rounded hover:bg-[#e0651a]"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
