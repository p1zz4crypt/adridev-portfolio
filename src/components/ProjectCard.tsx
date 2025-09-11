import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  isVideo?: boolean; // Nuevo prop para indicar si es un video
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  reversed?: boolean;
  className?: string;
  onLiveDemoClick: () => void; // Definición correcta de la prop
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  isVideo = false,
  tags,
  liveUrl,
  githubUrl,
  reversed = false,
  className,
  onLiveDemoClick, // Recibimos la prop
}) => {
  return (
    <motion.div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
        className
      )}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className={reversed ? 'md:order-2' : ''}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="animated-border"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-xl object-cover aspect-video"
            loading="lazy"
          />
        </motion.div>
      </div>

      <div className={reversed ? 'md:order-1' : ''}>
        <h3 className="text-2xl md:text-3xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4 text-foreground dark:text-foreground">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-violet-500 border border-blue-100"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {liveUrl && (
            <button
              onClick={onLiveDemoClick} // Usamos la función onLiveDemoClick
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
           
              <span className="font-semibold">+ info</span>
            </button>
          )}

          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <Github size={18} />
              <span>Source Code</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;