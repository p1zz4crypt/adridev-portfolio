import React, { useRef, useEffect } from 'react';

const NoiseBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    const loop = () => {
      // El salto es de 4 en 4 porque cada píxel tiene 4 valores (RGBA)
      for (let i = 0; i < data.length; i += 4) {
        const color = (Math.random() * 255) | 0;
        data[i]     = color; // Red
        data[i + 1] = color; // Green
        data[i + 2] = color; // Blue
        data[i + 3] = 20;    // Alpha (0 a 255). 20 es muy sutil y transparente.
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', 
        zIndex: 9999,          
        opacity: 0.5,
      }}
    />
  );
};

export default NoiseBackground;