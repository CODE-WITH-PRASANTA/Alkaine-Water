import React from 'react';
import './Natural.css';
import waterImage from '../../assets/w.jpg'; 
import logoW from '../../assets/s1.png';    
import logoText from '../../assets/s2.png'; 

const Natural = () => {
  return (
    <section className="natural-container">
      <div className="natural-image-box">
        <img src={waterImage} alt="Natural Water" className="natural-image" />
        
        {/* Animated Logo Container */}
        <div className="logo-container">
          <img src={logoText} alt="Rotating Text" className="rotating-text" />
          <img src={logoW} alt="Center W" className="center-w" />
        </div>
      </div>
      
      <div className="natural-content">
        <h2 className="natural-title">
          Natural water with no additives or processing, created by nature
        </h2>
        <p className="natural-description">
          Clean, revitalizing drinking water should be accessible to everyone. At Alka Drops, we utilize safe, high-grade materials and advanced filtration technology to preserve the raw freshness of water down to the very last sip.
        </p>
        
        <div className="natural-features">
          <div className="feature-item">
            <span className="feature-number">01.</span>
            <span className="feature-text">Balance of taste and natural purity</span>
          </div>
          <div className="feature-item">
            <span className="feature-number">02.</span>
            <span className="feature-text">Your daily source of energy and freshness</span>
          </div>
          <div className="feature-item">
            <span className="feature-number">03.</span>
            <span className="feature-text">Drink easily. Drink naturally</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Natural;