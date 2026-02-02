import { url } from 'inspector';
import React, { useEffect, useRef } from 'react';
import Fondo from '../assets/img/about/fondooo1.png';

const NebulaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('Canvas reference not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Canvas 2D context not found');
      return;
    }

    // Configurar canvas
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log(`Canvas size: ${canvas.width}x${canvas.height}`);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Nebulosas más simples y visibles
    interface Nebula {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }

    const nebulas: Nebula[] = [
      {
        x: window.innerWidth * 0.25,
        y: window.innerHeight * 0.25,
        vx: 0.3,
        vy: 0.2,
        size: 300,
        color: '#ff006e',
        opacity: 0.3
      },
      {
        x: window.innerWidth * 0.75,
        y: window.innerHeight * 0.35,
        vx: -0.25,
        vy: 0.15,
        size: 550,
        color: '#8338ec',
        opacity: 0.4
      },
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.7,
        vx: 0.2,
        vy: -0.2,
        size: 620,
        color: '#3a86ff',
        opacity: 0.2
      }
    ];

    // Función de dibujo mejorada
    const drawNebula = (nebula: Nebula) => {
      const gradient = ctx.createRadialGradient(
        nebula.x, nebula.y, 0,
        nebula.x, nebula.y, nebula.size
      );

      gradient.addColorStop(0, `${nebula.color}${Math.floor(nebula.opacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(0.5, `${nebula.color}${Math.floor(nebula.opacity * 150).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, `${nebula.color}00`);

      ctx.fillStyle = gradient;
      ctx.fillRect(
        nebula.x - nebula.size,
        nebula.y - nebula.size,
        nebula.size * 2,
        nebula.size * 2
      );
    };

    let lastTime = Date.now();

    // Loop de animación
    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      // Fondo claro


      // Gradiente sutil
   

      // Actualizar y dibujar nebulosas
      nebulas.forEach((nebula) => {
        // Movimiento suave
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;

        // Bounce en los bordes
        if (nebula.x - nebula.size < 0 || nebula.x + nebula.size > canvas.width) {
          nebula.vx *= -1;
        }
        if (nebula.y - nebula.size < 0 || nebula.y + nebula.size > canvas.height) {
          nebula.vy *= -1;
        }

        // Dibujar
        drawNebula(nebula);
      });

      requestAnimationFrame(animate);
    };

    animate();
    console.log('Nebula animation started');

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <canvas
 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
        backgroundImage: `url('${Fondo}')`, 
        backgroundSize: 'cover',
      }}
    />
  );
};

export default NebulaBackground;