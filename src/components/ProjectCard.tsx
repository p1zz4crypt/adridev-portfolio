import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  isVideo?: boolean;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  reversed?: boolean;
  className?: string;
  onLiveDemoClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  isVideo = false,
  tags,
  liveUrl,
  githubUrl,
  reversed = false,
  className,
  onLiveDemoClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Detectar si es dispositivo móvil o pantalla pequeña
  useEffect(() => {
    const checkIfMobile = () => {
      // Opción 1: Por ancho de pantalla
      const isMobileWidth = window.innerWidth < 768; // md breakpoint de Tailwind

      // Opción 2: Por capacidad táctil
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Usar ambas condiciones
      setIsMobile(isMobileWidth || isTouchDevice);
    };

    // Verificar al montar
    checkIfMobile();

    // Verificar al redimensionar
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Si es mobile, podrías querer dejarlo fijo en 0.4 o 1
    if (!overlayRef.current || isMobile) return;

    gsap.to(overlayRef.current, {
      // CAMBIO AQUÍ: isHovered ? 1 (oscuro) : 0.4 (claro)
      opacity: isHovered ? 0.4 : 0,
      duration: 0.3,
      ease: "power2.out"
    });
  }, [isHovered, isMobile]);

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden cursor-pointer",
        className
      )}
      // Solo aplicar hover events si NO es mobile
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={onLiveDemoClick}
    >
      {/* Imagen de fondo que ocupa todo el espacio */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Overlay con opacidad variable */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{ opacity: 0 }}
      />
    </div>
  );
};

export default ProjectCard;