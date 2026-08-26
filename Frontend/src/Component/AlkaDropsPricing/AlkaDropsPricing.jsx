import React from 'react';
import { FaWater, FaTruck, FaRecycle, FaAward, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
import './AlkaDropsPricing.css';

// Importing your background image
import bgBanner from "../../assets/pe1.png"; 

const AlkaDropsPricing = () => {
  const pricingPlans = [
    {
      title: "Basic Monthly Plan",
      subText: "20 LITRE WATER BOTTLE SUPPLIERS IN BHUBANESWAR PRICE",
      price: "49",
      period: "MO",
      features: [
        { text: "Free 20 Litre Water Supply Near Me Home Delivery", icon: <FaTruck /> },
        { text: "Max 10 Water Jars / Month", icon: <FaWater /> },
        { text: "Empty Water Jar Pickup Included", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaCalendarAlt /> },
        { text: "Pure Mineral & Wellness Drinking Water", icon: <FaAward /> }
      ],
    },
    {
      title: "Annual Saver Plan",
      subText: "BEST MINERAL WATER WHOLESALE PRICE IN ODISHA",
      price: "99",
      period: "YR",
      features: [
        { text: "Free Delivery Across Bhubaneswar Areas", icon: <FaTruck /> },
        { text: "Max 10 Water Jars / Month", icon: <FaWater /> },
        { text: "Empty Jar Pickup Service", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaCalendarAlt /> },
        { text: "Top Packaged Drinking Water Quality", icon: <FaAward /> }
      ],
    },
    {
      title: "Advanced Family Plan",
      subText: "WELLNESS BEST DRINKING WATER IN BHUBANESWAR",
      price: "79",
      period: "MO",
      features: [
        { text: "Priority Drinking Water Supply in Bhubaneswar", icon: <FaTruck /> },
        { text: "Max 10 Water Jars / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaCalendarAlt /> },
        { text: "Certified Packaged Drinking Water Manufacturer", icon: <FaAward /> }
      ],
    }
  ];

  return (
    <section className="AlkaDropsPricing" id="pricing-plans">
      {/* Background banner wrapper */}
      <div 
        className="AlkaDropsPricing__banner-bg" 
        style={{ backgroundImage: `linear-gradient(rgba(0, 90, 180, 0.85), rgba(0, 90, 180, 0.95)), url(${bgBanner})` }}
        aria-hidden="true"
      />

      <div className="AlkaDropsPricing__content">
        <header className="AlkaDropsPricing__header">
          <span className="AlkaDropsPricing__subtitle">ALKA DROPS • CHOOSE YOUR HYDRATION PLAN</span>
          <h1 className="AlkaDropsPricing__title">20 Litre Water Bottle Suppliers in Bhubaneswar Pricing</h1>
          <div className="AlkaDropsPricing__wave" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <p className="AlkaDropsPricing__intro-text">
            Affordable drinking water supply plans by Alka Drops — top mineral water dealer and packaged drinking water manufacturer in Bhubaneswar, Odisha.
          </p>
        </header>

        <div className="AlkaDropsPricing__container">
          {pricingPlans.map((plan, index) => (
            <article className="AlkaDropsPricing__card" key={index}>
              <div className="AlkaDropsPricing__card-top">
                <h2 className="AlkaDropsPricing__plan-name">{plan.title}</h2>
                <span className="AlkaDropsPricing__plan-sub">{plan.subText}</span>
              </div>

              <div className="AlkaDropsPricing__price-circle-wrapper">
                <div className="AlkaDropsPricing__price-circle">
                  <span className="AlkaDropsPricing__currency">₹</span>
                  <span className="AlkaDropsPricing__amount">{plan.price}</span>
                  <div className="AlkaDropsPricing__period-badge">
                    {plan.period}
                  </div>
                </div>
              </div>

              <ul className="AlkaDropsPricing__features-list">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="AlkaDropsPricing__feature-item">
                    <span className="AlkaDropsPricing__feature-icon">{feature.icon}</span>
                    <span className="AlkaDropsPricing__feature-text">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="AlkaDropsPricing__action">
                <a 
                  href="tel:+917327092477" 
                  className="AlkaDropsPricing__button" 
                  aria-label={`Order ${plan.title} from Alka Drops Bhubaneswar water supply helpline`}
                >
                  ORDER NOW
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Visible Local SEO Information Block */}
        <div className="AlkaDropsPricing__seo-info" itemScope itemType="https://schema.org/LocalBusiness">
          <div className="AlkaDropsPricing__seo-info-content">
            <h3 itemProp="name">Alka Drops - Packaged Drinking Water Manufacturers in Bhubaneswar, Odisha</h3>
            <p>
              Looking for a <strong>20 litre water jar supplier near Bhubaneswar</strong> with <strong>drinking water supply near me home delivery</strong>? 
              Alka Drops provides premium mineral water at competitive wholesale prices across Nayapalli, IRC Village, and surrounding Bhubaneswar regions.
            </p>
            <div className="AlkaDropsPricing__contact-bar">
              <span className="AlkaDropsPricing__contact-item">
                <strong>Bhubaneswar Water Supply Helpline Number:</strong>{" "}
                <a href="tel:+917327092477" itemProp="telephone">+91 7327092477</a>
              </span>
              <span className="AlkaDropsPricing__contact-item" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <strong>Address:</strong> <span itemProp="streetAddress">Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli</span>, <span itemProp="addressLocality">Bhubaneswar</span>, <span itemProp="addressRegion">Odisha</span> <span itemProp="postalCode">751012</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlkaDropsPricing;