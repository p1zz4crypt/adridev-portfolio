import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, Float, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

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
  const { mouse } = useThree();

  // Animación frame por frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Rotación interactiva con el mouse
    const targetRotationX = mouse.y * 0.3;
    const targetRotationY = mouse.x * 0.5;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotationY + Math.PI,
      0.05
    );

    // Levitación continua
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;

    // Efecto de scroll: la nave baja y rota
    const scroll = scrollProgress.current;
    meshRef.current.position.z = scroll * 3;
    meshRef.current.rotation.z = scroll * 0.5;
  });

  return (
    <group ref={meshRef} scale={1.5} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// LUCES Y AMBIENTE
// ════════════════════════════════════════════════════════════════════════════
function Lighting() {
  return (
    <>
      {/* Luz principal */}
      <ambientLight intensity={0.3} />
      
      {/* Luz rosa desde arriba-izquierda */}
      <pointLight
        position={[-5, 5, 5]}
        intensity={50}
        color="#ec4899"
        distance={20}
      />
      
      {/* Luz violeta desde abajo-derecha */}
      <pointLight
        position={[5, -3, 3]}
        intensity={30}
        color="#8b5cf6"
        distance={15}
      />
      
      {/* Luz azul de relleno */}
      <pointLight
        position={[0, 0, -5]}
        intensity={20}
        color="#3b82f6"
        distance={15}
      />

      {/* Luz direccional para sombras */}
      <directionalLight
        position={[0, 10, 5]}
        intensity={1}
        color="#ffffff"
        castShadow
      />
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// GRID RETRO
// ════════════════════════════════════════════════════════════════════════════
function RetroGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (gridRef.current) {
      // Efecto de movimiento infinito del grid
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 2;
    }
  });

  return (
    <group position={[0, -3, 0]} rotation={[0, 0, 0]}>
      <gridHelper
        ref={gridRef}
        args={[50, 50, "#8b5cf6", "#3b82f6"]}
        position={[0, 0, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#0a0a0f"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PARTÍCULAS FLOTANTES
// ════════════════════════════════════════════════════════════════════════════
function FloatingParticles() {
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
        color="#ec4899"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ════════════════════════════════════════════════════════════════════════════
interface SpaceshipHeroProps {
  modelUrl: string;
  name?: string;
  title?: string;
  subtitle?: string;
}

export default function SpaceshipHero3D({
  modelUrl,
  name = "ADRII",
  title = "PROJECT MANAGER",
  subtitle = "& CREATIVE DEVELOPER"
}: SpaceshipHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animación de entrada del texto
      const introTL = gsap.timeline({ delay: 1 });

      introTL.fromTo(titleRef.current,
        { opacity: 0, y: 50, clipPath: "inset(0 100% 0 0)" },
        { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power4.out" }
      );

      introTL.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      // Scroll progress para pasar a Three.js
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        }
      });

      // Texto desaparece con scroll
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

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "800px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #0a0a0f 0%, #1a0a2e 50%, #0f0f1a 100%)"
      }}
    >
      {/* Canvas de Three.js */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Estrellas de fondo */}
          <Stars
            radius={50}
            depth={50}
            count={2000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* Iluminación */}
          <Lighting />

          {/* Grid retro */}
          <RetroGrid />

          {/* Partículas */}
          <FloatingParticles />

          {/* Nave con Float para levitación extra */}
          <Float
            speed={2}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            <SpaceshipModel url={modelUrl} scrollProgress={scrollProgress} />
          </Float>

          {/* Environment para reflejos realistas */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* Overlay de glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, 
            rgba(236, 72, 153, 0.2) 0%, 
            rgba(139, 92, 246, 0.1) 40%,
            transparent 70%
          )`,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 1
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
          animation: "bounce 2s ease-in-out infinite",
          zIndex: 20
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

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@900&family=Space+Mono&display=swap');
      `}</style>
    </div>
  );
}
