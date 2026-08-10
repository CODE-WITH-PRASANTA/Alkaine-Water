import React, { useState } from 'react';
import { 
  Droplet, 
  Pause, 
  Calendar, 
  MapPin, 
  RefreshCw, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Truck,
  Sparkles
} from 'lucide-react';
import './NextDelivery.css';
 
const NextDelivery = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    { id: 1, date: 'Today, 26 Jul 2026', title: '20L Bottle', qty: 2, status: 'Delivered', type: 'delivered' },
    { id: 2, date: 'Yesterday, 25 Jul 2026', title: '20L Bottle', qty: 1, status: 'Delivered', type: 'delivered' },
    { id: 3, date: '24 Jul 2026', title: '20L Bottle', qty: 3, status: 'In Transit', type: 'transit' }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'delivered') return order.type === 'delivered';
    if (activeTab === 'transit') return order.type === 'transit';
    return true;
  });

  return (
    <div className="next-delivery-wrapper">
      {/* Quick Actions Section */}
      <div className="quick-actions-section">
        <h3 className="section-main-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="quick-action-card" onClick={() => alert('Order Extra Bottle Clicked')}>
            <div className="action-icon-circle blue-tint">
              <Droplet size={20} />
            </div>
            <span className="action-text">Order Extra Bottle</span>
          </button>

          <button className="quick-action-card" onClick={() => alert('Pause Subscription Clicked')}>
            <div className="action-icon-circle orange-tint">
              <Pause size={20} />
            </div>
            <span className="action-text">Pause Subscription</span>
          </button>

          <button className="quick-action-card" onClick={() => alert('Reschedule Delivery Clicked')}>
            <div className="action-icon-circle purple-tint">
              <Calendar size={20} />
            </div>
            <span className="action-text">Reschedule Delivery</span>
          </button>

          <button className="quick-action-card" onClick={() => alert('Change Address Clicked')}>
            <div className="action-icon-circle green-tint">
              <MapPin size={20} />
            </div>
            <span className="action-text">Change Address</span>
          </button>

          <button className="quick-action-card" onClick={() => alert('Renew Subscription Clicked')}>
            <div className="action-icon-circle blue-tint">
              <RefreshCw size={20} />
            </div>
            <span className="action-text">Renew Subscription</span>
          </button>

          <button className="quick-action-card" onClick={() => alert('Contact Delivery Boy Clicked')}>
            <div className="action-icon-circle emerald-tint">
              <Phone size={20} />
            </div>
            <span className="action-text">Contact Delivery Boy</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content-grid">
        {/* Column 1: My Subscription Card */}
        <div className="subscription-card-box">
          <div className="sub-card-header-area">
            <span className="sub-top-label">My Subscription</span>
            <h2 className="sub-plan-name">Premium Family Plan</h2>
          </div>

          <div className="sub-bottle-graphic-container">
            <div className="sub-water-glow" />
            <div className="sub-bottle-3d">
              <div className="sub-cap" />
              <div className="sub-neck" />
              <div className="sub-body">
                <div className="sub-label-badge">
                  <span className="sub-brand">Alka</span>
                  <span className="sub-brand-sub">DROPS</span>
                </div>
                <div className="sub-wave-layer" />
              </div>
            </div>
          </div>

          <div className="sub-features-list">
            <div className="sub-feature-item">
              <CheckCircle2 size={16} /> 20L Bottles
            </div>
            <div className="sub-feature-item">
              <CheckCircle2 size={16} /> Daily Delivery
            </div>
            <div className="sub-feature-item">
              <CheckCircle2 size={16} /> Free Delivery
            </div>
            <div className="sub-feature-item">
              <CheckCircle2 size={16} /> Priority Support
            </div>
          </div>

          <div className="sub-dates-footer-row">
            <div className="date-block">
              <span className="date-title">Plan Started</span>
              <span className="date-value">01 July 2026</span>
            </div>
            <div className="date-block">
              <span className="date-title">Expires On</span>
              <span className="date-value">31 July 2026</span>
            </div>
          </div>

          <button className="renew-plan-btn" onClick={() => alert('Renew Plan Clicked')}>
            Renew Plan <ArrowRight size={16} />
          </button>
        </div>

        {/* Column 2: Recent Orders Card with Filter Integration */}
        <div className="recent-orders-card-box">
          <div className="card-header-flex">
            <h3 className="card-heading">Recent Orders</h3>
            <button className="view-all-link" onClick={() => setActiveTab('all')}>View All</button>
          </div>

          {/* Functional Filters Row */}
          <div className="orders-filter-row">
            <button 
              className={`filter-chip ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Orders
            </button>
            <button 
              className={`filter-chip ${activeTab === 'delivered' ? 'active' : ''}`}
              onClick={() => setActiveTab('delivered')}
            >
              Delivered
            </button>
            <button 
              className={`filter-chip ${activeTab === 'transit' ? 'active' : ''}`}
              onClick={() => setActiveTab('transit')}
            >
              In Transit
            </button>
          </div>

          <div className="orders-list-wrapper">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div className="order-item-row" key={order.id}>
                  <div className="order-item-icon-box">
                    <Droplet size={18} />
                  </div>
                  <div className="order-item-details">
                    <span className="order-date-text">{order.date}</span>
                    <div className="order-title-qty-row">
                      <span className="order-item-name">{order.title}</span>
                      <span className="order-qty-badge">Qty: {order.qty}</span>
                    </div>
                  </div>
                  <div className={`order-status-pill ${order.type}`}>
                    {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {order.status}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-orders-message">No orders found for this filter.</div>
            )}
          </div>

          <button className="view-all-bottom-btn" onClick={() => alert('Navigating to All Orders')}>
            View All Orders
          </button>
        </div>

        {/* Column 3: Upcoming Delivery Tracking Card */}
        <div className="upcoming-delivery-card-box">
          <h3 className="card-heading">Upcoming Delivery</h3>

          {/* Interactive Map Visual Mock */}
          <div className="delivery-map-preview-box">
            <div className="map-road-grid" />
            <div className="delivery-route-line" />
            <div className="delivery-truck-pin">
              <Truck size={16} />
            </div>
          </div>

          {/* Delivery Executive Info */}
          <div className="delivery-executive-card">
            <div className="executive-avatar-box">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Rahul Kumar" 
                className="executive-img"
              />
            </div>
            <div className="executive-info-col">
              <h4 className="executive-name">Rahul Kumar</h4>
              <p className="executive-role">Delivery Executive</p>
            </div>
            <a href="tel:+919876543210" className="call-executive-btn" aria-label="Call Executive">
              <Phone size={16} />
            </a>
          </div>

          <div className="delivery-status-update-row">
            <div className="status-flex">
              <span className="status-dot-green" />
              <span className="status-text-bold">On The Way</span>
            </div>
            <div className="eta-text-box">
              <Clock size={14} /> ETA: 25 Minutes
            </div>
          </div>

          <button className="track-delivery-btn" onClick={() => alert('Opening Live Tracking')}>
            Track Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextDelivery;