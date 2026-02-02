import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';

// ============================================
// IMÁGENES - Desarrollo Frontend
// ============================================
import DataInter2 from "../assets/img/projects/dh/dha2.png"
import Maxi2 from "../assets/img/projects/maxi/maxi2.webp"
import Maxi3 from "../assets/img/projects/maxi/maxi3.webp"
import Maxi4 from "../assets/img/projects/maxi/maxi4.webp"

// ============================================
// IMÁGENES - Diseño UI/UX & Creativos
// ============================================
import Maxi5 from "../assets/img/projects/maxi/maxi5.webp"
import Maxi6 from "../assets/img/projects/maxi/maxi6.webp"
import Research from "../assets/img/projects/dh/research.png"

// ============================================
// IMÁGENES - E-commerce & Shopify
// ============================================
import Gomitas from "../assets/img/projects/dh/red_gomore.png"
import TiendaLegal from "../assets/img/projects/eterna/backfull.webp"
import TiendaLegal2 from "../assets/img/projects/eterna/tl3.webp"
import TiendaLegal3 from "../assets/img/projects/eterna/tl1.webp"
import TiendaLegal4 from "../assets/img/projects/eterna/tl2.webp"

// ============================================
// IMÁGENES - IA & Media Generativa
// ============================================
import Nike from "../assets/img/projects/dh/Nike.mp4"
import Wuffes from "../assets/img/projects/dh/wuffes2_evenlabs.mp4"
import Wfs from "../assets/img/projects/dh/wfs1.mp4"

// ============================================
// IMÁGENES - Blockchain & Web3
// ============================================
import MaxCluster from "../assets/img/projects/maxc/mc.webp"
import MaxCluster2 from "../assets/img/projects/maxc/mc2.webp"
import MaxPortada from "../assets/img/projects/maxc/maxc.webp"
import Docu from "../assets/img/projects/maxc/docu.webp"
import Docu2 from "../assets/img/projects/maxc/docu2.webp"
import Capacitacion from "../assets/img/projects/maxc/cap.webp"

// ============================================
// IMÁGENES - Producto & MVP (agregar cuando tengas)
// ============================================
// import Marketplace1 from "../assets/img/projects/marketplace/..."

// ============================================
// IMÁGENES PORTADA DE CADA SKILL (representativas)
// ============================================
import DataHooks from "../assets/img/projects/dh/dh.png"
import Maxi from "../assets/img/projects/maxi/maxi2.png"

import { Seo } from '@/Seo';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string; isVideo?: boolean }[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ============================================
  // NUEVA ESTRUCTURA: SKILLS
  // ============================================
  const skills = [
    {
      title: "Desarrollo Frontend",
      description: "Interfaces modernas, responsivas y de alto rendimiento. Componentes reutilizables, arquitectura escalable y experiencias de usuario fluidas.",
      image: DataHooks, // Imagen de portada representativa
      tags: [
        "React",
        "Vue 3",
        "JavaScript",
        "Tailwind CSS",
        "GSAP",
        "Material-UI",
        "Bootstrap",
        "axios",
        "Vuex",
        "Chart.js"
      ],
      liveUrl: "#",
      images: [
        {
          url: DataInter2,
          description: "Dashboards interactivos con Vue 3 y Chart.js para monitoreo de precios, promos y KPIs en tiempo real."
        },
        {
          url: Maxi2,
          description: "Animaciones avanzadas con GSAP y CSS personalizado. Transiciones fluidas, scroll triggers y efectos interactivos para experiencias inmersivas."
        },
        {
          url: Maxi4,
          description: "Sistemas de autenticación con Axios, manejo y protección de rutas, hooks para gestión de estado y control de acceso de usuarios."
        },
        {
          url: Maxi3,
          description: "Integración con APIs de IA para funcionamiento de chatbots y asistentes virtuales en plataformas empresariales."
        }
      ]
    },
    {
      title: "Diseño UI/UX & Creativos",
      description: "Prototipado de interfaces intuitivas, creación de assets visuales y producción de contenido multimedia para campañas digitales.",
      image: Maxi5, // Imagen de portada representativa
      tags: [
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Canva",
        "Edición de Video",
        "Canvas Animation",
        "GSAP"
      ],
      liveUrl: "#",
      images: [
        {
          url: Research,
          description: "Investigación de herramientas y documentación de flujos de trabajo: evaluación de plataformas, pruebas de concepto y guías de implementación."
        },
        {
          url: Maxi5,
          description: "Diseño de templates para documentación técnica, guías de usuario y materiales de onboarding."
        },
        {
          url: Maxi6,
          description: "Creación de papers informativos, presentaciones ejecutivas y materiales visuales para comunicación interna y externa."
        }
      ]
    },
    {
      title: "E-commerce & Shopify",
      description: "Diseño, desarrollo y personalización de tiendas online con enfoque en conversión, experiencia de compra y optimización para tests A/B.",
      image: Gomitas, // Imagen de portada representativa
      tags: [
        "Shopify",
        "Liquid",
        "OS 2.0",
        "Conversión",
        "Tests A/B",
        "UI/UX E-commerce"
      ],
      liveUrl: "#",
      images: [
        {
          url: Gomitas,
          description: "Rediseño y construcción de tienda en Shopify: UI/UX de páginas de producto y colección, implementación de theme con Liquid (OS 2.0) y maquetado responsive."
        },
        {
          url: TiendaLegal,
          description: "Desarrollo de plataforma e-commerce: diseño moderno, arquitectura de información clara y navegación optimizada para conversión."
        },
        {
          url: TiendaLegal2,
          description: "Páginas de colección con filtros avanzados, ordenamiento dinámico y experiencia de búsqueda intuitiva."
        },
        {
          url: TiendaLegal3,
          description: "Páginas de producto con galerías interactivas, información estructurada y llamados a la acción optimizados."
        },
        {
          url: TiendaLegal4,
          description: "Carrito de compras optimizado y prototipos funcionales para validación de hipótesis mediante tests A/B."
        }
      ]
    },
    {
      title: "IA & Media Generativa",
      description: "Pipelines de automatización para producción de creativos publicitarios, avatares digitales con voz y contenido generado con inteligencia artificial.",
      image: Research, // Imagen de portada representativa
      tags: [
        "ElevenLabs",
        "HeyGen",
        "Runway",
        "Leonardo AI",
        "Stable Diffusion",
        "ImageFX",
        "Nano Banana",
        "RoboNeo",
        "Hailuo"
      ],
      liveUrl: "#",
      images: [
        {
          url: Research,
          description: "Investigación de herramientas para automatizar producción de creativos con IA: masterización de prompts, evaluación de plataformas y documentación de flujos de trabajo."
        },
        {
          url: Nike,
          isVideo: true,
          description: "Video de marca producido con NanoBanana, Freepik, Hailuo y Capcut — pipeline completo desde generación hasta postproducción."
        },
        {
          url: Wuffes,
          isVideo: true,
          description: "Demo de avatares digitales con voces generadas por IA usando ElevenLabs — producción de portavoces virtuales para marcas."
        },
        {
          url: Wfs,
          isVideo: true,
          description: "Integración de voz sintética con contenido visual para creativos publicitarios — automatización de producción de videos."
        }
      ]
    },
    {
      title: "Blockchain & Web3",
      description: "Implementación práctica de tecnología blockchain para trazabilidad documental, registro de transacciones y transformación de procesos empresariales.",
      image: MaxPortada, // Imagen de portada representativa
      tags: [
        "Solidity",
        "Smart Contracts",
        "Trazabilidad",
        "Web3",
        "Capacitación"
      ],
      liveUrl: "#",
      images: [
        {
          url: MaxCluster,
          description: "Desarrollo de interfaz para visualizar información de transacciones registradas en la red blockchain — colaboración con Grupo Salinas."
        },
        {
          url: MaxCluster2,
          description: "Desarrollo básico de contrato inteligente en Solidity para registro inmutable de transacciones en el despacho de Auditoría 'Ferrer y Asociados'."
        },
        {
          url: Capacitacion,
          description: "Capacitación a empleados del despacho sobre el uso de la plataforma blockchain y conceptos fundamentales de la tecnología."
        },
        {
          url: Docu,
          description: "Documentación técnica del proyecto y materiales de apoyo para adopción interna de la solución."
        },
        {
          url: Docu2,
          description: "Colaboración con el equipo del área de Cripto de Grupo Salinas en la planeación e implementación del proyecto."
        }
      ]
    },
    {
      title: "Producto & MVP con IA",
      description: "Desarrollo de productos digitales desde la conceptualización hasta el lanzamiento, combinando visión de negocio, UX research y herramientas de desarrollo acelerado con IA.",
      image: Maxi, // Imagen de portada representativa (cambiar cuando tengas del marketplace)
      tags: [
        "Lovable",
        "Supabase",
        "APIs de IA",
        "UX Research",
        "Product Owner",
        "MVP",
        "APIs de Mensajería"
      ],
      liveUrl: "#",
      images: [
        {
          url: Maxi, // Reemplazar con imagen real del marketplace
          description: "Conceptualización y planeación de marketplace de productos de segunda mano: propuesta de valor, análisis de competencia y roadmap de features."
        },
        {
          url: Maxi, // Reemplazar con wireframes/prototipos
          description: "Diseño de flujos de usuario, wireframes y prototipos para validar hipótesis antes del desarrollo."
        },
        {
          url: Maxi, // Reemplazar con capturas de la plataforma
          description: "Desarrollo del MVP con Lovable y Supabase: sistema de publicación de anuncios, dashboards de vendedor, filtros de búsqueda y autenticación."
        },
        {
          url: Maxi, // Reemplazar con capturas de integraciones
          description: "Integración con APIs de mensajería para comunicación entre usuarios y APIs de IA para procesamiento de imágenes y extracción automática de información."
        }
      ]
    }
  ];

  const handleLiveDemoClick = (skill: {
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string; isVideo?: boolean }[];
  }) => {
    setSelectedProject(skill);
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
        title="Skills & Expertise | Adri Rosas"
        description="Front End Developer | Diseño UI/UX | E-commerce | IA & Media Generativa | Blockchain"
        type="profile"
        image="/public/og-image.png"
      />
      <section id="skills" ref={sectionRef} className="bg-gradient-section-4 dark:bg-gradient-section-4-dark">
        <div className='section-container py-24'>
          <SectionTitle
            subtitle="EXPERTISE"
            title="Mis Skills"
            description="Áreas en las que me especializo, con ejemplos de lo que sé hacer"
            center={true}
            className="text-foreground dark:text-foreground"
          />

          <div className="space-y-24 md:space-y-0 md:mt-16 mt-0 md:h-full h-[250px]">
            {skills.map((skill, index) => (
              <ProjectCard
                key={index}
                title={skill.title}
                description={skill.description}
                image={skill.image}
                tags={skill.tags}
                liveUrl={skill.liveUrl}
                reversed={index % 2 === 1}
                onLiveDemoClick={() => handleLiveDemoClick(skill)}
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