import React, { useEffect, useRef, useState } from 'react'; // Agrega useState
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import { View } from 'lucide-react';
import Me from "../assets/adr-min.webp";
import Me2 from "../assets/img/adri2.webp";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // Estado para controlar la imagen activa
  const [activeImage, setActiveImage] = useState<'image-1' | 'image-2'>('image-1');

  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current || !rightColRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for images
      gsap.to(leftColRef.current.querySelector('.image-1'), {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to(leftColRef.current.querySelector('.image-2'), {
        y: 50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleViewCV = () => {
    const pdfUrl = "/CV-Adriana-Rosas-2025.pdf";
    window.open(pdfUrl, '_blank');
  };

  // Manejador para cambiar la imagen activa
  const handleImageClick = (image: 'image-1' | 'image-2') => {
    setActiveImage(image);
  };

  return (
    <section id="about" ref={sectionRef} className="w-full bg-gradient-section-2 dark:bg-gradient-section-2-dark ">
      <div className='section-container py-24 relative '>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px]" ref={leftColRef}>
            {/* Imagen 1 */}
            <div
              className={`absolute top-0 right-0 w-4/5 h-auto ${
                activeImage === 'image-1' ? 'z-20' : 'z-10'
              } image-1 bg-white rounded cursor-pointer`}
              onClick={() => handleImageClick('image-1')} 
            >
              <img
                src={Me}
                alt="About Me 1"
                className="rounded-xl shadow-xl border border-white/10 dark:border-midnight/20 w-full h-auto aspect-square object-cover"
                loading="lazy"
              />
            </div>

            {/* Imagen 2 */}
            <div
              className={`absolute bottom-0 left-0 w-4/5 h-auto ${
                activeImage === 'image-2' ? 'z-20' : 'z-10'
              } image-2 cursor-pointer`}
              onClick={() => handleImageClick('image-2')} 
            >
              <img
                src={Me2}
                alt="About Me 2"
                className="rounded-xl shadow-xl border border-white/10 dark:border-midnight/20 w-full h-auto aspect-square object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div ref={rightColRef}>
            <SectionTitle
              subtitle="Acerca de mi"
              title="Un poco de contexto"
              center={false}
            />

            <RevealOnScroll>
              <p className="mb-6 text-muted-foreground text-foreground dark:text-foreground">
                ¡Hola! Soy Adriana Rosas, una ex cocinera que un día decidió dar un giro en su vida y aprender desarrollo. <br /><br /> A lo largo de mis 6 años de experiencia, he trabajado con herramientas como JavaScript, Vue.js y React para construir aplicaciones web modernas, responsivas y centradas en el usuario.<br />

                Me encanta explorar y aprender sobre tecnologías emergentes, especialmente Blockchain, aprendizaje automático y animación web, y siempre busco formas de integrarlas en mis proyectos para crear soluciones innovadoras.<br /> Disfruto enfrentar retos técnicos y colaborar en equipos multidisciplinarios para llevar ideas creativas al siguiente nivel.
                <br /><br />Si tienes un proyecto interesante o simplemente quieres charlar sobre desarrollo web, ¡no dudes en contactarme!
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3}>
              <Button
                size="lg"
                className="group"
                onClick={handleViewCV}
              >
                <View className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                Ver CV
              </Button>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;