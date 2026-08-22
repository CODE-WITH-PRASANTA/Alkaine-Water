import React, { useState } from 'react';
import './Quartzaddtocart.css'; 
import bottleImage from '../../assets/shop_10.jpg'; // Reference the user's image

const QuartzAddToCart = () => {
  const [quantity, setQuantity] = useState(1);
  const basePriceINR = 300; // Define base price in INR
  const totalPriceINR = (quantity * basePriceINR).toFixed(2);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} White Quartz 2l to cart. Total: ₹${totalPriceINR}`);
    // Add logic to actually add to cart here (e.g., using a cart context or calling an API)
  };

  return (
    <div className="quartz-container">
      <div className="product-layout">
        <div className="image-column">
          <img src={bottleImage} alt="White Quartz 2l Premium Mineral Water" className="product-image" />
        </div>
        <div className="details-column">
          <div className="rating-section">
            <span className="star-rating">★★★★<span className="star-muted">★</span></span>
            <span className="review-count">(1 customer review)</span>
          </div>
          <h1 className="product-title">White Quartz 2l</h1>
          <div className="price-section">
            <span className="price-symbol">₹</span>
            <span className="price-value">{totalPriceINR}</span>
          </div>
          <p className="product-description">
            Clean drinking water should be available to everyone. We work to make it possible.
          </p>
          <div className="action-row">
            <div className="quantity-selector">
              <button onClick={decrementQuantity} className="qty-btn minus">-</button>
              <input type="number" value={quantity} readOnly className="qty-input" />
              <button onClick={incrementQuantity} className="qty-btn plus">+</button>
            </div>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to cart</button>
          </div>
          <div className="meta-section">
            <p className="meta-item"><span className="meta-label">Category:</span> Company</p>
            <p className="meta-item"><span className="meta-label">Tags:</span> delivery, experts, services, strategy, technologies, water</p>
          </div>
          <div className="info-grid">
            <div className="info-block shipping">
              <h3>Shipping</h3>
              <p>USA: Free Shipping</p>
              <p>Other countries: 10%</p>
            </div>
            <div className="info-block payments">
              <h3>Payments</h3>
              <div className="payment-icons">
                {/* Replicate the payment icons using a font, SVGs, or a small combined image */}
                {/* For demonstration, just text */}
                <span>VISA</span>
                <span>[MC]</span>
                <span>Pay</span>
                <span>PayPal</span>
                <span>Pay</span>
                <span>[AE]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuartzAddToCart;