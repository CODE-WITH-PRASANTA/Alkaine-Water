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