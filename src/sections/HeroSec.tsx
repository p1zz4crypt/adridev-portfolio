import React, { useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom'
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Stars } from "@react-three/drei";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from "three";
import SpaceshipHero3D from './SpaceshipHero3D';
import Fondo from  "../assets/img/fondo1.png"

gsap.registerPlugin(ScrollTrigger);

interface ScrollTransitionProps {
  children?: React.ReactNode;
  modelUrl?: string;
  onContactClick?: () => void;
}

// ════════════════════════════════════════════════════════════════════════════
// COMPONENTE DE LA NAVE 3D
// ════════════════════════════════════════════════════════════════════════════
interface SpaceshipModelProps {
  url: string;
  scrollProgress: React.MutableRefObject<number>;
}

function SpaceshipModel({ url, scrollProgress }: SpaceshipModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  const orbitAngle = useRef(0);
  const currentPos = useRef({ x: 2, y: 0 });
  const targetPos = useRef({ x: 2, y: 0 });
  const spinRotation = useRef(0);
  const evadeSpeed = useRef(1);

  const ORBIT_RADIUS = 2.5;
  const ORBIT_SPEED = 1;
  const EVADE_MULTIPLIER = 3;

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const mouseX = pointer.x * viewport.width / 2;
    const mouseY = pointer.y * viewport.height / 2;
    const shipX = currentPos.current.x;
    const shipY = currentPos.current.y;
    const dx = mouseX - shipX;
    const dy = mouseY - shipY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const proximityThreshold = 0.2;
    if (distance < proximityThreshold) {
      evadeSpeed.current = THREE.MathUtils.lerp(evadeSpeed.current, EVADE_MULTIPLIER, 0.1);
      const escapeAngle = Math.atan2(-dy, -dx);
      orbitAngle.current = escapeAngle;
    } else {
      evadeSpeed.current = THREE.MathUtils.lerp(evadeSpeed.current, 1, 0.02);
    }

    orbitAngle.current += delta * ORBIT_SPEED * evadeSpeed.current;
    targetPos.current.x = mouseX + Math.cos(orbitAngle.current) * ORBIT_RADIUS;
    targetPos.current.y = mouseY + Math.sin(orbitAngle.current) * ORBIT_RADIUS;

    const lerpSpeed = 0.06;
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPos.current.x, lerpSpeed);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPos.current.y, lerpSpeed);

    meshRef.current.position.x = currentPos.current.x;
    meshRef.current.position.y = currentPos.current.y + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;

    spinRotation.current += delta * (1 + evadeSpeed.current * 0.5);

    const moveAngle = Math.atan2(
      targetPos.current.y - currentPos.current.y,
      targetPos.current.x - currentPos.current.x
    );

    meshRef.current.rotation.x = 0.2 + Math.sin(moveAngle) * 0.3;
    meshRef.current.rotation.y = spinRotation.current;
    meshRef.current.rotation.z = Math.cos(moveAngle) * 0.2;

    const scroll = scrollProgress.current;
    meshRef.current.position.z += -scroll * 3;
    meshRef.current.scale.setScalar(1 - scroll * 0.1);
  });

  return (
    <group
      ref={meshRef}
      scale={0}
      position={[2, 0, 0]}
    >
      <primitive object={scene} />
    </group>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// LUCES Y AMBIENTE
// ════════════════════════════════════════════════════════════════════════════
function Lighting() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 5;
      light1Ref.current.position.z = Math.cos(state.clock.elapsedTime * 0.3) * 5;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 4;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
  ref={light1Ref}
  position={[-3, 4, 5]}
  intensity={80}
  color="#f97316"  // Naranja en lugar de rosa
  distance={25}
/>
<pointLight
  ref={light2Ref}
  position={[4, 2, 3]}
  intensity={60}
  color="#fbbf24"  // Amarillo en lugar de púrpura
  distance={20}
/>
<pointLight
  position={[0, 3, -5]}
  intensity={40}
  color="#a855f7"  // Púrpura más suave
  distance={20}
/>
<pointLight
  position={[0, -5, 0]}
  intensity={30}
  color="#f59e0b"  // Ámbar desde abajo (el "sol")
  distance={20}
/>
      <directionalLight
        position={[0, 10, 5]}
        intensity={2}
        color="#ffffff"
      />
      <pointLight
        position={[0, -5, 0]}
        intensity={20}
        color="#4f46e5"
        distance={15}
      />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PARTÍCULAS FLOTANTES 3D
// ════════════════════════════════════════════════════════════════════════════
function FloatingParticles3D() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#71E300"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

const ScrollTransition: React.FC<ScrollTransitionProps> = ({ children, modelUrl = "/spaceship.glb", onContactClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const orbitRingsRef = useRef<HTMLDivElement>(null);
  const warpLinesRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll progress para la nave 3D
      // Usamos la altura del contenedor para que el progreso sea proporcional
      const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: () => `+=${containerHeight}`,
        scrub: 0.5,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        }
      });

      // Partículas parallax con diferentes velocidades
      const particles = particlesRef.current?.children;
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          const speed = 0.5 + (i % 5) * 0.3;
          const direction = i % 2 === 0 ? 1 : -1;

          gsap.to(particle, {
            y: -400 * speed,
            x: direction * (50 + i * 10),
            rotation: direction * 360,
            scale: 0.3,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: () => `+=${containerHeight}`,
              scrub: 1 + (i % 3) * 0.5
            }
          });
        });
      }

      // Línea central que crece con el scroll
      gsap.fromTo(lineRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "center center",
            scrub: 1
          }
        }
      );

      // Texto aparece y desaparece
      //  gsap.fromTo(textRef.current,
      //    { opacity: 0, y: 50 },
      //    {
      //      opacity: 1,
      //      y: 0,
      //      ease: "power2.out",
      //      scrollTrigger: {
      //        trigger: containerRef.current,
      //        start: "top 60%",
      //        end: "top 30%",
      //        scrub: 1
      //      }
      //    }
      //  );
      //
      //  gsap.to(textRef.current, {
      //    opacity: 0,
      //    y: -50,
      //    scale: 0.9,
      //    ease: "power2.in",
      //    scrollTrigger: {
      //      trigger: containerRef.current,
      //      start: "center center",
      //      end: "bottom 40%",
      //      scrub: 1
      //    }
      //  });
      //
      // Anillos orbitales se expanden
      const rings = orbitRingsRef.current?.children;
      if (rings) {
        Array.from(rings).forEach((ring, i) => {
          gsap.fromTo(ring,
            { scale: 0.5, opacity: 0, rotation: 0 },
            {
              scale: 2 + i * 0.5,
              opacity: 0.3,
              rotation: i % 2 === 0 ? 180 : -180,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: () => `+=${containerHeight}`,
                scrub: 1.5 + i * 0.3
              }
            }
          );
        });
      }

      // Efecto warp/hyperspace
      const warpLines = warpLinesRef.current?.children;
      if (warpLines) {
        Array.from(warpLines).forEach((line, i) => {
          const angle = (i / 30) * 360;
          gsap.fromTo(line,
            {
              scaleX: 0,
              opacity: 0
            },
            {
              scaleX: 1,
              opacity: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "center center",
                scrub: 0.5 + (i % 5) * 0.2
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generar partículas
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${10 + Math.random() * 80}%`,
    top: `${20 + Math.random() * 60}%`,
    size: 4 + Math.random() * 8,
    color: i % 3 === 0 ? '#71E300' : i % 3 === 1 ? '#8b5cf6' : '#3b82f6'
  }));

  // Generar líneas warp
  const warpLines = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * 360;
    return {
      id: i,
      angle,
      length: 100 + Math.random() * 200,
      offset: 50 + Math.random() * 100
    };
  });

  return (

    <div
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
       
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
<div style={{
  position: 'absolute',
  inset: 0,
  backgroundImage: `url(${Fondo})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center bottom', // Sol abajo
  zIndex: 0,
}} />
      {/* nave */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
         gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >

        <Suspense fallback={null}>
        
      

          {/* Niebla para profundidad */}
          <fog attach="fog" args={["#1a0a2e", 12, 30]} />

          {/* Estrellas de fondo */}
          <Stars
            radius={50}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={0.5}
          />

          {/* Iluminación */}
          <Lighting />

          {/* Partículas 3D */}
          <FloatingParticles3D />

          {/* Nave 3D */}
          <SpaceshipModel url={modelUrl} scrollProgress={scrollProgress} />

          {/* Environment para reflejos en materiales metálicos */}
          <Environment preset="night" environmentIntensity={0.5} />
        </Suspense>
      </Canvas>

      {/* Efecto warp/hyperspace */}
      <div
        ref={warpLinesRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
      >
        {warpLines.map((line) => (
          <div
            key={line.id}

          />
        ))}
      </div>

      {/* Partículas flotantes */}
      <div
        ref={particlesRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none'
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: p.color,
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Contenido de texto */}
      <div>

        <div
          ref={textRef}
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
              letterSpacing: '0.4em',
              color: '#ffffff',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textShadow: '0 0 20px rgba(236, 72, 153, 0.5)'
            }}
          >
            Front End Developer / Diseño UX/UI & AI Workflows
          </p>
          <h2
            style={{
              fontFamily: "'Roboto Condensed', sans-serif",
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '0.1em',
              background: 'transparent',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: '#EC4899',
              margin: 0,
              lineHeight: 1.1,
            }}
            >
            ADRIANA ROSAS
          </h2>
          <div className='flex justify-around' >
            <Link to={'/projects'}>
              <p
              className='text-white hover:font-bold hover:text-pink-500 text-xl'
                style={{
                  cursor: 'pointer',
                  fontFamily: "'Space Mono', monospace",
                  
                  
                  marginTop: '1.5rem',
                  maxWidth: '500px',
                  lineHeight: 1.6
                }}
              >
                Skills
              </p>
            </Link>
            <Link to={'/about'}>
              <p
                className='text-white hover:font-bold hover:text-pink-500 text-xl'
                style={{
                  cursor: 'pointer',
                  fontFamily: "'Space Mono', monospace",
          
          
                  marginTop: '1.5rem',
                  maxWidth: '500px',
                  lineHeight: 1.6
                }}
              >
                Sobre mi
              </p>
            </Link>
            <button
              className='hover:shadow-none bg-transparent border-none'
              onClick={onContactClick}
            >
              <p
                className='text-white hover:font-bold hover:text-pink-500 text-xl'
                style={{
                  cursor: 'pointer',
                  fontFamily: "'Space Mono', monospace",

                  marginTop: '1.5rem',
                  maxWidth: '500px',
                  lineHeight: 1.6
                }}
              >
                Contacto
              </p>
            </button>
          </div>

        </div>
      </div>

      {/* Gradiente inferior para transición suave */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #0f0515)',
          pointerEvents: 'none'
        }}
      />

      {/* Children (ProjectsSection iría aquí si se usa como wrapper) */}
      {children}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@900&family=Space+Mono&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        
        @keyframes pulse-arrow {
          0%, 100% { opacity: 0.5; transform: rotate(45deg) scale(1); }
          50% { opacity: 1; transform: rotate(45deg) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ScrollTransition;
