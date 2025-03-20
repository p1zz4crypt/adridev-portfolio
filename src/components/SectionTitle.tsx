
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  subtitle, 
  title, 
  description,
  center = false,
  className
}) => {
  return (
    <motion.div 
      className={cn(
        center ? 'text-center mx-auto max-w-2xl' : '', 
        'mb-12',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {subtitle && (
        <span className="text-sm font-medium uppercase tracking-wider text-primary mb-2 inline-block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-3xl text-foreground dark:text-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
