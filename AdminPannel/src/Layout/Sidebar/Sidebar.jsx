// Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Store,
  Phone,
  ChevronDown,
  FileText,
  Users,
  Package,
  ClipboardList,
  Truck,
  UserPlus,
  Boxes,
  Tag,
  DollarSign,
  Wallet,
  Map,
  Car,
  Settings,
  BookmarkCheck,
  Box,
  BarChart3,
  CreditCard,     // For Subscription
  Badge,          // For Delivery Boy ID
  Droplet,        // Brand mark
         // For Delivery Boy ID
  CalendarCheck, // Added for Leave Request
} from "lucide-react";
import './Sidebar.css';

const Sidebar = ({ isCollapsed, isMobileOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const menuItems = [
    { type: 'link', icon: <Home size={20} />, text: 'Dashboard', path: '/' },

    // --- SECTION: MAIN ---
    { type: 'section-heading', text: 'Main' },

    {
      type: 'dropdown',
      icon: <FileText size={20} />,
      text: 'Blog Posting',
      subItems: [
        { text: 'Blog', path: '/blog' },
        { text: 'Blog Management', path: '/blog-management' },
      ],
    },

    {
      type: "link",
      icon: <Users size={20} />,
      text: "Testimonials",
      path: "/products/testimonials",
    },

    {
      type: "link",
      icon: <CreditCard size={20} />,
      text: "Subscription Management",
      path: "/products/subscription",
    },

    {
      type: "link",
      icon: <Badge size={20} />,
      text: "Delivery Boy ID",
      path: "/products/id-generate",
    },


    {
      type: "link",
      icon: <Badge size={20} />,
      text: "Delivery Boy ID",
      path: "/products/id-generate",
    },
    
    {
      type: 'dropdown',
      icon: <BookOpen size={20} />,
      text: 'Resources',
      subItems: [
        { text: 'Our Team', path: '/resources/team' },
        { text: 'Gallery', path: '/resources/gallary' },
      ],
    },

    { type: 'link', icon: <Store size={20} />, text: 'Shop Main', path: '/shop' },

    { type: 'link', icon: <Phone size={20} />, text: 'Contact', path: '/contact' },

    // --- DIVIDER WITH SECTION HEADING: WDMS ---
    { type: 'section-heading', text: 'WDMS' },

    { type: 'link', icon: <Home size={20} />, text: 'WDMS Dashboard', path: '/wdms/dashboard' },

    // Single Links for WDMS Features
    { type: 'link', icon: <UserPlus size={20} />, text: 'Customer Management', path: '/wdms/customer' },

    { type: 'link', icon: <Boxes size={20} />, text: 'Inventory', path: '/wdms/inventory' },

    { type: 'link', icon: <Tag size={20} />, text: 'Product & Price', path: '/wdms/products-pricing' },

    // Dropdowns
    {
      type: 'dropdown',
      icon: <Package size={20} />,
      text: 'Stock Management',
      subItems: [
        { text: 'Manage Stock', path: '/wdms/stock/manage' },
        { text: 'Purchase History', path: '/wdms/stock/purchase-history' },
      ],
    },

    {
      type: 'dropdown',
      icon: <Wallet size={20} />,
      text: 'Wallet',
      subItems: [
        { text: 'Expenses', path: '/wdms/expenses' },
        { text: 'Add Expenses', path: '/wdms/add-expenses' },
      ],
    },

    { type: 'link', icon: <ClipboardList size={20} />, text: 'Order Management', path: '/wdms/orders' },
    { type: 'link', icon: <CalendarCheck size={20} />, text: 'Leave Request', path: '/wdms/leave-request' },
    { type: 'link', icon: <DollarSign size={20} />, text: 'Payment Management', path: '/wdms/payments' },
    { type: 'link', icon: <Truck size={20} />, text: 'Delivery Boy Assign', path: '/wdms/assign-delivery' },
    { type: 'link', icon: <Map size={20} />, text: 'Route Management', path: '/wdms/route-management' },

    // --- SECTION: OPERATIONS ---
    { type: 'section-heading', text: 'Operations' },

    { type: 'link', icon: <Car size={20} />, text: 'Vehicle Management', path: '/wdms/vehicles' },
    { type: 'link', icon: <BookOpen size={20} />, text: 'Invoice Management', path: '/wdms/invoice' },
    { type: 'link', icon: <BookmarkCheck size={20} />, text: 'Damage Stock Management', path: '/wdms/damage-stock' },
    { type: 'link', icon: <Box size={20} />, text: 'Supplier Management', path: '/wdms/supplier' },

    // --- SECTION: ANALYTICS ---
    { type: 'section-heading', text: 'Analytics' },

    { type: 'link', icon: <BarChart3 size={20} />, text: 'Report Analysis', path: '/wdms/reports' },

    // --- SECTION: SYSTEM ---
    { type: 'section-heading', text: 'System' },

    { type: 'link', icon: <Settings size={20} />, text: 'Settings', path: '/wdms/settings' },
  ];

  return (
    <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="Sidebar-sheen" aria-hidden="true" />

      <div className="Sidebar-logo">
        <div className="Sidebar-logo-icon">
          <Droplet size={20} strokeWidth={2.4} fill="currentColor" />
        </div>
        {!isCollapsed && (
          <div className="Sidebar-logo-text-group">
            <span className="Sidebar-logo-text">Alka Drops</span>
            <span className="Sidebar-logo-tagline">Pure. Refreshing. Healthy.</span>
          </div>
        )}
      </div>

      <nav className="Sidebar-nav">
        {menuItems.map((item, index) => {
          // Handle Section Heading with Animated Divider
          if (item.type === 'section-heading') {
            return (
              <div key={index} className="Sidebar-section-wrapper">
                <div className="Sidebar-animated-divider"></div>
                {!isCollapsed && <span className="Sidebar-section-title">{item.text}</span>}
              </div>
            );
          }

          // Handle Standard Links
          if (item.type === 'link') {
            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.path === '/'}
                title={isCollapsed ? item.text : undefined}
                className={({ isActive }) => `Sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="Sidebar-text">{item.text}</span>}
              </NavLink>
            );
          }

          // Handle Dropdown Menus
          const isDropdownOpen = !!openDropdowns[item.text];
          return (
            <div key={index} className={`Sidebar-dropdown-wrapper ${isDropdownOpen ? 'is-open' : ''}`}>
              <button
                onClick={() => !isCollapsed && toggleDropdown(item.text)}
                title={isCollapsed ? item.text : undefined}
                className="Sidebar-link Sidebar-dropdown-toggle"
              >
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && (
                  <>
                    <span className="Sidebar-text">{item.text}</span>
                    <ChevronDown size={16} className={`Sidebar-chevron ${isDropdownOpen ? 'rotated' : ''}`} />
                  </>
                )}
              </button>

              {!isCollapsed && (
                <div className="Sidebar-submenu">
                  {item.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className={({ isActive }) => `Sidebar-submenu-link ${isActive ? 'active' : ''}`}
                    >
                      {subItem.text}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="Sidebar-brandFooter">
          {/* Ambient background waves */}
          <svg
            className="Sidebar-brandFooter-waves"
            viewBox="0 0 270 170"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="wave wave-1" d="M0 90 Q 34 66 68 90 T 136 90 T 204 90 T 272 90 V170 H0 Z" />
            <path className="wave wave-2" d="M0 112 Q 34 88 68 112 T 136 112 T 204 112 T 272 112 V170 H0 Z" />
            <path className="wave wave-3" d="M0 134 Q 34 114 68 134 T 136 134 T 204 134 T 272 134 V170 H0 Z" />
            <circle className="droplet droplet-1" cx="24" cy="56" r="2.4" />
            <circle className="droplet droplet-2" cx="54" cy="82" r="1.8" />
            <circle className="droplet droplet-3" cx="12" cy="96" r="1.5" />
            <circle className="droplet droplet-4" cx="200" cy="38" r="2.2" />
            <circle className="droplet droplet-5" cx="220" cy="56" r="1.6" />
          </svg>

          {/* Realistic 3D water bottle: liquid fill, glass highlights, condensation, splash */}
          <svg
            className="Sidebar-brandFooter-bottle"
            viewBox="0 0 100 175"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0.2">
                <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
                <stop offset="45%" stopColor="rgba(214,237,255,0.3)" />
                <stop offset="100%" stopColor="rgba(147,205,246,0.4)" />
              </linearGradient>
              <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7fcdfb" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0e63c4" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="capGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#cfe6fb" />
              </linearGradient>
              <linearGradient id="dropGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4fa9f5" />
                <stop offset="100%" stopColor="#0e63c4" />
              </linearGradient>
              <clipPath id="bottleClip">
                <path d="M30 40 Q30 34 38 34 L62 34 Q70 34 70 40 L74 52 Q78 60 78 70 L78 148 Q78 160 66 160 L34 160 Q22 160 22 148 L22 70 Q22 60 26 52 Z" />
              </clipPath>
            </defs>

            {/* ground shadow */}
            <ellipse cx="50" cy="166" rx="30" ry="5" fill="rgba(4,26,63,0.28)" />
            <ellipse cx="50" cy="166" rx="20" ry="3" fill="rgba(4,26,63,0.22)" />

            {/* cap */}
            <rect x="38" y="6" width="24" height="14" rx="4" fill="url(#capGrad2)" />
            <line x1="40" y1="10" x2="60" y2="10" stroke="rgba(28,102,196,0.25)" strokeWidth="1" />
            <line x1="40" y1="14" x2="60" y2="14" stroke="rgba(28,102,196,0.25)" strokeWidth="1" />
            <line x1="40" y1="18" x2="60" y2="18" stroke="rgba(28,102,196,0.25)" strokeWidth="1" />

            {/* neck */}
            <rect x="40" y="20" width="20" height="14" fill="url(#glassGrad)" />

            {/* body (glass) */}
            <path
              d="M30 40 Q30 34 38 34 L62 34 Q70 34 70 40 L74 52 Q78 60 78 70 L78 148 Q78 160 66 160 L34 160 Q22 160 22 148 L22 70 Q22 60 26 52 Z"
              fill="url(#glassGrad)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
            />

            {/* liquid fill, clipped to the bottle silhouette, with a wavy surface line */}
            <g clipPath="url(#bottleClip)">
              <path
                className="bottle-liquid"
                d="M20 100 Q30 94 40 100 T60 100 T80 100 V165 H20 Z"
                fill="url(#liquidGrad)"
              />
            </g>

            {/* glass highlight streaks */}
            <path
              className="bottle-shine"
              d="M33 44 Q30 100 33 154"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M67 54 Q69 100 67 144"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* condensation droplets on the glass */}
            <circle className="condensation" cx="30" cy="52" r="1.3" />
            <circle className="condensation" cx="62" cy="48" r="1" />
            <circle className="condensation" cx="45" cy="60" r="1.4" />
            <circle className="condensation" cx="26" cy="72" r="1" />
            <circle className="condensation" cx="70" cy="66" r="1.2" />
            <circle className="condensation" cx="55" cy="80" r="0.9" />

            {/* label */}
            <rect x="27" y="104" width="46" height="50" rx="10" fill="#ffffff" opacity="0.96" />
            <path
              d="M50 110
                 C46 117 42 124 42 130
                 C42 136.5 45.5 141 50 141
                 C54.5 141 58 136.5 58 130
                 C58 124 54 117 50 110
                 Z"
              fill="url(#dropGrad2)"
            />
            <text x="50" y="146" textAnchor="middle" fontSize="7" fontWeight="800" fill="#1c66c4" letterSpacing="0.5">
              ALKA
            </text>
            <text x="50" y="152" textAnchor="middle" fontSize="5" fontWeight="700" fill="#4fa9f5" letterSpacing="1.2">
              DROPS
            </text>

            {/* splash + ripple at the base */}
            <ellipse className="ripple ripple-1" cx="50" cy="163" rx="48" ry="10" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
            <ellipse className="ripple ripple-2" cx="50" cy="163" rx="60" ry="13" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1.2" />

            <g className="splash">
              <ellipse cx="14" cy="156" rx="6" ry="3" fill="rgba(255,255,255,0.55)" />
              <ellipse cx="88" cy="150" rx="5" ry="2.5" fill="rgba(255,255,255,0.45)" />
              <circle cx="4" cy="142" r="2.6" fill="rgba(255,255,255,0.6)" />
              <circle cx="-4" cy="152" r="1.8" fill="rgba(255,255,255,0.5)" />
              <circle cx="96" cy="138" r="2.2" fill="rgba(255,255,255,0.55)" />
              <circle cx="100" cy="152" r="1.6" fill="rgba(255,255,255,0.45)" />
              <circle cx="20" cy="134" r="1.4" fill="rgba(255,255,255,0.5)" />
              <circle cx="80" cy="130" r="1.3" fill="rgba(255,255,255,0.45)" />
            </g>
          </svg>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;