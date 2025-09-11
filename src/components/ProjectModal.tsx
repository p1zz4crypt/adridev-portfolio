import React, { useState, useRef, useEffect } from 'react';

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
    
    // Refs y estados para la funcionalidad de arrastre
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [startTranslateX, setStartTranslateX] = useState(0);
    const [startTranslateY, setStartTranslateY] = useState(0);
    const [scale, setScale] = useState(1);

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
        if (isVideo) return; // No hacemos zoom en videos
        setZoomedImage(imageUrl);
        // Resetear valores de arrastre y zoom cuando se abre una nueva imagen
        setTranslateX(0);
        setTranslateY(0);
        setScale(1);
    };

    const closeZoom = () => {
        setZoomedImage(null);
        // Resetear valores de arrastre y zoom al cerrar
        setTranslateX(0);
        setTranslateY(0);
        setScale(1);
    };

    // Función para iniciar el arrastre
    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.target === e.currentTarget) {
            // Si el clic es en el fondo, cerrar el zoom
            closeZoom();
            return;
        }
        setIsDragging(true);
        setDragStartX(e.clientX);
        setDragStartY(e.clientY);
        setStartTranslateX(translateX);
        setStartTranslateY(translateY);
    };

    // Función para arrastrar
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;
        
        setTranslateX(startTranslateX + deltaX);
        setTranslateY(startTranslateY + deltaY);
    };

    // Función para terminar el arrastre
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Función para manejar el zoom con la rueda del mouse
    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
        e.preventDefault();
        const delta = e.deltaY * -0.01;
        const newScale = Math.min(Math.max(scale + delta, 1), 4); // Limitar el zoom entre 1x y 4x
        setScale(newScale);
    };

    // Función para manejar toques (dispositivos táctiles)
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

    // Resetear zoom y posición con doble clic
    const handleDoubleClick = () => {
        setScale(1);
        setTranslateX(0);
        setTranslateY(0);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg max-w-6xl mx-4 flex flex-col shadow-2xl backdrop-blur-sm" style={{ maxHeight: '90vh', height: '90vh', width: '100%' }}>
                {/* Cabecera fija con efecto glass */}
                <div className="px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-3xl leading-none focus:outline-none transition-transform hover:rotate-90 duration-300"
                            aria-label="Cerrar"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="mt-2">
                        <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
                    </div>
                </div>

                {/* Área scrolleable solo para las imágenes */}
                {project.images.length > 0 && (
                    <div className="flex-1 relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-300 ease-in-out h-full"
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {project.images.map((image, index) => (
                                <div key={index} className="w-full flex-shrink-0 relative h-full">
                                    <div className="h-full overflow-auto px-4 py-2 pb-20 group">
                                        <div className=" rounded-lg flex justify-center cursor-zoom-in relative" onClick={() => handleImageClick(image.url, image.isVideo)}>
                                            {image.isVideo ? (
                                                <video
                                                    src={image.url}
                                                    controls
                                                    className="w-80 p-6 h-auto object-contain max-h-full transition-transform duration-500 ease-in-out rounded-lg"
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={image.url}
                                                    alt={`Project ${index + 1}`}
                                                    className="w-full h-auto object-contain max-h-full transition-transform duration-500 ease-in-out rounded-lg"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Botones de navegación con efecto glass */}
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/60 z-10 focus:outline-none transition-all duration-300 hover:scale-110"
                            aria-label="Imagen anterior"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={goToNextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/60 z-10 focus:outline-none transition-all duration-300 hover:scale-110"
                            aria-label="Imagen siguiente"
                        >
                            &gt;
                        </button>
                    </div>
                )}

                {/* Pie fijo con la descripción de la imagen - Efecto Glassmorphism */}
                <div className="px-6 w-full py-8 border-t border-gray-200/30 dark:border-gray-700/30 backdrop-blur-md bg-white/70 dark:bg-gray-800/70 absolute bottom-5 shadow-lg rounded-b-lg z-10">
                    <p className="text-center text-gray-700 dark:text-gray-300 font-medium">
                        {project.images[currentImageIndex]?.description || ''}
                    </p>
                    <div className="flex justify-center mt-2">
                        <div className="flex space-x-3">
                            {project.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`w-3 h-3 rounded-full transition-all ${
                                        idx === currentImageIndex 
                                            ? 'bg-violet-600 scale-110' 
                                            : 'bg-gray-300/60 dark:bg-gray-600/60 hover:bg-gray-400/80 dark:hover:bg-gray-500/80'
                                    }`}
                                    aria-label={`Ir a imagen ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de zoom para imagen ampliada - solo para imágenes, no para videos */}
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
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