import React, { useState } from 'react';
import { 
  FiBell, 
  FiCheck, 
  FiChevronRight, 
  FiPackage, 
  FiTruck, 
  FiPercent, 
  FiStar, 
  FiInfo 
} from 'react-icons/fi';
import './Notifications.css';

const initialNotificationsData = [
  {
    id: 1,
    type: 'order_delivered',
    title: 'Order Delivered',
    message: 'Your order #PS1024 has been delivered successfully.',
    time: '2 mins ago',
    unread: true,
    isNew: true,
    icon: <FiPackage className="notifications-item-icon blue" />,
    iconBg: 'notifications-icon-box blue'
  },
  {
    id: 2,
    type: 'out_for_delivery',
    title: 'Order Out for Delivery',
    message: 'Your order #PS1023 is out for delivery.',
    time: '1 hour ago',
    unread: true,
    isNew: false,
    icon: <FiTruck className="notifications-item-icon green" />,
    iconBg: 'notifications-icon-box green'
  },
  {
    id: 3,
    type: 'special_offer',
    title: 'Special Offer',
    message: 'Get 20% OFF on your next water order!',
    time: '5 hours ago',
    unread: true,
    isNew: false,
    icon: <FiPercent className="notifications-item-icon purple" />,
    iconBg: 'notifications-icon-box purple'
  },
  {
    id: 4,
    type: 'refer_earn',
    title: 'Refer & Earn',
    message: 'Invite your friends and earn ₹50 cashback!',
    time: '1 day ago',
    unread: false,
    isNew: false,
    icon: <FiStar className="notifications-item-icon orange" />,
    iconBg: 'notifications-icon-box orange'
  },
  {
    id: 5,
    type: 'account_update',
    title: 'Account Update',
    message: 'Your profile has been updated successfully.',
    time: '2 days ago',
    unread: false,
    isNew: false,
    icon: <FiInfo className="notifications-item-icon info-blue" />,
    iconBg: 'notifications-icon-box info-blue'
  }
];

const Notifications = () => {
  const [notificationsList, setNotificationsList] = useState(initialNotificationsData);
  const [showAll, setShowAll] = useState(false);

  // Mark all notifications as read
  const handleMarkAllAsRead = () => {
    setNotificationsList(prev => 
      prev.map(item => ({ ...item, unread: false, isNew: false }))
    );
  };

  // Toggle individual notification read state on click
  const handleToggleRead = (id) => {
    setNotificationsList(prev =>
      prev.map(item => item.id === id ? { ...item, unread: !item.unread, isNew: false } : item)
    );
  };

  // View All Notifications handler (loads additional dummy history items)
  const handleViewAllNotifications = () => {
    if (!showAll) {
      const extraItems = [
        {
          id: 6,
          type: 'payment_success',
          title: 'Payment Successful',
          message: 'Payment of ₹450 received via UPI for order #PS1022.',
          time: '3 days ago',
          unread: false,
          isNew: false,
          icon: <FiCheck className="notifications-item-icon green" />,
          iconBg: 'notifications-icon-box green'
        },
        {
          id: 7,
          type: 'subscription_renewed',
          title: 'Subscription Renewed',
          message: 'Your monthly water can delivery subscription was renewed.',
          time: '5 days ago',
          unread: false,
          isNew: false,
          icon: <FiPackage className="notifications-item-icon blue" />,
          iconBg: 'notifications-icon-box blue'
        }
      ];
      setNotificationsList(prev => [...prev, ...extraItems]);
      setShowAll(true);
    } else {
      alert('You are already viewing all available notification history.');
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-card-wrapper">
        
        {/* Header Section */}
        <div className="notifications-header">
          <div className="notifications-title-wrapper">
            <div className="notifications-bell-icon-box">
              <FiBell className="notifications-bell-icon" />
            </div>
            <h2 className="notifications-main-title">Notifications</h2>
          </div>
          <button 
            type="button" 
            className="notifications-mark-read-btn"
            onClick={handleMarkAllAsRead}
          >
            <FiCheck className="notifications-check-icon" /> Mark All as Read
          </button>
        </div>

        {/* Notifications List Body */}
        <div className="notifications-list">
          {notificationsList.map((item) => (
            <div 
              key={item.id} 
              className={`notifications-item-card ${item.unread ? 'unread' : 'read'}`}
              onClick={() => handleToggleRead(item.id)}
            >
              <div className="notifications-item-left">
                <div className={item.iconBg}>
                  {item.icon}
                </div>
                <div className="notifications-item-content">
                  <div className="notifications-item-title-row">
                    <h4 className="notifications-item-heading">{item.title}</h4>
                    {item.isNew && <span className="notifications-new-badge">New</span>}
                  </div>
                  <p className="notifications-item-message">{item.message}</p>
                  <span className="notifications-item-time">{item.time}</span>
                </div>
              </div>
              <div className="notifications-item-right">
                <span className={`notifications-status-dot ${item.unread ? 'active' : 'inactive'}`}></span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Button Section */}
        <div className="notifications-footer">
          <button 
            type="button" 
            className="notifications-view-all-btn"
            onClick={handleViewAllNotifications}
          >
            <span>{showAll ? 'All Notifications Loaded' : 'View All Notifications'}</span>
            <FiChevronRight className="notifications-footer-arrow" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Notifications;