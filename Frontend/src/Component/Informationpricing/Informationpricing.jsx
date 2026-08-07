import React, { useState } from 'react';
import './Informationpricing.css';

const Informationpricing = () => {
  const [openFaq, setOpenFaq] = useState({ section: null, index: null });

  const toggleAccordion = (section, index) => {
    if (openFaq.section === section && openFaq.index === index) {
      setOpenFaq({ section: null, index: null });
    } else {
      setOpenFaq({ section, index });
    }
  };

  // Short & High-Rank SEO FAQs for Bhubaneswar
  const generalFaqs = [
    {
      q: "Which is the best drinking water delivery company in Bhubaneswar?",
      a: "We are Bhubaneswar's leading mineral water supplier, providing 100% pure, multi-stage RO + UV purified 20L jars directly to homes and offices."
    },
    {
      q: "How fast is doorstep water jar delivery in Bhubaneswar?",
      a: "We offer same-day and scheduled doorstep water delivery across all major locations in Bhubaneswar including Patia, Jaydev Vihar, Saheed Nagar, and Khandagiri."
    },
    {
      q: "Are your 20-liter water jars hygienic and safe?",
      a: "Yes, every 20L jar undergoes 5-step automated cleaning, UV treatment, and strict quality tests before delivery."
    },
    {
      q: "Do you supply bulk water for corporate offices and events in Bhubaneswar?",
      a: "Yes, we provide reliable bulk water supply for corporate offices, marriages, and events at affordable wholesale rates."
    }
  ];

  const pricingFaqs = [
    {
      q: "What is the cost of a 20L drinking water jar in Bhubaneswar?",
      a: "Our water jars are priced competitively with zero delivery charges. We also offer discounted rates on monthly subscription plans."
    },
    {
      q: "What payment options are available for online water orders?",
      a: "You can pay easily via UPI (PhonePe, Google Pay), Debit/Credit Cards, Net Banking, or Cash on Delivery (COD)."
    },
    {
      q: "Is there a deposit fee for new 20L water jar containers?",
      a: "A minimal refundable deposit is required for new jars, which is 100% returned when you return the containers."
    },
    {
      q: "How do I start or pause my daily water delivery subscription?",
      a: "You can start, pause, or change your delivery schedule anytime with a simple call or message to our local Bhubaneswar support team."
    }
  ];

  return (
    <div className="info-pricing-container">
      
      {/* SECTION 1: General Information */}
      <section className="info-section">
        <div className="info-left-panel">
          <h2 className="info-main-heading">Best Drinking Water Delivery Company in Bhubaneswar</h2>
          <p className="info-description">
            Get pure, healthy, and mineral-balanced drinking water delivered straight to your home or office. We are Bhubaneswar's most trusted water supply brand, powered by advanced RO + UV purification.
          </p>
          
          <ul className="info-features-list">
            <li><span className="checkmark">✓</span> Express Doorstep Delivery in Bhubaneswar</li>
            <li><span className="checkmark">✓</span> 100% Pure RO + UV Mineral Water</li>
            <li><span className="checkmark">✓</span> Flexible Home & Office Subscriptions</li>
            <li><span className="checkmark">✓</span> Affordable Bulk Supply for Events</li>
          </ul>

          <h3 className="info-sub-heading">Pure Hydration You Can Trust</h3>
          <p className="info-sub-description">
            Every 20L jar and bottle undergoes automated high-pressure washing and strict purity checks, ensuring clean and safe water for families across Bhubaneswar.
          </p>
        </div>

        <div className="info-right-panel">
          <h2 className="section-title">General Information</h2>
          <div className="accordion-group">
            {generalFaqs.map((item, index) => (
              <div key={index} className="accordion-item">
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion('general', index)}
                >
                  <span className={`toggle-icon ${openFaq.section === 'general' && openFaq.index === index ? 'active' : ''}`}>
                    {openFaq.section === 'general' && openFaq.index === index ? '−' : '+'}
                  </span>
                  <span className="faq-question">{item.q}</span>
                </button>
                {openFaq.section === 'general' && openFaq.index === index && (
                  <div className="accordion-content">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Pricing & Payment */}
      <section className="info-section pricing-section">
        <div className="info-left-panel center-btn-panel">
          <button className="read-more-btn-blue">Read More</button>
        </div>

        <div className="info-right-panel">
          <h2 className="section-title">Pricing & Payment</h2>
          <div className="accordion-group">
            {pricingFaqs.map((item, index) => (
              <div key={index} className="accordion-item">
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion('pricing', index)}
                >
                  <span className={`toggle-icon ${openFaq.section === 'pricing' && openFaq.index === index ? 'active' : ''}`}>
                    {openFaq.section === 'pricing' && openFaq.index === index ? '−' : '+'}
                  </span>
                  <span className="faq-question">{item.q}</span>
                </button>
                {openFaq.section === 'pricing' && openFaq.index === index && (
                  <div className="accordion-content">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Informationpricing;