import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  RotateCw,
  Droplet,
  Package,
  MapPin,
  CreditCard,
  Gift,
  Bell,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X,
  Phone,
  Mail,
  Globe,
  Share2,
  MessageCircle,
  Send
} from 'lucide-react';

import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen, onLogout }) => {

  const navItems = [
    { title: 'Dashboard', path: '/wdms/dashboard', icon: LayoutDashboard },
    { title: 'My Subscription', path: '/wdms/subscription', icon: RotateCw },
    { title: 'Order Water', path: '/wdms/order-water', icon: Droplet },
    { title: 'My Orders', path: '/wdms/orders', icon: Package },
    { title: 'Delivery Address', path: '/wdms/delivery-address', icon: MapPin },
    { title: 'Payments', path: '/wdms/payments', icon: CreditCard },
    { title: 'Refer & Earn', path: '/wdms/refer-earn', icon: Gift },
    { title: 'Notifications', path: '/wdms/notifications', icon: Bell, badge: 3 },
    { title: 'Profile', path: '/wdms/profile', icon: User },
    { title: 'Settings', path: '/wdms/settings', icon: Settings },
    { title: 'Help & Support', path: '/wdms/help-support', icon: HelpCircle },
  ];

  const showLabel = !isCollapsed || isMobileOpen;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar-container 
          ${isCollapsed ? 'collapsed' : ''} 
          ${isMobileOpen ? 'mobile-open' : ''}`
        }
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <Droplet size={22} fill="#ffffff" strokeWidth={0} />
            </div>

            {showLabel && (
              <div className="brand-text-wrap">
                <span className="brand-text">
                  Alka <span className="brand-accent">DROPS</span>
                </span>
                <span className="brand-tagline">Pure. Alkaline. Healthy.</span>
              </div>
            )}
          </div>

          <button
            className="mobile-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={{ '--i': index }}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `nav-item ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={20} className="nav-icon" />

                {showLabel && <span className="nav-title">{item.title}</span>}

                {item.badge && showLabel && (
                  <span className="nav-badge">{item.badge}</span>
                )}

                {isCollapsed && !isMobileOpen && (
                  <div className="nav-tooltip">{item.title}</div>
                )}
              </NavLink>
            );
          })}

          <button
            type="button"
            className="nav-item nav-logout"
            onClick={onLogout}
          >
            <LogOut size={20} className="nav-icon" />
            {showLabel && <span className="nav-title">Logout</span>}
            {isCollapsed && !isMobileOpen && (
              <div className="nav-tooltip">Logout</div>
            )}
          </button>
        </nav>

        {/* Promo / Order card */}
        {showLabel && (
          <div className="promo-card">
            <div className="promo-shine" />
            <div className="promo-text">
              <span>Stay Hydrated</span>
              <span>Stay Healthy</span>
            </div>
            <button type="button" className="promo-order-btn">Order Now</button>

            <div className="promo-bottle-wrap">
              <div className="jug-shadow" />
              <svg viewBox="0 0 140 200" className="jug-bottle">
                <defs>
                  <linearGradient id="jugBody" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="16%" stopColor="#bfdbfe" />
                    <stop offset="38%" stopColor="#f0f9ff" />
                    <stop offset="58%" stopColor="#dbeafe" />
                    <stop offset="82%" stopColor="#93c5fd" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                  <linearGradient id="jugCap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="jugWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>

                {/* neck + cap */}
                <rect x="55" y="0" width="30" height="18" rx="3" fill="url(#jugCap)" />
                <rect x="50" y="16" width="40" height="12" rx="4" fill="#1e40af" />

                {/* jug body */}
                <path
                  d="M38 28 h64 c6 10 10 20 10 34 v104 a20 20 0 0 1 -20 20 h-44 a20 20 0 0 1 -20 -20 v-104 c0-14 4-24 10-34 Z"
                  fill="url(#jugBody)"
                  stroke="#93c5fd"
                  strokeWidth="1"
                />

                {/* water fill line */}
                <path
                  d="M28 120 h84 v46 a20 20 0 0 1 -20 20 h-44 a20 20 0 0 1 -20 -20 Z"
                  fill="url(#jugWater)"
                  opacity="0.55"
                />

                {/* label */}
                <rect x="20" y="90" width="100" height="46" rx="6" fill="#1d4ed8" />
                <text x="70" y="112" fontSize="15" fill="#ffffff" textAnchor="middle" fontWeight="800">Alka</text>
                <text x="70" y="128" fontSize="10" fill="#bfdbfe" textAnchor="middle" letterSpacing="1">DROPS</text>

                {/* highlight streaks */}
                <rect x="44" y="34" width="7" height="150" rx="3.5" fill="#ffffff" opacity="0.55" />
                <rect x="56" y="34" width="3" height="150" rx="1.5" fill="#ffffff" opacity="0.28" />
              </svg>
            </div>
          </div>
        )}

        {/* Need Help */}
        {showLabel && (
          <div className="help-card">
            <p className="help-title">Need Help?</p>
            <a href="tel:+919876543210" className="help-row">
              <Phone size={15} /> +91 98765 43210
            </a>
            <a href="mailto:support@alkadrops.com" className="help-row">
              <Mail size={15} /> support@alkadrops.com
            </a>

            <div className="social-row">
              <a href="#facebook" className="social-icon" aria-label="Website"><Globe size={16} /></a>
              <a href="#instagram" className="social-icon" aria-label="Share"><Share2 size={16} /></a>
              <a href="#whatsapp" className="social-icon" aria-label="WhatsApp"><MessageCircle size={16} /></a>
              <a href="#messenger" className="social-icon" aria-label="Messenger"><Send size={16} /></a>
            </div>
          </div>
        )}

        {/* Wave footer */}
        {showLabel && (
          <div className="sidebar-wave">
            <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="wave-back">
              <path d="M0,40 C80,10 120,70 200,45 C280,20 320,60 400,35 L400,90 L0,90 Z" fill="#93c5fd" opacity="0.55" />
            </svg>
            <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="wave-front">
              <path d="M0,55 C90,25 140,80 220,50 C300,25 340,65 400,45 L400,90 L0,90 Z" fill="#2563eb" />
            </svg>
            <span className="wave-bubble wb1" />
            <span className="wave-bubble wb2" />
            <span className="wave-bubble wb3" />
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;