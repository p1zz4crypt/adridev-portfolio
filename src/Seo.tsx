import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from 'react-router-dom'; // Asegúrate de importar useLocation

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile' | 'portfolio';
  structuredData?: object; // Para schema markup
}

export function Seo({ 
  title, 
  description, 
  keywords = "desarrollador javascript, programador react, frontend developer, Adri Rosas",
  url, 
  image = "https://adrirosasdev.com/images/og-image.png",
  type = "website",
  structuredData
}: SeoProps) {
  const location = useLocation();
  const canonicalUrl = url || `https://adrirosasdev.com${location.pathname}`;
  const fullImageUrl = image?.startsWith('http') ? image : 'https://adrirosasdev.com/images/og-me.png';

  // Datos estructurados por defecto (personaliza con tu información)
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adriana Rosas",
    "jobTitle": "Front End Developer",
    "url": "https://adrirosasdev.com",
    "sameAs": [
      "https://github.com/p1zz4crypt",
      "https://linkedin.com/in/adrianarosasf"
    ],
    "description": description
  };

  return (
    <HelmetProvider>
      <Helmet>
        {/* Metadatos básicos */}
        <title>{`${title} | Adri Rosas Dev`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@p1zz4crypt" /> {/* Reemplázalo */}
  <meta name="twitter:creator" content="@p1zz4crypt" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
        <meta property="twitter:image" content={fullImageUrl} />
        <meta property="twitter:creator" content="@p1zz4crypt" /> 

        {/* Schema.org markup */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData || defaultStructuredData)}
        </script>
      </Helmet>
    </HelmetProvider>
  );
}