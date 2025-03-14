
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

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
    <section id="home" className="min-h-screen relative flex items-center overflow-hidden pt-16">
      <ParticleBackground particleCount={70} />
      
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-primary text-lg mb-3">Hello, I'm a</p>
          </motion.div>
          
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block mb-2">{splitText("Frontend")}</span>
            <span className="block mb-2">{splitText("Developer")}</span>
            <span className="text-gradient">{splitText("& Designer")}</span>
          </h1>
          
          <motion.p
            className="text-muted-foreground text-lg mb-8 max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Creating beautiful, interactive, and high-performance web experiences 
            with modern technologies and innovative design solutions.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white"
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline"
            >
              Contact Me
            </Button>
          </motion.div>
          
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-scale"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-scale"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-scale"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
        
        <div 
          ref={imageRef}
          className="relative flex justify-center items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 to-azure/30 rounded-full blur-3xl opacity-70 animate-pulse-soft"></div>
            <div className="w-full h-full max-w-md mx-auto relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=800&q=80" 
                alt="Developer" 
                className="w-full h-auto rounded-full object-cover aspect-square border-4 border-white/10 dark:border-midnight/10 shadow-xl"
              />
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
