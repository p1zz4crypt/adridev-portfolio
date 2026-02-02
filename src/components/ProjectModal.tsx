import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Ruby from '../assets/ruby.png'
import Stack from '../assets/stack2.png'

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        liveUrl: string;
        description: string,
        images: {
            url: string;
            description: string;
            isVideo?: boolean;
        }[];
        tags?: string[];
    };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const [projectColor, setProjectColor] = useState('#ff006e'); // Rosa por defecto

    // Refs para animaciones
    const modalRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Refs para la funcionalidad de arrastre en zoom
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [startTranslateX, setStartTranslateX] = useState(0);
    const [startTranslateY, setStartTranslateY] = useState(0);
    const [scale, setScale] = useState(1);

    // Determinar el color del proyecto basado en su título
    useEffect(() => {
        const colorMap: { [key: string]: string } = {
            'Datahooks': '#ff006e',      // Rosa/Magenta
            'Max Intelligence': '#8338ec', // Púrpura
            'Eterna': '#3a86ff',          // Azul
        };

        const color = colorMap[project.title] || '#ff006e';
        setProjectColor(color);
    }, [project.title]);

    // Animación de entrada del modal
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();

                // 1. Fade in del backdrop con blur
                tl.fromTo(backdropRef.current,
                    { opacity: 0, backdropFilter: 'blur(0px)' },
                    { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.4, ease: "power2.out" }
                );

                // 2. Animación del contenedor principal (efecto de expansión + rotación sutil)
                tl.fromTo(contentRef.current,
                    {
                        scale: 0.7,
                        opacity: 0,
                        y: 60,
                        rotationX: -20
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        rotationX: 0,
                        duration: 0.7,
                        ease: "back.out(1.2)"
                    },
                    "-=0.2"
                );

                // 3. Animación del header (desliza desde arriba con glow)
                tl.fromTo(headerRef.current,
                    { y: -60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                    "-=0.4"
                );

                // 4. Animación de la galería (escala y fade)
                tl.fromTo(galleryRef.current,
                    { scale: 0.85, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );

                // 5. Animación del footer (desliza desde abajo)
                tl.fromTo(footerRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                    "-=0.4"
                );

                // 6. Animación del botón de cerrar (rotación y escala)
                tl.fromTo(closeButtonRef.current,
                    { scale: 0, rotation: -180, opacity: 0 },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "back.out(1.7)"
                    },
                    "-=0.5"
                );
            }, modalRef);

            return () => ctx.revert();
        }
    }, [isOpen]);

    // Animación de salida del modal
    const handleClose = () => {
        if (modalRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    onComplete: onClose
                });

                tl.to(closeButtonRef.current, {
                    scale: 0,
                    rotation: 180,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                });

                tl.to([headerRef.current, footerRef.current], {
                    y: 30,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                }, "-=0.2");

                tl.to(galleryRef.current, {
                    scale: 0.85,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                }, "-=0.2");

                tl.to(contentRef.current, {
                    scale: 0.7,
                    opacity: 0,
                    y: 60,
                    duration: 0.4,
                    ease: "power2.in"
                }, "-=0.2");

                tl.to(backdropRef.current, {
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                    duration: 0.3,
                    ease: "power2.in"
                }, "-=0.3");
            }, modalRef);

            return () => ctx.revert();
        }
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    const handleImageClick = (imageUrl: string, isVideo?: boolean) => {
        if (!isVideo) {
            setZoomedImage(imageUrl);
        }
    };

    const closeZoom = () => {
        setZoomedImage(null);
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (scale > 1) {
            setIsDragging(true);
            setDragStartX(e.clientX);
            setDragStartY(e.clientY);
            setStartTranslateX(translateX);
            setStartTranslateY(translateY);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && scale > 1) {
            const deltaX = e.clientX - dragStartX;
            const deltaY = e.clientY - dragStartY;
            setTranslateX(startTranslateX + deltaX);
            setTranslateY(startTranslateY + deltaY);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(1, Math.min(5, scale * delta));
        setScale(newScale);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStartX(e.touches[0].clientX);
            setDragStartY(e.touches[0].clientY);
            setStartTranslateX(translateX);
            setStartTranslateY(translateY);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isDragging && e.touches.length === 1 && scale > 1) {
            const deltaX = e.touches[0].clientX - dragStartX;
            const deltaY = e.touches[0].clientY - dragStartY;
            setTranslateX(startTranslateX + deltaX);
            setTranslateY(startTranslateY + deltaY);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = () => {
        setScale(scale === 1 ? 2 : 1);
        if (scale !== 1) {
            setTranslateX(0);
            setTranslateY(0);
        }
    };

    if (!isOpen) return null;

    return (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop con efecto glassmorphism y nebulosa sutil */}
            <div
                ref={backdropRef}
                onClick={handleClose}
                className="absolute inset-0 bg-black/80"
                style={{
                    opacity: 0,
                    backdropFilter: 'blur(0px)',
                }}
            >
               
            </div>

            {/* Modal Content */}
            <div
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[80vw] h-[90vh]  overflow-hidden  flex flex-col"
                style={{
                    opacity: 0,
                    perspective: '1200px',
              
                }}
            >
                {/* Efecto de borde luminoso basado en el color del proyecto */}
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                  
                />

                {/* Header */}
                <div
                    ref={headerRef}
                    className="px-6 md:px-8 py-6  backdrop-blur-sm relative z-10"
                    style={{ opacity: 0 }}
                >
                    {/* Línea de color dinámico */}
                    <div
                        className="absolute left-0 top-0 h-1 w-24"
                        style={{ background: `linear-gradient(90deg, ${projectColor}, transparent)` }}
                    />

                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                               
                                <div className='flex flex-col'>
                                    <h2
                                        className="text-3xl md:text-4xl font-bold"
                                        style={{
                                            color: '#fff',
                                            textShadow: `0 0 20px ${projectColor}40`
                                        }}
                                    >
                                        {project.title}
                                    </h2>
                                    <p className="text-gray-200 text-lg  leading-relaxed mt-3">
                                        {project.description}
                                    </p>

                                </div>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            ref={closeButtonRef}
                            onClick={handleClose}
                            className=" flex-shrink-0 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 relative group"
                            style={{ opacity: 0 }}
                        >
                            <div
                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{   background: `${projectColor}30` }}
                            />
                            <X size={28} className="text-white relative z-10 cursor-pointer" />
                        </button>
                    </div>

                    <div className='flex items-center gap-3 mb-2'>
                        <img src={Stack} alt="stack" className='w-[50px]'/>
                        <p className='text-gray-200'>Stack:</p>
                        {/* Tags */}
                        {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 ">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-sm px-5 py-1 text-white  transition-all duration-300 hover:scale-105"
                                        style={{
                                            backgroundColor: `${projectColor}15`,
                                            
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Galería */}
                {project.images.length > 0 && (
                    <div
                        ref={galleryRef}
                        className="flex-1 relative overflow-hidden"
                        style={{ opacity: 0 }}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-out h-full"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {project.images.map((image, index) => (
                                <div key={index} className="w-full flex-shrink-0 relative h-full">
                                    <div className="h-full flex flex-col md:flex-row items-center justify-center overflow-auto px-4 py-8 group">
                                        {/* Contenedor de imagen con efecto glassmorphism */}
                                        <div
                                            className="rounded-xl overflow-hidden flex justify-center cursor-zoom-in relative backdrop-blur-sm transition-all duration-300"
                                            onClick={() => handleImageClick(image.url, image.isVideo)}
                                            style={{
                                              
                                                background: `${projectColor}05`,
                                            }}
                                        >
                                            {image.isVideo ? (
                                                <video
                                                    src={image.url}
                                                    controls
                                                    className="w-80 p-4 h-full object-contain max-h-full transition-transform duration-300 rounded-lg"
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={image.url}
                                                    alt={`Project ${index + 1}`}
                                                    className="w-full max-w-8xl h-auto object-contain max-h-[70vh] transition-transform duration-300  rounded-lg"
                                                    loading="lazy"
                                                />
                                            )}

                                        </div>

                                        {/* Descripción */}
                                        <p className="pl-0 md:pl-12 md:text-left text-center text-gray-300  mt-6 max-w-lg leading-relaxed" style={{ fontSize: '20px' }}>
                                            {project.images[currentImageIndex]?.description || ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de navegación con efecto glassmorphism */}
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full z-10 focus:outline-none transition-all duration-300 hover:scale-110 backdrop-blur-md  flex items-center justify-center group relative"
                            style={{
                                backgroundColor: `${projectColor}20`,
                                borderColor: `${projectColor}60`,
                                boxShadow: `0 0 20px ${projectColor}20`
                            }}
                        >
                            <ChevronLeft className="text-white group-hover:text-white" size={24} />
                        </button>

                        <button
                            onClick={goToNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full z-10 focus:outline-none transition-all duration-300 hover:scale-110 backdrop-blur-md flex items-center justify-center group relative"
                            style={{
                                backgroundColor: `${projectColor}20`,
                                borderColor: `${projectColor}60`,
                                boxShadow: `0 0 20px ${projectColor}20`
                            }}
                        >
                            <ChevronRight className="text-white group-hover:text-white" size={24} />
                        </button>
                    </div>
                )}

                {/* Footer - Indicadores de progreso */}
                <div
                    ref={footerRef}
                    className="px-6 md:px-8 py-8 bg-transparent  relative z-10"
                    style={{
                        opacity: 0,
                        
                    }}
                >
                    <div className="flex justify-center items-center gap-2">
                        {/* Indicadores de imagen */}
                        <div className="flex space-x-3">
                            {project.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className="rounded-full transition-all duration-300 h-3"
                                    style={{
                                        width: idx === currentImageIndex ? '150px' : '50px',
                                        backgroundColor: idx === currentImageIndex ? projectColor : 'rgba(255,255,255,0.2)',
                                        boxShadow: idx === currentImageIndex ? `0 0 15px ${projectColor}80` : 'none'
                                    }}
                                />
                            ))}
                        </div>
                        {/* Contador */}
                        <span
                            className="text-gray-200 text-sm ml-4"
                            style={{ color: 'rgba(255,255,255,0.6)' }}
                        >
                            {currentImageIndex + 1} / {project.images.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Vista de zoom */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-grab"
                    onClick={closeZoom}
                >
                    <div
                        ref={imageContainerRef}
                        className={`relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-xl border ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onWheel={handleWheel}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onDoubleClick={handleDoubleClick}
                        style={{
                            borderColor: `${projectColor}40`,
                            boxShadow: `0 0 40px ${projectColor}40`
                        }}
                    >
                        <img
                            src={zoomedImage}
                            alt="Imagen ampliada"
                            className="max-w-full max-h-[90vh] object-contain select-none"
                            style={{
                                transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                            }}
                            draggable="false"
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); closeZoom(); }}
                            className="absolute top-4 right-4 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 z-20 backdrop-blur-md"
                            style={{
                                backgroundColor: `${projectColor}40`,
                                border: `1px solid ${projectColor}60`
                            }}
                        >
                            <X size={24} />
                        </button>

                        {/* Indicadores de ayuda */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded-full text-xs md:text-sm backdrop-blur-md border"
                            style={{
                                backgroundColor: `${projectColor}40`,
                                borderColor: `${projectColor}60`
                            }}
                        >
                            <span>🖱️ Arrastra • 🔍 Rueda • 👆 Doble clic</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectModal;