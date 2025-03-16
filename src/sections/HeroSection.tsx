
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import videoSrc from "../assets/video.mp4"

const HeroSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.querySelectorAll('span'),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
          }
        );
      }

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'elastic.out(1, 0.75)',
            delay: 0.5
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="inline-block opacity-0"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section id="home" className="bg-gradient-section-1 dark:bg-gradient-section-1-dark min-h-screen relative flex items-center overflow-hidden pt-16">
      <ParticleBackground particleCount={70} />

      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* <p className="text-primary text-lg mb-3">Hola! </p> */}
          </motion.div>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block ">{splitText("Adriana")}</span>
            <span className="block ">{splitText("Rosas")}</span>
          </h1>

          <motion.p
            className="text-muted-foreground text-lg mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Front-end Developer con 6 años de experiencia en el desarrollo de
            aplicaciones web con Javascript, Vue y React. Tengo un gran interés
            en tecnologías como Blockchain, modelos de aprendizaje automático y animación web.
          </motion.p>



        </div>

        <div
          ref={imageRef}
          className="relative flex justify-center items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-azure/30 rounded-full blur-3xl opacity-70 animate-pulse-soft"></div>
            <div className="w-full h-full max-w-md mx-auto relative z-10">
              <video autoPlay loop muted playsInline width="640" height="360" className='w-full h-auto rounded-full object-cover aspect-square border-4 border-white/10 dark:border-midnight/10 shadow-xl'>
                <source src={videoSrc} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float"
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </a>
    </section>
  );
};

export default HeroSection;
