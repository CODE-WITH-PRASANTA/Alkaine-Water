import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaRegStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Testimonials.css';

import user1 from "../../assets/cl1.jpg";
import user2 from "../../assets/cl2.jpg";
import user3 from "../../assets/cl3.jpg";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  const data = [
    { id: 1, name: "California", text: "Have used their service for five years & can say the service has always been amazing.", rating: 4, img: user1, title: "GREAT TASTING WATER" },
    { id: 2, name: "Los Angeles", text: "The team was very professional and answered all my questions in person.", rating: 5, img: user2, title: "PROFESSIONAL TEAM" },
    { id: 3, name: "Los Angeles", text: "The water is delicious and fresh. Highly recommend!", rating: 4, img: user3, title: "THE WATER IS DELICIOUS" },
    { id: 4, name: "New York", text: "Excellent delivery speed and quality. Very consistent.", rating: 5, img: user1, title: "TOP NOTCH SERVICE" },
    { id: 5, name: "Chicago", text: "Very happy with the subscription plans and pricing.", rating: 4, img: user2, title: "GREAT VALUE" },
    { id: 6, name: "Texas", text: "Best water service I have ever used. Prompt delivery.", rating: 5, img: user3, title: "HIGHLY RECOMMEND" }
  ];

  const maxIndex = Math.max(0, data.length - itemsToShow);

  // Responsive items-per-view
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

  // Clamp index whenever itemsToShow changes so we never overshoot / show blank space
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [itemsToShow, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const goTo = (i) => setCurrentIndex(Math.min(i, maxIndex));

  const dotCount = maxIndex + 1;

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
        >
          <FaChevronLeft />
        </button>

        <div className="testimonials-container">
          <div
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {data.map((item) => (
              <div
                key={item.id}
                className="testimonial-card"
                style={{ minWidth: `${100 / itemsToShow}%` }}
              >
                <div className="card-inner">
                  <FaQuoteLeft className="bg-quote" />
                  <div className="stars">
                    {[...Array(5)].map((_, i) =>
                      i < item.rating
                        ? <FaStar key={i} color="#F59E0B" />
                        : <FaRegStar key={i} color="#E5E7EB" />
                    )}
                  </div>
                  <h4 className="testimonial-heading">"{item.title}"</h4>
                  <p className="testimonial-text">{item.text}</p>
                  <div className="user-info">
                    <img src={item.img} alt={item.name} className="user-img" />
                    <div>
                      <span className="user-location">{item.name}</span>
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
        >
          <FaChevronRight />
        </button>
      </div>

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
    </section>
  );
};

export default Testimonials;