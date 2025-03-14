
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ 
  icon, 
  title, 
  description,
  className
}) => {
  return (
    <motion.div
      className={cn(
        "glass-card p-6 flex flex-col items-center text-center h-full",
        className
      )}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default SkillCard;
