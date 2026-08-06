import React, { useState } from 'react';
import './HomeAboutCompany.css';

import imgTab1 from '../../assets/about-style1.jpg'; 
import imgTab2 from '../../assets/about-style2.jpg';

const HomeAboutCompany = () => {
  const [activeTab, setActiveTab] = useState(1);

  // 2. Updated data object to use your imported assets directly
  const tabData = {
    1: {
      title: "Family Owned & Operated for 30 Years",
      description: "We combine decades of local heritage with cutting-edge alkaline purification technology to deliver pure, mineral-rich hydration directly to homes and corporate offices.",
      image: imgTab1, 
    },
    2: {
      title: "Family Owned & Company Goal Values",
      description: "Our mission is simple: to make healthy, pH 8.5+ mineral water accessible across Odisha. Guided by strict multi-stage filtration protocols, eco-conscious delivery practices, and customer-first service, we set the standard for daily drinking water purity.",
      image: imgTab2,
    }
  };

  return (
    <section className="about-company-section">
      {/* Upper Layout Header Block */}
      <div className="about-header-container">
        <div className="header-left">
          <span className="sub-title">ABOUT COMPANY</span>
          <h2 className="main-heading">Spring water <br />to homes & businesses</h2>
        </div>
        
        {/* Certification Badge */}
        <div className="cert-badge-card">
          <div className="badge-icon-wrapper">
            <div className="ibwa-badge">
              <span className="badge-star">★</span>
              <span className="badge-text">IBWA CERTIFIED</span>
              <span className="badge-subtext">SERVING SINCE 1994</span>
            </div>
          </div>
          <div className="badge-content">
            <h3>NSF & IBWA <br />Certified Company</h3>
            <p>How all this mistaken denouncing pleasure & praising.</p>
          </div>
        </div>
      </div>

      {/* Interactive Tabs and Content Section */}
      <div className="tabs-main-wrapper">
        {/* Background Wave Accent Element */}
        <div className="wave-bg-pattern"></div>

        {/* Tab Headers */}
        <div className="tab-buttons-container">
          <button 
            className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            <span className="tab-num">01.</span>
            <span className="tab-label">STORY ABOUT<br />COMPANY</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            <span className="tab-num">02.</span>
            <span className="tab-label">COMPANY GOAL &<br />VALUES</span>
          </button>
        </div>

        {/* Tab Window Pane */}
        <div className="tab-content-panel">
          <div className="panel-image-side">
            <img 
              src={tabData[activeTab].image} 
              alt={tabData[activeTab].title} 
              className="fade-in-animation"
              key={activeTab} // Forces re-render fade animation on tab flip
            />
          </div>
          
          {/* Floating White Card over the Image */}
          <div className="panel-info-card">
            <h4 className="info-card-title">{tabData[activeTab].title}</h4>
            <div className="wave-divider">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="info-card-desc">{tabData[activeTab].description}</p>
            <button className="read-more-btn">
              <span className="arrow">➤</span> READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutCompany;