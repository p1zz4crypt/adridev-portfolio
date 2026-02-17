import { useEffect, useRef } from "react";
import gsap from "gsap";
import Background from "./Background";

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
import Img14 from "../assets/img/about/14.webp";
import Img15 from "../assets/img/about/15.png";

const images = [
  { src: Img1, title: "Heading 1", },
  { src: Img2, title: "Heading 2", },
  { src: Img3, title: "Heading 3", },
  { src: Img4, title: "Heading 4", },
  { src: Img5, title: "Heading 5", },
  { src: Img6, title: "Heading 6", },
  { src: Img7, title: "Heading 7", },
  { src: Img8, title: "Heading 8", },
  { src: Img9, title: "Heading 9", },
  { src: Img10, title: "Heading 10", },
  { src: Img11, title: "Heading 11", },
  { src: Img12, title: "Heading 12", },
  { src: Img13, title: "Heading 13", },
  { src: Img14, title: "Heading 14", },
  { src: Img15, title: "Heading 15", },
  { src: Img1, title: "Heading 1", },
  { src: Img2, title: "Heading 2", },
  { src: Img3, title: "Heading 3", },
  { src: Img4, title: "Heading 4", },
  { src: Img5, title: "Heading 5", },
  { src: Img6, title: "Heading 6", },
  { src: Img7, title: "Heading 7", },
  { src: Img8, title: "Heading 8", },
  { src: Img9, title: "Heading 9", },
  { src: Img10, title: "Heading 10", },
  { src: Img11, title: "Heading 11", },
  { src: Img12, title: "Heading 12", },
  { src: Img13, title: "Heading 13", },
  { src: Img14, title: "Heading 14", },
  { src: Img15, title: "Heading 15", },
];

export default function ImageSlider() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const imgsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const imgs = imgsRef.current;
      const tl = gsap.timeline();

      tl.from(".image", {
        x: "-100%",
        opacity: 0,
        stagger: 0.2,
        ease: "linear",
      });

      tl.from(".image", {
        scale: 1.2,
        stagger: 0.2,
        ease: "power4.in",
      }, "-=1");

      tl.from(".content", {
        y: 140,
        stagger: 0.2,
        ease: "power4.in",
        onComplete: startSlide,
      }, "-=1");

      function startSlide() {
        slide();
      }

      function slide() {
        const slider = gsap.timeline();
        sliderRef.current = slider;

        slider.to(imgs, {
          x: "-=460",
          duration: 1,
          ease: "none",
        });

        slider.to(imgs[0], {
          x: "+=2300",
          duration: 0,
        });

        imgs.push(imgs.shift());
        gsap.delayedCall(2, slide);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => sliderRef.current?.pause();
  const handleMouseLeave = () => sliderRef.current?.play();

  return (
    <div ref={containerRef} className="wrapper">
    
      <div className="imageContainer">
        {images.map((img, i) => (
          <div
            key={i}
            className="image"
            ref={(el) => {
              if (el) imgsRef.current[i] = el;
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={img.src} alt={img.title} />

          </div>
        ))}
      </div>

      <style>{`
        .wrapper {
          width: 100%;
          overflow: hidden;

          margin-top: 50px;
        }
        .imageContainer {
          padding: 30px 0;
          display: flex;
          width: 2300px;
        }
        .image {
          width: 460px;
          height: 400px;
          position: relative;
          overflow: hidden;
          box-sizing: content-box;
          background-color: #fff;
          flex-shrink: 0;
        }
        .image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease-in;
        }
      
        .content {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 10px;
          color: #fff;
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
          width: 100%;
          box-sizing: border-box;
        }
        .content h3 {
          margin: 0 0 5px;
        }
        .content p {
          margin: 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}