import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionTitle from "@/components/SectionTitle";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { View } from "lucide-react";
import Me from "../assets/ad1.png";
import Me2 from "../assets/ad2.png";
import Me3 from "../assets/ad3.png";
import { Seo } from "../Seo";
import { ArrowLeft } from 'lucide-react';
import { ArrowRight } from 'lucide-react';


gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);

  // Slides content as JSX (badges included)
  const slidesContent: React.ReactNode[] = [
    // Slide 1: skills with badges (your provided markup)
    (
      <div>
        <p className="text-sm md:text-lg mb-4 text-muted-foreground dark:text-foreground">
          Soy Adriana Rosas, vivo en CDMX. <br />
          Desde hace 7 años me dedico al desarrollo front end creando interfaces intuitivas, participando en las etapas de:
        </p>

        <ul className="space-y-3 mb-6">
          <li className="flex items-start">
            <span className="mr-2">-</span>
            <div className="flex-1">
              Diseño de interfaz y prototipos prácticos en
              <div className="mt-1 flex flex-wrap gap-2">
                <span aria-label="Figma" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Figma</span>
                <span aria-label="Adobe XD" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Adobe XD</span>
              </div>
            </div>
          </li>

          <li className="flex items-start">
            <span className="mr-2">-</span>
            <div className="flex-1">
              Creación y modificación de elementos visuales y generación de imagen con IA:
              <div className="mt-1 flex flex-wrap gap-2">
                <span aria-label="Photoshop" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Photoshop</span>
                <span aria-label="Figma" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Figma</span>
                <span aria-label="Leonardo AI" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Leonardo AI</span>
                <span aria-label="Stable Diffusion" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Stable Diffusion</span>
                <span aria-label="ImageFX" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">ImageFX</span>
                <span aria-label="Nano Banana" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Nano Banana</span>
              </div>
            </div>
          </li>

          <li className="flex items-start">
            <span className="mr-2">-</span>
            <div className="flex-1">
              Maquetación responsiva con
              <div className="mt-1 flex flex-wrap gap-2">
                <span aria-label="CSS" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">CSS</span>
                <span aria-label="Tailwind" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Tailwind</span>
                <span aria-label="Material-UI" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Material-UI</span>
                <span aria-label="Bootstrap" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Bootstrap</span>
              </div>
            </div>
          </li>

          <li className="flex items-start">
            <span className="mr-2">-</span>
            <div className="flex-1">
              Desarrollo de aplicaciones web con
              <div className="mt-1 flex flex-wrap gap-2">
                <span aria-label="Vue" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Vue</span>
                <span aria-label="React" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">React</span>
                <span aria-label="JavaScript" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">JavaScript</span>
              </div>
            </div>
          </li>

          <li className="flex items-start">
            <span className="mr-2">-</span>
            <div className="flex-1">
              Conexión con APIs y bases de datos usando
              <div className="mt-1 flex flex-wrap gap-2">
                <span aria-label="Insomnia" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">Insomnia</span>
                <span aria-label="GraphQL" className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-black border border-blue-100">GraphQL</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    ),

    // Slide 2: long paragraph (your provided text)
    (
      <div className="text-sm md:text-lg">
        <p className="mb-4 text-muted-foreground dark:text-foreground">
          Antes de ser desarrolladora, fui cocinera durante 7 años. Esa experiencia y mentalidad práctica, colaborativa y orientada al resultado sigue guiando mi trabajo.
          <br />
          <br />
          Esa combinación de aptitudes + un gran deseo de aprender, me brindaron la oportunidad de colaborar en la implementación de <span className="font-black text-black">Blockchain</span>  en el despacho de Auditoría "Ferrer y Asociados", de <span className="font-black text-black">Grupo Salinas</span>.
        </p>

        <p className="mb-4 text-muted-foreground dark:text-foreground">
          Afortunadamente la vida es cíclica y yo aprovecho cada vuelta para aprender y construir. Actualmente estoy enfocada en aprender desarrollo de tiendas en Shopify y en crear y escalar POCs que unan datos, 
          creativos generativos <span className="font-black text-black">(Runway, HeyGen, ElevenLabs, RoboNeo, Veo3)</span>, edición en <span className="font-black text-black">CapCut</span> y automatizaciones con diversas herramientas.
        </p>
      </div>
    ),

    // Slide 3: contact call
    (
      <div>
        <p className="mb-4 text-lg md:text-3xl text-center text-muted-foreground dark:text-foreground">
          Si tienes un proyecto interesante o simplemente quieres charlar sobre el maravilloso mundo de la tecnología, ¡no dudes en contactarme!
        </p>
        <div className="w-full flex justify-center mt-5">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-base font-medium text-white bg-violet-600 hover:bg-violet-700 shadow-lg hover:shadow-violet-300/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            <View className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            Aquí
          </a>
        </div>
      </div>
    ),
  ];

  // images for slides (3 entries)
  const images = [Me, Me2, Me3];

  // slides array for navigation dots
  const slides = slidesContent.map((_, idx) => ({
    id: idx,
    title: `${idx + 1}/${slidesContent.length}`,
  }));

  // refs
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [active, setActive] = useState<number>(0);
  const prevRef = useRef<number>(0);

  // parallax
  useEffect(() => {
    if (!sectionRef.current || !leftRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(leftRef.current!.querySelectorAll(".parallax"), {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // initial layout: set visibility
  useLayoutEffect(() => {
    slideRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.set(el, { autoAlpha: idx === active ? 1 : 0, display: idx === active ? "block" : "none" });
      }
    });
    imageRefs.current.forEach((el, idx) => {
      if (el) {
        gsap.set(el, {
          autoAlpha: idx === active ? 1 : 0.45,
          scale: idx === active ? 1 : 0.96,
          zIndex: idx === active ? 20 : 10,
        });
      }
    });
  }, [active]); // Añadimos active como dependencia

  // animate on active change
  useEffect(() => {
    const prev = prevRef.current;
    if (prev === active) return;

    const outEl = slideRefs.current[prev];
    const inEl = slideRefs.current[active];

    const tl = gsap.timeline();
    if (outEl) {
      tl.to(outEl, { duration: 0.25, autoAlpha: 0, x: -18, ease: "power2.in" });
      tl.set(outEl, { display: "none" });
    }
    if (inEl) {
      tl.set(inEl, { display: "block", x: 18, autoAlpha: 0 });
      tl.to(inEl, { duration: 0.45, autoAlpha: 1, x: 0, ease: "power2.out" }, "+=0.02");
    }

    // images animation
    const tlImg = gsap.timeline();
    imageRefs.current.forEach((imgEl, idx) => {
      if (!imgEl) return;
      if (idx === active) {
        tlImg.to(imgEl, { duration: 0.5, autoAlpha: 1, scale: 1, zIndex: 20, ease: "power2.out" }, 0);
      } else {
        tlImg.to(imgEl, { duration: 0.45, autoAlpha: 0.45, scale: 0.96, zIndex: 10, ease: "power2.out" }, 0);
      }
    });

    prevRef.current = active;
    return () => {
      tl.kill();
      tlImg.kill();
    };
  }, [active]);

  const goto = (i: number) => {
    const safe = Math.max(0, Math.min(i, slidesContent.length - 1));
    setActive(safe);
  };

  // Navegación con efecto de bucle
  const goPrev = () => goto((active - 1 + slidesContent.length) % slidesContent.length);
  const goNext = () => goto((active + 1) % slidesContent.length);

  // Verificar si estamos en los límites para posible personalización visual
  const isFirst = active === 0;
  const isLast = active === slidesContent.length - 1;

  const handleViewCV = () => {
    const pdfUrl = "/CV2025.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <Seo
        title=" Sobre Adri Rosas| Experiencia y Habilidades"
        description="Front End Developer | Diseño UI | Tecnología Blockchain"
        type="profile"
        image="/public/og-image.png"
      />
      <section
        id="about"
        ref={(el) => (sectionRef.current = el)}
        className="w-full bg-[#F3EFEA] dark:bg-gradient-section-2-dark"
      >
        <div className="section-container py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: images */}
            <div className="relative " ref={(el) => (leftRef.current = el)}>
              <div className="flex flex-col h-[200px] md:h-[500px] ">
                <div>
                  {images.map((src, idx) => (
                    <div
                      key={idx}
                      ref={(el) => (imageRefs.current[idx] = el)}
                      className="absolute inset-0 m-auto  h-full w-full  rounded-xl overflow-hidden  parallax cursor-pointer"
                      style={{
                        pointerEvents: idx === active ? "auto" : "none",
                        zIndex: idx === active ? 20 : 10,
                        opacity: idx === active ? 1 : 0.45,
                        transform: `scale(${idx === active ? 1 : 0.96})`,
                        transition: "opacity 260ms ease, transform 260ms ease",
                      }}
                      onClick={() => goto(idx)}
                    >
                      <LazyLoadImage src={src} alt={`Adriana ${idx + 1}`} effect="blur" className="w-full h-full object-cover aspect-square" />
                    </div>
                  ))}

                </div>

              </div>
              <div className="flex justify-center w-full  gap-3 absolute  z-50 mt-6">
                <RevealOnScroll delay={0.3}>
                  <div className=" mr-">
                    <Button size="lg" className="group bg-black" onClick={handleViewCV}>
                      <View className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      Ver CV
                    </Button>
                  </div>
                </RevealOnScroll>

                <div className="flex justify-center">
                  <button
                    onClick={goPrev}
                    className={`px-5 mr-3 py-1 border rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300
                      ${isFirst
                        ? ' border-black'
                        : 'bg-[#F3EFEA] dark:bg-gradient-section-3-dark hover:border-black'}`}
                  >
                    <ArrowLeft className={`w-6 h-6 ${isFirst ? 'text-black' : 'text-primary hover:text-black'}`} />
                  </button>
                  <button
                    onClick={goNext}
                    className={`px-5 py-1 border rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-black
                      ${isLast
                        ? ' border-black'
                        : 'bg-[#F3EFEA] dark:bg-gradient-section-3-dark hover:border-gray-400'}`}
                  >
                    <ArrowRight className={`w-6 h-6 ${isLast ? 'text-black' : 'text-primary hover:text-black'}`} />
                  </button>
                </div>

              </div>
            </div>

            {/* RIGHT: slides */}
            <div className="md:mt-28 mt-16">
              <SectionTitle
                subtitle="Acerca de mi"
                title={
                  <div className="flex items-center gap-2">
                    {slides.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => goto(s.id)}
                        aria-label={`Ir a ${s.title}`}
                        aria-current={s.id === active} 
                        className={`w-3 h-1 px-4  rounded-full transition-all ${s.id === active ? "bg-black" : "bg-gray-300 dark:bg-black"}`}
                      />
                    ))}
                  </div>
                }
                center={false}
              />
              

              <RevealOnScroll>
                <div className="relative">
                  <div className="md:min-h-[500px] min-h-[450px] text-sm md:text-lg relative overflow-y-auto overflow-x-hidden">
                    {slidesContent.map((node, idx) => (
                      <div
                        key={idx}
                        ref={(el) => (slideRefs.current[idx] = el)}
                        className="absolute inset-0 w-full"
                        style={{ display: idx === active ? "block" : "none" }}
                        aria-hidden={idx !== active}
                      >
                        {node}
                      </div>
                    ))}
                  </div>




                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
