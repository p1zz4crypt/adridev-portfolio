import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
import TiendaLegal2 from "../assets/img/projects/eterna/tl3.webp"
import TiendaLegal3 from "../assets/img/projects/eterna/tl1.webp"
import TiendaLegal4 from "../assets/img/projects/eterna/tl2.webp"

import Maxi from "../assets/img/projects/maxi/maxi2.png"
import Maxi2 from "../assets/img/projects/maxi/maxi2.webp"
import Maxi3 from "../assets/img/projects/maxi/maxi3.webp"
import Maxi4 from "../assets/img/projects/maxi/maxi4.webp"
import Maxi5 from "../assets/img/projects/maxi/maxi5.webp"
import Maxi6 from "../assets/img/projects/maxi/maxi6.webp"

import DataHooks from "../assets/img/projects/dh/dh.png"
import DataInter from "../assets/img/projects/dh/dha.png"
import DataInter2 from "../assets/img/projects/dh/dha2.png"
import Gomitas from "../assets/img/projects/dh/red_gomore.png"
// Vídeos
import videoDemo from "../assets/video.webm"
import Research from "../assets/img/projects/dh/research.png"
import Wuffes from "../assets/img/projects/dh/wuffes2_evenlabs.mp4"
import Wfs from "../assets/img/projects/dh/wfs1.mp4"
import Nike from "../assets/img/projects/dh/Nike.mp4"

import { Seo } from '@/Seo';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string }[];
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Datahooks",
      description: `Plataforma de analítica y operaciones para e-commerce. Implementaciones, conexión con API, investigación y prototipado de tiendas Shopify. Creación de pipelines de media generativa y avatares con voz para creativos, documentación de POCs y resultados para adopción interna.`,
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
          url: Gomitas,
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
          url: Nike,
          isVideo: true,
          description: "Ejemplo de video de marca producido con NanoBanana, Freepik, Hailuo, Capcut."
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
      title: "Datahooks",
      description: `Plataforma de analítica y operaciones para e-commerce. Implementaciones, conexión con API, investigación y prototipado de tiendas Shopify. Creación de pipelines de media generativa y avatares con voz para creativos, documentación de POCs y resultados para adopción interna.`,
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
          url: Gomitas,
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
          url: Nike,
          isVideo: true,
          description: "Ejemplo de video de marca producido con NanoBanana, Freepik, Hailuo, Capcut."
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

  ];

  const handleLiveDemoClick = (project: {
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string }[];
  }, index: number) => {
    setClickedCardIndex(index);
    const clickedCard = projectCardsRef.current[index];

    if (clickedCard) {
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedProject(project);
          setIsModalOpen(true);
        }
      });

      // Animación creativa: "Explosión de píxeles" con rotación 3D
      // 1. La tarjeta clickeada hace un "zoom in" con rotación
      tl.to(clickedCard, {
        scale: 1.5,
        rotationY: 0,
        z: 100,
        duration: 0.4,
        ease: "power2.out"
      });

      // 2. Todas las demás tarjetas se dispersan en diferentes direcciones
      projectCardsRef.current.forEach((card, i) => {
        if (card && i !== index) {
          const direction = i < index ? -1 : 1;
          const isTop = i === 0;
          const isBottom = i === projectCardsRef.current.length - 1;

          // ✅ CAMBIO 2: Reducir overlap de -0.5 a -0.3 para mejor sincronización
          tl.to(card, {
            x: direction * 800,
            y: isTop ? -300 : isBottom ? 300 : 0,
            rotation: direction * 5,
            opacity: 0,
            scale: 0.7,
            duration: 0.4,
            ease: "power3.in"
          }, "-=0.3");
        }
      });

      // 3. La tarjeta clickeada explota en fragmentos
      tl.to(clickedCard, {
        scale: 1.5,
        opacity: 0,
        rotationY: 180,
        filter: "blur(20px)",
        duration: 0.4,
        ease: "power2.in"
      }, "-=0.2");

    } else {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setClickedCardIndex(null);
      }
    });

    projectCardsRef.current.forEach((card, i) => {
      if (card) {
        tl.fromTo(card,
          {
            x: i % 2 === 0 ? -800 : 800,
            y: i === 0 ? -100 : i === projectCardsRef.current.length - 1 ? 100 : 0,
            rotation: i % 2 === 0 ? -5 : 5,
            opacity: 0,
            scale: 0.8,
            rotationY: 0,
            z: 0,
            filter: "blur(0px)"
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power3.out(1.4)"
          },
          i * 0.1
        );
      }
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada de las cards
      projectCardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(card,
            { opacity: 0, y: 100 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Seo
        title="Sobre Adri Rosas | Experiencia y Habilidades"
        description="Front End Developer | Diseño UI | Tecnología Blockchain"
        type="profile"
        image="/public/og-image.png"
      />
      <section
        id="projects"
        ref={sectionRef}
        className="bg-transparent min-h-[100vh]"
      >
        {/* Contenedor vertical de cards */}
        <div className="flex flex-col items-center">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => { projectCardsRef.current[index] = el }}
              className="w-[95vw] md:w-[90vw] lg:w-[88vw] h-[100vh]"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                liveUrl={project.liveUrl}
                reversed={index % 2 === 1}
                onLiveDemoClick={() => handleLiveDemoClick(project, index)}
              />
            </div>
          ))}
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