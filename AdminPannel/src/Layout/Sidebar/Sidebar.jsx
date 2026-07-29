// Sidebar.jsx
import React, { useState } from 'react';
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
  CreditCard,    // For Subscription
  Badge,         // For Delivery Boy ID
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
    { type: 'link', icon: <Car size={20} />, text: 'Vehicle Management', path: '/wdms/vehicles' },
    { type: 'link', icon: <BookOpen size={20} />, text: 'Invoice Management', path: '/wdms/invoice' },
    { type: 'link', icon: <BookmarkCheck size={20} />, text: 'Damage Stock Management', path: '/wdms/damage-stock' },
    { type: 'link', icon: <Box size={20} />, text: 'Supplier Management', path: '/wdms/supplier' },
    { type: 'link', icon: <BarChart3 size={20} />, text: 'Report Analysis', path: '/wdms/reports' },
    { type: 'link', icon: <Settings size={20} />, text: 'Settings', path: '/wdms/settings' },
  ];

  return (
    <aside className={`Sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="Sidebar-logo">
        <div className="Sidebar-logo-icon">A</div>
        {!isCollapsed && <span className="Sidebar-logo-text">Admin<span>Panel</span></span>}
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
              <a key={index} href={item.path} className="Sidebar-link">
                <span className="Sidebar-icon">{item.icon}</span>
                {!isCollapsed && <span className="Sidebar-text">{item.text}</span>}
              </a>
            );
          }

          // Handle Dropdown Menus
          const isDropdownOpen = !!openDropdowns[item.text];
          return (
            <div key={index} className={`Sidebar-dropdown-wrapper ${isDropdownOpen ? 'is-open' : ''}`}>
              <button 
                onClick={() => !isCollapsed && toggleDropdown(item.text)} 
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
                    <a key={subIndex} href={subItem.path} className="Sidebar-submenu-link">
                      {subItem.text}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;