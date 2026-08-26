import React from 'react';
import { Helmet } from 'react-helmet-async';

// Import Page Sections
import ServiceBreadcrumb from '../../Component/ServiceBreadcrumb/ServiceBreadcrumb';
import MainServices from '../../Component/MainServices/MainServices';
import EssentialHealth from '../../Component/EssentialHealth/EssentialHealth';
import OtherServices from '../../Component/OtherServices/OtherServices';
import AlkaDropsPricing from '../../Component/AlkaDropsPricing/AlkaDropsPricing';
import Testimonials from '../../Component/Testimonials/Testimonials';

const OurServices = () => {
  // LocalBusiness & Service Schema Markup for Google Search
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "WaterDeliveryService",
    "name": "Alka Drops",
    "url": "https://alkadrops.com/services",
    "telephone": "+917327092477",
    "priceRange": "₹49 - ₹99",
    "image": "https://alkadrops.com/assets/wat7.jpg",
    "description": "Top mineral water dealer and 20 litre water bottle supplier in Bhubaneswar, Odisha. Quick doorstep delivery for home, offices, and events.",
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
      "latitude": 20.3015,
      "longitude": 85.8066
    },
    "areaServed": {
      "@type": "City",
      "name": "Bhubaneswar"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Drinking Water Delivery Plans",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "20 Litre Water Jar Home Delivery"
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>Best Water Suppliers in Bhubaneswar | 20 Litre Water Bottle Delivery - Alka Drops</title>
        <meta 
          name="description" 
          content="Alka Drops is the top 20 litre water bottle supplier in Bhubaneswar, Odisha. Contact our Bhubaneswar water supply helpline (+91 7327092477) for fast home delivery of packaged drinking water at wholesale prices." 
        />
        <meta 
          name="keywords" 
          content="Best water suppliers in Bhubaneswar, 20 litre water bottle suppliers in Bhubaneswar, Bhubaneswar water supply helpline number, 20 litre water bottle suppliers in bhubaneswar price, Drinking water supply in Bhubaneswar, packaged drinking water manufacturers in odisha, 20 litre water supply near me home delivery, Top Mineral water dealer in Bhubaneswar, Wellness best drinking water in Bhubaneswar" 
        />
        <link rel="canonical" href="https://alkadrops.com/services" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Best 20 Litre Water Bottle Suppliers in Bhubaneswar | Alka Drops" />
        <meta property="og:description" content="Order pure packaged mineral water jars in Bhubaneswar with fast home delivery. Contact Alka Drops helpline at +91 7327092477." />
        <meta property="og:url" content="https://alkadrops.com/services" />
        <meta property="og:image" content="https://alkadrops.com/assets/wat7.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Drinking Water Supply in Bhubaneswar | Alka Drops" />
        <meta name="twitter:description" content="Affordable 20 Litre water supply near me home delivery in Bhubaneswar. Best wholesale prices for packaged drinking water." />
        <meta name="twitter:image" content="https://alkadrops.com/assets/wat7.jpg" />

        {/* Fixed: Standard JSON.stringify syntax */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <main className="our-services-page">
        {/* Page Sections */}
        <ServiceBreadcrumb />
        <MainServices /> 
        <EssentialHealth />
        <OtherServices />
        <AlkaDropsPricing />
        <Testimonials />
      </main>
    </>
  );
};

export default OurServices;