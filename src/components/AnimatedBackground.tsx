'use client';

import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    const dots: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    const lines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      life: number;
    }> = [];

    // Initialize dots
    const initDots = () => {
      dots.length = 0;
      for (let i = 0; i < 15; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Initialize lines
    const initLines = () => {
      lines.length = 0;
      for (let i = 0; i < 8; i++) {
        lines.push({
          x1: Math.random() * canvas.width,
          y1: Math.random() * canvas.height,
          x2: Math.random() * canvas.width,
          y2: Math.random() * canvas.height,
          opacity: Math.random() * 0.3 + 0.1,
          life: Math.random() * 100 + 50,
        });
      }
    };

    initDots();
    initLines();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw dots
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off edges
        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 117, 33, ${dot.opacity})`;
        ctx.fill();
      });

      // Update and draw lines
      lines.forEach((line, index) => {
        line.life--;
        
        if (line.life <= 0) {
          // Create new line
          lines[index] = {
            x1: Math.random() * canvas.width,
            y1: Math.random() * canvas.height,
            x2: Math.random() * canvas.width,
            y2: Math.random() * canvas.height,
            opacity: Math.random() * 0.3 + 0.1,
            life: Math.random() * 100 + 50,
          };
        }

        // Draw line
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(3, 128, 156, ${line.opacity * (line.life / 100)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw connecting lines between nearby dots
      dots.forEach((dot1, i) => {
        dots.slice(i + 1).forEach((dot2) => {
          const distance = Math.sqrt(
            Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2)
          );
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.strokeStyle = `rgba(242, 161, 109, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
} 