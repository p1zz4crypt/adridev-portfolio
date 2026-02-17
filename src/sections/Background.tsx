import { useEffect, useRef } from "react";
import gsap from "gsap";

function random(min: number, max: number) {
  const delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}

const randomX = random(-400, 400);
const randomY = random(-200, 200);
const randomTime = random(6, 12);
const randomTime2 = random(5, 6);
const randomAngle = random(-30, 150);

interface GradientBackgroundProps {
  color?: string;
  bgColor?: string;
  children?: React.ReactNode;
}

export default function GradientBackground({ 
  color = "pink", 
  bgColor = "#f4f4f4",
  children 
}: GradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blursRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blurs = blursRef.current.filter(Boolean);

      blurs.forEach((blur) => {
        gsap.set(blur, {
          x: randomX(-1),
          y: randomX(1),
          rotation: randomAngle(-1),
        });

        moveX(blur, 1);
        moveY(blur, -1);
        rotate(blur, 1);
      });

      function rotate(target: HTMLDivElement | null, direction: number) {
        gsap.to(target, {
          duration: randomTime2(),
          rotation: randomAngle(direction),
          ease: "sine.inOut",
          onComplete: rotate,
          onCompleteParams: [target, direction * -1],
        });
      }

      function moveX(target: HTMLDivElement | null, direction: number) {
        gsap.to(target, {
          duration: randomTime(),
          x: randomX(direction),
          ease: "sine.inOut",
          onComplete: moveX,
          onCompleteParams: [target, direction * -1],
        });
      }

      function moveY(target: HTMLDivElement | null, direction: number) {
        gsap.to(target, {
          duration: randomTime(),
          y: randomY(direction),
          ease: "sine.inOut",
          onComplete: moveY,
          onCompleteParams: [target, direction * -1],
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="gradient-bg"
      style={{ "--color": color, "--bg-color": bgColor } as React.CSSProperties}
    >
      <div className="blur blur-1" ref={(el) => { blursRef.current[0] = el; }} />
      <div className="blur blur-2" ref={(el) => { blursRef.current[1] = el; }} />
      <div className="blur blur-3" ref={(el) => { blursRef.current[2] = el; }} />
      
      {children && <div className="gradient-bg-content">{children}</div>}

      <style>{`
        .gradient-bg {
          --blur-1-size: clamp(300px, 50vw, 600px);
          --blur-2-size: clamp(200px, 35vw, 400px);
          --blur-3-size: clamp(150px, 25vw, 300px);
          --blur-amount: clamp(80px, 10vw, 150px);
          
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: var(--bg-color);
          z-index: 0;
        }
        
        .gradient-bg-content {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .blur {
          position: absolute;
          z-index: 1;
          border-radius: 50%;
          filter: blur(var(--blur-amount));
          background: var(--color);
          pointer-events: none;
          opacity: 0.7;
        }

        .blur-1 {
          height: var(--blur-1-size);
          width: var(--blur-1-size);
          top: -10%;
          left: 20%;
          opacity: 0.6;
        }

        .blur-2 {
          filter: blur(var(--blur-amount)) hue-rotate(180deg);
          height: var(--blur-2-size);
          width: var(--blur-2-size);
          top: 30%;
          right: 10%;
          opacity: 0.5;
        }

        .blur-3 {
          filter: blur(var(--blur-amount)) hue-rotate(-90deg);
          height: var(--blur-3-size);
          width: var(--blur-3-size);
          bottom: 10%;
          left: 5%;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}