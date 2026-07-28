import React, { useState } from 'react';
import {
  User,
  Folder,
  Shield,
  Edit,
  Camera,
  Edit3,
  Key,
  Calendar,
  Package,
  IndianRupee,
  BadgeCheck,
  ArrowRight
} from "lucide-react";
import './MyProfile.css';

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Sample data for Recent Deliveries table
  const recentDeliveries = [
    {
      id: '#ADP7845',
      customer: 'Suresh Patnaik',
      location: 'Patia, Bhubaneswar',
      status: 'Delivered',
      date: '18 May 2025, 10:30 AM'
    },
    {
      id: '#ADP7844',
      customer: 'Priya Sharma',
      location: 'Khandagiri, Bhubaneswar',
      status: 'Delivered',
      date: '18 May 2025, 09:15 AM'
    },
    {
      id: '#ADP7843',
      customer: 'Manoj Behera',
      location: 'Nayapalli, Bhubaneswar',
      status: 'Pending',
      date: '18 May 2025, 08:45 AM'
    }
  ];

  return (
    <div className="profile-container">
      {/* Header Section */}
      <header className="profile-header">
        <div className="header-title">
          <h1>My Profile</h1>
          <p>Manage your personal information and documents</p>
        </div>
        <div className="delivery-id-badge">
          <BadgeCheck size={18} />
          <span>Delivery ID: ADP12345</span>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="profile-tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <User size={18} />
          <span>Profile Details</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <Folder size={18} />
          <span>Documents</span>
        </button>
        <button
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <Shield size={18} />
          <span>Security</span>
        </button>
      </nav>

      {/* Main Grid Layout */}
      <div className="profile-grid">
        {/* Left Column */}
        <div className="main-content">
          {/* Personal Information Card */}
          <div className="card profile-info-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              <button className="edit-btn">
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="info-body">
              <div className="avatar-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                  alt="Ramesh Kumar"
                  className="avatar-img"
                />
                <button className="camera-btn" aria-label="Upload Avatar">
                  <Camera size={14} />
                </button>
              </div>

              <div className="details-grid">
                <div className="detail-item">
                  <span className="label">Full Name</span>
                  <span className="value">Ramesh Kumar</span>
                </div>
                <div className="detail-item">
                  <span className="label">Mobile Number</span>
                  <span className="value">+91 98765 43210</span>
                </div>
                <div className="detail-item">
                  <span className="label">Email Address</span>
                  <span className="value">ramesh.kumar@email.com</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date of Joining</span>
                  <span className="value">15 March 2024</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date of Birth</span>
                  <span className="value">12 Aug 1995</span>
                </div>
                <div className="detail-item">
                  <span className="label">Address</span>
                  <span className="value">Bhubaneswar, Odisha, India</span>
                </div>
              </div>
            </div>

            {/* Performance Stats Banner */}
            <div className="stats-banner">
              <div className="stat-box">
                <span className="stat-number primary">125</span>
                <span className="stat-label">Total Deliveries</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-box">
                <span className="stat-number primary">
                  4.8 <span className="star-icon">★</span>
                </span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-box">
                <span className="stat-number primary">₹12,450</span>
                <span className="stat-label">Total Earnings</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-box">
                <span className="stat-number primary">98%</span>
                <span className="stat-label">Completion Rate</span>
              </div>
            </div>
          </div>

          {/* About Me Card */}
          <div className="card about-card">
            <div className="about-content">
              <h3>About Me</h3>
              <p>
                Dedicated delivery assistant with 2+ years of experience.
                I ensure timely and safe delivery of Alka Drops products with
                customer satisfaction as my top priority.
              </p>
            </div>
            <div className="about-illustration">
              <img
                src="https://illustrations.popsy.co/blue/delivering-packages.svg"
                alt="Delivery Illustration"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="side-content">
          {/* Quick Actions Card */}
          <div className="card quick-actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-list">
              <button className="action-btn">
                <div className="icon-box">
                  <Edit3 size={18} />
                </div>
                <div className="action-text">
                  <span className="action-title">Update Profile</span>
                  <span className="action-sub">Edit your personal details</span>
                </div>
              </button>

              <button className="action-btn">
                <div className="icon-box">
                  <Folder size={18} />
                </div>
                <div className="action-text">
                  <span className="action-title">Manage Documents</span>
                  <span className="action-sub">Upload and manage documents</span>
                </div>
              </button>

              <button className="action-btn">
                <div className="icon-box">
                  <Key size={18} />
                </div>
                <div className="action-text">
                  <span className="action-title">Change Password</span>
                  <span className="action-sub">Update your account password</span>
                </div>
              </button>
            </div>
          </div>

          {/* Delivery Summary Card */}
          <div className="card summary-card">
            <h3>Delivery Summary</h3>
            <ul className="summary-list">
              <li className="summary-item">
                <div className="summary-left">
                  <div className="summary-icon">
                    <Calendar size={18} />
                  </div>
                  <span>Today's Deliveries</span>
                </div>
                <span className="summary-value">8</span>
              </li>

              <li className="summary-item">
                <div className="summary-left">
                  <div className="summary-icon">
                    <Package size={18} />
                  </div>
                  <span>Pending Deliveries</span>
                </div>
                <span className="summary-value">2</span>
              </li>

              <li className="summary-item">
                <div className="summary-left">
                  <div className="summary-icon">
                    <Folder size={18} />
                  </div>
                  <span>This Month</span>
                </div>
                <span className="summary-value">125</span>
              </li>

              <li className="summary-item">
                <div className="summary-left">
                  <div className="summary-icon">
                    <IndianRupee size={18} />
                  </div>
                  <span>This Month Earnings</span>
                </div>
                <span className="summary-value highlight">₹12,450</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recent Deliveries Table Section (Below the grid) */}
      <div className="card recent-deliveries-card">
        <div className="recent-deliveries-header">
          <h2>Recent Deliveries</h2>
          <a href="#view-all" className="view-all-link">
            <span>View All</span>
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="table-responsive">
          <table className="deliveries-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentDeliveries.map((item, index) => (
                <tr key={index}>
                  <td className="order-id">{item.id}</td>
                  <td className="customer-name">{item.customer}</td>
                  <td className="location-name">{item.location}</td>
                  <td>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="date-text">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;