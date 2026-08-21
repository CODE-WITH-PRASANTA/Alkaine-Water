import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './HomeTestimonials.css';
import API, { IMG_URL } from "../../api/axios";

const HomeTestimonials = () => {
  // State for dynamic backend data
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
          setTestimonials(Array.isArray(res.data.data) ? res.data.data : []);
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
    if (!image) return "";
    const baseUrl = IMG_URL.replace(/\/$/, ""); 
    
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

  // Keep index valid whenever visible-card count changes or data loads
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsToShow, maxIndex, testimonials.length]);

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
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading testimonials...</div>;
  }

  if (testimonials.length === 0) {
    return null; // Hide the section entirely if there are no testimonials in the database
  }

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <span className="testimonials-subtitle">Testimonials</span>
        <h2 className="testimonials-title">
          Here's what our customers say about us
        </h2>
        <div className="wave-container">
          <svg width="54" height="10" viewBox="0 0 52 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6C5.5 3.5 7.5 3.5 11 6C14.5 8.5 16.5 8.5 20 6C23.5 3.5 25.5 3.5 29 6C32.5 8.5 34.5 8.5 38 6C41.5 3.5 43.5 3.5 47 6" stroke="#4dafff" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        </div>
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

        <div className="slider-container">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="testimonial-slide"
                style={{ minWidth: `${100 / itemsToShow}%` }}
              >
                <div className="testimonial-card">
                  <div className="avatar-wrapper">
                    <div className="avatar-ring">
                      {/* Using dynamic image URL from backend */}
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        className="avatar-img" 
                        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/150"; }} // Fallback if image is broken
                      />
                    </div>
                    <div className="bubble-tail-large" />
                    <div className="bubble-tail-small" />
                  </div>

                  <div className="stars-container">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        // Checking against item.rating instead of item.stars
                        className={`star-icon ${i < (item.rating || 5) ? 'star-active' : 'star-empty'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  
                  {/* Note: Your schema doesn't have a 'title' field, so we use a generic heading here */}
                  <h3 className="card-title">Customer Review</h3>
                  
                  {/* Mapping database fields */}
                  <p className="card-text">{item.description}</p>

                  <div className="card-footer">
                    <span className="user-name">{item.name}</span>
                    <span className="user-location">, {item.address}</span>
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
        <div className="pagination-container">
          {Array.from({ length: dotCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="pagination-dot-button"
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentIndex === index ? (
                <svg
                  className="droplet-active"
                  fill="currentColor"
                  viewBox="0 0 30 42"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 0C15 0 30 16.5 30 26.5C30 35 23.3 42 15 42C6.7 42 0 35 0 26.5C0 16.5 15 0 15 0ZM15 6C12.5 11.5 7 19 7 25.5C7 27.5 7.8 29.5 9.2 30.8C10.6 32 12.5 32.8 14.5 32.8C15.3 32.8 16 32.1 16 31.2C16 30.3 15.3 29.6 14.5 29.6C13.4 29.6 12.3 28.9 11.7 28.2C11.1 27.5 10.6 26.3 10.6 25.1C10.6 20.3 15.5 14 17.7 10.7C18 10.2 18 9.5 17.7 9C17.4 8.5 17.1 7.5 15 6Z"/>
                </svg>
              ) : (
                <div className="dot-inactive" />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default HomeTestimonials;