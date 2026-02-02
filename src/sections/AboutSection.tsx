import React, { useEffect, useRef } from "react";
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

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const imageGalleryRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Array de imágenes
  const images = [Me, Me2, Me3];

  // Parallax effect
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

  // Efecto de imágenes - Masonry con animación float
  useEffect(() => {
    if (!imageGalleryRef.current) return;

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((img, index) => {
        if (!img) return;

        // Trigger de scroll para activar animación
        gsap.fromTo(
          img,
          {
            opacity: 0,
            y: 60,
            rotationX: -20,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: img,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Efecto float continuo (movimiento suave vertical)
        gsap.to(img, {
          y: -20,
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });

        // Efecto hover con escala y rotación 3D
        img.addEventListener("mouseenter", () => {
          gsap.to(img, {
            scale: 1.05,
            rotationY: 5,
            rotationX: -5,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });

        img.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      });

      // Animación de entrada para el contenedor de galería
      gsap.fromTo(
        imageGalleryRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: imageGalleryRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll animation for content
  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      // Animate paragraphs on scroll
      const paragraphs = contentRef.current?.querySelectorAll("p, li");
      paragraphs?.forEach((para) => {
        gsap.fromTo(
          para,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: para,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleViewCV = () => {
    const pdfUrl = "/CV2025.pdf";
    window.open(pdfUrl, "_blank");
  };

  return (
    <>
      <Seo
        title="Sobre Adri Rosas | Experiencia y Habilidades"
        description="Front End Developer | Diseño UI | Tecnología Blockchain"
        type="profile"
        image="/public/og-image.png"
      />
      <section
        id="about"
        ref={(el) => (sectionRef.current = el)}
        className="w-full bg-gradient-to-b from-[#F3EFEA] to-white dark:from-slate-950 dark:to-black relative overflow-hidden"
      >
        {/* Fondo sutil con nebulosa */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 80% 20%, rgba(255, 0, 110, 0.08) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(131, 56, 236, 0.06) 0%, transparent 40%)",
          }}
        />

        <div className="section-container py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT: Imágenes en galería editorial */}
            <div className="relative" ref={(el) => (leftRef.current = el)}>
              <RevealOnScroll delay={0.2}>
                <div ref={imageGalleryRef} className="sticky top-24 space-y-6">
                  {/* Grid de imágenes masonry elegante */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Imagen principal (toma 2 filas) */}
                    <div
                      ref={(el) => (imageRefs.current[0] = el)}
                      className="col-span-2 md:col-span-1 md:row-span-2 relative rounded-2xl overflow-hidden parallax h-[300px] md:h-[420px] shadow-2xl cursor-pointer"
                      style={{
                        border: "1px solid rgba(255, 0, 110, 0.2)",
                        boxShadow:
                          "0 0 40px rgba(255, 0, 110, 0.15), 0 0 80px rgba(131, 56, 236, 0.1)",
                        perspective: "1000px",
                      }}
                    >
                      <LazyLoadImage
                        src={Me}
                        alt="Adriana Rosas - Principal"
                        effect="blur"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 0, 110, 0.1) 0%, rgba(131, 56, 236, 0.1) 100%)",
                        }}
                      />
                    </div>

                    {/* Imagen secundaria superior */}
                    <div
                      ref={(el) => (imageRefs.current[1] = el)}
                      className="relative rounded-xl overflow-hidden h-[180px] shadow-lg cursor-pointer"
                      style={{
                        border: "1px solid rgba(131, 56, 236, 0.2)",
                        boxShadow:
                          "0 0 30px rgba(131, 56, 236, 0.15), 0 0 60px rgba(58, 134, 255, 0.08)",
                        perspective: "1000px",
                      }}
                    >
                      <LazyLoadImage
                        src={Me2}
                        alt="Adriana Rosas - Secundaria"
                        effect="blur"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(131, 56, 236, 0.1) 0%, rgba(58, 134, 255, 0.1) 100%)",
                        }}
                      />
                    </div>

                    {/* Imagen secundaria inferior */}
                    <div
                      ref={(el) => (imageRefs.current[2] = el)}
                      className="relative rounded-xl overflow-hidden h-[180px] shadow-lg cursor-pointer"
                      style={{
                        border: "1px solid rgba(58, 134, 255, 0.2)",
                        boxShadow:
                          "0 0 30px rgba(58, 134, 255, 0.15), 0 0 60px rgba(131, 56, 236, 0.08)",
                        perspective: "1000px",
                      }}
                    >
                      <LazyLoadImage
                        src={Me3}
                        alt="Adriana Rosas - Tercera"
                        effect="blur"
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(58, 134, 255, 0.1) 0%, rgba(255, 0, 110, 0.1) 100%)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Botón Ver CV - debajo de la galería */}
                  <div className="flex justify-center md:justify-start">
                    <Button
                      size="lg"
                      className="group bg-gradient-to-r from-[#ff006e] to-[#8338ec] hover:from-[#ff0077] hover:to-[#9544ff] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={handleViewCV}
                    >
                      <View className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      Ver CV
                    </Button>
                  </div>

                  {/* Info badge con efecto de animación */}
                  <div
                    className="text-xs md:text-sm text-center text-gray-500 dark:text-gray-400 italic"
                    style={{
                      opacity: 0.7,
                    }}
                  >
                    ✨ Hover sobre las imágenes para efecto 3D
                  </div>
                </div>
              </RevealOnScroll>
            </div>

            {/* RIGHT: Contenido Editorial */}
            <div className="md:mt-0" ref={contentRef}>
              <RevealOnScroll delay={0.3}>
                <SectionTitle
                  subtitle="ACERCA DE MÍ"
                  title="Desarrolladora | Creativa | Builders"
                  center={false}
                />
              </RevealOnScroll>

              <RevealOnScroll delay={0.4}>
                <div className="space-y-6 md:space-y-8 text-gray-700 dark:text-gray-300">
                  {/* Introducción */}
                  <p className="text-base md:text-lg leading-relaxed">
                    Soy{" "}
                    <span className="font-semibold text-black dark:text-white">
                      Adriana Rosas
                    </span>
                    , vivo en CDMX. Desde hace{" "}
                    <span className="font-semibold">7 años</span> me dedico al
                    desarrollo front end creando interfaces intuitivas,
                    participando en todas las etapas del proceso creativo.
                  </p>

                  {/* Áreas de experiencia */}
                  <div className="space-y-5">
                    <h3 className="text-lg md:text-xl font-bold text-black dark:text-white">
                      Áreas de experiencia:
                    </h3>

                    {/* Item 1: Diseño */}
                    <div className="pl-4 border-l-2 border-[#ff006e]/40">
                      <h4 className="font-semibold text-black dark:text-white mb-2">
                        Diseño de Interfaz y Prototipos
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Figma", "Adobe XD"].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                            style={{
                              backgroundColor: "rgba(255, 0, 110, 0.1)",
                              borderColor: "rgba(255, 0, 110, 0.3)",
                              color: "#ff006e",
                              border: "1px solid",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Item 2: Visuales e IA */}
                    <div className="pl-4 border-l-2 border-[#8338ec]/40">
                      <h4 className="font-semibold text-black dark:text-white mb-2">
                        Creación de Visuales e IA Generativa
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Photoshop",
                          "Figma",
                          "Leonardo AI",
                          "Stable Diffusion",
                          "ImageFX",
                          "Nano Banana",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                            style={{
                              backgroundColor: "rgba(131, 56, 236, 0.1)",
                              borderColor: "rgba(131, 56, 236, 0.3)",
                              color: "#8338ec",
                              border: "1px solid",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Item 3: Maquetación */}
                    <div className="pl-4 border-l-2 border-[#3a86ff]/40">
                      <h4 className="font-semibold text-black dark:text-white mb-2">
                        Maquetación Responsiva
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["CSS", "Tailwind", "Material-UI", "Bootstrap"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                              style={{
                                backgroundColor: "rgba(58, 134, 255, 0.1)",
                                borderColor: "rgba(58, 134, 255, 0.3)",
                                color: "#3a86ff",
                                border: "1px solid",
                              }}
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Item 4: Desarrollo Web */}
                    <div className="pl-4 border-l-2 border-[#ff006e]/40">
                      <h4 className="font-semibold text-black dark:text-white mb-2">
                        Desarrollo de Aplicaciones Web
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Vue",
                          "React",
                          "JavaScript",
                          "TypeScript",
                          "GSAP",
                        ].map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                            style={{
                              backgroundColor: "rgba(255, 0, 110, 0.1)",
                              borderColor: "rgba(255, 0, 110, 0.3)",
                              color: "#ff006e",
                              border: "1px solid",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Item 5: APIs y Bases de Datos */}
                    <div className="pl-4 border-l-2 border-[#8338ec]/40">
                      <h4 className="font-semibold text-black dark:text-white mb-2">
                        Conexión con APIs y Bases de Datos
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {["Insomnia", "GraphQL", "Axios", "REST"].map(
                          (tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105"
                              style={{
                                backgroundColor: "rgba(131, 56, 236, 0.1)",
                                borderColor: "rgba(131, 56, 236, 0.3)",
                                color: "#8338ec",
                                border: "1px solid",
                              }}
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Historia de fondo */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="italic text-base leading-relaxed">
                      Antes de ser desarrolladora, fui{" "}
                      <span className="font-semibold">cocinera durante 7 años</span>.
                      Esa experiencia y mentalidad práctica, colaborativa y orientada al
                      resultado sigue guiando mi trabajo.
                    </p>
                  </div>

                  {/* Experiencias destacadas */}
                  <div className="bg-gradient-to-r from-[#ff006e]/5 to-[#8338ec]/5 dark:from-[#ff006e]/10 dark:to-[#8338ec]/10 p-6 rounded-xl border border-[#ff006e]/20">
                    <p className="text-base leading-relaxed">
                      Esa combinación de aptitudes + un gran deseo de aprender, me
                      brindaron la oportunidad de colaborar en la implementación de{" "}
                      <span className="font-bold">Blockchain</span> en el despacho de
                      Auditoría <span className="font-bold">"Ferrer y Asociados"</span>,
                      de <span className="font-bold">Grupo Salinas</span>.
                    </p>
                  </div>

                  {/* Actualidad */}
                  <p className="text-base leading-relaxed">
                    Afortunadamente la vida es cíclica y yo aprovecho cada vuelta para
                    aprender y construir. Actualmente estoy enfocada en aprender
                    desarrollo de tiendas en <span className="font-semibold">Shopify</span> y en
                    crear y escalar POCs que unan datos, creativos generativos{" "}
                    <span className="font-semibold">
                      (Runway, HeyGen, ElevenLabs, RoboNeo, Veo3)
                    </span>
                    , edición en <span className="font-semibold">CapCut</span> y
                    automatizaciones con diversas herramientas.
                  </p>

                  {/* Call to Action */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-base md:text-lg leading-relaxed font-medium text-black dark:text-white">
                      Si tienes un proyecto interesante o simplemente quieres charlar sobre
                      el maravilloso mundo de la tecnología,{" "}
                      <a
                        href="#contact"
                        className="underline hover:text-[#ff006e] transition-colors"
                      >
                        ¡no dudes en contactarme!
                      </a>
                    </p>
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