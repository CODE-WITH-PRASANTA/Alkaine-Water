import React from 'react';
import './EnergySources.css';
import bulbsImage from '../../assets/bulbs.jpg'; 

const EnergySources = () => {
  const benefits = [
    "Energy Boost", "Strong Immunity", "Weight Support",
    "Healthy Skin", "Mood Balance", "Better Sleep",
    "Heart Health", "Longevity", "Good Digestion", "Bone Strength"
  ];

  return (
    <section className="energy-container">
      {/* Left Column */}
      <div className="energy-text-section">
        <h1 className="energy-title">
          Best Drinking Water Supply in Bhubaneswar — Pure, Oxygenated & Mineral-Rich
        </h1>
        <p className="energy-subtitle">
          Alka Drops delivers certified packaged drinking water and 20 litre water jars directly to homes and offices across Bhubaneswar, Odisha.
        </p>

        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-item">
              <span className="checkmark">✓</span> {item}
            </div>
          ))}
        </div>

        <div className="cta-wrapper">
          <a href="tel:+917327092477" className="read-more-btn">
            Order Home Delivery: +91 7327092477
          </a>
        </div>

        {/* Local NAP details */}
        <address className="nap-info">
          <strong>Alka Drops</strong> — Packaged Drinking Water Plant<br />
          Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli, Bhubaneswar, Odisha 751012<br />
          Helpline / Wholesale Orders: <a href="tel:+917327092477">+91 7327092477</a>
        </address>
      </div>

      {/* Right Column (Grid of Cards) */}
      <div className="cards-grid">
        <div className="card white-card">
          <h3>Ca2+</h3>
          <p className="mg-level">15-70 mg/l</p>
          <p className="description">Essential calcium strengthens bones, teeth, and naturally balances water softness.</p>
        </div>

        <div className="card red-card">
          <h3>Mg2+</h3>
          <p className="mg-level">5.2-43 mg/l</p>
          <p className="description">Active magnesium supports cardiovascular function and muscle recovery.</p>
        </div>

        {/* Enhanced Bubble Card */}
        <div className="card bubble-card">
          <img 
            src={bulbsImage} 
            alt="Oxygenated packaged drinking water supply in Bhubaneswar" 
            className="bubble-bg-img" 
          />
          <div className="bubble-animation-overlay"></div>
          <div className="bubble-card-text">
            <h3>H2O Purity</h3>
            <p className="description">Multi-stage filtered, oxygenated 20 litre jar delivery.</p>
          </div>
        </div>

        <div className="card white-card">
          <h3>Na+</h3>
          <p className="mg-level">5-50 mg/l</p>
          <p className="description">Optimized sodium levels maintain proper hydration and electrolyte balance.</p>
        </div>
      </div>
    </section>
  );
};

export default EnergySources;