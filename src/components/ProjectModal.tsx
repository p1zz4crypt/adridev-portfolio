import React, { useState } from 'react';

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: {
        title: string;
        liveUrl: string;
        description: string,
        images: { url: string; description: string }[];
    };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-4">
                    <p>{project.description}</p>
                </div>

                {/* Carrusel personalizado */}
                {project.images.length > 0 && (
                    <div className="relative">
                        <div className="overflow-hidden rounded-lg">
                            <div
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                            >
                                {project.images.map((image, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <img
                                            src={image.url}
                                            alt={`Project ${index + 1}`}
                                            className=" rounded-lg"
                                            // style={{border: "2px solid blue"}}

                                            // style={{width: "90%", height: "400px"}}
                                        />
                                        <p className="text-center mt-2 text-gray-600 dark:text-gray-300">
                                            {image.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botones de navegación */}
                        <button
                            onClick={goToPreviousImage}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={goToNextImage}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectModal;