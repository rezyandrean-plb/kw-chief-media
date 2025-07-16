'use client';

import { useState, useEffect } from 'react';

interface FloatingNumberProps {
  number: string;
  color: string;
  delay?: number;
}

export default function FloatingNumber({ number, color, delay = 0 }: FloatingNumberProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [displayNumber, setDisplayNumber] = useState('0');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Animate the number counting up
      const targetNumber = parseInt(number.replace(/\D/g, ''));
      const duration = 2000;
      const steps = 60;
      const increment = targetNumber / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          current = targetNumber;
          clearInterval(interval);
        }
        
        const prefix = number.startsWith('+') ? '+' : '';
        const suffix = number.includes('%') ? '%' : '';
        setDisplayNumber(`${prefix}${Math.floor(current)}${suffix}`);
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [number, delay]);

  return (
    <div 
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div 
        className="text-4xl lg:text-5xl font-bold mb-2 animate-bounce"
        style={{ color }}
      >
        {displayNumber}
      </div>
    </div>
  );
} 