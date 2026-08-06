import React from 'react';
import './EnergySources.css';
// Assuming bulbs.jpg is in the same directory, or adjust the path as needed.
import bulbsImage from '../../assets/bulbs.jpg'; 

const EnergySources = () => {
  const benefits = [
     "Energy Boost", "Strong Immunity", "Weight Support",
     "Healthy Skin", "Mood Balance","Better Sleep",
     "Heart Health", "Longevity", "Good Digestion", "Bone Strength"
   
  ];

  return (
    <section className="energy-container">
      {/* Left Column */}
      <div className="energy-text-section">
        <h2 className="energy-title">Oxygenated, mineral-rich Alka Drops work in harmony with your body for total wellness</h2>
        <div className="benefits-grid">
          {benefits.map((item, index) => (
            <div key={index} className="benefit-item">
              <span className="checkmark">✓</span> {item}
            </div>
          ))}
        </div>
        <button className="read-more-btn">Read More</button>
      </div>

      {/* Right Column (Grid of Cards) */}
      <div className="cards-grid">
        <div className="card white-card">
          <h3>Ca2+</h3>
          <p className="mg-level">15-70 mg/l</p>
          <p className="description">Strengthens bones and teeth and affects the softness of water</p>
        </div>

        <div className="card red-card">
          <h3>Mg2+</h3>
          <p className="mg-level">5.2-43 mg/l</p>
          <p className="description">Magnesium supports the functioning of the heart and muscles</p>
        </div>

        {/* Enhanced Bubble Card */}
        <div className="card bubble-card">
          {/* Static background image from bulbs.jpg */}
          <img 
            src={bulbsImage} 
            alt="Water bubbles background" 
            className="bubble-bg-img" 
          />
          {/* Dynamic animated bubble overlay */}
          <div className="bubble-animation-overlay"></div>
          {/* Optional text overlay to provide context */}
          <div className="bubble-card-text">
            <h3>H2O Purity</h3>
            <p className="description">Crystal clear and oxygenated</p>
          </div>
        </div>

        <div className="card white-card">
          <h3>Na+</h3>
          <p className="mg-level">5-50 mg/l</p>
          <p className="description">Sodium is necessary for fluid balance in the body</p>
        </div>
      </div>
    </section>
  );
};

export default EnergySources;