import React, { useState, useRef, useEffect } from 'react';
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
  CalendarCheck,  // Added for Leave Request
} from "lucide-react";

import bottleImg from "../../assets/Screenshot (1).webp"; // Adjust path if needed
import './Sidebar.css';

const WHITE_CUTOFF = 246;
const FEATHER_START = 208;

const useBackgroundRemovedImage = (src) => {
  const canvasRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const img = new Image();
    img.decoding = 'async';
    img.src = src;

    img.onload = () => {
      if (cancelled) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const minChannel = Math.min(r, g, b);

          if (minChannel >= WHITE_CUTOFF) {
            data[i + 3] = 0;
          } else if (minChannel > FEATHER_START) {
            const fade = (minChannel - FEATHER_START) / (WHITE_CUTOFF - FEATHER_START);
            data[i + 3] = Math.round(data[i + 3] * (1 - fade));
          }
        }

        ctx.putImageData(imageData, 0, 0);
      } catch (err) {
        console.warn('Bottle background removal skipped:', err);
      }

      setIsReady(true);
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return { canvasRef, isReady };
};

/* Updated Premium Dark Alka Drops Logo Mark */
const AlkaDropsMark = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
    <defs>
      {/* Dark metallic navy background with subtle glossy border fill */}
      <linearGradient id="alkaMarkBgDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0b1e3d" />
        <stop offset="50%" stopColor="#061226" />
        <stop offset="100%" stopColor="#020814" />
      </linearGradient>

      <linearGradient id="alkaMarkBorder" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="100%" stopColor="rgba(79, 169, 245, 0.2)" />
      </linearGradient>

      {/* Vibrant 3D cyan/blue droplet */}
      <linearGradient id="alkaMarkDropVibrant" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>

      <filter id="dropGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0284c7" floodOpacity="0.6" />
      </filter>
    </defs>

    {/* Outer border ring */}
    <rect x="0.5" y="0.5" width="39" height="39" rx="11.5" fill="none" stroke="url(#alkaMarkBorder)" strokeWidth="1" />

    {/* Dark metallic background badge */}
    <rect x="1.5" y="1.5" width="37" height="37" rx="10.5" fill="url(#alkaMarkBgDark)" />

    {/* 3D Droplet with glow */}
    <path
      d="M20 7.5
         C15.2 15 10.8 20.6 10.8 25.8
         C10.8 31.5 14.8 35.5 20 35.5
         C25.2 35.5 29.2 31.5 29.2 25.8
         C29.2 20.6 24.8 15 20 7.5
         Z"
      fill="url(#alkaMarkDropVibrant)"
      filter="url(#dropGlow)"
    />

    {/* Crisp glass highlights */}
    <path
      d="M14.5 23.5
         C14.5 27.2 17 30 20.2 30.4"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.85"
    />
    <circle cx="24.5" cy="16.5" r="1.4" fill="#ffffff" opacity="0.9" />
  </svg>
);

const Sidebar = ({ isCollapsed, isMobileOpen }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const { canvasRef: bottleCanvasRef, isReady: isBottleReady } = useBackgroundRemovedImage(bottleImg);

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
        <div className="Sidebar-logo-iconWrap">
          <AlkaDropsMark className="Sidebar-logo-icon" />
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
          if (item.type === 'section-heading') {
            return (
              <div key={index} className="Sidebar-section-wrapper">
                <div className="Sidebar-animated-divider"></div>
                {!isCollapsed && <span className="Sidebar-section-title">{item.text}</span>}
              </div>
            );
          }

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

          <div className="Sidebar-bottle-wrapper">
            <div className="Sidebar-bottle-glow" />
            <div className="Sidebar-bottle-ring" />
            <canvas
              ref={bottleCanvasRef}
              className={`Sidebar-bottle-img ${isBottleReady ? 'is-ready' : ''}`}
              role="img"
              aria-label="Alka Drops water bottle"
            />
            <div className="Sidebar-bottle-shadow" />
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;