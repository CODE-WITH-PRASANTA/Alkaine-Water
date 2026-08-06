import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./MainLayout.css";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className={`MainLayout ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Pass closeMobileSidebar to onClose prop */}
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        onClose={closeMobileSidebar}
      />

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="MainLayout-overlay"
          onClick={closeMobileSidebar}
        />
      )}

      <div className="MainLayout-container">
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="MainLayout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;