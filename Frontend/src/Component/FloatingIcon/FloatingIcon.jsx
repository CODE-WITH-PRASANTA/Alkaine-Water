import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import "./FloatingIcon.css";

const FloatingIcon = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  const phoneNumber = "919937065001";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================
     CALL BUTTON
  ========================= */
  const handleCall = () => {
    window.location.href = `tel:+${phoneNumber}`;
  };

  /* =========================
     WHATSAPP BUTTON
  ========================= */
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Alka Drops! 👋\n\nI would like to know more about your water delivery service."
    );

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  /* =========================
     BACK TO TOP
  ========================= */
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="FloatingIconWrapper">

      {/* =========================
          WHATSAPP BUTTON
      ========================= */}
      <button
        type="button"
        className="FloatingIconButton FloatingIconWhatsApp"
        onClick={handleWhatsApp}
        aria-label="Chat with Alka Drops on WhatsApp"
        title="WhatsApp"
      >
        <FaWhatsapp className="FloatingIconWhatsAppIcon" />

        <span className="FloatingIconTooltip">
          WhatsApp
        </span>
      </button>

      {/* =========================
          CALL BUTTON
      ========================= */}
      <button
        type="button"
        className="FloatingIconButton FloatingIconCall"
        onClick={handleCall}
        aria-label="Call Alka Drops"
        title="Call Us"
      >
        <FaPhoneAlt className="FloatingIconCallIcon" />

        <span className="FloatingIconTooltip">
          Call Us
        </span>
      </button>

      {/* =========================
          BACK TO TOP
      ========================= */}
      {showTopButton && (
        <button
          type="button"
          className="FloatingIconButton FloatingIconTop"
          onClick={handleBackToTop}
          aria-label="Back to top"
          title="Back to Top"
        >
          <FaArrowUp className="FloatingIconTopIcon" />

          <span className="FloatingIconTooltip">
            Back to Top
          </span>
        </button>
      )}
    </div>
  );
};

export default FloatingIcon;