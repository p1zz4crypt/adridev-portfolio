
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleCount = 50,
  particleColor = 'hsl(var(--primary))',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1
    }));
    
    // Animation loop
    const tickerFunction = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen edges
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw particle
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Connect particles that are close to each other
      connectParticles(ctx);
    };
    
    // Add the ticker function to GSAP
    gsap.ticker.add(tickerFunction);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gsap.ticker.remove(tickerFunction);
    };
  }, [particleCount, particleColor]);
  
  const connectParticles = (ctx: CanvasRenderingContext2D) => {
    const maxDistance = 150;
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const particleA = particlesRef.current[i];
        const particleB = particlesRef.current[j];
        
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = particleColor;
          ctx.globalAlpha = (maxDistance - distance) / maxDistance * 0.2;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particleA.x, particleA.y);
          ctx.lineTo(particleB.x, particleB.y);
          ctx.stroke();
        }
      }
    }
  };
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 -z-10 ${className}`}
    />
  );
};

export default ParticleBackground;
