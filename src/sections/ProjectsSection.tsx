
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
// Imagenes
import MaxCluster from "../assets/img/projects/maxc/mc.webp"
import MaxCluster2 from "../assets/img/projects/maxc/mc2.webp"
import MaxPortada from "../assets/img/projects/maxc/maxc.webp"
import Docu from "../assets/img/projects/maxc/docu.webp"
import Docu2 from "../assets/img/projects/maxc/docu2.webp"
import Capacitacion from "../assets/img/projects/maxc/cap.webp"

import TiendaLegal from "../assets/img/projects/eterna/backfull.webp"
import TiendaLegal2 from  "../assets/img/projects/eterna/tl3.webp"
import TiendaLegal3 from  "../assets/img/projects/eterna/tl1.webp"
import TiendaLegal4 from  "../assets/img/projects/eterna/tl2.webp"

import Maxi from "../assets/img/projects/maxi/maxi.webp"
import Maxi2 from "../assets/img/projects/maxi/maxi2.webp"
import Maxi3 from "../assets/img/projects/maxi/maxi3.webp"
import Maxi4 from "../assets/img/projects/maxi/maxi4.webp"
import Maxi5 from "../assets/img/projects/maxi/maxi5.webp"
import Maxi6 from "../assets/img/projects/maxi/maxi6.webp"

import DataHooks from "../assets/img/projects/dh/dh.png"
import DataInter from "../assets/img/projects/dh/dha.png"
import DataInter2 from "../assets/img/projects/dh/dha2.png"
import Gomore from "../assets/img/projects/dh/gomore.png"
// Vídeos - Import ejemplos de video (reemplazar con tus videos reales)
import videoDemo from "../assets/video.webm"
import Research from "../assets/img/projects/dh/research.png"
import Wuffes from "../assets/img/projects/dh/wuffes2_evenlabs.mp4"
import Wfs from "../assets/img/projects/dh/wfs1.mp4"

import { Seo } from '@/Seo';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string }[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      title: "Datahooks",
      description: `Plataforma de analítica y operaciones para e-commerce. Implementaciones, conexión con API, investigación y prototipado de tiendas Shopify. Creación de pipelines de media generativa y avatares con voz para creativos,  documentación de POCs y resultados para adopción interna.`,
      image: DataHooks,
      tags: [
        "Vue 3",
        "Vuex",
        "Chart.js",
        "Shopify",
        "Liquid",
        "Insomnia",
        "axios",
        "Runway",
        "ElevenLabs",
        "Nano Banana",
        "ImageFX",
        "RoboNeo",
        "Tailwind",
        "GSAP"
      ],
      liveUrl: "#",
      images: [
        {
          url: Gomore,
          description: "Rediseño y construcción de tienda en Shopify: UI/UX de páginas de producto y colección, implementación de theme (Liquid, OS 2.0), maquetado responsive y prototipos funcionales para tests A/B."
        },

        {
          url: DataInter2,
          description: "Colaboración en la creación de dashboards interactivos con Vue 3 y Chart.js destinados a monitorizar precios, promos y KPIs."
        },
        {
          url: Research,
          description: "Colaboro en la investigación de herramientas con el fin de automatizar la producción de creativos con IA: masterización de prompts, generación de avatares con voz (ElevenLabs / HeyGen), pipelines de imagen/video con Runway, RoboNeo, ImageFX y Nano Banana; creación de assets y videos para pruebas publicitarias."
        },
        {
          url: Wuffes,
          isVideo: true,
          description: "Ejemplo de video producido con ElevenLabs - Demo de avatares digitales con voces generadas por IA."
        },
        {
          url: Wfs,
          isVideo: true,
          description: "Ejemplo de video producido con ElevenLabs - Demo de avatares digitales con voces generadas por IA."
        },
      
      ]
    },
    {
      title: 'Max Intelligence',
      description: 'Migración de la plataforma usando tecnologías modernas.',
      image: Maxi,
      tags: ['React', 'Tailwind CSS', 'GSAP', 'axios'],
      liveUrl: '#',
      images: [
        { url: Maxi4, description: 'Autenticación mediante Axios.' },
        { url: Maxi2, description: 'Animaciones realizadas con GSAP y CSS personalizado. Manejo y protección de rutas, uso de hooks para manejar el estado y el acceso de la información del usuario en toda la aplicación.' },
        { url: Maxi3, description: 'Conexión con API de IA para el funcionamiento del chatbot.' },
        { url: Maxi5, description: 'Diseño de template para documentación técnica.' },
        { url: Maxi6, description: 'Reacción y diseño de paper informativo en Canva.' },
      ]
    },
    {
      title: 'TLegal',
      description: 'Proyecto de automatización de contratos legales.',
      image: TiendaLegal, 
      tags: ['Vue', 'GraphQL', 'Vuetify', 'Vuex',],
      liveUrl: '#',
      images: [
        { url: TiendaLegal2, description: 'Apoyo en el desarrollo de la interfaz.' },
        { url: TiendaLegal3, description: 'Apoyo en el desarrollo de la interfaz.' },
        { url: TiendaLegal4, description: 'Apoyo en el desarrollo de la interfaz.' },
      ]
    }
  ];

  const handleLiveDemoClick = (project: {
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string }[];
  }) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };



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
    <>
   <Seo 
           title=" Sobre Adri Rosas| Experiencia y Habilidades"
           description="Front End Developer | Diseño UI | Tecnología Blockchain"
           type="profile"
           image="/public/og-image.png"
         />
    <section id="projects" ref={sectionRef} className="bg-gradient-section-4 dark:bg-gradient-section-4-dark">
      <div className='section-container py-24 '>
        <SectionTitle
          subtitle=""
          title="Proyectos Relevantes"
          description="Algunos proyectos que representaron un gran reto a nivel profesional"
          center={true}
          className="text-foreground dark:text-foreground"
        />

        <div className="space-y-24 mt-16">
          {projects.map((project, index) => (
            <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            isVideo={project.isVideo}
            tags={project.tags}
            liveUrl={project.liveUrl}
            reversed={index % 2 === 1}
            onLiveDemoClick={() => handleLiveDemoClick(project)}
            />
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={selectedProject}
        />
      )}
    </section>
    </>
  );
};

export default ProjectsSection;
