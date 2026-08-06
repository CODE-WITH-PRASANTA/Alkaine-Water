import React, { useState } from 'react';
import './Informationpricing.css';

const Informationpricing = () => {
  // अकोर्डियन आइटम्स के ओपन/क्लोज स्टेट को मैनेज करने के लिए
  const [openFaq, setOpenFaq] = useState({ section: null, index: null });

  const toggleAccordion = (section, index) => {
    if (openFaq.section === section && openFaq.index === index) {
      setOpenFaq({ section: null, index: null });
    } else {
      setOpenFaq({ section, index });
    }
  };

  const generalFaqs = [
    "Is it possible to pay for an order with Visa and MasterCard payment cards?",
    "What payment methods exist in your company?",
    "Can I return the product after purchase?",
    "How do I use a promotional code?",
    "What is the validity period of the gift certificate?",
    "Can I return the product after purchase?"
  ];

  const pricingFaqs = [
    "Where and how can I exchange or refund?",
    "Is it possible to pay for an order with Visa and MasterCard payment cards?",
    "Is it possible to pay by credit card?",
    "What payment methods exist in your company?",
    "Can I return the product after purchase?"
  ];

  return (
    <div className="info-pricing-container">
      
      {/* सेक्शन 1: General Information */}
      <section className="info-section">
        <div className="info-left-panel">
          <h2 className="info-main-heading">Every day help for our customers</h2>
          <p className="info-description">
            We use advanced multi-stage purification and strict quality controls to ensure every drop of water is safe, mineral-rich, and refreshed. From daily household needs to large commercial orders, we bring pure hydration straight to your doorstep.
          </p>
          
          <ul className="info-features-list">
            <li><span className="checkmark">✓</span>Doorstep Delivery </li>
            <li><span className="checkmark">✓</span>Quality Testing </li>
            <li><span className="checkmark">✓</span> Custom Subscriptions</li>
            <li><span className="checkmark">✓</span> Bulk Water Solutions</li>
          </ul>

          <h3 className="info-sub-heading">If you need more help</h3>
          <p className="info-sub-description">
           We take pride in setting high standards for drinking water purity across Odisha. Every jar and bottle undergoes automated cleaning, UV treatment, and precise mineral balancing so you can drink with complete peace of mind.
          </p>
        </div>

        <div className="info-right-panel">
          <h2 className="section-title">General Information</h2>
          <div className="accordion-group">
            {generalFaqs.map((faq, index) => (
              <div key={index} className="accordion-item">
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion('general', index)}
                >
                  <span className={`toggle-icon ${openFaq.section === 'general' && openFaq.index === index ? 'active' : ''}`}>
                    {openFaq.section === 'general' && openFaq.index === index ? '−' : '+'}
                  </span>
                  <span className="faq-question">{faq}</span>
                </button>
                {openFaq.section === 'general' && openFaq.index === index && (
                  <div className="accordion-content">
                    <p>This is a placeholder answer for this frequently asked question. You can modify this text with actual informative content later.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* सेक्शन 2: Pricing & Payment */}
      <section className="info-section pricing-section">
        <div className="info-left-panel center-btn-panel">
          {/* आपकी मांग के अनुसार नीले रंग (Blue Color) में बदला गया Read More बटन */}
          <button className="read-more-btn-blue">Read More</button>
        </div>

        <div className="info-right-panel">
          <h2 className="section-title">Pricing & Payment</h2>
          <div className="accordion-group">
            {pricingFaqs.map((faq, index) => (
              <div key={index} className="accordion-item">
                <button 
                  className="accordion-header" 
                  onClick={() => toggleAccordion('pricing', index)}
                >
                  <span className={`toggle-icon ${openFaq.section === 'pricing' && openFaq.index === index ? 'active' : ''}`}>
                    {openFaq.section === 'pricing' && openFaq.index === index ? '−' : '+'}
                  </span>
                  <span className="faq-question">{faq}</span>
                </button>
                {openFaq.section === 'pricing' && openFaq.index === index && (
                  <div className="accordion-content">
                    <p>This is a placeholder answer regarding pricing or payments. Please replace it with actual workflow details as required.</p>
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