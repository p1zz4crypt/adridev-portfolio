
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Seo } from '../Seo';

const NotFound: React.FC = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    const timeline = gsap.timeline();
    
    timeline
      .from('.error-code', {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.5)'
      })
      .from('.error-text', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.4')
      .from('.home-button', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out'
      }, '-=0.2');
      
    return () => {
      timeline.kill();
    };
  }, [location.pathname]);

  return (
    <>
    <Seo 
            title=" Sobre Adri Rosas| Experiencia y Habilidades"
            description="Front End Developer | Diseño UI | Tecnología Blockchain"
            type="profile"
            image="/images/og-me.png"
          />
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/30 px-4">
      <div className="text-center max-w-md">
        <h1 className="error-code text-9xl font-bold text-gradient mb-4">404</h1>
        <p className="error-text text-xl mb-8 text-muted-foreground">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="home-button inline-block">
          <Button size="lg" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-lavender/10 rounded-full blur-3xl"></div>
      </div>
    </div>
    </>
  );
};

export default NotFound;
