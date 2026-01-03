import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    
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

    // Animación de entrada del modal
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const ctx = gsap.context(() => {
                // Timeline para coordinar todas las animaciones
                const tl = gsap.timeline();

                // 1. Fade in del backdrop
                tl.fromTo(backdropRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.4, ease: "power2.out" }
                );

                // 2. Animación del contenedor principal (efecto de expansión)
                tl.fromTo(contentRef.current,
                    { 
                        scale: 0.8, 
                        opacity: 0,
                        y: 50
                    },
                    { 
                        scale: 1, 
                        opacity: 1,
                        y: 0,
                        duration: 0.6, 
                        ease: "back.out(1.2)" 
                    },
                    "-=0.2" // Overlap con la animación anterior
                );

                // 3. Animación del header (desliza desde arriba)
                tl.fromTo(headerRef.current,
                    { y: -50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                    "-=0.4"
                );

                // 4. Animación de la galería (escala y fade)
                tl.fromTo(galleryRef.current,
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );

                // 5. Animación del footer (desliza desde abajo)
                tl.fromTo(footerRef.current,
                    { y: 50, opacity: 0 },
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

                // Animación de salida en orden inverso
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
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                }, "-=0.2");

                tl.to(contentRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.in"
                }, "-=0.2");

                tl.to(backdropRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.in"
                }, "-=0.3");
            }, modalRef);

            return () => ctx.revert();
        } else {
            onClose();
        }
    };

    if (!isOpen) return null;

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleImageClick = (imageUrl: string, isVideo?: boolean) => {
        if (isVideo) return;
        setZoomedImage(imageUrl);
        setTranslateX(0);
        setTranslateY(0);
        setScale(1);
    };

    const closeZoom = () => {
        setZoomedImage(null);
        setTranslateX(0);
        setTranslateY(0);
        setScale(1);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            closeZoom();
            return;
        }
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        setStartTranslateX(translateX);
        setStartTranslateY(translateY);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        setTranslateX(startTranslateX + deltaX);
        setTranslateY(startTranslateY + deltaY);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(scale + delta, 1), 4);
        setScale(newScale);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStartX(e.touches[0].clientX);
            setDragStartY(e.touches[0].clientY);
            setStartTranslateX(translateX);
            setStartTranslateY(translateY);
        }
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - dragStartX;
        const deltaY = e.touches[0].clientY - dragStartY;
        setTranslateX(startTranslateX + deltaX);
        setTranslateY(startTranslateY + deltaY);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = () => {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    return (
        <div 
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Backdrop con blur */}
            <div 
                ref={backdropRef}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                style={{ opacity: 0 }}
            />

            {/* Contenedor principal del modal */}
            <div 
                ref={contentRef}
                className="relative bg-white/90 dark:bg-gray-800/90 w-full flex flex-col backdrop-blur-sm" 
                style={{ maxHeight: '95vh', height: '95vh', width: '100%', opacity: 0 }}
            >
                <div 
                    ref={headerRef}
                    className="px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-t-2xl"
                    style={{ opacity: 0 }}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                            {project.title}
                        </h2>
                        <button
                            ref={closeButtonRef}
                            onClick={handleClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 w-10 h-10 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm flex items-center justify-center hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all hover:rotate-90 duration-300 border border-gray-200/50 dark:border-gray-600/50"
                            aria-label="Cerrar"
                            style={{ opacity: 0 }}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="mt-3">
                        <p className="text-gray-700 dark:text-gray-300 text-lg">{project.description}</p>
                    </div>
                </div>

                {/* Área scrolleable para las imágenes */}
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
                                <div key={index} className="w-full flex-shrink-0 relative h-full pb-28">
                                    <div className="h-full flex overflow-auto px-4 py-2 pb-20 group">
                                        <div className="rounded-lg flex justify-center cursor-zoom-in relative" onClick={() => handleImageClick(image.url, image.isVideo)}>
                                            {image.isVideo ? (
                                                <video
                                                    src={image.url}
                                                    controls
                                                    className="w-80 p-6 h-auto object-contain max-h-full transition-transform duration-100 ease rounded-lg"
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={image.url}
                                                    alt={`Project ${index + 1}`}
                                                    className="w-full h-auto object-contain max-h-full transition-transform duration-100 ease rounded-lg hover:scale-[1.04]"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                                                {image.isVideo ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>
                                         <p className="text-center text-gray-700 dark:text-gray-300 font-medium text-lg mb-3">
                        {project.images[currentImageIndex]?.description || ''}
                    </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de navegación con efecto glass mejorado */}
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md text-gray-800 dark:text-white w-12 h-12 rounded-full hover:bg-white/60 dark:hover:bg-gray-800/60 z-10 focus:outline-none transition-all duration-300 hover:scale-110 border border-white/50 dark:border-gray-600/50 shadow-lg"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="mx-auto" size={28} />
                        </button>
                        <button
                            onClick={goToNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md text-gray-800 dark:text-white w-12 h-12 rounded-full hover:bg-white/60 dark:hover:bg-gray-800/60 z-10 focus:outline-none transition-all duration-300 hover:scale-110 border border-white/50 dark:border-gray-600/50 shadow-lg"
                            aria-label="Imagen siguiente"
                        >
                            <ChevronRight className="mx-auto" size={28} />
                        </button>
                    </div>
                )}


                <div 
                    ref={footerRef}
                    className="px-6 w-full py-6 border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 absolute bottom-0 shadow-lg rounded-b-2xl z-10"
                    style={{ opacity: 0 }}
                >
                    
                    <div className="flex justify-center">
                        <div className="flex space-x-3">
                            {project.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        idx === currentImageIndex 
                                            ? 'w-8 bg-gradient-to-r from-violet-600 to-indigo-600 scale-110' 
                                            : 'w-2 bg-gray-300/60 dark:bg-gray-600/60 hover:bg-gray-400/80 dark:hover:bg-gray-500/80'
                                    }`}
                                    aria-label={`Ir a imagen ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {zoomedImage && (
                <div 
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-grab"
                    onClick={closeZoom}
                >
                    <div 
                        ref={imageContainerRef}
                        className={`relative max-w-[90vw] max-h-[90vh] overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
                            className="absolute top-4 right-4 text-white bg-black/50 backdrop-blur-sm p-2 rounded-full hover:bg-black/70 transition-all duration-300 hover:scale-110 z-20"
                            aria-label="Cerrar vista ampliada"
                        >
                            <X size={24} />
                        </button>
                        
                        {/* Indicadores de ayuda */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm opacity-80">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                </svg>
                                <span>Arrastra para mover • Rueda para zoom • Doble clic para resetear</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectModal;