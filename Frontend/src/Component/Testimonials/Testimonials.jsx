import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.css';
import API, { IMG_URL } from "../../api/axios";

const Testimonials = () => {
  // Data states
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Slider states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // ============================================================
  // 1. FETCH DATA FROM BACKEND API
  // ============================================================
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await API.get("/testimonial");
        if (res.data?.success) {
          const dataArray = Array.isArray(res.data.data) ? res.data.data : [];
          setTestimonials(dataArray);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // ============================================================
  // 2. IMAGE URL HELPER (Handles correct /uploads paths)
  // ============================================================
  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/120x120?text=User";
    if (image.startsWith("http")) return image;

    const baseUrl = IMG_URL.replace(/\/$/, ""); 
    
    // Safely construct the URL based on your server configuration
    if (baseUrl.endsWith("uploads")) {
      return `${baseUrl}/testimonial/${image}`;
    } else {
      return `${baseUrl}/uploads/testimonial/${image}`;
    }
  };

  // ============================================================
  // 3. RESPONSIVE SLIDER LOGIC
  // ============================================================
  const maxIndex = Math.max(0, testimonials.length - itemsToShow);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keep index valid whenever the number of visible cards or data changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsToShow, maxIndex, testimonials.length]);

  // Moves exactly one card at a time, wraps at the ends
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const goTo = (i) => setCurrentIndex(Math.min(i, maxIndex));

  const dotCount = maxIndex + 1;

  // ============================================================
  // 4. RENDER UI
  // ============================================================
  if (loading) {
    return (
      <section className="testimonials">
        <div style={{ textAlign: "center", padding: "60px 0", fontSize: "18px" }}>
          Loading testimonials...
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Optionally hide the section if no testimonials exist
  }

  return (
    <section className="testimonials">
      <div className="testimonials-header">
        <span className="testimonials-subheading">TESTIMONIALS</span>
        <h2 className="testimonials-main-title">Here's what our customers say</h2>
      </div>

      <div className="slider-wrapper">
        <button
          className="slider-btn prev-btn"
          onClick={handlePrev}
          aria-label="Previous testimonial"
          disabled={testimonials.length <= itemsToShow}
        >
          <FaChevronLeft />
        </button>

        <div className="testimonials-container">
          <div
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {testimonials.map((item, index) => (
              <div
                key={item._id || index}
                className="testimonial-card"
                style={{ minWidth: `${100 / itemsToShow}%` }}
              >
                <div className="card-inner">
                  <FaQuoteLeft className="bg-quote" />
                  
                  {/* Rating Stars */}
                  <div className="stars">
                    {[...Array(5)].map((_, i) =>
                      i < (item.rating || 5)
                        ? <FaStar key={i} color="#F59E0B" />
                        : <FaRegStar key={i} color="#E5E7EB" />
                    )}
                  </div>
                  
                  {/* Database doesn't have a title field, providing a generic fallback */}
                  <h4 className="testimonial-heading">"CUSTOMER REVIEW"</h4>
                  
                  {/* Review Text */}
                  <p className="testimonial-text">{item.description}</p>
                  
                  {/* User Info */}
                  <div className="user-info">
                    <img 
                      src={getImageUrl(item.image)} 
                      alt={item.name} 
                      className="user-img" 
                      onError={(e) => { e.currentTarget.src = "https://placehold.co/120x120?text=User"; }} 
                    />
                    <div>
                      <span className="user-location">
                        {item.name}{item.address ? `, ${item.address}` : ""}
                      </span>
                      <span className="verified-badge">Verified Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider-btn next-btn"
          onClick={handleNext}
          aria-label="Next testimonial"
          disabled={testimonials.length <= itemsToShow}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Pagination Dots */}
      {testimonials.length > itemsToShow && (
        <div className="dots-container">
          {Array.from({ length: dotCount }).map((_, i) => (
            <button
              key={i}
              className={`dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Testimonials;