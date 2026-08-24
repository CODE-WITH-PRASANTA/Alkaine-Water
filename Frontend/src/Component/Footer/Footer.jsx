import React from 'react';
import './Footer.css';
import logo from "../../assets/ALKA DROPS LOGO.png"; // Replace with your exact logo file path
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Animated ambient background layers */}
      <div className="ambient-background">
        <div className="footer-glow glow-one" />
        <div className="footer-glow glow-two" />
        <div className="footer-glow glow-three" />
      </div>

      <div className="footer-main">
        {/* Column 1: Brand Info */}
        <div className="footer-column brand-col" style={{ animationDelay: '0.1s' }}>
          <div className="footer-logo-area">
            <img src={logo} alt="Alka Drops Logo" className="footer-logo-img" />
          </div>
          <p className="footer-description">
            Providing fresh, ultra-pure water solutions tailored to your household and commercial needs. Clean water, elevated.
          </p>
          <ul className="footer-features">
            <li className="footer-feature-item">
              <FaCheckCircle className="footer-check-icon" /> <span>Free Delivery Nationwide</span>
            </li>
            <li className="footer-feature-item">
              <FaCheckCircle className="footer-check-icon" /> <span>100% Secure Payment</span>
            </li>
          </ul>

          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="footer-column" style={{ animationDelay: '0.2s' }}>
          <h3 className="footer-heading">Useful Links</h3>
          <div className="animated-line"></div>
          <ul className="footer-links">
            <li className="footer-link-item"><a href="/about"><FaArrowRight className="link-arrow" /> Our Team</a></li>
            <li className="footer-link-item"><a href="/services"><FaArrowRight className="link-arrow" /> System Repair</a></li>
            <li className="footer-link-item"><a href="/pricing"><FaArrowRight className="link-arrow" /> Pricing &amp; Plans</a></li>
            <li className="footer-link-item"><a href="/contact"><FaArrowRight className="link-arrow" /> Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Locations */}
        <div className="footer-column" style={{ animationDelay: '0.3s' }}>
          <h3 className="footer-heading">Locations</h3>
          <div className="animated-line"></div>

          <div className="footer-info-row">
            <div className="icon-wrapper"><FaMapMarkerAlt className="footer-info-icon" /></div>
            <div className="footer-address">
              <strong>California Headquarters</strong>
              <br />
              280 Granite Run Drive
              <br />
              Suite #200 Lancaster, PA 1760
            </div>
          </div>

          <div className="footer-info-row">
            <div className="icon-wrapper"><FaPhoneAlt className="footer-info-icon" /></div>
            <a href="tel:1-800-500-333-33" className="footer-contact-link">1-800-500-333-33</a>
          </div>

          <div className="footer-info-row">
            <div className="icon-wrapper"><FaEnvelope className="footer-info-icon" /></div>
            <a href="mailto:support@alkadrops.com" className="footer-contact-link">support@alkadrops.com</a>
          </div>
        </div>

        {/* Column 4: Business Hours */}
        <div className="footer-column" style={{ animationDelay: '0.4s' }}>
          <h3 className="footer-heading">Business Hours</h3>
          <div className="animated-line"></div>

          <div className="footer-hours-block">
            <div className="icon-wrapper"><FaClock className="footer-info-icon" /></div>
            <div>
              <div className="footer-hours-days">Mon - Friday</div>
              <div className="footer-hours-time">08.00 AM to 08.00 PM</div>
            </div>
          </div>

          <div className="footer-hours-block">
            <div className="icon-wrapper"><FaClock className="footer-info-icon" /></div>
            <div>
              <div className="footer-hours-days">Saturday</div>
              <div className="footer-hours-time">09.00 AM to 03.00 PM</div>
            </div>
          </div>

          <button className="footer-schedule-btn">
            <span>Schedule Now</span>
            <FaArrowRight className="btn-arrow" />
          </button>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          Copyright © {new Date().getFullYear()} Developed by <span className="brand-highlight">PR WEBSTOCK</span>
        </div>
        <div className="footer-bottom-links">
          <a href="/terms">Terms &amp; Conditions</a>
          <span className="divider-dot">•</span>
          <a href="/privacy">Privacy Policy</a>
          <span className="divider-dot">•</span>
          <a href="/sitemap">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;