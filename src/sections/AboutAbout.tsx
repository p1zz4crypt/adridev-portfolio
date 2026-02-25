import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fondito from "../assets/img/about/venus.png";
import Avatar from "../assets/avatar.png"; 
import Footer from "@/components/Footer";

import Gallery from "./Gallery";

gsap.registerPlugin(ScrollTrigger);

const AboutAbout = () => {
  const textContainRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <style>{`
        .text-highlight {
          all: unset;
          background-repeat: no-repeat;
          background-size: 0% 100%;
          background-image: linear-gradient(90deg, black, black);
          transition: color 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      background-size 1s cubic-bezier(0.25, 1, 0.5, 1);
          border-radius: 3px;
          padding: 1px 5px;
          margin: 0 1px;
        }

        .text-highlight.active {
          color: #ffffff;
          background-size: 100% 100%;
        }

        .scroll-container {
          scrollbar-width: thin;
          scrollbar-color: #000000 transparent;

        }

        .scroll-container::-webkit-scrollbar {
          width: 3px;
        }

        .scroll-container::-webkit-scrollbar-thumb {
          background: #000000;
          border-radius: 2px;
        }
      `}</style>

      <section
        className=" relative h-screen w-full flex flex-col items-center justify-center overflow-y-auto bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${Fondito}')` }}
      >
        <div className="flex justify-center items-center w-full mt-[350px] md:mt-[600px]">
          <div
            ref={textContainRef}
            className="scroll-container relative z-10  w-3/3 md:w-2/3 h-[70vh]  overflow-y-auto px-4 py-8 md:px-10 mx-auto"
          >
            <div className="text-left md:text-right md:fixed md:top-24">
              <Link to="/">
                <p className="cursor-pointer hover:font-bold font-mono text-base tracking-widest text-pink-500 uppercase whitespace-nowrap [text-shadow:0_0_10px_rgba(236,72,153,0.8)]">
                  Atrás
                </p>
              </Link>
            </div>

            <div >
            <h2 className="mt-5 font-black text-black tracking-wider leading-tight text-4xl md:text-6xl lg:text-7xl">
              SOBRE MÍ
            </h2>

            </div>


            <div className="text-sm md:text-3xl">

            <p className="text-black text-lg md:text-xl leading-relaxed mb-5">
              ¡Hola! Soy <span className="font-semibold">Adriana Rosas</span>.
            </p>

            <p className="text-black leading-relaxed mb-5">
              Te comparto un poco de mi. Antes de ser desarrolladora, pasé 7 años trabajando como cocinera.
              Esta etapa que me enseñó a{" "}
              <mark className="text-highlight">resolver problemas bajo presión</mark>,{" "}
              <mark className="text-highlight">coordinar equipos</mark> y
              entregar resultados en tiempos muy cortos.
            </p>

            <p className="text-black leading-relaxed mb-5">
              Mi interés por la tecnología despertó en 2019 al escuchar sobre{" "}
              <span className="font-medium">la tecnología blockchain</span>. Esa
              curiosidad fue la que me llevó a{" "}
              <mark className="text-highlight">hacer el cambio hacia una nueva carrera</mark>.
            </p>

            <p className="text-black leading-relaxed mb-5">
              Una vez concuído el bootcamp de desarrollo Front End y gracias a mi curiosidad y empeño, tuve la oportunidad de colaborar en la{" "}
              <span className="font-medium">implementación de una Blockchain privada</span>{" "}
              en el despacho de Auditoría "Ferrer y Asociados" de Grupo Salinas:
              en donde apoyé en la planeación,{" "}
              <mark className="text-highlight">desarrollo de contratos inteligentes</mark>,{" "}
              <mark className="text-highlight">construcción de interfaz</mark> y
              capacitación al equipo. Abriendo más mis horizontes al simple desarrollo, y acercándome a la visión de producto.
            </p>

            <p className="text-black leading-relaxed mb-5">
              En <span className="font-medium">IA y automatización</span>, he
              experimentado con{" "}
              <mark className="text-highlight">pipelines de media generativa</mark>{" "}
              para creativos publicitarios: avatares con voz, generación de video
              e imagen, y{" "}
              <mark className="text-highlight">documentación de POCs</mark> para
              equipos de marketing y ventas. Todo esto con el propósito de ayudar a entender el potencial de la IA en los procesos.
            </p>

            <p className="text-black leading-relaxed mb-5">
              En otra etapa, colaboré en la creación de una{" "}
              <span className="font-medium">tienda en Shopify</span>: que incluye
              la implementación de themes con{" "}
              <mark className="text-highlight">Liquid</mark>, personalización de
              páginas, uso de apps y{" "}
              <mark className="text-highlight">estrategias de conversión</mark>.
            </p>

            <p className="text-black leading-relaxed mb-5">
              Actualmente estoy desarrollando el{" "}
              <span className="font-medium">MVP de un marketplace de productos de segunda mano</span>,
              asumiendo el rol de{" "}
              <mark className="text-highlight">product owner y desarrolladora</mark>.
            </p>

            <p className="text-black leading-relaxed mb-5">
              El proyecto abarca desde la{" "}
              <mark className="text-highlight">conceptualización hasta pruebas UX</mark>,
              combinando <span className="font-medium">Lovable</span> para desarrollo
              acelerado con IA, <span className="font-medium">Supabase</span> como backend, y{" "}
              <mark className="text-highlight">APIs de mensajería e IA</mark>{" "}
              para procesamiento de imágenes.
            </p>

            <p className="text-black leading-relaxed mb-5">
              Para mí, desarrollar un MVP con herramientas de IA significa{" "}
              <mark className="text-highlight">iterar rápido</mark>,{" "}
              <mark className="text-highlight">validar con usuarios reales</mark>{" "}
              y tomar decisiones estratégicas un ejercicio que me permite
              combinar pensamiento de producto, habilidades técnicas y visión de
              negocio.
            </p>

            <p className="text-black leading-relaxed mb-5">
              Si te interesa colaborar o simplemente compartir ideas,{" "}
              <mark className="text-highlight">escríbeme</mark>.
            </p>
            </div>
          </div>
        </div>
        <Gallery className="y-8" />
      </section>
    </>
  );
};

export default AboutAbout;
