import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: "website" | "article" | "profile" | "portfolio";
  structuredData?: object;
}

export function Seo({
  title,
  description = "Frontend Developer en CDMX. Integración de IA, desarrollo de productos digitales.",
  keywords = "frontend developer, creative developer, react, vue, GSAP, animaciones web, AI integration, product builder, desarrollador web CDMX, Adriana Rosas",
  url,
  image = "/ad3.png", 
  type = "website",
  structuredData,
}: SeoProps) {
  const location = useLocation();
  const canonicalUrl = url || `https://adrirosasdev.com${location.pathname}`;
  
  // ✅ Asegurar URL completa para la imagen
  const fullImageUrl = image.startsWith("http")
    ? image
    : `https://adrirosasdev.com${image.startsWith("/") ? image : `/${image}`}`;

  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Adriana Rosas",
    "alternateName": "Adri Rosas",
    "jobTitle": "Front End Developer / Diseño UX/UI & AI Workflows",
    "url": "https://adrirosasdev.com",
    "sameAs": [
      "https://github.com/p1zz4crypt",
      "https://linkedin.com/in/adriana-rosasf",
      "https://medium.com/@a.rosasfig"
    ],
    "description": description,
    "image": fullImageUrl,
    "mainEntityOfPage": canonicalUrl,
    "knowsAbout": ["React", "Vue.js", "TypeScript", "GSAP", "Tailwind CSS", "Blockchain", "AI Workflows"]
  };

  const finalStructuredData = structuredData 
    ? { ...baseStructuredData, ...structuredData } 
    : baseStructuredData;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Adriana Rosas | Portfolio" />
        <meta property="og:locale" content="es_MX" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullImageUrl} />

        <script type="application/ld+json">
          {JSON.stringify(finalStructuredData)}
        </script>
      </Helmet>
    </HelmetProvider>
  );
}