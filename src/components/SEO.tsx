import { Helmet } from "react-helmet";
import React from "react";

const SITE_URL = "https://doubleyou.com.ng";
const SITE_NAME = "Doubleyou";
const TWITTER_HANDLE = "@DoubleyouNGA";

type SEOProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string[];
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url = "/",
  image = "/hero.png",
  keywords = [],
}) => {
  const canonicalUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const keywordsContent = keywords.join(", ");

  // JSON-LD Organization schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "Doubleyou Centre",
    url: SITE_URL,
    logo: `${SITE_URL}/ddd.jpg`,
    description,
    foundingDate: "2019",
    email: "hello@doubleyou.com.ng",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ota",
      addressRegion: "Ogun State",
      addressCountry: "NG",
    },
    areaServed: { "@type": "Place", name: "Africa" },
    sameAs: [
      "https://www.facebook.com/Doubleyouinitiative",
      "https://www.instagram.com/doubleyoucenter?obrf=a3N4MHZhYXBnMWZn",
      "https://twitter.com/DoubleyouNGA",
      "https://www.linkedin.com/company/doubleyougroup/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@doubleyou.com.ng",
      contactType: "General Enquiries",
    },
  };

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywordsContent} />}
      <meta name="author" content="Doubleyou Centre" />
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="theme-color" content="#0E1B2E" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_NG" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEO;
