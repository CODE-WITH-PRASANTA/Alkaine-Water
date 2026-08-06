import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ClipboardList,
  MapPin,
  Users,
  Truck,
  RotateCcw,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  CalendarPlus, // Leave Apply
  FileText,     // Leave Request
  X,            // Mobile close icon
  User          // Profile icon (replaced duplicate Settings)
} from "lucide-react";
import './Sidebar.css';
import { FaWineBottle } from 'react-icons/fa';

const Sidebar = ({ isCollapsed, isMobileOpen, onLogout, onClose }) => {
  // Navigation items configuration
  const menuItems = [
    { type: 'link', icon: <Home size={20} />, text: 'Dashboard', path: '/' },
    { type: 'link', icon: <ClipboardList size={20} />, text: 'Orders', path: '/wdms/orders' },
    { type: 'link', icon: <MapPin size={20} />, text: 'Route Planner', path: '/wdms/route-planner' },
    { type: 'link', icon: <Users size={20} />, text: 'Customers', path: '/wdms/customers' },
    { type: 'link', icon: <Truck size={20} />, text: 'Vehicle Stock', path: '/wdms/vehicle-stock' },
    { type: 'link', icon: <RotateCcw size={20} />, text: 'Empty Return', path: '/wdms/empty-return' },
    { type: 'link', icon: <FaWineBottle size={20} />, text: 'Extra Stock', path: '/wdms/extra-stock' },

    // Leave Management items
    { type: 'link', icon: <CalendarPlus size={20} />, text: 'Leave Apply', path: '/wdms/leave-apply' },
    { type: 'link', icon: <FileText size={20} />, text: 'Leave Request', path: '/wdms/leave-request' },

    { type: 'link', icon: <CreditCard size={20} />, text: 'Payments', path: '/wdms/payments' },
    { type: 'link', icon: <BarChart3 size={20} />, text: 'Reports', path: '/wdms/reports' },
    { type: 'link', icon: <Settings size={20} />, text: 'Settings', path: '/wdms/settings' },
    { type: 'link', icon: <User size={20} />, text: 'My Profile', path: '/wdms/profile' },
  ];

  // Close on Escape key press and prevent body scroll when mobile menu is open
  useEffect(() => {
    if (!isMobileOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen, onClose]);

  // Close sidebar on mobile item tap
  const handleNavClick = () => {
    if (window.innerWidth <= 768 && onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && <div className="Sidebar-backdrop" onClick={onClose} />}

      <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Close Button */}
        <button
          type="button"
          className="Sidebar-close-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (onClose) onClose();
          }}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Brand / Logo Section */}
        <div className="Sidebar-logo">
          <div className="Sidebar-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C12 2 5 10.5 5 15.5C5 19.09 8.13 22 12 22C15.87 22 19 19.09 19 15.5C19 10.5 12 2 12 2Z"
                fill="#ffffff"
              />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="Sidebar-logo-text-wrap">
              <span className="Sidebar-logo-text">Alka Drops</span>
              <span className="Sidebar-logo-subtext">Alkaline Water</span>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="Sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={handleNavClick}
              style={{ '--i': index }}
              className={`Sidebar-link ${item.text === 'Dashboard' ? 'active' : ''}`}
              title={isCollapsed ? item.text : undefined}
            >
              <span className="Sidebar-icon">{item.icon}</span>
              {!isCollapsed && <span className="Sidebar-text">{item.text}</span>}
            </Link>
          ))}

          <button
            type="button"
            className="Sidebar-link Sidebar-logout"
            onClick={onLogout}
            title={isCollapsed ? 'Logout' : undefined}
          >
            <span className="Sidebar-icon"><LogOut size={20} /></span>
            {!isCollapsed && <span className="Sidebar-text">Logout</span>}
          </button>
        </nav>

        {/* Promotional Card Visual */}
        {!isCollapsed && (
          <div className="Sidebar-promo">
            <div className="Sidebar-promo-shine" />
            <div className="Sidebar-promo-text">
              <span>Stay Hydrated</span>
              <span>Stay Healthy</span>
            </div>

            <div className="Sidebar-promo-bottles">
              <div className="Sidebar-bottle-shadow small" />
              <div className="Sidebar-bottle-shadow large" />

              <svg viewBox="0 0 60 140" className="Sidebar-bottle Sidebar-bottle-small">
                <defs>
                  <linearGradient id="bottleGradSmall" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5cc4dc" />
                    <stop offset="18%" stopColor="#bdeff5" />
                    <stop offset="40%" stopColor="#f4ffff" />
                    <stop offset="60%" stopColor="#dcf9fc" />
                    <stop offset="80%" stopColor="#9fe0ea" />
                    <stop offset="100%" stopColor="#5cc4dc" />
                  </linearGradient>
                  <linearGradient id="capGradSmall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0d5f57" />
                  </linearGradient>
                </defs>
                <rect x="20" y="0" width="20" height="14" rx="3" fill="url(#capGradSmall)" />
                <rect x="20" y="10" width="20" height="3" fill="#0a4a44" opacity="0.5" />
                <path d="M18 14 h24 v10 c8 6 8 14 8 20 v70 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 v-70 c0-6 0-14 8-20 Z"
                      fill="url(#bottleGradSmall)" stroke="#8fd8e8" strokeWidth="0.75" />
                <rect x="10" y="70" width="40" height="30" rx="4" fill="#0d9488" opacity="0.92" />
                <text x="30" y="88" fontSize="7" fill="#ffffff" textAnchor="middle" fontWeight="700">Alka</text>
                <text x="30" y="96" fontSize="5.5" fill="#e0fbff" textAnchor="middle">Drops</text>
                <rect x="21" y="20" width="3.5" height="58" rx="1.75" fill="#ffffff" opacity="0.65" />
                <rect x="27" y="20" width="1.5" height="58" rx="0.75" fill="#ffffff" opacity="0.3" />
              </svg>

              <svg viewBox="0 0 70 160" className="Sidebar-bottle Sidebar-bottle-large">
                <defs>
                  <linearGradient id="bottleGradLarge" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3fa9c4" />
                    <stop offset="18%" stopColor="#a8e6f0" />
                    <stop offset="40%" stopColor="#f4ffff" />
                    <stop offset="60%" stopColor="#dcf9fc" />
                    <stop offset="80%" stopColor="#7fd4e6" />
                    <stop offset="100%" stopColor="#3fa9c4" />
                  </linearGradient>
                  <linearGradient id="capGradLarge" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#0d5f57" />
                  </linearGradient>
                </defs>
                <rect x="24" y="0" width="22" height="16" rx="3" fill="url(#capGradLarge)" />
                <rect x="24" y="11" width="22" height="3.5" fill="#0a4a44" opacity="0.5" />
                <path d="M22 16 h26 v10 c9 7 9 16 9 22 v78 a9 9 0 0 1 -9 9 h-26 a9 9 0 0 1 -9 -9 v-78 c0-6 0-15 9-22 Z"
                      fill="url(#bottleGradLarge)" stroke="#7fd4e6" strokeWidth="0.75" />
                <rect x="12" y="82" width="46" height="34" rx="4" fill="#0d9488" />
                <text x="35" y="100" fontSize="8" fill="#ffffff" textAnchor="middle" fontWeight="700">Alka</text>
                <text x="35" y="109" fontSize="6" fill="#e0fbff" textAnchor="middle">Drops</text>
                <rect x="25" y="22" width="4.5" height="68" rx="2.25" fill="#ffffff" opacity="0.65" />
                <rect x="32" y="22" width="2" height="68" rx="1" fill="#ffffff" opacity="0.3" />
              </svg>

              <span className="Sidebar-bubble b1" />
              <span className="Sidebar-bubble b2" />
              <span className="Sidebar-bubble b3" />
              <span className="Sidebar-bubble b4" />
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;