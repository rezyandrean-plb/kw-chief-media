'use client';

import { useEffect, useState, useCallback } from 'react';

interface CounterProps {
  target: number;
  color: string;
  className?: string;
}

export default function Counter({ target, color, className = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateCounter = useCallback(() => {
    const duration = 2000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentCount = Math.floor(progress * target);
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [target]);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter();
        }
      });
    });

    const element = document.querySelector(`[data-counter="${target}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated, animateCounter]);

  return (
    <div 
      className={`text-4xl lg:text-6xl font-bold mb-4 ${className}`}
      style={{ color }}
      data-counter={target}
    >
      {count}+
    </div>
  );
} 