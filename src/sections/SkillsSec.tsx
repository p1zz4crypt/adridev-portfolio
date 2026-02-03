import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectModal from "@/components/ProjectModal";
import NebulaBackground from "./NebulaBackground";

// ============================================
// IMÁGENES - Iconos de cada Skill (portada)
// ============================================
import Ruby from "../assets/ruby.png";

// ============================================
// IMÁGENES - Desarrollo Frontend
// ============================================
import DataInter2 from "../assets/img/projects/dh/dha2.png";
import Maxi2 from "../assets/img/projects/maxi/maxi2.webp";
import Maxi3 from "../assets/img/projects/maxi/maxi3.webp";
import Maxi4 from "../assets/img/projects/maxi/maxi4.webp";

// ============================================
// IMÁGENES - Diseño UI/UX & Creativos
// ============================================
import Maxi5 from "../assets/img/projects/maxi/maxi5.webp";
import Maxi6 from "../assets/img/projects/maxi/maxi6.webp";
import Research from "../assets/img/projects/dh/research.png";

// ============================================
// IMÁGENES - E-commerce & Shopify
// ============================================
import Gomitas from "../assets/img/projects/dh/red_gomore.png";
import TiendaLegal from "../assets/img/projects/eterna/backfull.webp";
import TiendaLegal2 from "../assets/img/projects/eterna/tl3.webp";
import TiendaLegal3 from "../assets/img/projects/eterna/tl1.webp";
import TiendaLegal4 from "../assets/img/projects/eterna/tl2.webp";
import TodoUsado1 from "../assets/img/1.png";
import TodoUsado2 from "../assets/img/2.png";
import TodoUsado3 from "../assets/img/3.png";
import TodoUsado4 from "../assets/img/4.png";

// ============================================
// IMÁGENES - IA & Media Generativa
// ============================================
import Nike from "../assets/img/projects/dh/Nike.mp4";
import Wuffes from "../assets/img/projects/dh/wuffes2_evenlabs.mp4";
import Wfs from "../assets/img/projects/dh/wfs1.mp4";

// ============================================
// IMÁGENES - Blockchain & Web3
// ============================================
import MaxCluster from "../assets/img/projects/maxc/mc.webp";
import MaxCluster2 from "../assets/img/projects/maxc/mc2.webp";
import MaxPortada from "../assets/img/projects/maxc/maxc.webp";
import Docu from "../assets/img/projects/maxc/docu.webp";
import Docu2 from "../assets/img/projects/maxc/docu2.webp";
import Capacitacion from "../assets/img/projects/maxc/cap.webp";

// ============================================
// IMÁGENES - Producto & MVP (placeholder por ahora)
// ============================================
import Maxii from "../assets/img/projects/maxi/maxii.webp";

import { Seo } from "@/Seo";

gsap.registerPlugin(ScrollTrigger);

const ProjectsNew: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const projectBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [selectedProject, setSelectedProject] = useState<{
    title: string;
    liveUrl: string;
    description: string;
    images: { url: string; description: string; isVideo?: boolean }[];
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedCardIndex, setClickedCardIndex] = useState<number | null>(null);

  // ============================================
  // NUEVA ESTRUCTURA: SKILLS
  // ============================================
  const skills = [
    {
      title: "Desarrollo Frontend",
      description:
        "Interfaces modernas, responsivas y de alto rendimiento. Componentes reutilizables, arquitectura escalable y experiencias de usuario fluidas con React, Vue y JavaScript.",
      image: Ruby,
      imageProject: DataInter2,
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
        "Chart.js",
      ],
      liveUrl: "#",
      images: [
        {
          url: DataInter2,
          description:
            "Dashboards interactivos con Vue 3 y Chart.js para monitoreo de precios, promos y KPIs en tiempo real.",
        },
        {
          url: Maxi2,
          description:
            "Animaciones avanzadas con GSAP y CSS personalizado. Transiciones fluidas, scroll triggers y efectos interactivos para experiencias inmersivas.",
        },
        {
          url: Maxi4,
          description:
            "Sistemas de autenticación con Axios, manejo y protección de rutas, hooks para gestión de estado y control de acceso de usuarios.",
        },
        {
          url: Maxi3,
          description:
            "Integración con APIs de IA para funcionamiento de chatbots y asistentes virtuales en plataformas empresariales.",
        },
         {
          url: TodoUsado1,
          description:
            "Páginas de colección con filtros avanzados, ordenamiento dinámico y experiencia de búsqueda intuitiva.",
        },
      ],
    },
    {
      title: "Diseño UI/UX & Creativos",
      description:
        "Prototipado de interfaces intuitivas, creación de assets visuales y producción de contenido multimedia para campañas digitales.",
      image: Ruby,
      imageProject: Maxi5,
      tags: [
        "Figma",
        "Adobe XD",
        "Photoshop",
        "Canva",
        "Edición de Video",
        "Canvas Animation",
        "GSAP",
      ],
      liveUrl: "#",
      images: [
        {
          url: Research,
          description:
            "Investigación de herramientas y documentación de flujos de trabajo: evaluación de plataformas, pruebas de concepto y guías de implementación.",
        },
        {
          url: Maxi5,
          description:
            "Diseño de templates para documentación técnica, guías de usuario y materiales de onboarding.",
        },
        {
          url: Maxi6,
          description:
            "Creación de papers informativos, presentaciones ejecutivas y materiales visuales para comunicación interna y externa.",
        },
      ],
    },
    {
      title: "E-commerce & Shopify",
      description:
        "Diseño, desarrollo y personalización de tiendas online con enfoque en conversión, experiencia de compra y optimización para tests A/B.",
      image: Ruby,
      imageProject: Gomitas,
      tags: [
        "Shopify",
        "Liquid",
        "OS 2.0",
        "Conversión",
        "Tests A/B",
        "UI/UX E-commerce",
      ],
      liveUrl: "#",
      images: [
        {
          url: Gomitas,
          description:
            "Rediseño y construcción de tienda en Shopify: UI/UX de páginas de producto y colección, implementación de theme con Liquid (OS 2.0) y maquetado responsive.",
        },
        {
          url: TodoUsado2,
          description:
            "Desarrollo de plataforma e-commerce: diseño moderno, arquitectura de información clara y navegación optimizada para conversión.",
        },
        {
          url: TodoUsado1,
          description:
            "Páginas de colección con filtros avanzados, ordenamiento dinámico y experiencia de búsqueda intuitiva.",
        },
        {
          url: TodoUsado3,
          description:
            "Páginas de producto con galerías interactivas, información estructurada y llamados a la acción optimizados.",
        },
     
      ],
    },
    {
      title: "IA & Media Generativa",
      description:
        "Pipelines de automatización para producción de creativos publicitarios, avatares digitales con voz y contenido generado con inteligencia artificial.",
      image: Ruby,
      imageProject: Research,
      tags: [
        "ElevenLabs",
        "HeyGen",
        "Runway",
        "Leonardo AI",
        "Stable Diffusion",
        "ImageFX",
        "Nano Banana",
        "RoboNeo",
        "Hailuo",
      ],
      liveUrl: "#",
      images: [
        {
          url: Research,
          description:
            "Investigación de herramientas para automatizar producción de creativos con IA: masterización de prompts, evaluación de plataformas y documentación de flujos de trabajo.",
        },
        {
          url: Nike,
          isVideo: true,
          description:
            "Video de marca producido con NanoBanana, Freepik, Hailuo y Capcut — pipeline completo desde generación hasta postproducción.",
        },
        {
          url: Wuffes,
          isVideo: true,
          description:
            "Demo de avatares digitales con voces generadas por IA usando ElevenLabs — producción de portavoces virtuales para marcas.",
        },
        {
          url: Wfs,
          isVideo: true,
          description:
            "Integración de voz sintética con contenido visual para creativos publicitarios — automatización de producción de videos.",
        },
      ],
    },
    {
      title: "Blockchain & Web3",
      description:
        "Implementación práctica de tecnología blockchain para trazabilidad documental, registro de transacciones y transformación de procesos empresariales.",
      image: Ruby,
      imageProject: MaxPortada,
      tags: [
        "Solidity",
        "Smart Contracts",
        "Trazabilidad",
        "Web3",
        "Capacitación",
      ],
      liveUrl: "#",
      images: [
        {
          url: MaxCluster,
          description:
            "Desarrollo de interfaz para visualizar información de transacciones registradas en la red blockchain — colaboración con Grupo Salinas.",
        },
        {
          url: MaxCluster2,
          description:
            "Desarrollo básico de contrato inteligente en Solidity para registro inmutable de transacciones en el despacho de Auditoría 'Ferrer y Asociados'.",
        },
        {
          url: Capacitacion,
          description:
            "Capacitación a empleados del despacho sobre el uso de la plataforma blockchain y conceptos fundamentales de la tecnología.",
        },
        {
          url: Docu,
          description:
            "Documentación técnica del proyecto y materiales de apoyo para adopción interna de la solución.",
        },
        {
          url: Docu2,
          description:
            "Colaboración con el equipo del área de Cripto de Grupo Salinas en la planeación e implementación del proyecto.",
        },
      ],
    },
    {
      title: "Producto & MVP con IA",
      description:
        "Desarrollo de productos digitales desde la conceptualización hasta el lanzamiento, combinando visión de negocio, UX research y herramientas de desarrollo acelerado con IA.",
      image: Ruby,
      imageProject: Maxii, // Cambiar cuando tengas imágenes del marketplace
      tags: [
        "Lovable",
        "Supabase",
        "APIs de IA",
        "UX Research",
        "Product Owner",
        "MVP",
        "APIs de Mensajería",
      ],
      liveUrl: "#",
      images: [
        {
          url: TodoUsado1, 
          description:
            "Conceptualización y planeación de marketplace de productos de segunda mano: propuesta de valor, análisis de competencia y roadmap de features.",
        },

        {
          url: TodoUsado2, 
          description:
            "Desarrollo del MVP con Lovable y Supabase: sistema de publicación de anuncios, dashboards de vendedor, filtros de búsqueda y autenticación.",
        },
        {
          url: TodoUsado3,
          description:
            "Páginas de producto con galerías interactivas, información estructurada y llamados a la acción optimizados.",
        },
        {
          url: TodoUsado4, 
          description:
            "Integración con APIs de mensajería para comunicación entre usuarios y APIs de IA para procesamiento de imágenes y extracción automática de información.",
        },
      ],
    },
  ];

  // Lógica para animar las boxes del grid
  const handleBoxClick = (
    skill: {
      title: string;
      liveUrl: string;
      description: string;
      images: { url: string; description: string; isVideo?: boolean }[];
    },
    index: number,
  ) => {
    setClickedCardIndex(index + skills.length);
    const clickedBox = projectBoxesRef.current[index];

    if (clickedBox) {
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedProject(skill);
          setIsModalOpen(true);
        },
      });

      // La box clickeada hace zoom
      tl.to(clickedBox, {
        scale: 1.5,
        rotationY: 0,
        z: 100,
        duration: 0.4,
        ease: "power2.out",
      });

      // Otras boxes se dispersan
      projectBoxesRef.current.forEach((box, i) => {
        if (box && i !== index) {
          const direction = i < index ? -1 : 1;
        }
      });

      // Box clickeada explota
      tl.to(
        clickedBox,
        {
          scale: 1.5,
          opacity: 0,
          filter: "blur(20px)",
          duration: 0.4,
          ease: "power2.in",
        },
        "-=0.2",
      );
    } else {
      setSelectedProject(skill);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setClickedCardIndex(null);
      },
    });

    // Restaurar tarjetas fullscreen
    projectCardsRef.current.forEach((card, i) => {
      if (card) {
        tl.fromTo(
          card,
          {
            x: i % 2 === 0 ? -800 : 800,
            y:
              i === 0
                ? -100
                : i === projectCardsRef.current.length - 1
                  ? 100
                  : 0,
            rotation: i % 2 === 0 ? -5 : 5,
            opacity: 0,
            scale: 0.8,
            rotationY: 0,
            z: 0,
            filter: "blur(0px)",
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power3.out(1.4)",
          },
          i * 0.1,
        );
      }
    });

    // Restaurar boxes del grid
    projectBoxesRef.current.forEach((box, i) => {
      if (box) {
        tl.fromTo(
          box,
          {
            x: i % 2 === 0 ? -400 : 400,
            y: i === 0 ? -100 : 100,
            rotation: i % 2 === 0 ? -5 : 5,
            opacity: 0,
            scale: 0.8,
            rotationY: 0,
            z: 0,
            filter: "blur(0px)",
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power3.out(1.4)",
          },
          i * 0.1,
        );
      }
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada de las tarjetas fullscreen
      projectCardsRef.current.forEach((card, i) => {
        if (card) {
          gsap.fromTo(
            card,
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
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      // Animación de entrada de las boxes del grid
      projectBoxesRef.current.forEach((box, i) => {
        if (box) {
          gsap.fromTo(
            box,
            { opacity: 0, scale: 0 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "back.out",
              scrollTrigger: {
                trigger: box,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none none",
              },
            },
          );
        }
      });

      // Rotación infinita para todas las imágenes de las boxes
      projectBoxesRef.current.forEach((box) => {
        if (box) {
          const images = box.querySelectorAll("img");
          images.forEach((img) => {
            gsap.to(img, {
              rotation: 360,
              repeat: -1,
              ease: "none",
              duration: 8,
            });
          });
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
        title=" Sobre Adriana Rosas| Experiencia y Habilidades"
        description="Front End Developer / Diseño UX/UI & AI Workflows"
        type="profile"
        image="/public/ad3.png"
      />
      {/* Fondo de nebulosas */}
      <NebulaBackground />

      <section
        id="skills"
        ref={sectionRef}
        className="relative min-h-[100vh] py-20"
        style={{ zIndex: 1, position: "relative" }}
      >
        <div
          ref={containerRef}
          className="flex flex-col items-center justify-center gap-12 px-4"
        >
          {/* Heading */}
          <div className="w-full flex justify-around my-8">
            <h2
              style={{
                fontFamily: "'Roboto Condensed', sans-serif",
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontWeight: 900,
                letterSpacing: "0.1em",
                background:
                  "linear-gradient(135deg, #71E300 0%, #71E300 50%, #71E300 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              SKILLS
            </h2>
            <Link to={"/"}>
              <p
                className="cursor-pointer hover:font-bold"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "1rem",
                  letterSpacing: "0.2em",
                  color: "#ec4899",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
                }}
              >
                Atrás
              </p>
            </Link>
          </div>

          {/* Grid de boxes responsivas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto h-full">
            {skills.map((skill, index) => (
              <div
                key={`box-${index}`}
                ref={(el) => {
                  projectBoxesRef.current[index] = el;
                }}
                onClick={() => handleBoxClick(skill, index)}
                className="group cursor-pointer perspective"
              >
                {/* Card Container */}
                <div
                  className="flex justify-center items-center relative overflow-hidden 
    aspect-[4/3] md:aspect-square transition-all duration-300"
                >
                  {/* Fondo con imagen del proyecto (aparece en hover) */}
                  <div
                    className="absolute inset-0 opacity-0 bg-transparent group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundImage: `url(${skill.imageProject})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />

                  {/* Contenido principal (icono + título) */}
                  <div className="flex flex-col items-center relative z-10">
                    {/* Imagen pequeña del icono */}
                    <img
                      src={skill.image}
                      alt={skill.title}
                      className="w-24 md:w-40 lg:w-56 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                    />
                    <h3 className="text-xl bg-black/70 px-2 backdrop-blur-md font-bold mb-6 text-[#71E300] group-hover:opacity-0 group-hover:text-white  transition-all duration-100">
                      {skill.title}
                    </h3>
                  </div>

                  {/* Contenido en hover (descripción) */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-saturate-50">
                    <h3 className="text-xl font-bold mb-3">{skill.title}</h3>
                    <p className="text-sm text-gray-200 line-clamp-3">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
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

export default ProjectsNew;
