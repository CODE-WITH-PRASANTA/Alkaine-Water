import React, { useState } from 'react';
import { 
  FaUser, 
  FaPhoneAlt, 
  FaMapMarkerAlt, 
  FaCommentAlt, 
  FaPaperPlane, 
  FaWhatsapp,
  FaCheck
} from 'react-icons/fa';
import { IoClose, IoWater } from 'react-icons/io5';
import './Floating.css';

const Floating = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Alka Drops Order Submitted:', formData);
    
    // Instantly trigger green state (0.1s CSS transition)
    setIsSubmitted(true);
    
    // Smoothly close modal shortly after showing success state
    setTimeout(() => {
      setIsOpen(false);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="floating-overlay">
      <div className="floating-card">
        {/* Top Water Drop Badge Icon */}
        <div className="floating-top-badge">
          <IoWater className="floating-badge-icon" />
        </div>

        {/* Small Elegant Close Button */}
        <button 
          type="button" 
          className="floating-close-btn" 
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          <IoClose />
        </button>

        {/* Header Title Section */}
        <div className="floating-header">
          <h2 className="floating-title">
             Alka Drops <br />
            <span>Water Delivered</span>
          </h2>
          <p className="floating-subtitle-script">to Your Doorstep</p>
          <p className="floating-description">
            Pure. Safe. Refreshing. <br />
            Delivered with care to your doorstep.
          </p>
        </div>

        {/* Form Inputs */}
        <form className="floating-form" onSubmit={handleSubmit}>
          <div className="floating-input-group">
            <FaUser className="floating-input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="floating-input-group">
            <FaPhoneAlt className="floating-input-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="floating-input-group">
            <FaMapMarkerAlt className="floating-input-icon" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="floating-input-group floating-textarea-group">
            <FaCommentAlt className="floating-input-icon floating-textarea-icon" />
            <textarea
              name="message"
              placeholder="Message"
              rows="2"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit Button with Instant Green Transition */}
          <button 
            type="submit" 
            className={`floating-submit-btn ${isSubmitted ? 'submitted-success' : ''}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? (
              <>
                <FaCheck className="floating-btn-icon" />
                Confirmed!
              </>
            ) : (
              <>
                <FaPaperPlane className="floating-btn-icon" />
                Submit 
              </>
            )}
          </button>
        </form>

        {/* Call & WhatsApp Quick Buttons */}
        <div className="floating-action-grid">
          <a href="tel:+919876543210" className="floating-action-card">
            <div className="floating-action-icon floating-call-bg">
              <FaPhoneAlt />
            </div>
            <div className="floating-action-text">
              <strong>Call Us</strong>
              <span>Tap to Call</span>
            </div>
          </a>

          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="floating-action-card"
          >
            <div className="floating-action-icon floating-whatsapp-bg">
              <FaWhatsapp />
            </div>
            <div className="floating-action-text">
              <strong>WhatsApp</strong>
              <span>Chat with Us</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Floating;