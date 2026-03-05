import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ImageCarouselProps {
  images: string[];
  /** Height of the carousel container */
  height?: number;
  /** Speed in seconds for one full cycle */
  speed?: number;
  /** Width of each image in px */
  imageWidth?: number;
  /** Gap between images in px */
  gap?: number;
  /** Width of the fade gradient on each side in px */
  fadeWidth?: number;
  /** Border radius for images */
  borderRadius?: number;
}

const ImageCarousel = ({
  images,
  height = 120,
  speed = 20,
  imageWidth = 160,
  gap = 16,
  fadeWidth = 60,
  borderRadius = 12,
}: ImageCarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!stripRef.current || !containerRef.current || images.length === 0)
      return;

    const strip = stripRef.current;
    const totalItemWidth = imageWidth + gap;
    const setWidth = totalItemWidth * images.length;

    // Set strip width to hold 2 copies (original + clone for seamless loop)
    strip.style.width = `${setWidth * 2}px`;

    // Kill previous tween if exists
    tweenRef.current?.kill();

    // Animate: move the strip left by one full set width, then repeat seamlessly
    tweenRef.current = gsap.to(strip, {
      x: -setWidth,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          // Wrap around so it loops seamlessly
          return gsap.utils.wrap(-setWidth, 0, parseFloat(String(x)));
        }),
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, [images, speed, imageWidth, gap]);

  // Duplicate images for seamless loop
  const allImages = [...images, ...images];

  return (
    <div
      ref={containerRef}
      className="relative  overflow-hidden flex-1 min-w-0 "
      style={{ height }}
    >
      {/* Left fade gradient */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: fadeWidth,
          background:
            "linear-gradient(to right, var(--carousel-bg, rgba(247,171,180,1)) 0%, transparent 100%)",
        }}
      />

      {/* Right fade gradient */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: fadeWidth,
          background:
            "linear-gradient(to left, var(--carousel-bg, rgba(247,171,180,1)) 0%, transparent 100%)",
        }}
      />

      {/* Scrolling strip */}
      <div
        ref={stripRef}
        className="flex items-center absolute top-0 left-0"
        style={{ height, gap }}
      >
        {allImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex-shrink-0 overflow-hidden"
            style={{
              width: imageWidth,
              height: height - 8,
              borderRadius,
            }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;