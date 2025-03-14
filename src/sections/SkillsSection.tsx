
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Sparkles, Globe, Brain, Rocket } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import SkillCard from '@/components/SkillCard';
import ParallaxText from '@/components/ParallaxText';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const skills = [
    {
      icon: <Code className="h-10 w-10" />,
      title: 'Frontend Development',
      description: 'Crafting responsive and accessible user interfaces with React, Vue, and modern JavaScript.'
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing designs with a focus on user experience and aesthetics.'
    },
    {
      icon: <Sparkles className="h-10 w-10" />,
      title: 'Animation & Interaction',
      description: 'Building captivating user experiences with GSAP, Framer Motion, and CSS animations.'
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: 'Web3 Development',
      description: 'Developing decentralized applications and integrating blockchain technologies.'
    },
    {
      icon: <Brain className="h-10 w-10" />,
      title: 'AI Integration',
      description: 'Incorporating AI and machine learning capabilities into web applications.'
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: 'Performance Optimization',
      description: 'Ensuring fast load times and smooth interactions through optimization techniques.'
    }
  ];

  const technologies = [
    'React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'GSAP', 'Framer Motion',
    'JavaScript', 'Vue.js', 'Node.js', 'GraphQL', 'Web3.js', 'Figma',
    'HTML5', 'CSS3', 'SASS', 'Redux', 'Zustand', 'Storybook'
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
    <section id="skills" ref={sectionRef} className="py-24 bg-secondary/50 relative">
      <div className="section-container">
        <SectionTitle 
          subtitle="My Skills"
          title="Expertise & Technologies"
          description="I specialize in creating modern and engaging web experiences with cutting-edge technologies."
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
        
        <div className="py-8">
          <h3 className="text-2xl font-semibold text-center mb-8">Technologies I Work With</h3>
          
          <div className="overflow-hidden py-6">
            <ParallaxText baseVelocity={-2}>
              <div className="flex gap-8 px-4">
                {technologies.slice(0, technologies.length / 2).map((tech, index) => (
                  <span 
                    key={index}
                    className="text-2xl font-semibold text-foreground whitespace-nowrap px-4"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ParallaxText>
            
            <ParallaxText baseVelocity={2} className="mt-8">
              <div className="flex gap-8 px-4">
                {technologies.slice(technologies.length / 2).map((tech, index) => (
                  <span 
                    key={index}
                    className="text-2xl font-semibold text-foreground whitespace-nowrap px-4"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ParallaxText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
