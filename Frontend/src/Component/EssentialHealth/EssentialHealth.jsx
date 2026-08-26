import React, { useState } from 'react';
import { FaPlay, FaTint } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import './EssentialHealth.css';

import bgWaterGlass from "../../assets/wat9.jpg"; 
import videoThumbnail from "../../assets/wat7.jpg"; 

const EssentialHealth = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="EssentialHealth" id="essential-health">
      {/* Background Graphic */}
      <div 
        className="EssentialHealth-water-glass" 
        style={{ backgroundImage: `url(${bgWaterGlass})` }}
        aria-hidden="true"
      ></div>

      <div className="EssentialHealth-container">
        {/* Left SEO-Rich Content Block */}
        <div className="EssentialHealth-content">
          <header className="EssentialHealth-header">
            <span className="EssentialHealth-badge">Alka Drops • Bhubaneswar</span>
            <h1 className="EssentialHealth-title">
              Wellness & Best Drinking Water Supply in Bhubaneswar
            </h1>
          </header>

          <p className="EssentialHealth-description">
            Looking for top mineral water dealers and 20 litre water bottle suppliers in Bhubaneswar? 
            Alka Drops delivers 100% pure, mineral-rich packaged drinking water right to your doorstep at affordable wholesale prices.
          </p>

          <h2 className="EssentialHealth-subtitle">Key Benefits of Our Drinking Water Supply:</h2>
          
          <ul className="EssentialHealth-list">
            <li>
              <FaTint className="EssentialHealth-list-icon" aria-hidden="true" /> 
              <span>Carrying essential nutrients & oxygen for wellness</span>
            </li>
            <li>
              <FaTint className="EssentialHealth-list-icon" aria-hidden="true" /> 
              <span>Aiding digestion & body hydration balance</span>
            </li>
            <li>
              <FaTint className="EssentialHealth-list-icon" aria-hidden="true" /> 
              <span>Normalizing blood pressure & heart function</span>
            </li>
            <li>
              <FaTint className="EssentialHealth-list-icon" aria-hidden="true" /> 
              <span>20 litre water supply near me with fast home delivery</span>
            </li>
          </ul>

          {/* Action Callouts & Helpline */}
          <div className="EssentialHealth-action-area">
            <div className="EssentialHealth-btn-wrapper">
              <a href="tel:+917327092477" className="EssentialHealth-btn" aria-label="Call Bhubaneswar water supply helpline number">
                <span>ORDER NOW</span>
                <span className="EssentialHealth-btn-droplet"></span>
              </a>
            </div>
            
            <div className="EssentialHealth-contact-info">
              <span className="EssentialHealth-helpline-label">Bhubaneswar Helpline Number:</span>
              <a href="tel:+917327092477" className="EssentialHealth-phone">+91 7327092477</a>
            </div>
          </div>

          {/* Hidden Microdata for Local SEO */}
          <div style={{ display: 'none' }} itemScope itemType="https://schema.org/LocalBusiness">
            <span itemProp="name">Alka Drops</span>
            <span itemProp="telephone">+91 7327092477</span>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <span itemProp="streetAddress">Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli</span>
              <span itemProp="addressLocality">Bhubaneswar</span>
              <span itemProp="addressRegion">Odisha</span>
              <span itemProp="postalCode">751012</span>
            </div>
          </div>
        </div>

        {/* Right Video Thumbnail Block */}
        <div className="EssentialHealth-video-wrapper">
          <div className="EssentialHealth-thumbnail-card">
            <img 
              src={videoThumbnail} 
              alt="Alka Drops packaged drinking water 20 litre water jar supplier near Bhubaneswar" 
              className="EssentialHealth-thumbnail"
              loading="lazy"
            />
            <button 
              className="EssentialHealth-play-btn" 
              onClick={() => setIsVideoOpen(true)} 
              aria-label="Play video showing packaged drinking water manufacturers process in Odisha"
            >
              <div className="EssentialHealth-play-outer">
                <FaPlay className="EssentialHealth-play-icon" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="EssentialHealth-modal" onClick={() => setIsVideoOpen(false)}>
          <div className="EssentialHealth-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="EssentialHealth-modal-close" 
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close modal video"
            >
              <IoClose />
            </button>
            <div className="EssentialHealth-iframe-container">
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Alka Drops 20 Litre Water Bottle Delivery in Bhubaneswar" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EssentialHealth;