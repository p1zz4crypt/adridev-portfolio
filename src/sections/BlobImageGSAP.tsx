import { useEffect, useRef, useId } from 'react';
import gsap from 'gsap';
import styles from './BlobImageGSAP.module.css';

interface BlobImageGSAPProps {
  imageSrc: string;
}

export default function BlobImageGSAP({ imageSrc }: BlobImageGSAPProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const blobPathRef = useRef<SVGPathElement>(null);
  const textContentRef = useRef<SVGTextElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // ID único para cada instancia
  const id = useId().replace(/:/g, '');

  const blobPath = "M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z";

  useEffect(() => {
    const handleMouseEnter = () => {
      gsap.to(blobPathRef.current, {
        attr: { transform: 'translate(100, 100) scale(1.15)' },
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(textContentRef.current, {
        fill: 'white',
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(blobPathRef.current, {
        attr: { transform: 'translate(100, 100)' },
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(textContentRef.current, {
        fill: 'black',
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      ease: 'back.out',
    });

  }, []);

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.blobWrapper}>
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <defs>
            <clipPath id={`blobClip-${id}`}>
              <path
                d={blobPath}
                transform="translate(100 100)"
              />
            </clipPath>

            <pattern
              id={`blobFill-${id}`}
              patternUnits="userSpaceOnUse"
              width="200"
              height="200"
            >
              <image
                xlinkHref={imageSrc}
                href={imageSrc}
                width="200"
                height="200"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>

          {/* Imagen con clip path del blob */}
          <image
            xlinkHref={imageSrc}
            href={imageSrc}
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#blobClip-${id})`}
          />

          {/* Path para el texto circular */}
          <path
            id={`textPath-${id}`}
            d={blobPath}
            transform="translate(100 100)"
            fill="none"
            stroke="none"
          />

          {/* Texto animado */}
          <text ref={textContentRef} className={styles.textContent}>
            <textPath xlinkHref={`#textPath-${id}`} href={`#textPath-${id}`} startOffset="0%">
              ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤
              <animate
                attributeName="startOffset"
                from="0%"
                to="100%"
                dur="15s"
                repeatCount="indefinite"
              />
            </textPath>
            <textPath xlinkHref={`#textPath-${id}`} href={`#textPath-${id}`} startOffset="100%">
              ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ ---- ❤ 
              <animate
                attributeName="startOffset"
                from="-100%"
                to="0%"
                dur="15s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  );
}