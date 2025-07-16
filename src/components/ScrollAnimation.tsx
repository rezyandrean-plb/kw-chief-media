'use client';

import { useState, useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ScrollAnimation({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      const currentRef = ref.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  const getTransformClass = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';
      case 'down':
        return isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0';
      case 'left':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0';
      case 'right':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0';
      default:
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
} 