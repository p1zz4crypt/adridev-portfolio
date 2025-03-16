
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
      period: '01/2024 – 12/2025 ',
      title: 'Front End Developer',
      company: 'Grupo Salinas',
      description: 'Diseñé y maqueté interfaces web utilizando React JS. / Implementé estilos con Bootstrap, Tailwind CSS, GSAP y CSS personalizado. / Colaboré en la implementación de la primera Blockchain dentro del despacho de Auditoría, desarrollando contratos inteligentes en Solidity'
    },
    {
      period: '01/2023 – 12/2023',
      title: 'Front End Developer Jr',
      company: 'SPS Solutions',
      description: 'Realicé la migración de sitios web para mejorar la tecnología utilizada. / Desarrollé interfaces visuales empleando Vanilla JavaScript, React y Vue. / Apliqué Bootstrap, MaterialUI, GSAP y CSS personalizado para enriquecer la experiencia del usuario.'
    },
    {
      period: '01/2019 – 12/2022',
      title: 'Frontend Developer',
      company: 'Eterna Digital',
      description: 'Maqueté sitios web y desarrollé interfaces visuales y webApps usando Vue.js. / Gestioné el estado de la aplicación mediante Vuex para optimizar su rendimiento. / Implementé Vuetify y CSS personalizado, integrando APIs y manejando datos con Firebase. / Desarrollé funciones CRUD y visualicé datos a través de gráficos interactivos.'
    },
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
    <section id="experience" ref={sectionRef} className="bg-gradient-section-5 dark:bg-gradient-section-5-dark ">
      <div className='section-container py-24 '>
      <SectionTitle 
        subtitle="Experiencia"
        title="Mi viaje profesional"
        description="Una línea de tiempo de mi carrera y crecimiento profesional en el desarrollo frontend."
        center={true}
      />
      
      <div ref={timelineRef} className="mt-16 relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border timeline-line transform md:-translate-x-1/2"></div>
        
        {/* Experience items */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className={`relative grid md:grid-cols-2 gap-8 md:gap-12 pl-3 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
              <RevealOnScroll
                direction={index % 2 === 0 ? 'right' : 'left'}
                className='md:text-right'
                // className={`md:text-right ${index % 2 === 1 ? 'md:col-start-2' : ''}`}



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
                <p className="text-muted-foreground" style={{ width: "80%"}}>
                  {exp.description}
                </p>
              </RevealOnScroll>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
