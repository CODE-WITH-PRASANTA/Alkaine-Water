import React, { useState } from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCommentAlt,
  FaPaperPlane,
  FaWhatsapp,
  FaCheck,
} from "react-icons/fa";
import { IoClose, IoWater } from "react-icons/io5";
import "./Floating.css";

const Floating = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });

  /* ============================================
     INPUT CHANGE
  ============================================ */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ============================================
     SUBMIT
  ============================================ */

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Alka Drops Order Submitted:", formData);

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);

      setFormData({
        name: "",
        phone: "",
        address: "",
        message: "",
      });

      onClose();
    }, 1000);
  };

  /* ============================================
     CALL
  ============================================ */

  const handleCall = () => {
    window.location.href = "tel:+919937065001";
  };

  /* ============================================
     WHATSAPP
  ============================================ */

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Alka Drops! 👋\n\nI would like to know more about your water delivery service."
    );

    window.open(
      `https://wa.me/919937065001?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ============================================
     DON'T RENDER WHEN CLOSED
  ============================================ */

  if (!isOpen) {
    return null;
  }

  return (
    <div className="floating-overlay">

      <div className="floating-card">

        {/* ======================================
            WATER BADGE
        ====================================== */}

        <div className="floating-top-badge">
          <IoWater className="floating-badge-icon" />
        </div>

        {/* ======================================
            CLOSE
        ====================================== */}

        <button
          type="button"
          className="floating-close-btn"
          onClick={onClose}
          aria-label="Close Alka Drops form"
        >
          <IoClose />
        </button>

        {/* ======================================
            HEADER
        ====================================== */}

        <div className="floating-header">

          <h2 className="floating-title">
            Alka Drops
            <br />

            <span>
              Water Delivered
            </span>
          </h2>

          <div className="floating-subtitle-wrapper">

            <span className="floating-subtitle-line"></span>

            <p className="floating-subtitle-script">
              to Your Doorstep
            </p>

            <span className="floating-subtitle-line"></span>

          </div>

          <p className="floating-description">
            Pure. Safe. Refreshing.
            <br />
            Delivered with care to your doorstep.
          </p>

        </div>

        {/* ======================================
            FORM
        ====================================== */}

        <form
          className="floating-form"
          onSubmit={handleSubmit}
        >

          {/* NAME */}

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

          {/* PHONE */}

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

          {/* ADDRESS */}

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

          {/* MESSAGE */}

          <div className="floating-input-group floating-textarea-group">

            <FaCommentAlt
              className="floating-input-icon floating-textarea-icon"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows="2"
              value={formData.message}
              onChange={handleChange}
            />

          </div>

          {/* ====================================
              SUBMIT
          ==================================== */}

          <button
            type="submit"
            className={`floating-submit-btn ${
              isSubmitted ? "submitted-success" : ""
            }`}
            disabled={isSubmitted}
          >

            {isSubmitted ? (
              <>
                <FaCheck className="floating-btn-icon" />
                <span>Confirmed!</span>
              </>
            ) : (
              <>
                <FaPaperPlane className="floating-btn-icon" />
                <span>Submit</span>
              </>
            )}

          </button>

        </form>

        {/* ======================================
            CALL + WHATSAPP
        ====================================== */}

        <div className="floating-action-grid">

          {/* CALL */}

          <button
            type="button"
            className="floating-action-card"
            onClick={handleCall}
            aria-label="Call Alka Drops"
          >

            <div className="floating-action-icon floating-call-bg">
              <FaPhoneAlt />
            </div>

            <div className="floating-action-text">

              <strong>
                Call Us
              </strong>

              <span>
                +91 99370 65001
              </span>

            </div>

          </button>

          {/* WHATSAPP */}

          <button
            type="button"
            className="floating-action-card"
            onClick={handleWhatsApp}
            aria-label="WhatsApp Alka Drops"
          >

            <div className="floating-action-icon floating-whatsapp-bg">
              <FaWhatsapp />
            </div>

            <div className="floating-action-text">

              <strong>
                WhatsApp
              </strong>

              <span>
                Chat with Us
              </span>

            </div>

          </button>

        </div>

      </div>

    </div>
  );
};

export default Floating;