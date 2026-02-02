import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Mail, Phone } from "lucide-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Ovni from "../assets/ovni.png";
import ProjectsSection from "./ProjectsSection";


gsap.registerPlugin(ScrollTrigger);

export default function PortfolioLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Referencias para los elementos parallax
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxElement1Ref = useRef<HTMLDivElement>(null);
  const parallaxElement2Ref = useRef<HTMLDivElement>(null);
  const parallaxElement3Ref = useRef<HTMLDivElement>(null);

  const subtStyle = {
    WebkitTextStroke: "3px black",
    color: "#F3EFEA",
    paintOrder: "stroke fill",
    textStroke: "2px black",
    fontFamily: "Roboto Condensed",
    letterSpacing: "2px",
  };

  
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Elemento 1: Círculo grande - Movimiento fluido
      gsap.to(parallaxElement1Ref.current, {
        x: -800,
        y: 300,
        rotation: 360,
        scale: 1.5,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          markers: false
        }
      });

      // Animación simplificada y fluida de la nave espacial
      const spaceshipTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          markers: false
        }
      });

      // Trayectoria fluida en curva S suave
      spaceshipTimeline
        // Entrada desde la derecha superior
        .to(parallaxElement2Ref.current, {
          x: 200,
          y: 300,
          rotation: 15,
          scale: 1.2,
          filter: "drop-shadow(0 0 50px rgba(139,92,246,0.8)) brightness(1.3)",
          ease: "power1.inOut"
        }, 0)
        // Cruce al centro con mayor brillo
        .to(parallaxElement2Ref.current, {
          x: -300,
          y: 600,
          rotation: -20,
          scale: 1.8,
          filter: "drop-shadow(0 0 80px rgba(139,92,246,1)) drop-shadow(0 0 120px rgba(59,130,246,0.8)) brightness(1.5)",
          ease: "power1.inOut"
        }, 0.35)
        // Giro hacia la derecha
        .to(parallaxElement2Ref.current, {
          x: 150,
          y: 900,
          rotation: 10,
          scale: 2,
          filter: "drop-shadow(0 0 90px rgba(139,92,246,1)) drop-shadow(0 0 140px rgba(59,130,246,0.9)) brightness(1.6)",
          ease: "power1.inOut"
        }, 0.65)
        // Salida suave hacia abajo-izquierda
        .to(parallaxElement2Ref.current, {
          x: -400,
          y: 1300,
          rotation: -35,
          scale: 0.7,
          opacity: 0.3,
          filter: "drop-shadow(0 0 30px rgba(139,92,246,0.5)) brightness(1.1)",
          ease: "power2.in"
        }, 0.9);

      // Efecto de levitación sutil (no interfiere con el scroll)
      gsap.to(parallaxElement2Ref.current, {
        y: "+=20",
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Elemento 3: Forma geométrica - Movimiento vertical marcado
      gsap.to(parallaxElement3Ref.current, {
        y: 1000,
        x: -500,
        rotation: 720,
        scale: 2.5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mt-25 flex flex-col bg-[#000000] dark:bg-gradient-section-6-dark text-black overflow-hidden"
      style={{ minHeight: '300vh' }}
    >
      {/* Elementos Parallax */}

      {/* Elemento 1: Círculo grande con gradiente */}
      <div
        ref={parallaxElement1Ref}
        className="fixed top-20 right-20 w-[400px] h-[400px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(59,130,246,0.3) 50%, rgba(147,51,234,0.1) 100%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }}
      />

      {/* Elemento 2: NAVE ESPACIAL (OVNI) */}
      <div
        ref={parallaxElement2Ref}
        className="fixed -top-10 right-1/4 pointer-events-none z-10"
        style={{
          width: '450px',
          height: 'auto',
          filter: 'drop-shadow(0 0 40px rgba(139,92,246,0.8)) drop-shadow(0 0 80px rgba(59,130,246,0.5))',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src={Ovni}
          alt="Spaceship"
          className="w-full h-auto"
          style={{
            filter: 'brightness(1.3) contrast(1.2) saturate(1.1)',
          }}
        />
      </div>

      {/* Elemento 3: Cuadrado rotado (rombo) */}
      <div
        ref={parallaxElement3Ref}
        className="fixed top-1/3 right-1/4 w-48 h-48 pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(147,51,234,0.3) 100%)',
          transform: 'rotate(45deg)',
          filter: 'blur(20px)',
          borderRadius: '20px'
        }}
      />

      {/* Gradiente de fondo */}
      <div
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(139,92,246,0.05) 50%, transparent 100%)',
        }}
      />

      {/* Contenido principal - sticky para que se mantenga visible */}
      <div className="sticky top-0 w-full min-h-screen flex flex-col justify-center md:pl-20 z-20">
        <div className="flex flex-col justify-center pt-16 md:pt-0">
          <h1
            className="pl-4 md:pl-0 font-medium capitalize tracking-tight leading-[0.9] md:text-[120px] text-[80px] mb-4 text-white"
            style={{ fontFamily: "Roboto Condensed" }}
          >
            Adriana Rosas
            <br />
          </h1>
          <p style={subtStyle} className="pl-4 md:pl-0 md:text-[2rem] text-[1.8rem]">
            Front-end Developer | Diseño UX/UI & AI <br /> Workflows |
            Tecnología Blockchain
          </p>
        </div>
        <ProjectsSection />
      </div>
    </section>
  );
}