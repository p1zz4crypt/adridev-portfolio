import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Importa tu nave aquí
// import Spaceship from "../assets/Spaceship2.png";

interface SpaceshipHeroProps {
  spaceshipSrc: string;
  name?: string;
  title?: string;
  subtitle?: string;
}

export default function SpaceshipHero({
  spaceshipSrc,
  name = "ADRII",
  title = "PROJECT MANAGER",
  subtitle = "& CREATIVE DEVELOPER"
}: SpaceshipHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceshipRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // ════════════════════════════════════════════════════════════════
      // INTRO ANIMATION TIMELINE
      // ════════════════════════════════════════════════════════════════
      const introTL = gsap.timeline({ delay: 0.3 });

      // Fade in del fondo de estrellas
      introTL.fromTo(starsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power2.out" }
      , 0);

      // Grid aparece con efecto de "encendido"
      introTL.fromTo(gridRef.current,
        { opacity: 0, scale: 1.5 },
        { opacity: 0.6, scale: 1, duration: 2, ease: "power3.out" }
      , 0.2);

      // Nave entra desde arriba con bounce elegante
      introTL.fromTo(spaceshipRef.current,
        { 
          y: -400, 
          x: 200,
          rotation: -30,
          scale: 0.3,
          opacity: 0,
          filter: "brightness(2) blur(10px)"
        },
        { 
          y: 0, 
          x: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          filter: "brightness(1) blur(0px)",
          duration: 2,
          ease: "power3.out"
        }
      , 0.5);

      // Glow aparece después de la nave
      introTL.fromTo(glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      , 1.5);

      // Beam de luz (rayo tractor) aparece
      introTL.fromTo(beamRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 0.7, duration: 1.2, ease: "power2.out" }
      , 2);

      // Texto aparece con efecto glitch/reveal
      introTL.fromTo(titleRef.current,
        { 
          opacity: 0, 
          y: 50,
          clipPath: "inset(0 100% 0 0)"
        },
        { 
          opacity: 1, 
          y: 0,
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.out"
        }
      , 2.2);

      introTL.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      , 2.6);

      // ════════════════════════════════════════════════════════════════
      // ANIMACIONES AMBIENTALES CONTINUAS
      // ════════════════════════════════════════════════════════════════
      
      // Levitación de la nave
      gsap.to(spaceshipRef.current, {
        y: "+=20",
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Rotación sutil
      gsap.to(spaceshipRef.current, {
        rotation: "+=5",
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Pulsación del glow
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Beam pulsante
      gsap.to(beamRef.current, {
        opacity: 0.4,
        scaleX: 0.9,
        duration: 1.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });

      // Partículas flotando
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.to(particle, {
            y: `+=${gsap.utils.random(-100, 100)}`,
            x: `+=${gsap.utils.random(-50, 50)}`,
            opacity: gsap.utils.random(0.3, 1),
            duration: gsap.utils.random(3, 6),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * 0.2
          });
        });
      }

      // ════════════════════════════════════════════════════════════════
      // SCROLL ANIMATIONS
      // ════════════════════════════════════════════════════════════════
      
      // Parallax de la nave al hacer scroll
      gsap.to(spaceshipRef.current, {
        y: 300,
        rotation: 15,
        scale: 0.7,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2
        }
      });

      // Grid se aleja
      gsap.to(gridRef.current, {
        scale: 2,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1.5
        }
      });

      // Texto desaparece hacia arriba
      gsap.to([titleRef.current, subtitleRef.current], {
        y: -100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "40% top",
          scrub: 1
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generar estrellas aleatorias
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3
  }));

  // Generar partículas
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 6 + 2
  }));

  return (
    <div 
      ref={containerRef}
      className="hero-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "800px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 50%, #0f0f1a 100%)"
      }}
    >
      {/* Estrellas de fondo */}
      <div 
        ref={starsRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0
        }}
      >
        {stars.map(star => (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background: "#fff",
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.8)`,
              animation: `twinkle ${2 + star.delay}s ease-in-out infinite`,
              animationDelay: `${star.delay}s`
            }}
          />
        ))}
      </div>

      {/* Grid de fondo estilo retro */}
      <div
        ref={gridRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: "-50%",
          width: "200%",
          height: "60%",
          opacity: 0,
          background: `
            linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px),
            linear-gradient(0deg, rgba(139,92,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)"
        }}
      />

      {/* Partículas flotantes */}
      <div ref={particlesRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {particles.map(p => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "rgba(236, 72, 153, 0.6)",
              boxShadow: `0 0 ${p.size * 3}px rgba(236, 72, 153, 0.8)`,
              filter: "blur(1px)"
            }}
          />
        ))}
      </div>

      {/* Glow detrás de la nave */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `
            radial-gradient(circle, 
              rgba(236, 72, 153, 0.4) 0%, 
              rgba(139, 92, 246, 0.3) 30%,
              rgba(59, 130, 246, 0.1) 60%,
              transparent 70%
            )
          `,
          filter: "blur(40px)",
          opacity: 0,
          pointerEvents: "none"
        }}
      />

      {/* Beam de luz (rayo tractor) */}
      <div
        ref={beamRef}
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "400px",
          background: `
            linear-gradient(180deg,
              rgba(236, 72, 153, 0.6) 0%,
              rgba(139, 92, 246, 0.3) 50%,
              transparent 100%
            )
          `,
          clipPath: "polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)",
          filter: "blur(8px)",
          opacity: 0,
          transformOrigin: "top center",
          pointerEvents: "none"
        }}
      />

      {/* NAVE ESPACIAL */}
      <img
        ref={spaceshipRef}
        src={spaceshipSrc}
        alt="Spaceship"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(500px, 70vw)",
          height: "auto",
          zIndex: 10,
          filter: "drop-shadow(0 0 30px rgba(236, 72, 153, 0.5)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.3))",
          willChange: "transform, filter, opacity"
        }}
      />

      {/* Contenido de texto */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 20
        }}
      >
        <h1
          ref={titleRef}
          style={{
            fontSize: "clamp(3rem, 10vw, 8rem)",
            fontWeight: 900,
            fontFamily: "'Roboto Condensed', sans-serif",
            letterSpacing: "0.3em",
            color: "transparent",
            background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            textShadow: "0 0 80px rgba(236, 72, 153, 0.5)",
            margin: 0,
            opacity: 0
          }}
        >
          {name}
        </h1>
        <p
          ref={subtitleRef}
          style={{
            fontSize: "clamp(1rem, 3vw, 1.5rem)",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.5em",
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "1rem",
            opacity: 0
          }}
        >
          {title} <span style={{ color: "#ec4899" }}>{subtitle}</span>
        </p>
      </div>

      {/* Indicador de scroll */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.6,
          animation: "bounce 2s ease-in-out infinite"
        }}
      >
        <span style={{ 
          fontSize: "0.75rem", 
          letterSpacing: "0.3em", 
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Space Mono', monospace"
        }}>
          SCROLL
        </span>
        <div style={{
          width: "1px",
          height: "40px",
          background: "linear-gradient(to bottom, rgba(236, 72, 153, 0.8), transparent)"
        }} />
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@900&family=Space+Mono&display=swap');
      `}</style>
    </div>
  );
}
