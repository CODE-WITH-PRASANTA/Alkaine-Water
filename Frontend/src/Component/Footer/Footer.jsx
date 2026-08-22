// Footer.jsx
import React from 'react';
import './Footer.css';
import logo from '../../assets/ALKA DROPS LOGO.png'; // Replace with your exact logo file path

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        {/* Column 1: Brand Info */}
        <div className="footer-column brand-col">
          <div className="footer-logo-area">
            <img src={logo} alt="Aguapure Logo" className="footer-logo-img" />
            
          </div>
          <p className="footer-description">
            Providing fresh, ultra-pure water solutions tailored to your household and commercial needs. Clean water, simplified.
          </p>
          <ul className="footer-features">
            <li className="footer-feature-item">
              <span className="footer-check-icon">✓</span> Free Delivery
            </li>
            <li className="footer-feature-item">
              <span className="footer-check-icon">✓</span> Secure Payment Options
            </li>
          </ul>
        </div>

        {/* Column 2: Classy Useful Links */}
        <div className="footer-column">
          <h3 className="footer-heading">Useful Links</h3>
         
          <ul className="footer-links">
            <li className="footer-link-item"><a href="/about">Our Team</a></li>
            <li className="footer-link-item"><a href="/services">System Repair</a></li>
            <li className="footer-link-item"><a href="/pricing">Pricing & Plans</a></li>
            <li className="footer-link-item"><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Locations */}
        <div className="footer-column">
          <h3 className="footer-heading">Locations</h3>
          <div className="footer-address">
            <strong>California Office</strong>
            <br />
            280 Granite Run Drive
            <br />
            Suite #200 Lancaster, PA 1760 
          </div>
          <div className="footer-contact-info">
            <a href="tel:1-800-500-333-33">1-800-500-333-33</a>
            <a href="mailto:support@example.com">support@example.com</a>
          </div>
        </div>

        {/* Column 4: Business Hours */}
        <div className="footer-column">
          <h3 className="footer-heading">Business Hours</h3>
         
          
          <div className="footer-hours-block">
            <div className="footer-hours-days">Mon - Friday:</div>
            <div className="footer-hours-time">08.00 am to 08.00 pm</div>
          </div>
          
          <div className="footer-hours-block">
            <div className="footer-hours-days">Saturday:</div>
            <div className="footer-hours-time">09.00 am to 03.00 pm</div>
          </div>

          <button className="footer-schedule-btn">Schedule</button>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          Copyright © 2026 Developed by PR WEBSTOCK


        </div>
        <div className="footer-bottom-links">
          <a href="/terms">Terms & Conditions</a>
          <span>_</span>
          <a href="/privacy">Privacy Policy</a>
          <span>_</span>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;