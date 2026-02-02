import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";

import AboutSection from "@/sections/AboutSection";

import ContactSection from "@/sections/ContactSection";
import Footer from "@/components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Seo } from "@/Seo";

import SpaceshipHero from "../sections/SpaceshipHero3D";
import SpaceNavBar from "@/components/SpaceNavBar";
import SpiralImg from "../assets/img/menu.png";
import HeroSec from "@/sections/HeroSec";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Index: React.FC = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    document.documentElement.style.cursor =
      "url('../assets/puntero.png'), auto";
  }, []);

  useEffect(() => {
    // Initialize scroll animations
    const sections = document.querySelectorAll(".reveal");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => section.classList.add("active"),
        onLeave: () => section.classList.remove("active"),
        onEnterBack: () => section.classList.add("active"),
        onLeaveBack: () => section.classList.remove("active"),
      });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (!targetId) return;

        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetId,
            offsetY: 20,
          },
          ease: "power3.inOut",
        });
      });
    });

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Seo
        title=" Sobre Adriana Rosas| Experiencia y Habilidades"
        description="Front End Developer / Diseño UX/UI & AI Workflows"
        type="profile"
        image="/public/ad3.png"
      />

      <div className="min-h-screen flex flex-col bg-transparent">
        <main className="flex-grow">
          <div id="projects-transition">
            <HeroSec onContactClick={() => setShowFooter(prev => !prev)} />
          </div>
        </main>

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
      </div>
    </>
  );
};

export default Index;
