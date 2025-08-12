'use client';

import { useState, useRef, useEffect } from 'react';
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface TimeRange {
  start: string;
  end: string;
}

export default function TimePicker({ value, onChange, placeholder = "Select time range", className = "" }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<TimeRange>({ start: '', end: '' });
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse existing value if it exists
    if (value) {
      const parts = value.split(' - ');
      if (parts.length === 2) {
        setSelectedRange({ start: parts[0], end: parts[1] });
      }
    }
  }, [value]);

  const handleClockClick = (e: React.MouseEvent) => {
    if (!clockRef.current) return;

    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const normalizedAngle = angle < 0 ? angle + 360 : angle;

    const time = angleToTime(normalizedAngle);
    
    if (!isSelectingEnd) {
      setSelectedRange(prev => ({ ...prev, start: time }));
      setIsSelectingEnd(true);
    } else {
      setSelectedRange(prev => ({ ...prev, end: time }));
      setIsSelectingEnd(false);
      const timeRange = `${selectedRange.start} - ${time}`;
      onChange(timeRange);
      setIsOpen(false);
    }
  };

  const angleToTime = (angle: number): string => {
    // Convert angle to 12-hour format
    const hour = Math.floor((angle + 90) / 30) % 12 || 12;
    const minute = Math.floor((angle % 30) * 2);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    
    return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };

  const timeToAngle = (time: string): number => {
    const [timePart, ampm] = time.split(' ');
    const [hour, minute] = timePart.split(':').map(Number);
    let displayHour = hour;
    
    if (ampm === 'PM' && hour !== 12) displayHour += 12;
    if (ampm === 'AM' && hour === 12) displayHour = 0;
    
    const totalMinutes = displayHour * 60 + minute;
    const angle = (totalMinutes / 720) * 360 - 90;
    return angle < 0 ? angle + 360 : angle;
  };

  const generateClockNumbers = () => {
    const numbers = [];
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30) - 90;
      const x = Math.cos(angle * Math.PI / 180) * 60;
      const y = Math.sin(angle * Math.PI / 180) * 60;
      
      numbers.push(
        <div
          key={i}
          className="absolute text-sm font-medium text-gray-700"
          style={{
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {i}
        </div>
      );
    }
    return numbers;
  };

  const generateClockHands = () => {
    const hands = [];
    
    if (selectedRange.start) {
      const startAngle = timeToAngle(selectedRange.start);
      hands.push(
        <div
          key="start"
          className="absolute w-1 bg-blue-500 rounded-full origin-bottom"
          style={{
            height: '60px',
            left: '50%',
            top: '50%',
            transform: `translateX(-50%) rotate(${startAngle}deg)`,
            transformOrigin: 'bottom center'
          }}
        />
      );
    }
    
    if (selectedRange.end) {
      const endAngle = timeToAngle(selectedRange.end);
      hands.push(
        <div
          key="end"
          className="absolute w-1 bg-red-500 rounded-full origin-bottom"
          style={{
            height: '60px',
            left: '50%',
            top: '50%',
            transform: `translateX(-50%) rotate(${endAngle}deg)`,
            transformOrigin: 'bottom center'
          }}
        />
      );
    }
    
    return hands;
  };

  const clearSelection = () => {
    setSelectedRange({ start: '', end: '' });
    setIsSelectingEnd(false);
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-3 text-black focus-within:ring-[#B40101] focus-within:border-[#B40101] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? 'text-black' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <ClockIcon className="h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Select Time Range</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">
              {isSelectingEnd ? 'Select end time' : 'Select start time'}
            </div>
            <div className="text-sm font-medium">
              {selectedRange.start && (
                <span className="text-blue-600">Start: {selectedRange.start}</span>
              )}
              {selectedRange.end && (
                <span className="text-red-600 ml-4">End: {selectedRange.end}</span>
              )}
            </div>
          </div>

          <div className="relative w-48 h-48 mx-auto mb-4">
            <div
              ref={clockRef}
              className="w-full h-full border-2 border-gray-300 rounded-full relative cursor-pointer"
              onClick={handleClockClick}
            >
              {/* Clock numbers */}
              {generateClockNumbers()}
              
              {/* Clock hands */}
              {generateClockHands()}
              
              {/* Center dot */}
              <div className="absolute w-3 h-3 bg-gray-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={clearSelection}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
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
