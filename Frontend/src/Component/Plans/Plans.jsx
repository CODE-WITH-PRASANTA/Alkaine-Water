import React, { useState } from 'react';
import { FaCheckCircle, FaWater, FaTruck, FaRecycle } from 'react-icons/fa';
import './Plans.css';

const Plans = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCardFlip = (id, isFeatured) => {
    if (isFeatured) return;
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const planData = [
    {
      id: "basic",
      title: "Basic Plan",
      subtitle: "*Home & Small Families",
      price: "1,499",
      period: "MO",
      desc: "Ideal for small families prioritizing pure, additive-free daily health.",
      features: [
        { text: "Free Delivery", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaWater /> },
        { text: "Mineral Wellness Water", icon: <FaCheckCircle /> }
      ],
      isFeatured: false
    },
    {
      id: "premium",
      title: "Premium Plan",
      subtitle: "*RATES ARE SUBJECT TO CHANGE",
      price: "2,999",
      period: "YR",
      desc: "Optimized corporate and large household hydration system backed by minerals and vital nutrients.",
      features: [
        { text: "Free Delivery", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaWater /> },
        { text: "Mineral Wellness Water", icon: <FaCheckCircle /> }
      ],
      isFeatured: true
    },
    {
      id: "advanced",
      title: "Advanced Plan",
      subtitle: "*Workplaces, Gyms & Studios",
      price: "2,199",
      period: "MO",
      desc: "Built for offices and gyms dedicated to peak team performance and wellness.",
      features: [
        { text: "Free Delivery", icon: <FaTruck /> },
        { text: "Max 10 Bottles / Month", icon: <FaWater /> },
        { text: "Empty Bottle Pickup", icon: <FaRecycle /> },
        { text: "Max 120 Bottles / Year", icon: <FaWater /> },
        { text: "Mineral Wellness Water", icon: <FaCheckCircle /> }
      ],
      isFeatured: false
    }
  ];

  return (
    <section className="Plans-section">
      <div className="Plans-seo-hidden" aria-hidden="true">
        <h2>Alka Drops - Best Bhubaneswar Water Supplier</h2>
        <h3>Best Water Supplier in Odisha | Pure Wellness Water</h3>
        <p>
          Compare premium pure drinking wellness water subscription rates in Odisha. Alka Drops provides 
          the most reliable residential and business mineral water delivery across Bhubaneswar.
        </p>
      </div>

      <div className="Plans-container">
        {planData.map((plan) => (
          <div 
            key={plan.id} 
            className={`Plans-card ${plan.isFeatured ? 'Plans-featured-card' : 'Plans-standard-card'} ${flippedCards[plan.id] ? 'is-flipped' : ''}`}
            onClick={() => toggleCardFlip(plan.id, plan.isFeatured)}
          >
            <div className="Plans-card-inner">
              {/* CARD FRONT */}
              <div className="Plans-card-front">
                <div className="Plans-price-ring-container">
                  <div className="Plans-price-outer-ring">
                    <div className="Plans-price-bubble">
                      <span className="Plans-currency-symbol">₹</span>
                      <span className="Plans-price-amount">{plan.price}</span>
                      <div className="Plans-period-badge">
                        <span>{plan.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="Plans-card-title">{plan.title}</h3>
                <span className="Plans-card-subtitle">{plan.subtitle}</span>

                {plan.isFeatured ? (
                  <ul className="Plans-feature-list">
                    {plan.features.map((feat, index) => (
                      <li key={index} className="Plans-feature-item">
                        <span className="Plans-feat-icon">{feat.icon}</span>
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="Plans-card-description">{plan.desc}</p>
                )}

                <button 
                  className="Plans-order-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle Order action
                  }}
                >
                  <span>Order Now</span>
                  <div className="Plans-order-btn-accent"></div>
                </button>
              </div>

              {/* CARD BACK */}
              {!plan.isFeatured && (
                <div className="Plans-card-back">
                  <div className="Plans-price-ring-container">
                    <div className="Plans-price-outer-ring variant-blue">
                      <div className="Plans-price-bubble variant-blue">
                        <span className="Plans-currency-symbol">₹</span>
                        <span className="Plans-price-amount">{plan.price}</span>
                        <div className="Plans-period-badge">
                          <span>{plan.period}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="Plans-card-title text-white">{plan.title}</h3>
                  <span className="Plans-card-subtitle text-lightblue">{plan.subtitle}</span>

                  <ul className="Plans-feature-list text-white">
                    {plan.features.map((feat, index) => (
                      <li key={index} className="Plans-feature-item">
                        <span className="Plans-feat-icon text-white">{feat.icon}</span>
                        <span>{feat.text}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className="Plans-order-btn variant-light"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle Order action
                    }}
                  >
                    <span>Order Now</span>
                    <div className="Plans-order-btn-accent font-accent"></div>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Plans;