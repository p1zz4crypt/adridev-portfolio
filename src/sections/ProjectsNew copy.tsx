import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import NebulaBackground from './NebulaBackground'
// Imagenes
import MaxCluster from "../assets/img/projects/maxc/mc.webp"
import MaxCluster2 from "../assets/img/projects/maxc/mc2.webp"
import MaxPortada from "../assets/img/projects/maxc/maxc.webp"
import Docu from "../assets/img/projects/maxc/docu.webp"
import Docu2 from "../assets/img/projects/maxc/docu2.webp"
import Capacitacion from "../assets/img/projects/maxc/cap.webp"

import Ruby from "../assets/ruby.png"

import TiendaLegal from "../assets/img/projects/eterna/backfull.webp"
import TiendaLegal2 from "../assets/img/projects/eterna/tl3.webp"
import TiendaLegal3 from "../assets/img/projects/eterna/tl1.webp"
import TiendaLegal4 from "../assets/img/projects/eterna/tl2.webp"

import Maxii from "../assets/img/projects/maxi/maxii.webp"
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

const ProjectsNew: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const projectCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const projectBoxesRef = useRef<(HTMLDivElement | null)[]>([]);

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
            image: Ruby,
            imageProject: DataHooks,
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
            image: Ruby,
            imageProject: Maxii,
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

    ];



    // Lógica para animar las boxes del grid
    const handleBoxClick = (project: {
        title: string;
        liveUrl: string;
        description: string;
        images: { url: string; description: string }[];
    }, index: number) => {
        setClickedCardIndex(index + projects.length);
        const clickedBox = projectBoxesRef.current[index];

        if (clickedBox) {
            const tl = gsap.timeline({
                onComplete: () => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                }
            });

            // La box clickeada hace zoom
            tl.to(clickedBox, {
                scale: 1.5,
                rotationY: 0,
                z: 100,
                duration: 0.4,
                ease: "power2.out"
            });

            // Otras boxes se dispersan
            projectBoxesRef.current.forEach((box, i) => {
                if (box && i !== index) {
                    const direction = i < index ? -1 : 1;

                    tl.to(box, {
                        x: direction * 400,
                        y: direction * 200,
                        rotation: direction * 5,
                        opacity: 0,
                        scale: 0.7,
                        duration: 0.4,
                        ease: "power3.in"
                    }, "-=0.3");
                }
            });

            // Box clickeada explota
            tl.to(clickedBox, {
                scale: 1.5,
                opacity: 0,
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

        // Restaurar tarjetas fullscreen
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

        // Restaurar boxes del grid
        projectBoxesRef.current.forEach((box, i) => {
            if (box) {
                tl.fromTo(box,
                    {
                        x: i % 2 === 0 ? -400 : 400,
                        y: i === 0 ? -100 : 100,
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
            // Animación de entrada de las tarjetas fullscreen
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

            // Animación de entrada de las boxes del grid
            projectBoxesRef.current.forEach((box, i) => {
                if (box) {
                    gsap.fromTo(box,
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
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });
            // Rotación infinita para todas las imágenes de las boxes
            projectBoxesRef.current.forEach((box) => {
                if (box) {
                    const images = box.querySelectorAll('img');
                    images.forEach((img) => {
                        gsap.to(img, {
                            rotation: 360,
                            repeat: -1,
                            ease: 'none',
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
                title="Proyectos de Adri Rosas | Front End Developer"
                description="Front End Developer | Diseño UI | Tecnología Blockchain"
                type="profile"
                image="/public/og-image.png"
            />
            {/* Fondo de nebulosas */}
            <NebulaBackground />

            <section
                id="projects"
                ref={sectionRef}
                className="relative min-h-[100vh] py-20"
                style={{ zIndex: 1, position: 'relative' }}
            >
                <div ref={containerRef} className="flex flex-col items-center justify-center gap-12 px-4">
                    {/* Heading */}
                    <div className="w-full flex justify-around my-8">
                        <h2
                            style={{
                                fontFamily: "'Roboto Condensed', sans-serif",
                                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                                fontWeight: 900,
                                letterSpacing: '0.1em',
                                background: 'linear-gradient(135deg, #ffffff 0%, #ec4899 50%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: 0,
                                lineHeight: 1.1,
                            }}
                        >
                            PROYECTOS
                        </h2>
                        <Link to={'/'}>
                            <p className='cursor-pointer hover:font-bold'
                                style={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: '1rem',
                                    letterSpacing: '0.2em',
                                    color: '#ec4899',
                                    textTransform: 'uppercase',
                                    whiteSpace: 'nowrap',
                                    textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
                                }}
                            >Aaaaatrás</p>

                        </Link>
                    </div>

                    {/* Grid de boxes responsivas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto h-full">
                        {projects.map((project, index) => (
                            <div
                                key={`box-${index}`}
                                ref={(el) => { projectBoxesRef.current[index] = el }}
                                onClick={() => handleBoxClick(project, index)}
                                className="group cursor-pointer perspective "
                            >
                                {/* Card Container */}
                                <div className=" flex justify-center items-center relative  overflow-hidden aspect-square transition-all duration-300">

                                    {/* Fondo con imagen del proyecto (aparece en hover) */}
                                    <div
                                        className="absolute inset-0 opacity-0 bg-transparent group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            backgroundImage: `url(${project.imageProject})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat'
                                        }}
                                    />

                                    
                                    {/* Contenido principal (icono + título) */}
                                    <div className='flex flex-col items-center relative z-10'>
                                        {/* Imagen pequeña del icono */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-64 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                                        />
                                        <h3 className="text-xl font-bold mb-2 text-black group-hover:opacity-0 group-hover:text-white group-hover:translate-y-[-8px] transition-all duration-100">
                                            {project.title}
                                        </h3>
                                    </div>

                                    {/* Contenido en hover (descripción) */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0  group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-saturate-50">
                                        <h3 className="text-xl font-bold mb-3">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-gray-200 line-clamp-3">
                                            {project.description}
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