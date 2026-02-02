import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [projectColor, setProjectColor] = useState('#ff006e');

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
            'Datahooks': '#ff006e',
            'Max Intelligence': '#8338ec',
            'Eterna': '#3a86ff',
        };
        const color = colorMap[project.title] || '#ff006e';
        setProjectColor(color);
    }, [project.title]);

    // Animación de entrada del modal
    useEffect(() => {
        if (isOpen && modalRef.current) {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline();

                tl.fromTo(backdropRef.current,
                    { opacity: 0, backdropFilter: 'blur(0px)' },
                    { opacity: 1, backdropFilter: 'blur(8px)', duration: 0.4, ease: "power2.out" }
                );

                tl.fromTo(contentRef.current,
                    { scale: 0.7, opacity: 0, y: 60, rotationX: -20 },
                    { scale: 1, opacity: 1, y: 0, rotationX: 0, duration: 0.7, ease: "back.out(1.2)" },
                    "-=0.2"
                );

                tl.fromTo(headerRef.current,
                    { y: -60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                    "-=0.4"
                );

                tl.fromTo(galleryRef.current,
                    { scale: 0.85, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
                    "-=0.3"
                );

                tl.fromTo(footerRef.current,
                    { y: 60, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
                    "-=0.4"
                );

                tl.fromTo(closeButtonRef.current,
                    { scale: 0, rotation: -180, opacity: 0 },
                    { scale: 1, rotation: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
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
                const tl = gsap.timeline({ onComplete: onClose });

                tl.to(closeButtonRef.current, {
                    scale: 0, rotation: 180, opacity: 0, duration: 0.3, ease: "power2.in"
                });

                tl.to([headerRef.current, footerRef.current], {
                    y: 30, opacity: 0, duration: 0.3, ease: "power2.in"
                }, "-=0.2");

                tl.to(galleryRef.current, {
                    scale: 0.85, opacity: 0, duration: 0.3, ease: "power2.in"
                }, "-=0.2");

                tl.to(contentRef.current, {
                    scale: 0.7, opacity: 0, y: 60, duration: 0.4, ease: "power2.in"
                }, "-=0.2");

                tl.to(backdropRef.current, {
                    opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: "power2.in"
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
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={handleClose}
                className="absolute inset-0 bg-black/80"
                style={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            />

            {/* Modal Content - RESPONSIVE FIX */}
            <div
                ref={contentRef}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[95vw] md:max-w-[85vw] lg:max-w-[80vw] h-[95vh] md:h-[90vh] overflow-hidden flex flex-col"
                style={{ opacity: 0, perspective: '1200px' }}
            >
                <div className="absolute inset-0 rounded-2xl pointer-events-none" />

                {/* Header - RESPONSIVE */}
                <div
                    ref={headerRef}
                    className="px-4 md:px-8 py-4 md:py-6 backdrop-blur-sm relative z-10 overflow-y-auto max-h-[45vh] md:max-h-none"
                    style={{ opacity: 0 }}
                >
                    {/* Línea de color dinámico */}
                    <div
                        className="absolute left-0 top-0 h-1 w-16 md:w-24"
                        style={{ background: `linear-gradient(90deg, ${projectColor}, transparent)` }}
                    />

                    {/* Title + Close button row */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <h2
                            className="text-xl md:text-3xl lg:text-4xl font-bold flex-1"
                            style={{ color: '#fff', textShadow: `0 0 20px ${projectColor}40` }}
                        >
                            {project.title}
                        </h2>

                        {/* Close Button */}
                        <button
                            ref={closeButtonRef}
                            onClick={handleClose}
                            className="flex-shrink-0 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-white/10 relative group"
                            style={{ opacity: 0 }}
                        >
                            <div
                                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ background: `${projectColor}30` }}
                            />
                            <X size={24} className="text-white relative z-10 cursor-pointer" />
                        </button>
                    </div>

                    {/* Description */}
                    <p className="text-gray-200 text-sm md:text-base lg:text-lg leading-relaxed mb-4">
                        {project.description}
                    </p>

                    {/* Stack + Tags - RESPONSIVE */}
                    {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <img src={Stack} alt="stack" className="w-8 md:w-10" />
                                <p className="text-gray-200 text-sm">Stack:</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {project.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs md:text-sm px-2 md:px-4 py-1 text-white transition-all duration-300"
                                        style={{ backgroundColor: `${projectColor}20` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Galería - RESPONSIVE */}
                {project.images.length > 0 && (
                    <div
                        ref={galleryRef}
                        className="flex-1 relative overflow-hidden min-h-0"
                        style={{ opacity: 0 }}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-out h-full"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {project.images.map((image, index) => (
                                <div key={index} className="w-full flex-shrink-0 relative h-full">
                                    <div className="h-full flex flex-col items-center justify-center overflow-auto px-2 md:px-4 py-4 md:py-8">
                                        {/* Imagen */}
                                        <div
                                            className="rounded-xl overflow-hidden flex justify-center cursor-zoom-in relative backdrop-blur-sm transition-all duration-300 max-w-full"
                                            onClick={() => handleImageClick(image.url, image.isVideo)}
                                            style={{ background: `${projectColor}05` }}
                                        >
                                            {image.isVideo ? (
                                                <video
                                                    src={image.url}
                                                    controls
                                                    className="w-full max-w-xs md:max-w-md lg:max-w-lg h-auto object-contain max-h-[35vh] md:max-h-[50vh] transition-transform duration-300 rounded-lg"
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={image.url}
                                                    alt={`Project ${index + 1}`}
                                                    className="w-full h-auto object-contain max-h-[35vh] md:max-h-[55vh] transition-transform duration-300 rounded-lg"
                                                    loading="lazy"
                                                />
                                            )}
                                        </div>

                                        {/* Descripción de imagen */}
                                        <p className="text-center text-gray-300 text-sm md:text-base mt-4 max-w-lg leading-relaxed px-4">
                                            {project.images[currentImageIndex]?.description || ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de navegación */}
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full z-10 focus:outline-none transition-all duration-300 hover:scale-110 backdrop-blur-md flex items-center justify-center"
                            style={{
                                backgroundColor: `${projectColor}20`,
                                borderColor: `${projectColor}60`,
                                boxShadow: `0 0 20px ${projectColor}20`
                            }}
                        >
                            <ChevronLeft className="text-white" size={20} />
                        </button>

                        <button
                            onClick={goToNextImage}
                            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full z-10 focus:outline-none transition-all duration-300 hover:scale-110 backdrop-blur-md flex items-center justify-center"
                            style={{
                                backgroundColor: `${projectColor}20`,
                                borderColor: `${projectColor}60`,
                                boxShadow: `0 0 20px ${projectColor}20`
                            }}
                        >
                            <ChevronRight className="text-white" size={20} />
                        </button>
                    </div>
                )}

                {/* Footer - Indicadores */}
                <div
                    ref={footerRef}
                    className="px-4 md:px-8 py-4 md:py-6 bg-transparent relative z-10"
                    style={{ opacity: 0 }}
                >
                    <div className="flex justify-center items-center gap-2">
                        <div className="flex space-x-2 md:space-x-3">
                            {project.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className="rounded-full transition-all duration-300 h-2 md:h-3"
                                    style={{
                                        width: idx === currentImageIndex ? '80px' : '30px',
                                        backgroundColor: idx === currentImageIndex ? projectColor : 'rgba(255,255,255,0.2)',
                                        boxShadow: idx === currentImageIndex ? `0 0 15px ${projectColor}80` : 'none'
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-gray-400 text-xs md:text-sm ml-3">
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
                        className={`relative max-w-[95vw] max-h-[95vh] overflow-hidden rounded-xl border ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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

                        <div
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded-full text-xs backdrop-blur-md border"
                            style={{
                                backgroundColor: `${projectColor}40`,
                                borderColor: `${projectColor}60`
                            }}
                        >
                            <span className="hidden md:inline">🖱️ Arrastra • 🔍 Rueda • 👆 Doble clic</span>
                            <span className="md:hidden">👆 Doble clic para zoom</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectModal;