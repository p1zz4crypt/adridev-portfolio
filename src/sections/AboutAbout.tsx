import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutSection from "./AboutSection";

import Img1 from "../assets/img/about/1.jpeg";
import Img2 from "../assets/img/about/2.jpeg";
import Img3 from "../assets/img/about/3.jpeg";
import Img4 from "../assets/img/about/4.jpeg";
import Img5 from "../assets/img/about/5.jpeg";
import Img6 from "../assets/img/about/6.jpeg";
import Img7 from "../assets/img/about/7.jpeg";
import Img8 from "../assets/img/about/8.jpeg";
import Img9 from "../assets/img/about/9.jpeg";
import Img10 from "../assets/img/about/10.jpeg";
import Img11 from "../assets/img/about/11.jpeg";
import Img12 from "../assets/img/about/12.jpeg";
import Img13 from "../assets/img/about/13.png";
import Img14 from "../assets/img/about/14.webp";
import Img15 from "../assets/img/about/15.png";
import RocketIcon from "../assets/img/rocket.png";
import OrbitIcon from "../assets/img/orbit.png";
import Fondito from "../assets/img/about/03 - Alfheim Forest.png";

gsap.registerPlugin(ScrollTrigger);

const AboutAbout = () => {
  const textContainRef = useRef<HTMLDivElement>(null);

  const columnsData = [
    {
      direction: "up",
      images: [Img1, Img2, Img3, Img4, Img13],
    },
    {
      direction: "down",
      images: [Img5, Img6, Img7, Img8, Img14],
    },
    {
      direction: "up",
      images: [Img9, Img10, Img11, Img12, Img15],
    },
  ];

  useEffect(() => {
    const container = textContainRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const highlights = gsap.utils.toArray<HTMLElement>(".text-highlight");

      highlights.forEach((highlight) => {
        ScrollTrigger.create({
          trigger: highlight,
          scroller: container,
          start: "top 85%",
          end: "top 20%",
          onEnter: () => highlight.classList.add("active"),
          onLeaveBack: () => highlight.classList.remove("active"),
        });
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleViewCV = () => {
    const pdfUrl = "/CV2025.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <style>{`
        .about-section {
          position: relative;
          height: 100vh;
          width: 100%;
          display: flex;
          flex-directon: column;
          align-items: center;
          overflow: hidden;
          background: black;
         /* background: 
            radial-gradient(ellipse at 0% 100%, rgba(255, 0, 110, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 100% 0%, rgba(131, 56, 236, 0.1) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0f0f18 50%, #0a0a0f 100%); */
            background-image: url('${Fondito}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
          padding: 0 0;
          
        }

        /* Estrellas de fondo */
        .about-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.2) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 10% 80%, rgba(255,0,110,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 85% 85%, rgba(131,56,236,0.5) 0%, transparent 100%);
          pointer-events: none;
        }

        /* Contenedor de ícono con adornos */
        .icon-container {
          position: absolute;
          pointer-events: none;
          z-index: 10;
        }

        /* Rocket container */
        .rocket-container {
          bottom: 10%;
          left: 3%;
        }

        .rocket-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(113, 227, 0, 0.25) 0%, transparent 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseGlow 3s ease-in-out infinite;
        }

        .rocket-trail {
          position: absolute;
          bottom: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 3px;
          height: 50px;
          background: linear-gradient(180deg, rgba(113, 227, 0, 0.7) 0%, transparent 100%);
          border-radius: 2px;
          animation: trailPulse 1.5s ease-in-out infinite;
        }

        .rocket-particles {
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
        }

        .rocket-particles span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ff006e;
          border-radius: 50%;
          animation: particleFall 1.5s ease-out infinite;
        }

        .rocket-particles span:nth-child(1) { left: -8px; animation-delay: 0s; }
        .rocket-particles span:nth-child(2) { left: 0; animation-delay: 0.3s; }
        .rocket-particles span:nth-child(3) { left: 8px; animation-delay: 0.6s; }

        .floating-rocket {
          position: relative;
          width: 90px;
          height: auto;
          animation: floatRocket 4s ease-in-out infinite;
          filter: drop-shadow(0 0 15px rgba(113, 227, 0, 0.4));
        }

        /* Orbit container */

.orbit-mobile{  
display:none;

      }

        .orbit-container {
          top: 80%;
          left: 5%;
          pointer-events: auto;
          cursor: pointer !important;
      
        }

        .orbit-glow {
          position: absolute;
          width: 130px;
          height: 130px;
          background: radial-gradient(circle, rgba(113, 227, 0, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulseGlow 4s ease-in-out infinite reverse;
        }

        .orbit-ring {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 1px solid rgba(113, 227, 0, 0.25);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: spinRing 20s linear infinite;
        }

        .orbit-ring::before {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: #8338ec;
          border-radius: 50%;
          top: -3px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 8px rgba(113, 227, 0, 0.7);
        }

        .orbit-dots {
          position: absolute;
          width: 70px;
          height: 70px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-dots span {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(113, 227, 0, 0.5);
          border-radius: 50%;
          animation: twinkle 2s ease-in-out infinite;
        }

        .orbit-dots span:nth-child(1) { top: 0; left: 50%; animation-delay: 0s; }
        .orbit-dots span:nth-child(2) { top: 50%; right: 0; animation-delay: 0.5s; }
        .orbit-dots span:nth-child(3) { bottom: 0; left: 50%; animation-delay: 1s; }
        .orbit-dots span:nth-child(4) { top: 50%; left: 0; animation-delay: 1.5s; }

        .floating-orbit {
          position: relative;
          width: 60px;
          height: auto;
          animation: floatOrbit 5s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(113, 227, 0, 0.4));
        }

        /* Animaciones íconos */
        @keyframes floatRocket {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-12px) rotate(0deg); }
        }

        @keyframes floatOrbit {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          50% { transform: translateY(-8px) rotate(5deg) scale(1.03); }
        }

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }

        @keyframes trailPulse {
          0%, 100% { opacity: 0.7; height: 50px; }
          50% { opacity: 0.3; height: 35px; }
        }

        @keyframes particleFall {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(25px); opacity: 0; }
        }

        @keyframes spinRing {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.3); }
        }

        /* Text Section */
        .text-contain {
          position: relative;
          z-index: 5;
          max-width: 70%;
          height: 60vh;
          overflow-y: auto;
          padding: 2rem;
          margin-left: 8%;
          scrollbar-width: thin;
          scrollbar-color: rgba(113, 227, 0, 1) rgba(255,255,255,0.0);
        }

        .text-contain::-webkit-scrollbar {
          width: 3px;
        }

        .text-contain::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 2px;
        }

        .text-contain::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ff006e, #8338ec);
          border-radius: 2px;
        }

        .text-contain h1 {
          font-size: clamp(1.4rem, 1.8vw + 0.8rem, 2.5rem);
          margin-bottom: 1.5rem;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
        }

        .text-contain p {
          font-size: clamp(1rem, 0.8vw + 1rem, 1.15rem);
          line-height: 1.8;
          margin-bottom: 1.25rem;
          color: rgba(255, 255, 255, 0.65);
        }

        /* Highlight Styles */
        .text-highlight {
          all: unset;
          background-repeat: no-repeat;
          background-size: 0% 100%;
background-image: linear-gradient(
  90deg,
  rgba(113, 227, 0, 1),
  rgba(113, 227, 0, 1)
);
          transition: 
            color 0.4s cubic-bezier(0.25, 1, 0.5, 1),
            background-size 1s cubic-bezier(0.25, 1, 0.5, 1);
          border-radius: 3px;
          padding: 1px 5px;
          margin: 0 1px;
        }

        .text-highlight.active {
          color: #ffffff;
          background-size: 100% 100%;
        }

      
        /* Tablet */
        @media (max-width: 1600px) {
          .text-contain {
          margin-top: 30%;
            max-width: 850px;
            margin-left: 5%;
            height:  60vh;
            background: linear-gradient(180deg,
              rgba(10, 10, 15, 0.95) 0%,
              rgba(10, 10, 15, 0.85) 100%);
            border-radius: 16px 16px 0 0;
            backdrop-filter: blur(10px);
          }

          .text-contain h1 {
            font-size: 1.75rem;
          }

          .text-contain p {
            font-size: 0.95rem;
            line-height: 1.75;
          }

          .image-columns-wrapper {
            gap: 16px;
            padding-right: 0;
            transform: scale(1.1);
          }

          .image-column {
            width: 160px;
          }

          .image-track img {
            height: 160px;
          }

          .floating-rocket {
            width: 70px;
          }

          .floating-orbit {
            width: 50px;
          }

          .orbit-ring {
            width: 80px;
            height: 80px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .about-section {
            flex-direction: column;
            justify-content: flex-end;
            padding-bottom: 2rem;
          }

          .text-contain {
            max-width: 100%;
            width: calc(100% - 2rem);
            height: 50vh;
            margin: 2rem 1rem;
            padding: 1.5rem 1rem;
            z-index: 10;
            background: linear-gradient(180deg, 
              rgba(10, 10, 15, 0.95) 0%, 
              rgba(10, 10, 15, 0.85) 100%);
            border-radius: 16px 16px 0 0;
            backdrop-filter: blur(10px);
          }

          .text-contain h1 {
            font-size: 1.35rem;
            margin-bottom: 1rem;
          }

          .text-contain p {
            font-size: 0.9rem;
            line-height: 1.7;
            margin-bottom: 1rem;
          }

          /* Mobile: galería detrás del texto */
          .image-columns-wrapper {
            position: absolute;
            top: 0;
            right: 0%;
            bottom: auto;
            height: 40vh;
            padding-right: 10%;
            transform:scale(1);
            gap: 12px;
          }

          .image-column {
            height: 80vh;
            width: 120px;
            border-radius: 12px;
          }

          .image-track img {
            height: 120px;
          }

          /* Mobile: íconos */
          .rocket-container {
            bottom: auto;
            top: 2%;
            left: auto;
            right: 2%;
            transform: scale(0.55);
            z-index: 15;
          }
            .orbit-mobile{
              display: block;
              top: -5%;
            left: 80%;
            transform: scale(0.5);
            z-index: 15;
            
              
              }

          .orbit-container {
            top: 2%;
            left: 2%;
            transform: scale(0.5);
            z-index: 15;
            display: none;
          }
        }

        /* Small Mobile */
        @media (max-width: 480px) {
          .about-section {
            padding-bottom: 1rem;
          }

          .text-contain {
            height: 50vh;
            width: calc(100% - 1rem);
            margin: 2rem 0.5rem 0 0.5rem;
            padding: 1rem 0.75rem;
           
          }

          .text-contain h1 {
            font-size: 1.2rem;
            margin-bottom: 0.75rem;
          }

          .text-contain p {
            font-size: 0.85rem;
            line-height: 1.65;
            margin-bottom: 0.75rem;
          }

          .image-columns-wrapper {
            right: 0%;
            transform: scale(0.9);
            gap: 10px;
          }

          .image-column {
            width: 100px;
          }

          .image-track img {
            height: 100px;
          }

          .rocket-container {
            transform: scale(0.45);
          }

          .orbit-mobile{
           transform: scale(0.4);
            display:none;
         
            
          }

          .orbit-container {
            transform: scale(0.4);
            display:none;
          }

          .orbit-ring,
          .rocket-trail {
            display: none;
          }
        }
      `}</style>

      <section className="about-section flex-col">
        <AboutSection/>

<div className="flex justify-center w-full">
   <div
            onClick={handleViewCV}
            className="icon-container orbit-container mt-4 cursor-pointer z-100"
          >
            <div className="orbit-glow" />
            <div className="orbit-dots">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <img
              src={OrbitIcon}
              alt=""
              className="floating-orbit"
              aria-hidden="true"
            />
            <div className="flex flex-col items-center ">
              <p
                className="cursor-pointer hover:font-bold text-4xl md:text-sm"
                style={{
                  fontFamily: "'Space Mono', monospace",

                  letterSpacing: "0.2em",
                  color: "#71E300",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
                }}
              >
                DESCARGA
              </p>
              <p
                className="cursor-pointer hover:font-bold text-4xl md:text-sm"
                style={{
                  fontFamily: "'Space Mono', monospace",

                  letterSpacing: "0.2em",
                  color: "#71E300",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  textShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
                }}
              >
                MI CV
              </p>
            </div>
          </div>


        {/* Texto con scroll */}
        <div className="text-contain mt-5" ref={textContainRef}>

         
          <div className="text-left md:text-right md:top-6 top-0  block md:fixed">
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

            <div
              onClick={handleViewCV}
              className="orbit-mobile icon-container  mt-4 cursor-pointer z-100"
            >
              <div className="orbit-glow" />
              <div className="orbit-dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <img
                src={OrbitIcon}
                alt=""
                className="floating-orbit"
                aria-hidden="true"
              />
              <div className="justify-center items-center flex-row ">
                <p
                  className="mr-4 md:mr-0cursor-pointer hover:font-bold text-4xl md:text-sm"
                  style={{
                    fontFamily: "'Space Mono', monospace",

                    letterSpacing: "0.2em",
                    color: "#71E300",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    textShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
                  }}
                >
                  DESCARGA
                </p>
                <p
                  className="cursor-pointer hover:font-bold text-4xl md:text-sm"
                  style={{
                    fontFamily: "'Space Mono', monospace",

                    letterSpacing: "0.2em",
                    color: "#71E300",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    textShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
                  }}
                >
                  MI CV
                </p>
              </div>
            </div>
          </div>
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
            SOBRE MÍ
          </h2>

          <p>
            ¡Hola! Soy{" "}
            <span className="text-white font-semibold">Adriana Rosas</span>.
          </p>
          <p>
            Antes de ser desarrolladora, pasé 7 años trabajando como cocinera.
            Una etapa que me enseñó a{" "}
            <mark className="text-highlight">
              resolver problemas bajo presión
            </mark>
            , <mark className="text-highlight">coordinar equipos</mark> y
            entregar resultados en tiempos muy cortos.
          </p>
          <p className="text-white/70">
            Mi interés por la tecnología despertó en 2019 al escuchar sobre{" "}
            <span className="font-medium">la tecnología blockchain</span>. Esa
            curiosidad fue el motor que me llevó a{" "}
            <mark className="text-highlight">
              dar el salto hacia una nueva carrera
            </mark>
            .
          </p>
          <p>
            Colaboré en la{" "}
            <span className="text-white font-medium">
              implementación de una Blockchain privada
            </span>{" "}
            en el despacho de Auditoría "Ferrer y Asociados" de Grupo Salinas:
            en donde apoyé en la planeación,{" "}
            <mark className="text-highlight">
              desarrollo de contratos inteligentes
            </mark>
            , <mark className="text-highlight">construcción de interfaz</mark> y
            capacitación al equipo.
          </p>
          <p className="text-white/70">
            En <span className="text-white">IA y automatización</span>, he
            experimentado con{" "}
            <mark className="text-highlight">
              pipelines de media generativa
            </mark>{" "}
            para creativos publicitarios: avatares con voz, generación de video
            e imagen, y{" "}
            <mark className="text-highlight">documentación de POCs</mark> para
            equipos de marketing.
          </p>
          <p className="text-white/70">
            También colaboré en la creación de una{" "}
            <span className="text-white">tienda en Shopify</span>: que incluye
            la implementación de themes con{" "}
            <mark className="text-highlight">Liquid</mark>, personalización de
            páginas, uso de apps y{" "}
            <mark className="text-highlight">estrategias de conversión</mark>.
          </p>
          <p>
            Estoy desarrollando el{" "}
            <span className="text-white font-medium">
              MVP de un marketplace de productos de segunda mano
            </span>
            , asumiendo el rol de{" "}
            <mark className="text-highlight">
              product owner y desarrolladora
            </mark>
            .
          </p>
          <p className="text-white/70">
            El proyecto abarca desde la{" "}
            <mark className="text-highlight">
              conceptualización hasta pruebas UX
            </mark>
            , combinando
            <span className="text-white"> Lovable</span> para desarrollo
            acelerado con IA,
            <span className="text-white"> Supabase</span> como backend, y{" "}
            <mark className="text-highlight">APIs de mensajería e IA</mark>
            para procesamiento de imágenes.
          </p>
          <p className="text-white/70">
            Para mí, desarrollar un MVP con herramientas de IA significa{" "}
            <mark className="text-highlight">iterar rápido</mark>,{" "}
            <mark className="text-highlight">validar con usuarios reales</mark>{" "}
            y tomar decisiones estratégicas —un ejercicio que me permite
            combinar pensamiento de producto, habilidades técnicas y visión de
            negocio.
          </p>
          <p>
            Si te interesa colaborar o simplemente compartir ideas,{" "}
            <mark className="text-highlight">escríbeme</mark>.
          </p>

        </div>
</div>
        {/* Orbit con adornos */}




      </section>
    </>
  );
};

export default AboutAbout;
