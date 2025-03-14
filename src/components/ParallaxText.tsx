
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  baseVelocity?: number;
  children: React.ReactNode;
  className?: string;
}

const ParallaxText: React.FC<ParallaxTextProps> = ({ 
  children, 
  baseVelocity = 2,
  className = ""
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    const text = textRef.current;
    const container = containerRef.current;
    
    // Clone the text to create a seamless loop
    text.innerHTML = text.innerHTML + text.innerHTML;
    
    const textWidth = text.offsetWidth / 2;
    
    gsap.to(text, {
      x: -textWidth,
      ease: "none",
      duration: 20 / Math.abs(baseVelocity),
      repeat: -1,
      overwrite: true
    });
    
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Adjust the speed based on scroll direction
        const scrollDirection = self.direction;
        const speedMultiplier = scrollDirection > 0 ? 1 : -1;
        
        gsap.to(text, {
          timeScale: baseVelocity * speedMultiplier,
          overwrite: true
        });
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [baseVelocity]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden whitespace-nowrap ${className}`}
    >
      <div 
        ref={textRef} 
        className="inline-block"
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxText;
