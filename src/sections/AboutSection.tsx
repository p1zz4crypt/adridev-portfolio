
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current || !rightColRef.current) return;
    
    const ctx = gsap.context(() => {
      // Parallax effect for images
      gsap.to(leftColRef.current.querySelector('.image-1'), {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
      
      gsap.to(leftColRef.current.querySelector('.image-2'), {
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-container py-24 relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[600px]" ref={leftColRef}>
          <div className="absolute top-0 right-0 w-4/5 h-auto z-10 image-1">
            <img 
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80" 
              alt="About Me 1"
              className="rounded-xl shadow-xl border border-white/10 dark:border-midnight/20 w-full h-auto aspect-square object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-4/5 h-auto z-0 image-2">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" 
              alt="About Me 2"
              className="rounded-xl shadow-xl border border-white/10 dark:border-midnight/20 w-full h-auto aspect-square object-cover"
            />
          </div>
        </div>
        
        <div ref={rightColRef}>
          <SectionTitle 
            subtitle="About Me"
            title="Passionate Frontend Developer with a Creative Edge"
            center={false}
          />
          
          <RevealOnScroll>
            <p className="mb-6 text-muted-foreground">
              I am a frontend developer with a passion for crafting elegant and intuitive user interfaces. My journey in web development began with a fascination for the intersection of design and technology, and it has evolved into a commitment to creating exceptional digital experiences.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.1}>
            <p className="mb-6 text-muted-foreground">
              With expertise in React, Tailwind CSS, and motion libraries like GSAP, I build responsive and performant web applications that not only meet functional requirements but also delight users with thoughtful animations and interactions.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-2">5+</h4>
                <p className="text-muted-foreground">Years of Experience</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">50+</h4>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">15+</h4>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">10+</h4>
                <p className="text-muted-foreground">Awards Received</p>
              </div>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.3}>
            <Button 
              size="lg" 
              className="group"
            >
              <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              Download CV
            </Button>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
