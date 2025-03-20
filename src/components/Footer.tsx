
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-6 bg-secondary/80 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center">          
          <p className="text-muted-foreground text-foreground dark:text-foreground flex items-center justify-center">
            © {new Date().getFullYear()} • Hecho con
            <Heart className="h-4 w-4 mx-1 text-primary text-foreground dark:text-foreground" />, React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
