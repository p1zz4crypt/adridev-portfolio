import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img1 from '../assets/img/uno.png'
import Img2 from '../assets/ad2.png'
import Img3 from '../assets/ad3.png'
import VideoCam from '../assets/Video.png'

gsap.registerPlugin(ScrollTrigger);

// ============================================
// INTERFACE PARA SECCIONES
// ============================================
interface AboutSection {
  id: number;
  title: string;
  subtitle?: string;
  subtitleType?: 'badge' | 'text'; // badge = con punto verde, text = texto simple
  content: React.ReactNode;
  accent?: string;
  backgroundImage: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPositionY?: string;
  overlayOpacity?: number; // 0-100
}

// ============================================
// DATA DE SECCIONES
// ============================================
const sections: AboutSection[] = [
  {
    id: 1,
    title: 'SOBRE MI',
    subtitle: 'CDMX, México',
    subtitleType: 'badge',
    backgroundImage: `${Img1}`,
    backgroundPositionY: '50%',
    overlayOpacity: 70,
    content: (
      <>
        <p>
          ¡Hola! Soy <span className="text-white font-semibold">Adriana Rosas</span>, desarrolladora frontend.
        </p>
        <p>
          Algo que me gusta compartir como contexto es mi paso por el mundo de la cocina, tras 7 años dejé atrás una etapa que me enseñó a resolver 
          problemas bajo presión, coordinar equipos y entregar resultados en tiempos muy cortos.
        </p>
        <p className="text-white/70">
          Mi interés por la tecnología despertó en 2019 al escuchar que existía algo llamado <span style={{ color: '#8338ec' }} className="font-medium">blockchain</span>, 
          y esa curiosidad fue el motor que me llevó a dar el salto hacia una nueva carrera.
        </p>
      </>
    ),
  },

  {
    id: 2,
    title: 'EXPERIENCIAS',
    subtitle: 'Más allá del frontend',
    subtitleType: 'text',
     backgroundImage: `${Img3}`,
    backgroundSize: 'cover',
    backgroundPositionY: '10%',
    overlayOpacity: 80,
    content: (
      <>
        <p>
          Colaboré en la <span className="text-white font-medium">implementación de una Blockchain privada</span> en 
          el despacho de Auditoría "Ferrer y Asociados" de Grupo Salinas: en donde apoyé en la planeación, desarrollo de 
          contratos inteligentes básicos de transacción, construcción de interfaz para mostrar la información y capacitación al equipo.
        </p>
        <p className="text-white/70">
          En <span className="text-white">IA y automatización</span>, he experimentado con pipelines de media 
          generativa para creativos publicitarios: avatares con voz, generación de video e imagen, 
          y documentación de POCs para equipos de marketing.
        </p>
        <p className="text-white/70">
          También colaboré en la creación de una <span className="text-white">tienda en Shopify</span>: que incluye la
          implementación de themes con Liquid, personalización de páginas, uso de apps y estrategias de conversión.
        </p>
      </>
    ),
  },
  {
    id: 3,
    title: 'ACTUALMENTE',
    subtitle: 'En desarrollo',
    subtitleType: 'text',
    backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    backgroundSize: 'cover',
    backgroundPositionY: '40%',
    overlayOpacity: 75,
    accent: '"Interfaces intuitivas, código limpio, y soluciones que realmente resuelven problemas."',
    content: (
      <>
        <p>
          Estoy desarrollando el <span className="text-white font-medium">MVP de un marketplace 
          de productos de segunda mano</span>, asumiendo el rol de product owner y desarrolladora.
        </p>
        <p className="text-white/70">
          El proyecto abarca desde la conceptualización hasta pruebas UX, combinando 
          <span className="text-white"> Lovable</span> para desarrollo acelerado con IA, 
          <span className="text-white"> Supabase</span> como backend, y APIs de mensajería e IA 
          para procesamiento de imágenes.
        </p>
        <p className="text-white/70">
          Desarrollar un MVP con herramientas de IA implica iterar rápido, validar con usuarios 
          reales y tomar decisiones estratégicas —un ejercicio que combina pensamiento de producto, 
          habilidades técnicas y visión de negocio.
        </p>
      </>
    ),
  },
];

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
const AboutNew = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const totalSections = sections.length;

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const horizontalSections = sectionsRef.current.filter(Boolean);

      // Animación principal de scroll horizontal
      const scrollTween = gsap.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (horizontalSections.length - 1),
          end: () => '+=' + container.offsetWidth,
        },
      });

      // Animaciones de entrada para elementos
      horizontalSections.forEach((section) => {
        const title = section.querySelector('.section-title');
        const subtitle = section.querySelector('.section-subtitle');
        const content = section.querySelector('.section-content');
        const accent = section.querySelector('.section-accent');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            containerAnimation: scrollTween,
            start: 'left 60%',
            end: 'left 20%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          title,
          { opacity: 0, y: 60, skewY: 3 },
          { opacity: 1, y: 0, skewY: 0, duration: 0.8, ease: 'expo.out' }
        )
          .fromTo(
            subtitle,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' },
            '-=0.5'
          )
          .fromTo(
            content,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
          );

        if (accent) {
          tl.fromTo(
            accent,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
            '-=0.2'
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-nowrap overflow-hidden"
      style={{ width: `${totalSections * 100}vw` }}
    >
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => addToRefs(el, index)}
          className="horizontal-section relative h-screen w-screen flex-shrink-0 flex justify-center items-center bg-white bg-cover bg-center bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.2)), url(${section.backgroundImage})`,
            backgroundPositionY: section.backgroundPositionY || '50%',
            backgroundSize: section.backgroundSize || 'cover',
          }}
        >
          {/* Overlay adicional para control de opacidad */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: `rgba(0,0,0,${(section.overlayOpacity || 70) / 100})` }} 
          />
          
          {/* Gradiente de la paleta */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,110,0.5) 0%, rgba(131,56,236,0.5) 50%, rgba(58,134,255,0.5) 100%)',
            }}
          />

          {/* Contenido */}
          <div className="relative z-10 w-full  mx-auto px-8 md:px-16">
            <div className="max-w-3xl">
              {/* Subtitle - Badge o Texto */}
              {section.subtitle && section.subtitleType === 'badge' ? (
                <div
                  className="section-subtitle inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/80 text-sm tracking-wide">{section.subtitle}</span>
                </div>
              ) : section.subtitle ? (
                <p
                  className="section-subtitle text-sm tracking-widest uppercase mb-4"
                  style={{ color: '#ec4899' }}
                >
                  {section.subtitle}
                </p>
              ) : null}

              {/* Título */}
              <h1
                className="section-title text-lg md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6"
               
              >
                {section.title}
              </h1>

              {/* Contenido */}
              <div className="section-content space-y-5 text-lg md:text-xl text-white/85 leading-relaxed">
                {section.content}
              </div>

              {/* Accent / Cita */}
              {section.accent && (
                <div
                  className="section-accent mt-8 pl-4 "
                 
                >
                  <p className="text-white/60 italic text-base">
                    {section.accent}
                  </p>
                </div>
              )}

              {/* CTA solo en primera sección */}
              {index === 0 && (
                <div className="mt-10 flex items-center gap-3 text-white/50">
                  <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/30" />
                  <span className="text-sm tracking-widest uppercase">Desliza para conocer más</span>
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Indicador de progreso */}
          <div className="absolute bottom-8 left-8 flex items-center gap-4">
            <div className="flex gap-2">
              {sections.map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-1 rounded-full"
                  style={{
                    background: i === index
                      ? 'linear-gradient(90deg, #ff006e, #8338ec)'
                      : 'rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
            <span className="text-white/50 text-sm tracking-widest">
              {String(index + 1).padStart(2, '0')} / {String(totalSections).padStart(2, '0')}
            </span>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AboutNew;