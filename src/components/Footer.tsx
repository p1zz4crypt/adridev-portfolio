
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 bg-secondary/80 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-display font-bold text-gradient mb-4">
            Portfolio
          </div>
          
          <div className="flex justify-center gap-6 mb-6">
            <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
            <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a>
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          
          <p className="text-muted-foreground flex items-center justify-center">
            © {new Date().getFullYear()} • Built with 
            <Heart className="h-4 w-4 mx-1 text-primary" /> 
            using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
