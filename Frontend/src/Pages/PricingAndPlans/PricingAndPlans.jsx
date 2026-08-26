import React from 'react';
import { Helmet } from 'react-helmet-async'; // or 'react-helmet'
import PlanBreadcrumb from '../../Component/PlanBreadcrumb/PlanBreadcrumb';
import Plans from '../../Component/Plans/Plans';

const PricingAndPlans = () => {
  const pageUrl = "https://Akkadropz.com/pricing-and-plans";
  const ogImageUrl = "https://Akkadropz.com/assets/og-pricing-plans.jpg";
  const siteUrl = "https://Akkadropz.com";

  // Structured Data (JSON-LD) for LocalBusiness and BreadcrumbList
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Pricing & Plans",
            "item": pageUrl
          }
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        "name": "Alka Drops",
        "url": siteUrl,
        "logo": `${siteUrl}/assets/logo.png`,
        "image": ogImageUrl,
        "telephone": "+917327092477",
        "priceRange": "₹1499 - ₹2999",
        "description": "Best water suppliers and 20 litre water bottle delivery service in Bhubaneswar, Odisha.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli",
          "addressLocality": "Bhubaneswar",
          "addressRegion": "Odisha",
          "postalCode": "751012",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "20.3019",
          "longitude": "85.8063"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Bhubaneswar"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Odisha"
          }
        ]
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Basic SEO Tags */}
        <html lang="en" />
        <title>Pricing & Plans | Best Water Suppliers in Bhubaneswar - Alka Drops</title>
        <meta
          name="description"
          content="Explore subscription plans & 20 litre water bottle prices in Bhubaneswar. Alka Drops delivers certified pure mineral wellness water across Nayapalli, IRC Village, and Odisha."
        />
        <meta
          name="keywords"
          content="Best water suppliers in Bhubaneswar, 20 litre water bottle suppliers in Bhubaneswar, Bhubaneswar water supply helpline number, 20 litre water bottle suppliers in bhubaneswar price, Drinking water supply in Bhubaneswar, water supply Bhubaneswar, packaged drinking water manufacturers in odisha, 20 litre water supply near me home delivery, drinking water supply near me home delivery, mineral water wholesale price"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph (OG) / Facebook Metadata */}
        <meta property="og:locale" content="en_IN" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Alka Drops" />
        <meta property="og:title" content="Pricing & Subscription Plans - Alka Drops Bhubaneswar" />
        <meta
          property="og:description"
          content="Affordable 20L mineral water subscription plans for homes, offices, and gyms in Bhubaneswar. Fast doorstep delivery & hassle-free jar replacement."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:alt" content="Alka Drops Water Subscription Plans in Bhubaneswar" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Water Supply Plans & Prices | Alka Drops Bhubaneswar" />
        <meta
          name="twitter:description"
          content="Check out 20L water can monthly and yearly subscription plans in Bhubaneswar by Alka Drops."
        />
        <meta name="twitter:image" content={ogImageUrl} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="PricingAndPlans-page">
        <PlanBreadcrumb />
        <Plans />
      </main>
    </>
  );
};

export default PricingAndPlans;