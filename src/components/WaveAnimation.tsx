
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface WaveAnimationProps {
  className?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ className = '' }) => {
  const waveRef = useRef<SVGPathElement>(null);
  
  useEffect(() => {
    if (!waveRef.current) return;
    
    const wave = waveRef.current;
    
    gsap.to(wave, {
      attr: { d: 'M0,128 C100,150 200,100 300,128 C400,150 500,100 600,128 C700,150 800,100 900,128 C1000,150 1100,100 1200,128 C1300,150 1400,100 1500,128 C1600,150 1700,100 1800,128 C1900,150 2000,100 2100,128 V256 H0 Z' },
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    return () => {
      gsap.killTweensOf(wave);
    };
  }, []);
  
  return (
    <div className={`absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-0 ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 2100 256" 
        preserveAspectRatio="none" 
        className="w-full h-auto"
      >
        <path 
          ref={waveRef}
          fill="url(#wave-gradient)" 
          fillOpacity="0.2"
          d="M0,128 C100,100 200,150 300,128 C400,100 500,150 600,128 C700,100 800,150 900,128 C1000,100 1100,150 1200,128 C1300,100 1400,150 1500,128 C1600,100 1700,150 1800,128 C1900,100 2000,150 2100,128 V256 H0 Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--ring))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default WaveAnimation;
