'use client';

import { useEffect, useRef } from 'react';

interface HeroAnimatedBackgroundProps {
  className?: string;
}

export default function HeroAnimatedBackground({ className = '' }: HeroAnimatedBackgroundProps) {
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
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'circle' | 'square' | 'triangle';
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const waves: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
      speed: number;
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2, // Faster movement
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.6 + 0.3,
          type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle',
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
        });
      }
    };

    // Initialize waves
    const initWaves = () => {
      waves.length = 0;
      for (let i = 0; i < 5; i++) {
        waves.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: Math.random() * 200 + 100,
          opacity: Math.random() * 0.2 + 0.1,
          speed: Math.random() * 3 + 2,
        });
      }
    };

    initParticles();
    initWaves();

    // Draw triangle
    const drawTriangle = (x: number, y: number, size: number, rotation: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.closePath();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        // Wrap around edges
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Draw particle based on type
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'circle') {
          ctx.fillStyle = '#03809c';
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === 'square') {
          ctx.fillStyle = '#f37521';
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
          ctx.restore();
        } else if (particle.type === 'triangle') {
          ctx.fillStyle = '#f2a16d';
          drawTriangle(particle.x, particle.y, particle.size, particle.rotation);
          ctx.fill();
        }
        
        ctx.restore();
      });

      // Update and draw waves
      waves.forEach((wave, index) => {
        wave.radius += wave.speed;
        
        if (wave.radius > wave.maxRadius) {
          // Reset wave
          waves[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 0,
            maxRadius: Math.random() * 200 + 100,
            opacity: Math.random() * 0.2 + 0.1,
            speed: Math.random() * 3 + 2,
          };
        }

        // Draw wave
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(252, 235, 220, ${wave.opacity * (1 - wave.radius / wave.maxRadius)})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Draw connecting lines between nearby particles
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach((particle2) => {
          const distance = Math.sqrt(
            Math.pow(particle1.x - particle2.x, 2) + Math.pow(particle1.y - particle2.y, 2)
          );
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `rgba(39, 63, 79, ${0.15 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Add some floating geometric shapes
      if (Math.random() < 0.02) { // 2% chance each frame
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 10;
        
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = '#fcebdc';
        
        if (Math.random() < 0.5) {
          // Draw diamond
          ctx.beginPath();
          ctx.moveTo(x, y - size);
          ctx.lineTo(x + size, y);
          ctx.lineTo(x, y + size);
          ctx.lineTo(x - size, y);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.fill();
        }
        
        ctx.restore();
      }

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