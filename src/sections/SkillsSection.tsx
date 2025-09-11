
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Sparkles, Globe, Brain, Rocket } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import SkillCard from '@/components/SkillCard';
import ParallaxText from '@/components/ParallaxText';
import { ShoppingCart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const skills = [
    {
      icon: <Code className="h-10 w-10" />,
      title: 'Desarrollo Front End',
      description: 'Interfaces modernas y responsivas. Componentes reutilizables y rendimiento.'
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: 'Diseño UI/UX',
      description: 'Diseño y prototipado de interfaces intuitivas y accesibles, enfocadas en mejorar la experiencia del usuario.'
    },
    {
      icon: <ShoppingCart className="h-10 w-10" />,
      title: "Shopify — Tiendas & Temas",
      description: "Conocimientos de diseño, desarrollo y personalización de tiendas Shopify."
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: 'Web3',
      description: 'Conocimientos en blockchain e implementaciones prácticas para trazabilidad.'
    },
    {
      icon: <Brain className="h-10 w-10" />,
      title: 'Integración AI',
      description: 'Conocimientos en la creación de pipelines de media generativa y LLMs para acelerar creativos y decisiones.'
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: 'Siguiente habilidad...',
      description: 'Siempre aprendiendo. ¿Qué tecnología debería explorar ahora? ¡Estoy lista para el siguiente reto!'
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'GSAP',
    'JavaScript', 'Vue.js', 'Node.js', 'Solidity', 'Figma',
    'HTML5', 'CSS3', 'Redux', 'Oracle', 'Fireblocks'
  ];

  useEffect(() => {
    if (!sectionRef.current || !skillsRef.current) return;

    const ctx = gsap.context(() => {
      const cards = skillsRef.current?.querySelectorAll('.skill-card');

      if (cards) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top bottom-=100',
            end: 'center center',
            toggleActions: 'play none none reverse'
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="bg-gradient-section-3 dark:bg-gradient-section-3-dark py-24 bg-secondary/50 relative">
      <div className="section-container">
        <SectionTitle
          subtitle="My Skills"
          title="Expertise y Technologías"
          description=""
          center={true}
        />

        <div
          ref={skillsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {skills.map((skill, index) => (
            <SkillCard
              key={index}
              icon={skill.icon}
              title={skill.title}
              description={skill.description}
              className="skill-card"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
