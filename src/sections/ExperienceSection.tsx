
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Separator } from '@/components/ui/separator';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const experiences = [
    {
      period: '2022 - Present',
      title: 'Senior Frontend Developer',
      company: 'TechInnovate Solutions',
      description: 'Led the development of multiple web applications using React, TypeScript, and modern frontend tools. Implemented complex animations and interactive features with GSAP and Framer Motion.'
    },
    {
      period: '2020 - 2022',
      title: 'UI/UX Developer',
      company: 'DesignCraft Studio',
      description: 'Designed and developed user interfaces for various clients, focusing on responsive design, accessibility, and performance optimization. Collaborated with designers to create intuitive and visually appealing interfaces.'
    },
    {
      period: '2018 - 2020',
      title: 'Frontend Developer',
      company: 'WebVision Agency',
      description: 'Built responsive websites and web applications for clients across various industries. Worked with JavaScript frameworks and modern CSS techniques to create engaging user experiences.'
    },
    {
      period: '2016 - 2018',
      title: 'Web Developer Intern',
      company: 'DigitalSphere Inc.',
      description: 'Assisted in the development of websites and web applications. Gained hands-on experience with HTML, CSS, JavaScript, and various frontend frameworks.'
    }
  ];
  
  useEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate timeline line
      const line = timelineRef.current?.querySelector('.timeline-line');
      
      if (line) {
        gsap.fromTo(
          line,
          { height: 0 },
          {
            height: '100%',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 1
            }
          }
        );
      }
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-container py-24 bg-secondary/50">
      <SectionTitle 
        subtitle="Experience"
        title="My Professional Journey"
        description="A timeline of my career path and professional growth in frontend development."
        center={true}
      />
      
      <div ref={timelineRef} className="mt-16 relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border timeline-line transform md:-translate-x-1/2"></div>
        
        {/* Experience items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className={`relative grid md:grid-cols-2 gap-8 md:gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <RevealOnScroll
                direction={index % 2 === 0 ? 'right' : 'left'}
                className={`md:text-right ${index % 2 === 1 ? 'md:col-start-2' : ''}`}
              >
                <div className="mb-1 text-primary font-medium">
                  {exp.period}
                </div>
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <div className="text-muted-foreground mb-4">{exp.company}</div>
              </RevealOnScroll>
              
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-1 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:-translate-x-1/2 z-10"></div>
              
              <RevealOnScroll
                direction={index % 2 === 1 ? 'right' : 'left'}
                className={index % 2 === 0 ? 'md:col-start-2' : ''}
              >
                <p className="text-muted-foreground">
                  {exp.description}
                </p>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
