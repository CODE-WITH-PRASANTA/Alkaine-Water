import React from 'react';
import { 
  Truck, 
  Clock, 
  PiggyBank, 
  Droplet, 
  PackageCheck, 
  CalendarDays, 
  Gift, 
  CheckCircle,
  Sparkles,
  Zap,
  Shield,
  Star
} from 'lucide-react';
import './TotalOrders.css';

const TotalOrders = () => {
  const cardsData = [
    {
      id: 1,
      title: 'Orders',
      value: '75',
      percentage: '10%',
      type: 'blue',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Total Sales',
      value: '$ 1,024.75',
      percentage: '20%',
      type: 'green',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Products Sold',
      value: '210',
      percentage: '15%',
      type: 'orange',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'New Users',
      value: '30',
      percentage: '5%',
      type: 'purple',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    }
  ];

  return (
    <div className="total-orders-wrapper">
      {/* Top Banner Section with 3D Bottle & Plan Details */}
      <div className="hero-banner-card">
        <div className="banner-content-side">
          <div className="plan-header-row">
            <div>
              <span className="current-plan-label">Current Plan</span>
              <h2 className="plan-title">Premium Family Plan</h2>
              <p className="plan-subtitle">20L × 30 Bottles / Month</p>
            </div>
            <div className="active-badge-pill">
              <CheckCircle size={14} /> Active
            </div>
          </div>

          {/* Sub Metrics Strip */}
          <div className="banner-metrics-grid">
            <div className="banner-metric-item">
              <div className="metric-icon-box blue-tint">
                <Truck size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Next Delivery</span>
                <span className="metric-value">Tomorrow</span>
                <span className="metric-subtext">08:00 AM - 10:00 AM</span>
              </div>
            </div>

            <div className="banner-metric-divider" />

            <div className="banner-metric-item">
              <div className="metric-icon-box blue-tint">
                <Clock size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Plan Expires On</span>
                <span className="metric-value">31 July 2026</span>
                <span className="metric-subtext">5 Days Left</span>
              </div>
            </div>

            <div className="banner-metric-divider" />

            <div className="banner-metric-item">
              <div className="metric-icon-box green-tint">
                <PiggyBank size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Monthly Savings</span>
                <span className="metric-value highlight-green">₹450</span>
                <span className="metric-subtext">vs One-time Orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Animated Bottle Graphics Side - PERFECTED VERSION */}
        <div className="banner-graphic-side">
          {/* Background Glow Effects */}
          <div className="glow-orb glow-orb-1"></div>
          <div className="glow-orb glow-orb-2"></div>
          <div className="glow-orb glow-orb-3"></div>
          
          {/* Floating Particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          
          {/* Water Splashes */}
          <div className="water-splash splash-1"></div>
          <div className="water-splash splash-2"></div>
          <div className="water-splash splash-3"></div>
          
          {/* Main Bottle Container */}
          <div className="bottle-3d-container">
            {/* Bottle Shadow */}
            <div className="bottle-shadow"></div>
            
            {/* Bottle Floating Wrapper */}
            <div className="bottle-floating-wrapper">
              {/* Bottle Cap with Shine */}
              <div className="bottle-cap">
                <div className="cap-shine"></div>
                <div className="cap-text">PURE</div>
              </div>
              
              {/* Bottle Neck */}
              <div className="bottle-neck">
                <div className="neck-shine"></div>
              </div>
              
              {/* Bottle Body */}
              <div className="bottle-body">
                {/* Inner Glow */}
                <div className="bottle-inner-glow"></div>
                
                {/* Water Level with Wave Animation */}
                <div className="water-level">
                  <div className="water-wave"></div>
                  <div className="water-wave water-wave-2"></div>
                  <div className="water-bubbles">
                    <div className="bubble bubble-1"></div>
                    <div className="bubble bubble-2"></div>
                    <div className="bubble bubble-3"></div>
                    <div className="bubble bubble-4"></div>
                  </div>
                </div>
                
                {/* Bottle Label Badge */}
                <div className="bottle-label-badge">
                  <div className="label-ring"></div>
                  <div className="label-content">
                    <span className="brand-name">Alka</span>
                    <span className="brand-sub">DROPS</span>
                    <div className="brand-stars">
                      <Star size={10} fill="#fbbf24" stroke="#fbbf24" />
                      <Star size={10} fill="#fbbf24" stroke="#fbbf24" />
                      <Star size={10} fill="#fbbf24" stroke="#fbbf24" />
                    </div>
                  </div>
                </div>
                
                {/* Bottle Reflections */}
                <div className="bottle-reflection reflection-1"></div>
                <div className="bottle-reflection reflection-2"></div>
                
                {/* Bottle Highlight */}
                <div className="bottle-highlight"></div>
              </div>
              
              {/* Bottle Base */}
              <div className="bottle-base"></div>
            </div>
          </div>

          {/* Floating Decor Elements */}
          <div className="floating-decor decor-1">
            <Sparkles size={14} />
          </div>
          <div className="floating-decor decor-2">
            <Zap size={14} />
          </div>
          <div className="floating-decor decor-3">
            <Shield size={14} />
          </div>
          
          {/* Premium Badge */}
          <div className="premium-badge">
            <span>★</span> Premium Quality
          </div>
        </div>
      </div>

      {/* Bottom Summary Cards Grid */}
      <div className="summary-cards-grid">
        {/* Card 1 */}
        <div className="summary-card">
          <div className="card-icon-circle water-blue">
            <Droplet size={24} />
          </div>
          <div className="card-content-area">
            <span className="summary-card-label">Water Remaining</span>
            <div className="summary-value-row">
              <h3 className="summary-card-value">18</h3>
              <span className="summary-unit-text">Bottles</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="summary-card">
          <div className="card-icon-circle delivery-green">
            <PackageCheck size={24} />
          </div>
          <div className="card-content-area">
            <span className="summary-card-label">Delivered This Month</span>
            <div className="summary-value-row">
              <h3 className="summary-card-value">12</h3>
              <span className="summary-unit-text">Deliveries</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="summary-card">
          <div className="card-icon-circle calendar-purple">
            <CalendarDays size={24} />
          </div>
          <div className="card-content-area">
            <span className="summary-card-label">Next Delivery</span>
            <div className="summary-value-row">
              <h3 className="summary-card-value text-bold-dark">Tomorrow</h3>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="summary-card">
          <div className="card-icon-circle reward-orange">
            <Gift size={24} />
          </div>
          <div className="card-content-area">
            <span className="summary-card-label">Reward Points</span>
            <div className="summary-value-row">
              <h3 className="summary-card-value">1,240</h3>
              <span className="summary-unit-text">Points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalOrders;