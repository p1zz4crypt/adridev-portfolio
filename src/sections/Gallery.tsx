 import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import "./gallery.css"
import Img1 from "../assets/img/about/1.jpeg";
import Img2 from "../assets/img/about/2.jpeg";
import Img3 from "../assets/img/about/3.jpeg";
import Img4 from "../assets/img/about/4.jpeg";
import Img5 from "../assets/img/about/5.jpeg";
import Img6 from "../assets/img/about/6.jpeg";
import Img7 from "../assets/img/about/7.jpeg";
import Img8 from "../assets/img/about/8.jpeg";
import Img9 from "../assets/img/about/9.jpeg";
import Img10 from "../assets/img/about/10.jpeg";
import Img11 from "../assets/img/about/11.jpeg";
import Img12 from "../assets/img/about/12.jpeg";
import Img13 from "../assets/img/about/13.png";


gsap.registerPlugin(Flip);

const defaultImages = [
   Img4, Img5, Img6, Img7, Img8,Img1, Img2, Img3, Img9, Img10, Img11, Img12, Img13, 
];

/**
 * Maps each item index to its initial CSS class for the scattered grid layout.
 * "big" = hero item, "horizontal"/"horizontal-r" = rotated cards,
 * "item-shell-2"/"item-shell-5" = offset cards.
 */
const SHELL_VARIANTS = [
  "big",          // 0
  "item-shell-2", // 1
  "horizontal",   // 2
  "horizontal",   // 3
  "item-shell-5", // 4
  "horizontal",   // 5
  "horizontal-r", // 6
  "horizontal",   // 7
  "horizontal-r", // 8
  "horizontal",   // 9
  "horizontal",   // 10
  "horizontal",   // 11
  "horizontal-r", // 12
];

/** Initial GSAP transforms per variant class - desktop only */
const INITIAL_TRANSFORMS = {
  horizontal:    { x: 50, rotate: -20 },
  "horizontal-r": { x: -50, rotate: 20 },
  "item-shell-2": { x: 70, y: 30, rotate: 15 },
  "item-shell-5": { x: -50, y: 30, rotate: -15 },
};

/** Mobile transforms - no rotation for cleaner look */
const MOBILE_TRANSFORMS = {
  horizontal:    { x: 0, rotate: 0 },
  "horizontal-r": { x: 0, rotate: 0 },
  "item-shell-2": { x: 0, y: 0, rotate: 0 },
  "item-shell-5": { x: 0, y: 0, rotate: 0 },
};

/** Check if we're on mobile */
const isMobile = () => window.innerWidth < 640;

/**
 * Gallery — A GSAP Flip image gallery with a scattered grid layout.
 *
 * Click any image to expand it into a large preview while the rest collapse
 * into a filmstrip thumbnail bar. Press Escape (or click the back button)
 * to return to the scattered grid.
 *
 * @param {Object}   props
 * @param {string[]} [props.images]    - Array of image URLs (defaults to Unsplash set)
 * @param {string}   [props.className] - Additional classes for the outer wrapper
 */
export default function Gallery({ images = defaultImages, className = "" }) {
  // ── DOM refs ──────────────────────────────────────────────
  const wrapperRef = useRef(null);
  const previewRef = useRef(null);
  const itemContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const thumbnailRef = useRef(null);
  const sectionInfoRef = useRef(null);
  const shellRefs = useRef([]);
  const itemRefs = useRef([]);

  // ── Mutable state (no re-render needed) ───────────────────
  const lastClickedItem = useRef(null);
  const lastClickedShell = useRef(null);
  const isExpanded = useRef(false);

  // ── Apply initial scattered transforms ────────────────────
  useEffect(() => {
    const transforms = isMobile() ? MOBILE_TRANSFORMS : INITIAL_TRANSFORMS;
    Object.entries(transforms).forEach(([selector, props]) => {
      gsap.set(`.${selector}`, props);
    });

    // Handle resize
    const handleResize = () => {
      const transforms = isMobile() ? MOBILE_TRANSFORMS : INITIAL_TRANSFORMS;
      Object.entries(transforms).forEach(([selector, props]) => {
        gsap.to(`.${selector}`, { ...props, duration: 0.3 });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Click handler: expand a single image ──────────────────
  const handleItemClick = useCallback((index) => {
    const shell = shellRefs.current[index];
    const item = itemRefs.current[index];
    if (!shell || !item) return;

    isExpanded.current = true;

    // Capture all shells state before layout change
    const stateItemShells = Flip.getState(".item-shell");
    sectionInfoRef.current.style.zIndex = "1";

    // ➊ Move clicked item into the preview container
    const itemState = Flip.getState(item);
    previewRef.current.appendChild(item);
    Flip.from(itemState, { duration: 1, ease: "sine.in" });

    // ➋ Return previous preview item to its shell
    if (lastClickedItem.current && lastClickedShell.current) {
      const prevState = Flip.getState(lastClickedItem.current);
      lastClickedShell.current.appendChild(lastClickedItem.current);
      Flip.from(prevState, { duration: 1, ease: "power1.inOut" });
    }
    lastClickedItem.current = item;
    lastClickedShell.current = shell;

    // ➌ Move the entire grid into the thumbnail bar
    const containerState = Flip.getState(itemContainerRef.current);
    thumbnailRef.current.appendChild(itemContainerRef.current);
    Flip.from(containerState, { duration: 1, ease: "power1.inOut" });

    // ➍ Flatten all items into a uniform strip
    gsap.set(
      [".horizontal", ".horizontal-r", ".item-shell-2", ".item-shell-5"],
      { x: 0, rotate: 0, y: 0 }
    );
    shellRefs.current.forEach((s) => s?.classList.remove("big"));
    itemContainerRef.current.classList.add("item-container--final");
    Flip.from(stateItemShells, { duration: 1, ease: "power1.inOut" });
  }, []);

  // ── Reverse: back to scattered grid ───────────────────────
  const handleReverse = useCallback(() => {
    if (!isExpanded.current) return;
    isExpanded.current = false;

    const stateItemShells = Flip.getState(".item-shell");
    const previewedState = lastClickedItem.current
      ? Flip.getState(lastClickedItem.current)
      : null;

    // Restore scattered transforms (use mobile transforms if on small screen)
    const transforms = isMobile() ? MOBILE_TRANSFORMS : INITIAL_TRANSFORMS;
    Object.entries(transforms).forEach(([selector, props]) => {
      gsap.set(`.${selector}`, props);
    });

    // Restore hero class and remove final grid
    shellRefs.current[0]?.classList.add("big");
    itemContainerRef.current.classList.remove("item-container--final");
    Flip.from(stateItemShells, { duration: 1, ease: "power1.inOut" });

    // Move grid back to section
    const containerState = Flip.getState(itemContainerRef.current);
    sectionRef.current.appendChild(itemContainerRef.current);
    Flip.from(containerState, { duration: 1, ease: "power1.inOut" });

    // Return previewed item to its shell
    if (lastClickedItem.current && lastClickedShell.current && previewedState) {
      lastClickedShell.current.appendChild(lastClickedItem.current);
      Flip.from(previewedState, { duration: 0.5, ease: "power1.inOut" });
    }

    sectionInfoRef.current.style.zIndex = "-1";
    lastClickedItem.current = null;
    lastClickedShell.current = null;
  }, []);

  // ── Keyboard listener (Escape) ────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") handleReverse();
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [handleReverse]);

  // ── Render ────────────────────────────────────────────────
  return (
    <div className={`pt-4 sm:pt-8 relative mx-auto grid min-h-[60vh] sm:h-[80vh] w-full max-w-[960px] place-items-center overflow-hidden px-2 sm:px-0 ${className}`}>
      {/* Overlay layer: preview + thumbnail strip */}
      <div
        ref={sectionInfoRef}
        className="absolute inset-x-0 top-0 w-full"
        style={{ zIndex: -1 }}
      >
        <div ref={thumbnailRef} className="h-[100px] sm:h-[120px] md:h-[150px]" />
        <div
          ref={previewRef}
          className="w-full overflow-hidden rounded-md mx-auto px-2 sm:px-4"
          style={{ height: "calc(100vh - 200px)" }}
        />
      </div>

      {/* Main scattered grid */}
      <section ref={sectionRef} className="grid place-items-center">
        <div ref={itemContainerRef} className="item-container pt-4">
          {images.map((src, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) shellRefs.current[i] = el;
              }}
              className={`item-shell cursor-pointer overflow-hidden rounded ${SHELL_VARIANTS[i] || "horizontal"}`}
              onClick={() => handleItemClick(i)}
            >
              <div
                ref={(el) => {
                  if (el) itemRefs.current[i] = el;
                }}
                className="h-full w-full overflow-hidden"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-[filter] duration-300 hover:brightness-110 hover:saturate-[1.1]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back button (visible only when expanded) */}
      <button
        onClick={handleReverse}
        aria-label="Close preview"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full bg-white/20 sm:bg-white/10 px-3 py-2 sm:px-4 text-xs sm:text-sm text-white/80 sm:text-white/60 backdrop-blur-md transition-colors hover:bg-white/30 hover:text-white active:scale-95"
      >
        ✕ Cerrar
      </button>
    </div>
  );
}

export { Gallery };