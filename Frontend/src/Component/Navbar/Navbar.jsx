import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/ALKA DROPS LOGO.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  // Close dropdown on click outside (Desktop)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled-state' : 'hero-state'}`}>
      <nav className="navbar" aria-label="Main Navigation">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeAllMenus}>
          <img src={logo} alt="Alka Drops Logo" className="navbar-logo" />
        </Link>

        {/* Dynamic Navigation Links Block / Mobile Drawer */}
        <div className={`navbar-menu-container ${isMobileMenuOpen ? 'is-open' : ''}`}>
          <ul className="navbar-menu">
            <li className="navbar-item">
              <NavLink
                to="/"
                className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                onClick={closeAllMenus}
                end
              >
                Home
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                onClick={closeAllMenus}
              >
                About
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/pricing"
                className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                onClick={closeAllMenus}
              >
                Subscription
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/shop"
                className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                onClick={closeAllMenus}
              >
                Shop
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/services"
                className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                onClick={closeAllMenus}
              >
                Services
              </NavLink>
            </li>

            {/* Dropdown Menu */}
            <li 
              ref={dropdownRef}
              className={`navbar-item navbar-has-dropdown ${isDropdownOpen ? 'dropdown-active' : ''}`}
            >
              <button
                type="button"
                className="navbar-link navbar-dropdown-toggle"
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <span>More</span>
                <svg className="navbar-arrow" width="12" height="7" viewBox="0 0 12 7" fill="none">
                  <path d="M1 1.5L6 5.5L11 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <ul className={`navbar-dropdown ${isDropdownOpen ? 'show' : ''}`}>
                <li className="navbar-dropdown-item">
                  <Link to="/blog" onClick={closeAllMenus}>Blog</Link>
                </li>
                <li className="navbar-dropdown-item">
                  <Link to="/faq" onClick={closeAllMenus}>FAQs</Link>
                </li>
                <li className="navbar-dropdown-item">
                  <Link to="/team" onClick={closeAllMenus}>Our Team</Link>
                </li>
                <li className="navbar-dropdown-item">
                  <Link to="/gallery" onClick={closeAllMenus}>Gallery</Link>
                </li>
                <li className="navbar-dropdown-item">
                  <Link to="/testimonials" onClick={closeAllMenus}>Testimonials</Link>
                </li>
              </ul>
            </li>

            <li className="navbar-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => `navbar-link ${isActive ? 'active-link' : ''}`}
                onClick={closeAllMenus}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Mobile Primary Call To Action */}
          <div className="navbar-mobile-actions">
            <button
              type="button"
              className="navbar-btn-primary full-width"
              onClick={() => {
                navigate('/shop');
                closeAllMenus();
              }}
            >
              Order Now
            </button>
          </div>
        </div>

        {/* Right Desktop Actions & Mobile Cart */}
        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-icon-btn"
            onClick={() => {
              navigate('/cart');
              closeAllMenus();
            }}
            aria-label="View Shopping Cart"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>

          <button
            type="button"
            className="navbar-btn-primary hide-on-mobile"
            onClick={() => {
              navigate('/shop');
              closeAllMenus();
            }}
          >
            Order Now
          </button>

          {/* Mobile Toggle Hamburger Button */}
          <button
            type="button"
            className={`navbar-toggle ${isMobileMenuOpen ? 'is-open' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Dimmed Backdrop overlay for mobile drawer */}
      {isMobileMenuOpen && <div className="navbar-backdrop" onClick={closeAllMenus} />}
    </header>
  );
};

export default Navbar;