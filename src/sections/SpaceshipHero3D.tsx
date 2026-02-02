import React, { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { useGLTF, Environment, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import NavBar from "@/components/SpaceNavBar";

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
  const { pointer, viewport } = useThree();
  
  // Estado para el comportamiento evasivo
  const orbitAngle = useRef(0);
  const currentPos = useRef({ x: 2, y: 0 });
  const targetPos = useRef({ x: 2, y: 0 });
  const spinRotation = useRef(0);
  const evadeSpeed = useRef(1);
  
  // Distancia orbital alrededor del cursor
  const ORBIT_RADIUS = 2.5;
  const ORBIT_SPEED = 0.8;
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

    // Posición del mouse en coordenadas del mundo
    const mouseX = pointer.x * viewport.width / 2;
    const mouseY = pointer.y * viewport.height / 2;

    // Posición actual de la nave
    const shipX = currentPos.current.x;
    const shipY = currentPos.current.y;

    // Distancia entre el mouse y la nave
    const dx = mouseX - shipX;
    const dy = mouseY - shipY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Si el mouse se acerca mucho, la nave huye más rápido
    const proximityThreshold = 1.5;
    if (distance < proximityThreshold) {
      // ¡Huir! Aumentar velocidad de evasión
      evadeSpeed.current = THREE.MathUtils.lerp(evadeSpeed.current, EVADE_MULTIPLIER, 0.1);
      
      // Calcular ángulo de escape (opuesto al mouse)
      const escapeAngle = Math.atan2(-dy, -dx);
      orbitAngle.current = escapeAngle;
    } else {
      // Volver a velocidad normal de órbita
      evadeSpeed.current = THREE.MathUtils.lerp(evadeSpeed.current, 1, 0.02);
    }

    // Actualizar ángulo de órbita continuamente
    orbitAngle.current += delta * ORBIT_SPEED * evadeSpeed.current;

    // Calcular posición objetivo en órbita alrededor del mouse
    targetPos.current.x = mouseX + Math.cos(orbitAngle.current) * ORBIT_RADIUS;
    targetPos.current.y = mouseY + Math.sin(orbitAngle.current) * ORBIT_RADIUS;

    // Interpolación suave hacia la posición objetivo
    const lerpSpeed = 0.06;
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetPos.current.x, lerpSpeed);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetPos.current.y, lerpSpeed);

    // Aplicar posición con levitación sutil
    meshRef.current.position.x = currentPos.current.x;
    meshRef.current.position.y = currentPos.current.y + Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;

    // Rotación continua sobre sí misma (spin) - más rápido cuando evade
    spinRotation.current += delta * (1 + evadeSpeed.current * 0.5);
    
    // Inclinación basada en dirección de movimiento
    const moveAngle = Math.atan2(
      targetPos.current.y - currentPos.current.y,
      targetPos.current.x - currentPos.current.x
    );

    // Rotaciones: spin continuo + inclinación dinámica
    meshRef.current.rotation.x = 0.2 + Math.sin(moveAngle) * 0.3;
    meshRef.current.rotation.y = spinRotation.current;
    meshRef.current.rotation.z = Math.cos(moveAngle) * 0.2;

    // Efecto de scroll
    const scroll = scrollProgress.current;
    meshRef.current.position.z += -scroll * 3;
    meshRef.current.scale.setScalar(1 - scroll * 0.3);
  });

  return (
    <group 
      ref={meshRef} 
      scale={1}
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
    // Luces que orbitan sutilmente
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
      {/* Luz ambiental base */}
      <ambientLight intensity={0.5} />
      
      {/* Luz principal rosa (key light) */}
      <pointLight
        ref={light1Ref}
        position={[-3, 4, 5]}
        intensity={80}
        color="#ec4899"
        distance={25}
      />
      
      {/* Luz violeta de relleno */}
      <pointLight
        ref={light2Ref}
        position={[4, 2, 3]}
        intensity={60}
        color="#8b5cf6"
        distance={20}
      />
      
      {/* Luz azul desde atrás (rim light) */}
      <pointLight
        position={[0, 3, -5]}
        intensity={40}
        color="#3b82f6"
        distance={20}
      />

      {/* Luz blanca desde arriba para highlights */}
      <directionalLight
        position={[0, 10, 5]}
        intensity={2}
        color="#ffffff"
      />

      {/* Luz inferior para evitar sombras muy oscuras */}
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
// GRID RETRO
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
        args={[0, 0, "transparent", "transparent"]}
        position={[0, 0, 0]}
        />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#0a0a0f"
          transparent
          opacity={0}
          />
      </mesh>
    </group>
  );
}
// ════════════════════════════════════════════════════════════════════════════

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
      <NavBar />
      {/* Canvas de Three.js */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Color de fondo */}
          <color attach="background" args={["#0a0a0f"]} />
          
          {/* Niebla para profundidad */}
          <fog attach="fog" args={["#1a0a2e", 8, 25]} />

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

          {/* Grid retro */}
          <RetroGrid />

          {/* Partículas */}
          <FloatingParticles />

          {/* Nave 3D */}
          <SpaceshipModel url={modelUrl} scrollProgress={scrollProgress} />

          {/* Environment para reflejos en materiales metálicos */}
          <Environment preset="night" environmentIntensity={0.5} />
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

      {/* Indicador de scroll mejorado */}
      <a
        href="#projects-transition"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 20,
          textDecoration: "none",
          cursor: "pointer"
        }}
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById("projects-transition");
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span style={{
          fontSize: "0.75rem",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Space Mono', monospace",
          transition: "color 0.3s ease"
        }}>
          SCROLL
        </span>
        
        {/* Mouse icon */}
        <div style={{
          position: "relative",
          width: "24px",
          height: "40px",
          border: "2px solid rgba(236, 72, 153, 0.4)",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          paddingTop: "8px"
        }}>
          <div style={{
            width: "4px",
            height: "8px",
            borderRadius: "2px",
            background: "#ec4899",
            boxShadow: "0 0 10px rgba(236, 72, 153, 0.8)",
            animation: "scrollBounce 1.5s ease-in-out infinite"
          }} />
        </div>
        
        {/* Línea */}
        <div style={{
          width: "1px",
          height: "30px",
          background: "linear-gradient(to bottom, rgba(236, 72, 153, 0.6), transparent)"
        }} />
      </a>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
        
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(12px); opacity: 0.5; }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@900&family=Space+Mono&display=swap');
      `}</style>
    </div>
  );
}