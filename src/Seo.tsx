import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: "website" | "article" | "profile" | "portfolio";
  structuredData?: object;
}

export function Seo({
  title,
  description = "Portafolio profesional de Adriana Rosas - Desarrolladora Frontend especializada en React, TypeScript y tecnologías web modernas.",
  keywords = "desarrollador javascript, programador react, frontend developer, Adri Rosas",
  url,
  image = "/images/og-image.png",
  type = "website",
  structuredData,
}: SeoProps) {
  const location = useLocation();
  const canonicalUrl = url || `https://adrirosasdev.com${location.pathname}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `https://adrirosasdev.com${image}`;

  // Datos estructurados principales 
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adriana Rosas",
    "alternateName": "Adri Rosas",
    "jobTitle": "Front End Developer",
    "url": "https://adrirosasdev.com",
    "sameAs": [
      "https://github.com/p1zz4crypt",
      "https://linkedin.com/in/adrianarosasf",
      "https://twitter.com/p1zz4crypt"
    ],
    "description": description,
    "image": fullImageUrl,
    "mainEntityOfPage": canonicalUrl,
    "knowsAbout": ["JavaScript", "React", "TypeScript", "Vue.js", "Blockchain"]
  };

  // Combinar con structuredData personalizado si existe
  const finalStructuredData = structuredData 
    ? { ...baseStructuredData, ...structuredData } 
    : baseStructuredData;

  return (
    <HelmetProvider>
      <Helmet>
        {/* Metadatos básicos */}
        <title>{`${title} | Adri Rosas Dev`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:site_name" content="Adri Rosas Dev" />
        <meta property="og:locale" content="es_MX" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@p1zz4crypt" />
        <meta name="twitter:creator" content="@p1zz4crypt" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImageUrl} />

        {/* Schema.org - Solo un script */}
        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData, null, 2)} 
        </script>
      </Helmet>
    </HelmetProvider>
  );
}