import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import videoPoster from '../assets/rbtf-img.png'; 
import { Seo } from '@/Seo';

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // 1. Componente de placeholder estático para móviles
  const StaticPlaceholder = () => (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <img
        src={videoPoster}
        alt="Adriana Rosas - Frontend Developer"
        className="w-full h-full rounded-full object-cover border-4 border-white/10 dark:border-midnight/10 shadow-xl"
        loading="eager"
      />
    </div>
  );

  // 2. Video optimizado con carga diferida
  const OptimizedVideo = () => {
    useEffect(() => {
      if (videoRef.current) {
        // Carga diferida del video
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !videoLoaded) {
              const video = entry.target as HTMLVideoElement;
              video.load();
              setVideoLoaded(true);
              observer.disconnect();
            }
          });
        }, { threshold: 0.1 });

        observer.observe(videoRef.current);
      }
    }, []);

    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-azure/30 rounded-full blur-3xl opacity-70 animate-pulse-soft"></div>
        <div className="w-full h-full max-w-md mx-auto relative z-10">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="none"
            poster={videoPoster}
            width="640"
            height="360"
            className="w-full h-auto rounded-full object-cover aspect-square border-4 border-white/10 dark:border-midnight/10 shadow-xl"
            disablePictureInPicture
            disableRemotePlayback
            onLoadedData={() => setVideoLoaded(true)}
          >
            <source src="/optimized-video.webm" type="video/webm" />
            <source src="/optimized-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    );
  };

  // 3. Efectos de animación optimizados
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    if (!isMobile) {
      const ctx = gsap.context(() => {
        gsap.to(titleRef.current?.querySelectorAll('span'), {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.1
        });
      });
      return () => ctx.revert();
    }
  }, [isMobile]);

  return (
    <>
      <Seo 
        title="Adriana Rosas"
        description=" Front-end Developer | Diseño UX/UI & AI Workflows | Tecnología Blockchain"
        type="profile"
        image="/public/og-image.png"
      />
      
      <section id="home" className="bg-gradient-section-1 dark:bg-gradient-section-1-dark min-h-screen relative flex items-center overflow-hidden pt-16">
        {isMobile ? null : <ParticleBackground particleCount={20} />}
        
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className=''>

            <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-8xl font-bold mb-2 leading-tight">
              <span className="block" style={isMobile ? {} : { opacity: 0 }}>Adriana</span>
              <span className="block" style={isMobile ? {} : { opacity: 0 }}>Rosas</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg text-foreground  dark:text-foreground">
               Front-end Developer | Diseño UX/UI & AI Workflows | Tecnología Blockchain
            </p>
            </div>
            
          </div>

          {isMobile ? <StaticPlaceholder /> : <OptimizedVideo />}
        </div>

        <a href="#about" className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <ArrowDown className="w-6 h-6 text-primary" />
        </a>
      </section>
    </>
  );
};

export default HeroSection;