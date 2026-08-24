import React from 'react';
import './Natural.css';
import waterImage from '../../assets/w.jpg'; 
import logoW from '../../assets/s1.png';    
import logoText from '../../assets/s2.png'; 

const Natural = () => {
  return (
    <section className="natural-container" aria-labelledby="natural-heading">
      <div className="natural-image-box">
        <img 
          src={waterImage} 
          alt="Packaged drinking water and 20 litre water bottle delivery in Bhubaneswar" 
          className="natural-image" 
        />
        
        {/* Animated Logo Container */}
        <div className="logo-container">
          <img src={logoText} alt="Rotating Text" className="rotating-text" />
          <img src={logoW} alt="Center W" className="center-w" />
        </div>
      </div>
      
      <div className="natural-content">
        <h1 id="natural-heading" className="natural-title">
          Best Packaged Drinking Water Suppliers in Bhubaneswar
        </h1>

        <p className="natural-description">
          Alka Drops provides fresh, mineral-rich drinking water with reliable doorstep delivery across Bhubaneswar. From daily 20-litre water jars for households and offices to bulk supply at competitive manufacturer prices, we ensure clean, healthy, and natural taste in every drop.
        </p>
        
        <div className="natural-features">
          <div className="feature-item">
            <span className="feature-number">01.</span>
            <div className="feature-details">
              <strong className="feature-text">20 Litre Water Bottle Home Delivery</strong>
              <p className="feature-subtext">Fast and dependable doorstep supply across Nayapalli and all localities in Bhubaneswar.</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-number">02.</span>
            <div className="feature-details">
              <strong className="feature-text">Pure & Mineral-Balanced Quality</strong>
              <p className="feature-subtext">Advanced multi-stage purification that retains essential minerals for daily wellness.</p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-number">03.</span>
            <div className="feature-details">
              <strong className="feature-text">Wholesale Rates & Commercial Supply</strong>
              <p className="feature-subtext">Affordable pricing for corporate offices, events, and recurring bulk requirements in Odisha.</p>
            </div>
          </div>
        </div>

        {/* NAP Block */}
        <div className="nap-container" itemScope itemType="https://schema.org/LocalBusiness">
          <div className="nap-item">
            <span className="nap-label">Name:</span>
            <span className="nap-value" itemProp="name">Alka Drops</span>
          </div>
          <div className="nap-item">
            <span className="nap-label">Address:</span>
            <span className="nap-value" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli</span>,{' '}
              <span itemProp="addressLocality">Bhubaneswar</span>,{' '}
              <span itemProp="addressRegion">Odisha</span>{' '}
              <span itemProp="postalCode">751012</span>
            </span>
          </div>
          <div className="nap-item">
            <span className="nap-label">Ph No:</span>
            <a href="tel:+917327092477" className="nap-link" itemProp="telephone">+91 7327092477</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Natural;