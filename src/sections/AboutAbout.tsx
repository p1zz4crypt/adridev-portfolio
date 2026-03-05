import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Fondito from "../assets/img/about/venus.png";
import Avatar from "../assets/avatar.png";
import Footer from "@/components/Footer";
import Ruby from "../assets/ruby.png";
import ImageCarousel from "./ImageCarousel";

import Gallery from "./Gallery";

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

const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13];


gsap.registerPlugin(ScrollTrigger);

const AboutAbout = () => {
  const [showFooter, setShowFooter] = useState(false);
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
        <div className="flex justify-center items-center w-full mt-0 md:mt-[150px]">
          <div
            ref={textContainRef}
            className="scroll-container relative z-10  w-3/3 md:w-2/3 h-[70vh]  overflow-y-auto px-4 py-8 md:px-10 mx-auto"
          >
            <div className="text-left md:text-right md:fixed md:top-32">
              <Link to="/">
                <p className="cursor-pointer hover:font-bold font-mono text-base tracking-widest text-pink-500 uppercase whitespace-nowrap [text-shadow:0_0_10px_rgba(236,72,153,0.8)]">
                  Atrás
                </p>
              </Link>
            </div>

            <div className="flex items-center justify-between flex-col-reverse md:flex-col-reverse">
              <div className="w-full flex justify-center md:justify-start items-center mt-12  mr-0 md:mr-28">

                <div className="mr-5">
                  <img src={Ruby} alt="Ruby" className="w-[80px] md:w-[100px]" />
                </div>
                <h2 className="mt-5 mr-6 font-black text-black tracking-wider leading-tight text-4xl md:text-6xl lg:text-7xl whitespace-nowrap">
                  SOBRE MÍ
                </h2>
              </div>
              <div className="w-full h-full flex items-end mt-10 md:mt-0">

                <ImageCarousel
                  images={images}
                  height={250}
                  imageWidth={250}
                  speed={24}
                  gap={14}
                  fadeWidth={50}
                  borderRadius={10}
                />
              </div>
            </div>


            <div className="text-lg md:text-2xl mt-12">

              <p className="text-black leading-relaxed mb-5">
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
                <a href="#contact" onClick={() => setShowFooter(prev => !prev)}>
             
                    <p className="cursor-pointer hover:font-bold hover:text-pink-500 transition-colors">
                      👉escríbeme</p>
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Footer overlay */}
        <div
          onClick={() => setShowFooter(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            background: 'rgba(0,0,0,0.5)',
            opacity: showFooter ? 1 : 0,
            pointerEvents: showFooter ? 'auto' : 'none',
            transition: 'opacity 0.3s ease',
          }}
        />
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            transform: showFooter ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.4s ease',
          }}
        >
          <Footer />
        </div>
      </section>
    </>
  );
};

export default AboutAbout;
