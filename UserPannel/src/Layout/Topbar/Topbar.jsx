import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Menu, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  CheckCircle2,
  Info,
  Sparkles
} from 'lucide-react';
import './Topbar.css';

const Topbar = ({ toggleSidebar, toggleMobileSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const location = useLocation();

  const getPageTitle = (path) => {
    switch (path) {
      case '/wdms/dashboard': return 'Dashboard Overview';
      case '/wdms/subscription': return 'My Subscription';
      case '/wdms/order-water': return 'Order Water';
      case '/wdms/orders': return 'My Orders';
      case '/wdms/delivery-address': return 'Delivery Address';
      case '/wdms/payments': return 'Payments';
      case '/wdms/refer-earn': return 'Refer & Earn';
      case '/wdms/notifications': return 'Notifications';
      case '/wdms/profile': return 'Profile Settings';
      case '/wdms/settings': return 'System Settings';
      case '/wdms/help-support': return 'Help & Support';
      default: return 'User Panel';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="topbar-container">
      {/* Left Navigation Actions */}
      <div className="topbar-left">
        <button
          onClick={toggleSidebar}
          className="toggle-btn desktop-toggle"
          aria-label="Toggle Desktop Sidebar"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={toggleMobileSidebar}
          className="toggle-btn mobile-toggle"
          aria-label="Toggle Mobile Sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="title-wrapper">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <span className="live-badge">
            <Sparkles size={12} /> Live System
          </span>
        </div>
      </div>

      {/* Right User Actions */}
      <div className="topbar-right">
        {/* Notifications Popup */}
        <div className="dropdown-wrapper" ref={notificationRef}>
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false);
            }}
            className="icon-btn"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="badge-dot" />
          </button>

          <div className={`dropdown-card notification-card ${isNotificationOpen ? 'open' : ''}`}>
            <div className="card-header">
              <h3>Notifications</h3>
              <span className="badge-pill">2 New</span>
            </div>

            <div className="notification-list">
              <div className="notification-item">
                <div className="status-icon-wrap green">
                  <CheckCircle2 size={16} />
                </div>
                <div className="notification-content">
                  <p className="item-title">Order Dispatched</p>
                  <p className="item-desc">Your subscription order #4092 is on its way.</p>
                  <span className="item-time">5 mins ago</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="status-icon-wrap blue">
                  <Info size={16} />
                </div>
                <div className="notification-content">
                  <p className="item-title">Support Ticket Resolved</p>
                  <p className="item-desc">Ticket #8821 has been marked as completed.</p>
                  <span className="item-time">1 hour ago</span>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="text-btn">Mark all as read</button>
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown-wrapper" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="profile-btn"
          >
            <div className="avatar-wrapper">
              <div className="avatar">SS</div>
              <span className="online-indicator" />
            </div>
            <div className="profile-info">
              <p className="profile-name">Saroj Sahoo</p>
              <p className="profile-role">Active Member</p>
            </div>
            <ChevronDown size={16} className={`chevron-icon ${isProfileOpen ? 'rotate' : ''}`} />
          </button>

          <div className={`dropdown-card profile-card ${isProfileOpen ? 'open' : ''}`}>
            <div className="profile-card-header">
              <p className="profile-name">Saroj Sahoo</p>
              <p className="profile-email">saroj@example.com</p>
            </div>

            <div className="menu-group">
              <button onClick={() => setIsProfileOpen(false)} className="menu-item">
                <User size={16} /> Profile Settings
              </button>
              <button onClick={() => setIsProfileOpen(false)} className="menu-item">
                <Settings size={16} /> Preferences
              </button>
            </div>

            <div className="menu-divider">
              <button onClick={() => setIsProfileOpen(false)} className="menu-item logout">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;