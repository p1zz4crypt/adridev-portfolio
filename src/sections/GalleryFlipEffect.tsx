/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Uno from "../assets/ad1.png";
import Dos from "../assets/ad2.png";
import Tres from "../assets/ad3.png";
import BlobImageGSAP from './BlobImageGSAP';

gsap.registerPlugin(ScrollTrigger);

interface SectionColor {
  bg: string;
  text: string;
}

interface GalleryItem {
  image: string;
  title: string;
  description: string;
}

const GalleryFlipEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const [sectionColors, setSectionColors] = useState<SectionColor[]>([
    { bg: '#bcb8ad', text: '#032f35' },
    { bg: '#1a1a1a', text: '#e8e8e8' },
    { bg: '#e3857a', text: '#f1dba7' },
  ]);

  // Extraer el src de las imágenes (Next.js StaticImageData tiene .src)
  const getImageSrc = (img: string | { src: string }): string => {
    if (typeof img === 'string') return img;
    if (img?.src) return img.src;
    return '';
  };

  const galleryItems: GalleryItem[] = [
    {
      image: getImageSrc(Uno),
      title: "Innovación Digital",
      description: "Exploramos las fronteras de la tecnología moderna, transformando ideas en soluciones visuales impactantes que capturan la esencia de la innovación."
    },
    {
      image: getImageSrc(Dos),
      title: "Diseño Creativo",
      description: "Cada proyecto es una obra maestra donde la creatividad se encuentra con la funcionalidad, generando experiencias visuales memorables."
    },
    {
      image: getImageSrc(Tres),
      title: "Experiencia Visual",
      description: "Nos sumergimos en el arte de contar historias a través de imágenes, creando narrativas visuales que resuenan con la audiencia."
    },
    {
      image: getImageSrc(Uno),
      title: "Transformación Digital",
      description: "Revolucionamos la forma en que las marcas se presentan en el mundo digital, integrando tecnología y diseño de manera armoniosa."
    },
    {
      image: getImageSrc(Dos),
      title: "Estrategia Multimedia",
      description: "Desarrollamos estrategias visuales comprensivas que optimizan el impacto de cada proyecto en todos los canales digitales."
    },
    {
      image: getImageSrc(Tres),
      title: "Futuro del Diseño",
      description: "Anticipamos tendencias y creamos soluciones que no solo satisfacen las necesidades actuales, sino que abren camino al futuro."
    },
  ];

  const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);

    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;

    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;

    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);

    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  const updateBackgroundColor = React.useCallback((progress: number) => {
    const container = document.documentElement;
    
    if (progress < 0.5) {
      const p = progress * 2;
      const color1 = sectionColors[0];
      const color2 = sectionColors[1];
      
      container.style.setProperty('--bg-color', interpolateColor(color1.bg, color2.bg, p));
      container.style.setProperty('--text-color', interpolateColor(color1.text, color2.text, p));
    } else {
      const p = (progress - 0.5) * 2;
      const color2 = sectionColors[1];
      const color3 = sectionColors[2];
      
      container.style.setProperty('--bg-color', interpolateColor(color2.bg, color3.bg, p));
      container.style.setProperty('--text-color', interpolateColor(color2.text, color3.text, p));
    }
  }, [sectionColors, interpolateColor]);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    if (!pinWrap) return;

    const pinWrapWidth = pinWrap.offsetWidth;
    const horizontalScrollLength = pinWrapWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to('.pin-wrap', {
        x: -horizontalScrollLength,
        ease: 'none',
        scrollTrigger: {
          trigger: '#sectionPin',
          start: 'top top',
          end: () => `+=${horizontalScrollLength}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateBackgroundColor(self.progress);
          },
        },
      });
    });

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [updateBackgroundColor]);

  return (
    <div
      ref={containerRef}
      className="container w-full overflow-x-hidden text-[var(--text-color)] transition-colors duration-300"
      style={
        {
         backgroundColor: "black",
          '--text-color': sectionColors[0].text,
        } as React.CSSProperties
      }
    >
      {/* Sección 1 - Hero */}
      <section className="min-h-screen w-full relative grid place-items-center px-6 py-20">
        <div className="absolute top-[10vw] left-[10vw] z-40 w-full max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight font-termina break-words mb-4">
            <span className="block">Horizontal</span>
            <span className="block">scroll</span>
            <span className="block">section</span>
          </h1>
        </div>

        <p className="absolute bottom-[10vw] right-[10vw] w-48 leading-relaxed text-sm md:text-base">
          with GSAP ScrollTrigger & smooth scroll
        </p>
      </section>

      {/* Sección 2 - Horizontal Scroll */}
      <section
        id="sectionPin"
        className="h-screen w-full relative"
        style={{ overflow: 'hidden' }}
      >
        <div
          ref={pinWrapRef}
          className="pin-wrap h-screen flex items-center justify-start px-6 lg:px-[10vw] gap-[3vw] md:gap-[5vw] will-change-transform absolute left-0 top-0"
          style={{ width: 'fit-content' }}
        >
          {/* Contenido inicial */}
          <div className="flex-shrink-0 h-[70vh] md:h-[80vh] w-[90vw] md:w-[60vw] flex flex-col justify-center gap-8 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 md:p-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                Galería Interactiva
              </h2>
              <p className="text-base md:text-lg leading-relaxed opacity-90">
                Explore nuestro portafolio de proyectos innovadores. Cada imagen cuenta una historia única de creatividad, diseño y ejecución técnica. Desplácese para descubrir cómo transformamos visiones en realidad visual.
              </p>
            </div>
          </div>

          {/* Imágenes con efecto Blob */}
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[90vw] md:w-[50vw] lg:w-[40vw] flex flex-col items-center justify-center gap-6"
            >
              {/* Blob con la imagen del item */}
              <div className="w-full flex justify-center">
                <BlobImageGSAP imageSrc={item.image} />
              </div>

              {/* Texto debajo del blob */}
              <div className="text-center px-4">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base leading-relaxed opacity-80 line-clamp-3">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección 3 - Footer */}
      <section className="min-h-screen w-full relative grid place-items-center px-6 lg:px-[10vw] py-20">
        <div className="flex flex-col items-center justify-center gap-8">
          <BlobImageGSAP 
            imageSrc="https://images.pexels.com/photos/4791474/pexels-photo-4791474.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          />
          <h2 className="text-center font-termina text-3xl md:text-4xl font-bold">
            <a
              href="https://madebybeings.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity underline"
            >
              Made by Beings
            </a>
          </h2>
        </div>
      </section>

      {/* Global Styles */}
      <style>{`
        :root {
          --text-color: ${sectionColors[0].text};
          --bg-color: ${sectionColors[0].bg};
        }

        * {
          box-sizing: border-box;
        }

     

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: clamp(2.5rem, 16vw, 5rem);
          }

          h2 {
            font-size: clamp(1.5rem, 5vw, 2.5rem);
          }
        }

        .pin-wrap > div {
          flex-shrink: 0;
        }

        img {
          display: block;
        }

        a {
          color: inherit;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default GalleryFlipEffect;