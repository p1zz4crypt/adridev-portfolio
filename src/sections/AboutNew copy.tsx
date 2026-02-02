import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Img1 from '../assets/ad1.png'
import Img2 from '../assets/ad2.png'
import Img3 from '../assets/ad3.png'
import VideoCam from '../assets/Video.png'

gsap.registerPlugin(ScrollTrigger);

interface Section {
  id: number;
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const sections: Section[] = [
  {
    id: 1,
    title: 'About Me',
    subtitle: 'Antes de ser desarrolladora, fui cocinera durante 7 años. Esa experiencia y mentalidad práctica, colaborativa y orientada al resultado sigue guiando mi trabajo.Esa combinación de aptitudes + un gran deseo de aprender, me brindaron la oportunidad de colaborar en la implementación de **Blockchain** en el despacho de Auditoría "Ferrer y Asociados", de **Grupo Salinas**.',
    backgroundImage: `${Img1}`,
  
  },
  {
    id: 2,
    title: 'Frontend',
    subtitle: 'Developer',
    backgroundImage: `${Img2}`,
  },
  {
    id: 3,
    title: 'Project',
    subtitle: 'Manager',
    backgroundImage: `${Img3}`,
  },
  {
    id: 4,
    title: 'Creative',
    subtitle: 'Thinker',
    backgroundImage: 'https://images.pexels.com/photos/1037996/pexels-photo-1037996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

const AboutNew = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const horizontalSections = sectionsRef.current.filter(Boolean);

      gsap.to(horizontalSections, {
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

      // Animación de entrada para los títulos
      horizontalSections.forEach((section, index) => {
        const title = section.querySelector('.section-title');
        const subtitle = section.querySelector('.section-subtitle');

        gsap.fromTo(
          [title, subtitle],
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              containerAnimation: gsap.getById('horizontal-scroll') || undefined,
              start: 'left center',
              toggleActions: 'play none none reverse',
            },
          }
        );
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
    <div>
        <div className='flex flex-col items-center' style={{position: 'fixed', zIndex: '99', top: '85%', left: '2%'}}>
            <img src={VideoCam} alt="video" width={'100px'}/>
            <h1 className='text-white'>
                Video
            </h1>
        </div>
    <div
      ref={containerRef}
      className="h-screen flex flex-nowrap"
      style={{ width: `${sections.length * 100}vw` }}
    >

      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => addToRefs(el, index)}
          className="horizontal-section relative h-screen w-screen flex-shrink-0 flex justify-center items-center bg-black bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${section.backgroundImage})`,
            backgroundPositionY: '10%',
            backgroundSize: 'contain',
          }}
        >
          {/* Overlay con gradiente de tu paleta */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,110,0.3) 0%, rgba(131,56,236,0.3) 50%, rgba(58,134,255,0.3) 100%)',
            }}
          />

          {/* Contenido */}
          <div className="relative z-10 text-center flex flex-col items-center px-8">
            <h1 
              className="section-title font-oswald text-[8vw] font-light text-white tracking-[1vw] uppercase"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {section.title}
            </h1>
            {section.subtitle && (
              <p 
                className="section-subtitle w-2/3 mt-4  text-[1vw] font-light text-white/80 "
              >
                {section.subtitle}
              </p>
            )}
          </div>

          {/* Indicador de sección */}
          <div className=" absolute bottom-8 left-80 text-white/60 text-sm tracking-widest">
            {String(index + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
          </div>

          {/* Decoración glassmorphism */}
          <div 
            className="absolute bottom-8 right-8 w-16 h-16 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          />
        </section>
      ))}
    </div>
    </div>
  );
};

export default AboutNew;