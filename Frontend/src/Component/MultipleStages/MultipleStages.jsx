import React from 'react';
import './MultipleStages.css';
import mountainImage from '../../assets/m1.jpg';

const stats = [
  { 
    value: "10-Stage", 
    title: "Purification Process", 
    desc: "Advanced RO, UV, and ozonation to ensure 100% pure, mineral-rich drinking water." 
  },
  { 
    value: "25k+", 
    title: "Jars Delivered Monthly", 
    desc: "Reliable 20 litre water jar home delivery across Nayapalli and Bhubaneswar." 
  },
  { 
    value: "100%", 
    title: "BIS & FSSAI Certified", 
    desc: "Tested daily for safety, balanced pH, and natural mineral retention." 
  },
  { 
    value: "1500+", 
    title: "Homes & Offices Served", 
    desc: "Trusted mineral water supplier for families, events, and corporate hubs in Odisha." 
  }
];

const MultipleStages = () => {
  return (
    <section className="ms-container" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="ms-header">
        <h1 className="ms-title" itemProp="name">
          Alka Drops: Best <span className="ms-highlight">Packaged Drinking Water</span> Suppliers in Bhubaneswar
        </h1>
        <p className="ms-subtitle">
          Leading 20 litre water bottle suppliers in Bhubaneswar. We provide pure, multi-stage purified mineral water jar delivery to homes and offices at wholesale prices.
        </p>
      </div>

      <div className="ms-image-wrapper">
        <img 
          src={mountainImage} 
          alt="Alka Drops Multi-Stage Drinking Water Purification in Bhubaneswar Odisha" 
          className="ms-mountain-img" 
        />
      </div>

      <div className="ms-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="ms-stat-card">
            <h3 className="ms-stat-value">{stat.value}</h3>
            <p className="ms-stat-title">{stat.title}</p>
            <div className="ms-divider"></div>
            <p className="ms-stat-desc">{stat.desc}</p>
          </div>
        ))}
      </div>

      {/* NAP & Local Helpline Section */}
      <div className="ms-nap-wrapper">
        <div className="ms-nap-card">
          <h2 className="ms-nap-heading">Order Drinking Water Supply Near You</h2>
          <div 
            className="ms-address" 
            itemProp="address" 
            itemScope 
            itemType="https://schema.org/PostalAddress"
          >
            <p>
              <span itemProp="streetAddress">Plot-N5/22, Main Street, Block N5, IRC Village</span>,{' '}
              <span itemProp="addressLocality">Nayapalli, Bhubaneswar</span>,{' '}
              <span itemProp="addressRegion">Odisha</span> - <span itemProp="postalCode">751012</span>
            </p>
          </div>
          <div className="ms-contact">
            <span className="ms-helpline-label">Bhubaneswar Water Supply Helpline Number:</span>
            <a href="tel:+917327092477" className="ms-phone" itemProp="telephone">
              +91 7327092477
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MultipleStages;