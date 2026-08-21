import React, { useState } from 'react';
import { Menu, ChevronDown, Bell, Search, User, LogOut, Shield } from 'lucide-react';
import './Topbar.css';

const Topbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button className="Topbar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <Menu size={22} />
        </button>
        <div className="Topbar-path">
          <span className="Topbar-path-parent">Admin</span>
          <span className="Topbar-path-separator">/</span>
          <span className="Topbar-path-current">Dashboard</span>
        </div>
      </div>

      <div className="Topbar-right">
        <div className="Topbar-search-box">
          <Search size={18} className="Topbar-search-icon" />
          <input type="text" placeholder="Search..." className="Topbar-search-input" />
        </div>

        <button className="Topbar-action-btn">
          <Bell size={20} />
          <span className="Topbar-badge">3</span>
        </button>

        <div className="Topbar-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
            alt="User Avatar" 
            className="Topbar-avatar" 
          />
          <div className="Topbar-user-info">
            <span className="Topbar-username">Jane Doe</span>
            <span className="Topbar-role">Administrator</span>
          </div>
          <ChevronDown size={16} className={`Topbar-chevron ${dropdownOpen ? 'open' : ''}`} />

          {dropdownOpen && (
          <div className="Topbar-dropdown">
          <a href="/profile" className="Topbar-dropdown-item">
            <User size={16} /> My Profile
          </a>
          <a href="/security" className="Topbar-dropdown-item">
            <Shield size={16} /> Security
          </a>
          <div className="Topbar-dropdown-divider"></div>
          <a href="/logout" className="Topbar-dropdown-item logout">
            <LogOut size={16} /> Logout
          </a>
        </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;