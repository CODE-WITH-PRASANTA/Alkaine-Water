import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/ALKA DROPS LOGO.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar-wrapper ${isScrolled ? 'scrolled-state' : 'hero-state'}`}>
      <div className="navbar">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <img src={logo} alt="Alka Drops Logo" className="navbar-logo" />
        </Link>

        {/* Dynamic Navigation Links Block */}
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'is-open' : ''}`}>
          {/* Home */}
          <li className="navbar-item">
            <NavLink
              to="/"
              className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
              onClick={closeMobileMenu}
              end
            >
              Home
            </NavLink>
          </li>

          {/* About */}
          <li className="navbar-item">
            <NavLink
              to="/about"
              className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
              onClick={closeMobileMenu}
            >
              About
            </NavLink>
          </li>

          {/* Pricing / Subscription */}
          <li className="navbar-item">
            <NavLink
              to="/pricing"
              className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
              onClick={closeMobileMenu}
            >
              Subscription
            </NavLink>
          </li>

          {/* Shop */}
          <li className="navbar-item">
            <NavLink
              to="/shop"
              className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
              onClick={closeMobileMenu}
            >
              Shop
            </NavLink>
          </li>

          {/* Services */}
          <li className="navbar-item">
            <NavLink
              to="/services"
              className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
              onClick={closeMobileMenu}
            >
              Services
            </NavLink>
          </li>

          {/* More Dropdown */}
          <li className="navbar-item navbar-has-dropdown">
            <span className="navbar-link navbar-dropdown-toggle">
              More <span className="navbar-arrow">▼</span>
            </span>
            <ul className="navbar-dropdown">
              <li className="navbar-dropdown-item">
                <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
              </li>
              <li className="navbar-dropdown-item">
                <Link to="/faq" onClick={closeMobileMenu}>FAQs</Link>
              </li>
              <li className="navbar-dropdown-item">
                <Link to="/team" onClick={closeMobileMenu}>Our Team</Link>
              </li>
              <li className="navbar-dropdown-item">
                <Link to="/gallery" onClick={closeMobileMenu}>Gallery</Link>
              </li>
              <li className="navbar-dropdown-item">
                <Link to="/testimonials" onClick={closeMobileMenu}>Testimonials</Link>
              </li>
            </ul>
          </li>

          {/* Contact */}
          <li className="navbar-item">
            <NavLink
              to="/contact"
              className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
              onClick={closeMobileMenu}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Section Actions */}
        <div className="navbar-actions">
          {/* Cart Icon / Action */}
          <button
            type="button"
            className="navbar-search-btn"
            onClick={() => {
              navigate('/cart');
              closeMobileMenu();
            }}
            aria-label="View Shopping Cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>

          {/* Order / Checkout Action */}
          <button
            type="button"
            className="navbar-order-btn"
            onClick={() => {
              navigate('/shop');
              closeMobileMenu();
            }}
          >
            Order Now
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={`navbar-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;