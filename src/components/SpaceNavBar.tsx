import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, X } from 'lucide-react';
import { gsap } from 'gsap';
import SpiralImg from '../assets/img/menu.png'

const SpaceNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Refs para animaciones GSAP
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const spiralImgRef = useRef<HTMLImageElement>(null);
  const menuLabelRef = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const orbitRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animación de entrada inicial
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );

      tl.fromTo(logoRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

      tl.fromTo(spiralRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  // Rotación continua del espiral
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(spiralImgRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none"
      });
    });

    return () => ctx.revert();
  }, []);

  // Hover en el espiral
  useEffect(() => {
    if (!spiralRef.current || !menuLabelRef.current) return;

    if (isHovering) {
      gsap.to(spiralImgRef.current, {
        scale: 1.2,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(menuLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
      // Acelerar rotación
      gsap.to(spiralImgRef.current, {
        timeScale: 3,
        duration: 0.5
      });
    } else {
      gsap.to(spiralImgRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(menuLabelRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(spiralImgRef.current, {
        timeScale: 1,
        duration: 0.5
      });
    }
  }, [isHovering]);

  // Animación del menú
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Abrir menú
        gsap.to(mobileMenuRef.current, {
          clipPath: "circle(150% at 95% 5%)",
          duration: 0.8,
          ease: "power3.inOut"
        });

        // Ocultar el espiral del nav
        gsap.to(spiralRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3
        });

        // Mostrar botón de cerrar
        gsap.fromTo(closeButtonRef.current,
          { scale: 0, rotation: -90 },
          { scale: 1, rotation: 0, duration: 0.5, delay: 0.3, ease: "back.out(1.7)" }
        );

        // Órbitas girando
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });

        // Items del menú aparecen
        gsap.fromTo(menuItemsRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.4, ease: "power2.out" }
        );
      } else {
        // Cerrar menú
        gsap.to(mobileMenuRef.current, {
          clipPath: "circle(0% at 95% 5%)",
          duration: 0.6,
          ease: "power3.inOut"
        });

        // Mostrar el espiral del nav
        gsap.to(spiralRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.3
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  // Hover en links del menú
  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    gsap.to(e.currentTarget, {
      x: isEnter ? 15 : 0,
      color: isEnter ? "#ec4899" : "rgba(255, 255, 255, 0.9)",
      duration: 0.3,
      ease: "power2.out"
    });

    const dot = e.currentTarget.querySelector('.menu-dot');
    if (dot) {
      gsap.to(dot, {
        scale: isEnter ? 2 : 1,
        boxShadow: isEnter
          ? "0 0 25px rgba(236, 72, 153, 1)"
          : "0 0 15px rgba(236, 72, 153, 0.6)",
        duration: 0.3
      });
    }
  };

  const navLinks = [
    { name: 'Inicio', path: '#home' },
    { name: 'Sobre mí', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Proyectos', path: '#projects' },
    { name: 'Experiencia', path: '#experience' },
    { name: 'Contacto', path: '#contact' }
  ];

  return (
    <>
      <nav
      className="md:hidden block"
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0.75rem 0',
          background:'transparent',
          backdropFilter: 'none',
          borderBottom: 'none',
          transition: 'padding 0.3s ease, background 0.3s ease',
          opacity: 0
        }}
      >
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <a
            ref={logoRef}
            href="#home"
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              fontWeight: 700,
              fontFamily: "'Roboto Condensed', sans-serif",
              letterSpacing: '0.1em',
              background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 50%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ec4899',
              boxShadow: '0 0 15px rgba(236, 72, 153, 0.8)',
              animation: 'pulse 2s ease-in-out infinite'
            }} />
            ADRII
          </a>

          {/* Controles derecha */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer'
          }}>
           
            {/* Spiral Menu Button */}
            <div
              ref={spiralRef}
              onClick={toggleMenu}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <img
                ref={spiralImgRef}
                src={SpiralImg}
                alt="Menu"
                style={{
                  width: 'clamp(50px, 10vw, 70px)',
                  height: 'clamp(50px, 10vw, 70px)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.5))',
                  willChange: 'transform'
                }}
              />
              <span
                ref={menuLabelRef}
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#ec4899',
                  textTransform: 'uppercase',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  whiteSpace: 'nowrap',
                  textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
                }}
              >
                Menú
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Overlay */}
      <div
        ref={mobileMenuRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 105,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0f0f1a 100%)',
          clipPath: 'circle(0% at 95% 5%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem'
        }}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={toggleMenu}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '2rem',
            background: 'rgba(236, 72, 153, 0.2)',
            border: '1px solid rgba(236, 72, 153, 0.4)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 110,
            transform: 'scale(0)'
          }}
        >
          <X size={24} color="#ec4899" />
        </button>

        {/* Órbita decorativa principal */}
        <div
          ref={orbitRef}
          style={{
            position: 'absolute',
            width: 'min(400px, 80vw)',
            height: 'min(400px, 80vw)',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        >
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: i % 2 === 0 ? '14px' : '8px',
                height: i % 2 === 0 ? '14px' : '8px',
                borderRadius: '50%',
                background: i % 3 === 0 ? '#ec4899' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6',
                boxShadow: `0 0 20px ${i % 3 === 0 ? 'rgba(236, 72, 153, 0.8)' : i % 3 === 1 ? 'rgba(139, 92, 246, 0.8)' : 'rgba(59, 130, 246, 0.8)'}`,
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translateX(min(200px, 40vw)) translateY(-50%)`
              }}
            />
          ))}
        </div>

        {/* Segunda órbita más pequeña */}
        <div
          style={{
            position: 'absolute',
            width: 'min(250px, 50vw)',
            height: 'min(250px, 50vw)',
            border: '1px dashed rgba(236, 72, 153, 0.15)',
            borderRadius: '50%',
            animation: 'spin 25s linear infinite reverse',
            pointerEvents: 'none'
          }}
        />

        {/* Tercera órbita */}
        <div
          style={{
            position: 'absolute',
            width: 'min(550px, 100vw)',
            height: 'min(550px, 100vw)',
            border: '1px solid rgba(59, 130, 246, 0.1)',
            borderRadius: '50%',
            animation: 'spin 40s linear infinite',
            pointerEvents: 'none'
          }}
        />

        {/* Links del menú */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(1rem, 3vw, 2rem)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              ref={(el) => { menuItemsRef.current[i] = el; }}
              href={link.path}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(e) => handleLinkHover(e, true)}
              onMouseLeave={(e) => handleLinkHover(e, false)}
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                fontSize: 'clamp(1.2rem, 4vw, 2rem)',
                fontFamily: "'Roboto Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                opacity: 0,
                padding: '0.5rem 1rem'
              }}
            >
              <span
                className="menu-dot"
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  boxShadow: '0 0 15px rgba(236, 72, 153, 0.6)',
                  transition: 'transform 0.3s ease'
                }}
              />
              {link.name}
            </a>
          ))}
        </div>

        {/* Footer del menú */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          {/* Social links o info adicional */}
          <div style={{
            display: 'flex',
            gap: '1.5rem'
          }}>
            {['GitHub', 'LinkedIn', 'Email'].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.4)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ec4899';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)';
                }}
              >
                {social}
              </a>
            ))}
          </div>

          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'rgba(255, 255, 255, 0.2)'
          }}>
            PORTFOLIO V1.0 • 2025
          </span>
        </div>
      </div>

      {/* Estilos CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700;900&family=Space+Mono&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Efecto hover en botones */
        button:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </>
  );
};

export default SpaceNavBar;