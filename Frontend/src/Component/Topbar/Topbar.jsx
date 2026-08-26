import React from 'react';
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">
        {/* Left Section */}
        <div className="topbar-left">
          <span className="topbar-delivery hide-on-mobile">
            Immediate Delivery
          </span>
          
          <span className="topbar-divider hide-on-mobile">|</span>
          
          <a href="tel:1-800-500-333-33" className="topbar-item topbar-phone">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            <span>1-800-500-333-33</span>
          </a>
          
          <span className="topbar-divider hide-on-tablet">|</span>
          
          <span className="topbar-item topbar-hours hide-on-tablet">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Mon - Fri: 08.00 to 08.00</span>
          </span>
        </div>

        {/* Right Section */}
        <div className="topbar-right">
          <a href="mailto:info@example.com" className="topbar-item topbar-email">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>info@example.com</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;