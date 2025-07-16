'use client';

import { useState, useEffect } from 'react';

interface AnimatedIconProps {
  children: React.ReactNode;
  color: string;
  size?: number;
  delay?: number;
}

export default function AnimatedIcon({ children, color, size = 64, delay = 0 }: AnimatedIconProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`relative transition-all duration-1000 ease-out ${
        isAnimating ? 'scale-110' : 'scale-100'
      }`}
      style={{ 
        width: size, 
        height: size,
        color: color 
      }}
    >
      <div className="absolute inset-0 bg-current rounded-full opacity-20 animate-pulse"></div>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
} 