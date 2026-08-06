import React, { useState, useEffect, useRef } from 'react';
import './HomeTestimonials.css';

// Import your user asset images from your project directory paths
import avatar1 from '../../assets/testimonial-1.jpg';
import avatar2 from '../../assets/testimonial-2.jpg';
import avatar3 from '../../assets/testimonial-4.jpg';
import avatar4 from '../../assets/testimonial-3.jpg';

const testimonialsData = [
  {
    id: 1,
    stars: 4,
    title: "I've had the Best Experience",
    text: "We are extremely happy with Alka Drops's service. They are very prompt. Billing always correct. And they give plenty of notice of the next delivery it is very easy.",
    name: "RODHA THELMA",
    location: "California",
    avatar: avatar1
  },
  {
    id: 2,
    stars: 3,
    title: "Great Tasting Water & Awesome",
    text: "Have used their service for five years & can say the service has always been amazing. The delivery driver is friendly. The water tastes really good & we ...",
    name: "LILLIAN GRACE",
    location: "California",
    avatar: avatar2
  },
  {
    id: 3,
    stars: 5,
    title: "Team was Very Professional",
    text: "I went to the Alka Drops water office to speak with someone in person about Alka Drops services. The team was very professional and answered all my questions.",
    name: "LUKE NOBERT",
    location: "Los Angeles",
    avatar: avatar3
  },
  {
    id: 4,
    stars: 3,
    title: "The Water is Delicious",
    text: "I went to the Alka Drops water office to speak with someone in person about Alka Drops services. The team was very professional and answered all my questions.",
    name: "LUKE NOBERT",
    location: "Los Angeles",
    avatar: avatar4
  }
];

const HomeTestimonials = () => {
  // Triple items for seamless infinite loops both forward and backwards
  const extendedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];
  
  // Initialize to start directly on the middle array copy
  const [activeIndex, setActiveIndex] = useState(testimonialsData.length);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.style.transition = 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)';
      }
      
      setActiveIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        
        // Reset positioning seamlessly when hitting boundary clones
        if (nextIndex >= testimonialsData.length * 2) {
          setTimeout(() => {
            if (containerRef.current) {
              containerRef.current.style.transition = 'none';
              setActiveIndex(testimonialsData.length);
            }
          }, 700);
        }
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleDotClick = (index) => {
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 700ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
    setActiveIndex(testimonialsData.length + index);
  };

  const handleCardHover = (index) => {
    setIsHovered(true);
    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 450ms cubic-bezier(0.4, 0, 0.2, 1)';
    }
    setActiveIndex(index);
  };

  const currentDotIndex = activeIndex % testimonialsData.length;

  return (
    <section className="testimonials-section">
      {/* Header Copy */}
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

      {/* Centered Slider Container */}
      <div className="slider-container">
        <div className="slider-track-viewport">
          <div 
            ref={containerRef}
            className="slider-track"
            style={{
              // Math formula anchors the active card index precisely at 50vw center screen coordinates
              transform: `translateX(calc(-${activeIndex * 396}px + 50vw - 198px))`
            }}
          >
            {extendedTestimonials.map((item, index) => {
              const isCurrentActive = index === activeIndex;

              return (
                <div
                  key={index}
                  onMouseEnter={() => handleCardHover(index)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`testimonial-card ${isCurrentActive ? 'active-card' : ''}`}
                >
                  {/* Thought Bubble Avatars Placement */}
                  <div className="avatar-wrapper">
                    <div className={`avatar-ring ${isCurrentActive ? 'active-ring' : ''}`}>
                      <img 
                        src={item.avatar} 
                        alt={item.name} 
                        className="avatar-img"
                      />
                    </div>
                    <div className={`bubble-tail-large ${isCurrentActive ? 'active-tail-color' : ''}`} />
                    <div className={`bubble-tail-small ${isCurrentActive ? 'active-tail-color' : ''}`} />
                  </div>

                  {/* Ratings Stars Structure */}
                  <div className="stars-container">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star-icon ${i < item.stars ? (isCurrentActive ? 'star-active' : 'star-inactive-filled') : 'star-empty'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Body Content */}
                  <h3 className="card-title">
                    {item.title}
                  </h3>
                  <p className={`card-text ${isCurrentActive ? 'active-text' : ''}`}>
                    {item.text}
                  </p>

                  {/* Card Metadata Footer Line */}
                  <div className="card-footer">
                    <span className="user-name">{item.name}</span>
                    <span className="user-location">, {item.location}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pagination Controls Droplets */}
      <div className="pagination-container">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="pagination-dot-button"
            aria-label={`Go to slide ${index + 1}`}
          >
            {currentDotIndex === index ? (
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
    </section>
  );
};

export default HomeTestimonials;