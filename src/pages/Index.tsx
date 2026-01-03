
import React, { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import SkillsSection from '@/sections/SkillsSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ExperienceSection from '@/sections/ExperienceSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/components/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Seo } from '@/Seo';
import NewVersion from '../sections/NewVersion';
import ScoreGen from "../sections/Score-Gen"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index: React.FC = () => {
  useEffect(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll('.reveal');
    
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('active'),
        onLeave: () => section.classList.remove('active'),
        onEnterBack: () => section.classList.add('active'),
        onLeaveBack: () => section.classList.remove('active'),
      });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetId,
            offsetY: 20
          },
          ease: 'power3.inOut'
        });
      });
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
    <Seo 
            title=" Sobre Adri Rosas| Experiencia y Habilidades"
            description="Front End Developer | Diseño UI | Tecnología Blockchain"
            type="profile"
            image="/images/og-me.png"
          />
    <div className="min-h-screen flex flex-col">
   
            
            {/*<NavBar />  */}
      
      <main className="flex-grow">
        <NewVersion />


        <ProjectsSection />

        {/*<NewVersion /> */}
        {/*<HeroSection /> */}
        {/*<AboutSection /> */}
         {/*<ScoreGen /> */}
        
        {/*<SkillsSection /> */}
        {/*<ProjectsSection /> */}
        {/*<ExperienceSection /> */}
        {/*<ContactSection /> */}
      </main>
      
       {/*<Footer /> */}
    </div>
    </>
  );
};

export default Index;
