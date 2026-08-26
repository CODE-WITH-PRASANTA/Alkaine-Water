import React, { useState } from 'react';
import './Addtocart.css';
  
const Addtocart = () => {
  // टेस्टिंग के लिए शुरुआती कार्ट डेटा (आप इसे हटाकर खाली [] भी रख सकते हैं)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Premium Quality Water Bottle", price: "$25.00", quantity: 1, image: "https://via.placeholder.com/80" },
    { id: 2, name: "Eco-Friendly Travel Mug", price: "$18.50", quantity: 2, image: "https://via.placeholder.com/80" }
  ]);

  // कार्ट से आइटम हटाने के लिए फ़ंक्शन
  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // 'Return to shop' बटन क्लिक हैंडलर
  const handleReturnToShop = () => {
    window.location.href = '/shop'; // यदि react-router-dom उपयोग कर रहे हैं तो navigate('/shop') का उपयोग करें
  };

  return (
    <div className="cart-page-container">
      
      {cartItems.length === 0 ? (
        /* --- एम्प्टी कार्ट व्यू (यह बिल्कुल आपकी संदर्भ छवि जैसा दिखेगा) --- */
        <div className="empty-cart-wrapper">
          <div className="empty-cart-alert-box">
            <span className="empty-cart-text">Your cart is currently empty.</span>
          </div>
          
          <button className="return-shop-btn" onClick={handleReturnToShop}>
            Return to shop
          </button>
        </div>
      ) : (
        /* --- डायनेमिक एक्टिव कार्ट व्यू (जब आइटम्स मौजूद हों) --- */
        <div className="active-cart-wrapper">
          <h2 className="cart-heading">Shopping Cart ({cartItems.length} items)</h2>
          
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-info">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div>
                    <h4 className="item-title">{item.name}</h4>
                    <p className="item-qty">Qty: {item.quantity}</p>
                  </div>
                </div>
                
                <div className="cart-item-actions">
                  <span className="item-price">{item.price}</span>
                  <button 
                    className="remove-item-btn" 
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove Item"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* कार्ट को टेस्ट करने के लिए एक हेल्पिंग बटन (सिर्फ डेवलपर की टेस्टिंग के लिए) */}
          <button className="clear-all-demo-btn" onClick={() => setCartItems([])}>
            Simulate Empty Cart
          </button>
        </div>
      )}
      
    </div>
  );
};

export default Addtocart;