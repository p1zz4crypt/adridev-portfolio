
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const projects = [
    {
      title: 'AI-Powered Portfolio Generator',
      description: 'A web application that uses AI to generate personalized portfolio websites for creative professionals based on their work and preferences.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'TypeScript', 'OpenAI API', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Web3 NFT Marketplace',
      description: 'A decentralized marketplace for trading digital collectibles with advanced filtering, real-time updates, and integrated wallet connectivity.',
      image: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?auto=format&fit=crop&w=800&q=80',
      tags: ['Next.js', 'Ethers.js', 'GSAP', 'Solidity'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Interactive Data Visualization Dashboard',
      description: 'A responsive dashboard featuring complex data visualizations with interactive filtering capabilities and animated state transitions.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80',
      tags: ['React', 'D3.js', 'Framer Motion', 'Recharts'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top center',
        end: 'bottom center',
        toggleClass: { targets: sectionRef.current, className: 'active' }
      });
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-container py-24">
      <SectionTitle 
        subtitle="Featured Projects"
        title="My Creative Portfolio"
        description="Explore a selection of my recent projects, showcasing my skills and expertise in frontend development."
        center={true}
      />
      
      <div className="space-y-24 mt-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tags={project.tags}
            liveUrl={project.liveUrl}
            githubUrl={project.githubUrl}
            reversed={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
