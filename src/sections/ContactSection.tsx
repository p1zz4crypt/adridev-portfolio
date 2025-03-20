
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import WaveAnimation from '@/components/WaveAnimation';

import Bots from "../assets/img/bots.webp"


gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form handling logic would go here
  };

  return (
    <section id="contact" ref={sectionRef} className="bg-gradient-section-6 dark:bg-gradient-section-6-dark py-24 relative">
      <div className="section-container relative z-10">
        <SectionTitle
          subtitle="Contáctame"
          title="Trabajemos juntos"
          description="¿Tienes un proyecto en mente, una idea innovadora o simplemente quieres charlar? ¡No dudes en contactarme! Estoy aquí para colaborar y crear algo increíble juntos."
          center={true}
        />

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Información de contacto</h3>

            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:a.rosasfig@gmail.com?subject=Consulta%20desde%20tu%20portafolio&body=Hola%20Adriana,%20vi%20tu%20portafolio%20y%20me%20gustaría%20contactarte."
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    a.rosasfig@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Whatsapp</h4>
                  <a href="https://wa.me/525587945478" className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (+52) 5587945478
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="p-3 bg-primary/10 text-primary rounded-full">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Ubicación</h4>
                  <p className="text-muted-foreground">
                    CDMX
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Sígueme</h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://www.instagram.com/adri_rouz/"
                  target='_blank'
                  className="p-3 bg-secondary text-foreground rounded-full hover-scale"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/adriana-rosasf/"
                  target='_blank'
                  className="p-3 bg-secondary text-foreground rounded-full hover-scale"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://github.com/p1zz4crypt"
                  target='_blank'
                  className="p-3 bg-secondary text-foreground rounded-full hover-scale"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-xl"
          >
            <img src={Bots} alt="bot" loading="lazy"/>
          </form>
        </div>
      </div>

      <WaveAnimation className="z-0" />
    </section>
  );
};

export default ContactSection;
