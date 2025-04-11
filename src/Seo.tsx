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
  description,
  keywords = "desarrollador javascript, programador react, frontend developer, Adri Rosas",
  url,
  image = "https://adrirosasdev.com/images/og-image.png",
  type = "website",
  structuredData,
}: SeoProps) {
  const location = useLocation();
  const canonicalUrl = url || `https://adrirosasdev.com${location.pathname}`;
  const fullImageUrl = image.startsWith("http")
    ? image
    : `https://adrirosasdev.com${image}`;

  const metaData = {
    title: `${title} | Adri Rosas Dev`,
    description,
    keywords,
    canonicalUrl,
    ogType: type,
    ogUrl: canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: fullImageUrl,
    twitterCard: "summary_large_image",
    twitterSite: "@p1zz4crypt",
    twitterCreator: "@p1zz4crypt",
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: fullImageUrl,
    twitterDomain: "adrirosasdev.com",
  };

  // Verifica que la imagen tenga el formato correcto
  const twitterImageUrl = fullImageUrl.endsWith(".png")
    ? fullImageUrl.replace(".png", ".jpg")
    : fullImageUrl;

  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adriana Rosas",
    jobTitle: "Front End Developer",
    url: "https://adrirosasdev.com",
    sameAs: [
      "https://github.com/p1zz4crypt",
      "https://linkedin.com/in/adrianarosasf",
    ],
    description: description,
  };

  return (
    <HelmetProvider>
      <Helmet>
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

        {/* Twitter Card  */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@p1zz4crypt" />
        <meta name="twitter:creator" content="@p1zz4crypt" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={twitterImageUrl} />
        <meta name="twitter:domain" content="adrirosasdev.com" />

        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(
            structuredData || {
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Adriana Rosas",
              jobTitle: "Front End Developer",
              url: "https://adrirosasdev.com",
              sameAs: [
                "https://github.com/p1zz4crypt",
                "https://linkedin.com/in/adrianarosasf",
              ],
              description: description,
            }
          )}
        </script>
      </Helmet>
    </HelmetProvider>
  );
}
