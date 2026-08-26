import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaWater, FaTruck, FaRecycle, FaPhoneAlt, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import './Plans.css';

const Plans = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (id, isFeatured) => {
    if (isFeatured) return;
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const businessNAP = {
    name: "Alka Drops",
    phone: "+917327092477",
    displayPhone: "+91 7327092477",
    address: {
      street: "Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli",
      city: "Bhubaneswar",
      state: "Odisha",
      postalCode: "751012",
      country: "IN"
    }
  };

  const planData = [
    {
      id: "basic",
      title: "Basic Plan",
      subtitle: "*Home & Small Families",
      price: "1,499",
      period: "MO",
      desc: "Ideal 20 litre water supply near me home delivery package designed for small households in Bhubaneswar.",
      features: [
        { text: "Free Doorstep Delivery", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month (20L)", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaWater /> },
        { text: "Mineral Wellness Water", icon: <FaCheckCircle /> }
      ],
      isFeatured: false
    },
    {
      id: "premium",
      title: "Premium Plan",
      subtitle: "*BEST VALUE ANNUAL SUBSCRIPTION",
      price: "2,999",
      period: "YR",
      desc: "Top mineral water supply in Bhubaneswar with enriched alkalinity and vital essential minerals for total wellness.",
      features: [
        { text: "Free Express Delivery", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month (20L)", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaWater /> },
        { text: "Mineral Wellness Water", icon: <FaCheckCircle /> }
      ],
      isFeatured: true
    },
    {
      id: "advanced",
      title: "Advanced Plan",
      subtitle: "*Workplaces, Gyms & Studios",
      price: "2,199",
      period: "MO",
      desc: "High-demand drinking water supply for corporate offices, gyms, and commercial centers across Bhubaneswar.",
      features: [
        { text: "Priority Free Delivery", icon: <FaTruck /> },
        { text: "Max 15 Bottles / Month (20L)", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Flexible Bottle Replacements", icon: <FaWater /> },
        { text: "Certified Pure Mineral Water", icon: <FaCheckCircle /> }
      ],
      isFeatured: false
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Alka Drops",
    "image": "https://alkadrops.com/assets/logo.png",
    "telephone": businessNAP.displayPhone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": businessNAP.address.street,
      "addressLocality": businessNAP.address.city,
      "addressRegion": businessNAP.address.state,
      "postalCode": businessNAP.address.postalCode,
      "addressCountry": businessNAP.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.3019",
      "longitude": "85.8063"
    },
    "url": "https://alkadrops.com",
    "priceRange": "₹₹",
    "description": "Best packaged drinking water manufacturers and 20 litre water bottle suppliers in Bhubaneswar, Odisha."
  };

  return (
    <>
      <Helmet>
        <title>Best Water Suppliers in Bhubaneswar | 20 Litre Water Bottle Price - Alka Drops</title>
        <meta
          name="description"
          content="Get pure mineral wellness water delivery in Bhubaneswar. Affordable 20 litre water bottle suppliers with doorstep delivery across Nayapalli, IRC Village, and Odisha. Call +91 7327092477."
        />
        <meta
          name="keywords"
          content="Best water suppliers in Bhubaneswar, 20 litre water bottle suppliers in Bhubaneswar, Bhubaneswar water supply helpline number, 20 litre water bottle suppliers in bhubaneswar price, Drinking water supply in Bhubaneswar, packaged drinking water manufacturers in odisha, drinking water supply near me home delivery, mineral water wholesale price"
        />
        <meta property="og:title" content="Best Water Suppliers & 20L Water Delivery in Bhubaneswar | Alka Drops" />
        <meta property="og:description" content="Subscribe to mineral drinking water supply in Bhubaneswar. Transparent 20 litre water bottle prices, monthly & annual delivery plans by Alka Drops." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>

      <section className="Plans-section">
        {/* Semantic SEO Header */}
        <header className="Plans-header">
          <span className="Plans-tagline">Pure • Mineral-Rich • Doorstep Delivery</span>
          <h1 className="Plans-main-title">
            <span className="Plans-title-primary">Best Water Suppliers in Bhubaneswar</span>
            <span className="Plans-title-secondary">20 Litre Water Bottle Subscription Plans & Pricing</span>
          </h1>
          <p className="Plans-lead-text">
            Looking for a dependable drinking water supply near me with home delivery? Alka Drops is among the leading packaged drinking water manufacturers in Odisha, delivering certified mineral wellness water directly to homes, gyms, and workplaces at transparent wholesale rates.
          </p>
        </header>

        {/* Pricing Cards Container */}
        <div className="Plans-container">
          {planData.map((plan) => (
            <div 
              key={plan.id} 
              className={`Plans-card ${plan.isFeatured ? 'Plans-featured-card' : 'Plans-standard-card'} ${flippedCards[plan.id] ? 'is-flipped' : ''}`}
              onClick={() => toggleCardFlip(plan.id, plan.isFeatured)}
            >
              <div className="Plans-card-inner">
                {/* CARD FRONT */}
                <div className="Plans-card-front">
                  <div className="Plans-price-ring-container">
                    <div className="Plans-price-outer-ring">
                      <div className="Plans-price-bubble">
                        <span className="Plans-currency-symbol">₹</span>
                        <span className="Plans-price-amount">{plan.price}</span>
                        <div className="Plans-period-badge">
                          <span>{plan.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="Plans-card-title">{plan.title}</h3>
                  <span className="Plans-card-subtitle">{plan.subtitle}</span>

                  {plan.isFeatured ? (
                    <ul className="Plans-feature-list">
                      {plan.features.map((feat, index) => (
                        <li key={index} className="Plans-feature-item">
                          <span className="Plans-feat-icon">{feat.icon}</span>
                          <span>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="Plans-card-description">{plan.desc}</p>
                  )}

                  <a 
                    href={`tel:${businessNAP.phone}`}
                    className="Plans-order-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Order Now</span>
                    <div className="Plans-order-btn-accent"></div>
                  </a>
                </div>

                {/* CARD BACK */}
                {!plan.isFeatured && (
                  <div className="Plans-card-back">
                    <div className="Plans-price-ring-container">
                      <div className="Plans-price-outer-ring variant-blue">
                        <div className="Plans-price-bubble variant-blue">
                          <span className="Plans-currency-symbol">₹</span>
                          <span className="Plans-price-amount">{plan.price}</span>
                          <div className="Plans-period-badge">
                            <span>{plan.period}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="Plans-card-title text-white">{plan.title}</h3>
                    <span className="Plans-card-subtitle text-lightblue">{plan.subtitle}</span>

                    <ul className="Plans-feature-list text-white">
                      {plan.features.map((feat, index) => (
                        <li key={index} className="Plans-feature-item">
                          <span className="Plans-feat-icon text-white">{feat.icon}</span>
                          <span>{feat.text}</span>
                        </li>
                      ))}
                    </ul>

                    <a 
                      href={`tel:${businessNAP.phone}`}
                      className="Plans-order-btn variant-light"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Order Now</span>
                      <div className="Plans-order-btn-accent font-accent"></div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Informational SEO & NAP Footer Block */}
        <div className="Plans-info-block">
          <div className="Plans-info-grid">
            <div className="Plans-info-box">
              <FaShieldAlt className="Plans-info-icon" />
              <h2 className="Plans-info-heading">Certified Mineral Drinking Water in Bhubaneswar</h2>
              <p>
                As a premier water jar supplier near Bhubaneswar, every drop undergoes rigorous multi-stage purification and mineral enrichment to ensure optimal pH balance and crisp taste.
              </p>
            </div>

            <div className="Plans-info-box">
              <FaTruck className="Plans-info-icon" />
              <h2 className="Plans-info-heading">Prompt 20 Litre Water Jar Delivery</h2>
              <p>
                Contact our dedicated Bhubaneswar water supply helpline number for fast, scheduled, and on-demand doorstep deliveries across Nayapalli and surrounding regions.
              </p>
            </div>
          </div>

          {/* Business NAP Section */}
          <footer className="Plans-nap-container">
            <div className="Plans-nap-item">
              <span className="Plans-nap-label">Business:</span> {businessNAP.name}
            </div>
            <div className="Plans-nap-item">
              <FaMapMarkerAlt /> 
              <span>{businessNAP.address.street}, {businessNAP.address.city}, {businessNAP.address.state} - {businessNAP.address.postalCode}</span>
            </div>
            <div className="Plans-nap-item">
              <FaPhoneAlt /> 
              <span>Helpline: <a href={`tel:${businessNAP.phone}`}>{businessNAP.displayPhone}</a></span>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Plans;