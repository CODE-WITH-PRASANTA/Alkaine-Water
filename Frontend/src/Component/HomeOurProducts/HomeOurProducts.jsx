import React, { useState, useEffect } from 'react';
import { 
  FiX, 
  FiShoppingCart, 
  FiZap, 
  FiDroplet, 
  FiTag, 
  FiBox, 
  FiFeather, 
  FiShield 
} from 'react-icons/fi';
import './HomeOurProducts.css';

// --- LOCAL IMAGE ASSET PATHS ---
import img2Ltr from '../../assets/shop-1.jpg';
import img15Ltr from '../../assets/shop-2.jpg';
import img12Ltr from '../../assets/shop-3.jpg';
import imgCombo from '../../assets/shop-4.jpg';
import imgDispenser from '../../assets/shop-5.jpg';

// Overlapping visual elements from the hero banner graphics
import iceBgCluster from '../../assets/ice.png';
import giantJugBg from '../../assets/shop-top-image.png';

const HomeOurProducts = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [modalQuantity, setModalQuantity] = useState(1);

  const products = [
    {
      id: 1,
      name: '2 Ltr Bottled Water',
      price: 1045,
      originalPrice: 1200,
      isSale: true,
      delivery: 'Delivery Tom 4:30pm – 6:30pm',
      category: 'Water',
      packSize: '2 Litre',
      type: 'Alkaline Mineral Water',
      benefits: 'Hydration, pH Balance, Essential Minerals',
      img: img2Ltr,
      gallery: [img2Ltr, img15Ltr, img12Ltr, imgCombo],
      rotateImg: true
    },
    {
      id: 2,
      name: '15 Ltr Bottled Water',
      price: 1670,
      originalPrice: 1850,
      isSale: true,
      delivery: 'Delivery Mon 9:30am – 10:30am',
      category: 'Water',
      packSize: '15 Litre',
      type: 'Purified Spring Water',
      benefits: 'Family Hydration, Clean Finish, Natural Balance',
      img: img15Ltr,
      gallery: [img15Ltr, img2Ltr, img12Ltr],
      rotateImg: false
    },
    {
      id: 3,
      name: '12 Ltr Bottled Water',
      price: 1340,
      originalPrice: null,
      isSale: false,
      delivery: 'Delivery Mon 9:30am – 10:30am',
      category: 'Water',
      packSize: '12 Litre',
      type: 'Mountain Spring Water',
      benefits: 'High Purity, Essential Trace Minerals',
      img: img12Ltr,
      gallery: [img12Ltr, img15Ltr, imgCombo],
      rotateImg: false
    },
    {
      id: 4,
      name: '15+2 Ltr Combo Pack',
      price: 2110,
      originalPrice: 2400,
      isSale: true,
      delivery: 'Delivery Tom 4:30pm – 6:30pm',
      category: 'Combo Offer',
      packSize: '15L + 2L',
      type: 'Alkaline & Mineral Blend',
      benefits: 'Complete Daily Office & Home Hydration',
      img: imgCombo,
      gallery: [imgCombo, img2Ltr, img15Ltr, imgDispenser],
      rotateImg: false
    },
    {
      id: 5,
      name: 'Water Dispenser',
      price: 5770,
      originalPrice: 6500,
      isSale: true,
      delivery: 'Delivery Mon 8:30am – 9:30am',
      category: 'Equipment',
      packSize: 'Standard Unit',
      type: 'Electric Hot & Cold Purifier',
      benefits: 'Instant Hot/Cold Water, Energy Efficient',
      img: imgDispenser,
      gallery: [imgDispenser, imgCombo, img15Ltr],
      rotateImg: false
    }
  ];

  // Lock body scroll when modal opens
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct]);

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setActiveImageIdx(0);
    setModalQuantity(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const activeGallery = selectedProduct?.gallery?.length 
    ? selectedProduct.gallery 
    : (selectedProduct ? [selectedProduct.img] : []);

  return (
    <div className="HomeOurProducts-container">
      {/* --- HERO HEADER GRAPHIC CONTAINER --- */}
      <div className="HomeOurProducts-heroSection">
        <div className="HomeOurProducts-graphicWrapper">
          <div className="HomeOurProducts-badgeOuterCircle">
            <div className="HomeOurProducts-badgeInnerCircle">
              <div className="HomeOurProducts-badgeContainer">
                <span>No</span>
                <span className="HomeOurProducts-badgeMiddleText">Minimum</span>
                <span>Order</span>
              </div>
            </div>
          </div>
          <div className="HomeOurProducts-jugAndIceContainer">
            <img 
              src={giantJugBg} 
              alt="Water jug graphic highlight" 
              className="HomeOurProducts-giantJug" 
              onError={(e) => { e.target.style.visibility = 'hidden'; }}
            />
            <img 
              src={iceBgCluster} 
              alt="Ice graphic highlight" 
              className="HomeOurProducts-iceCluster" 
              onError={(e) => { e.target.style.visibility = 'hidden'; }}
            />
          </div>
        </div>

        <div className="HomeOurProducts-textContent">
          <h1 className="HomeOurProducts-bgText">100% PURE WATER.NAT</h1>
          <div className="HomeOurProducts-subHeading">Our Products</div>
          <h2 className="HomeOurProducts-mainHeading">Delivered fresh to your door by our team.</h2>
          <svg className="HomeOurProducts-waveSvg" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C5 1 5 7 10 4C15 1 15 7 20 4C25 1 25 7 30 4C35 1 35 7 40 4" stroke="#5ac8fa" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* --- RESPONSIVE CARD GRID --- */}
      <div className="HomeOurProducts-grid">
        {products.map((product) => {
          const isHovered = hoveredCard === product.id;
          return (
            <div
              key={product.id}
              className={`HomeOurProducts-card ${isHovered ? 'is-hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(product.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => openProductModal(product)}
            >
              {isHovered && (
                <div className="HomeOurProducts-ribbon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  READ MORE
                </div>
              )}

              {/* Product Graphic Render Wrapper */}
              <div className="HomeOurProducts-imageContainer">
                <img
                  src={product.img}
                  alt={product.name}
                  className={`HomeOurProducts-productImg ${product.rotateImg ? 'should-rotate' : ''}`}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/240x240/eef3fc/2b39b3?text=${encodeURIComponent(product.name)}`;
                  }}
                />
              </div>

              {/* Product Meta Info Block */}
              <div className="HomeOurProducts-metaBlock">
                <div className="HomeOurProducts-priceBox">
                  ₹{product.price.toLocaleString('en-IN')}.00
                </div>
                <div className="HomeOurProducts-title">{product.name}</div>
                <div className="HomeOurProducts-deliveryText">{product.delivery}</div>
                <div className="HomeOurProducts-btnWrapper">
                  <button 
                    className="HomeOurProducts-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      openProductModal(product);
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- QUICK VIEW DETAILS POPUP MODAL --- */}
      {selectedProduct && (
        <div className="HomeOurProducts-modalOverlay" onClick={closeProductModal}>
          <div className="HomeOurProducts-modalWrapper" onClick={(e) => e.stopPropagation()}>
            <button className="HomeOurProducts-modalCloseBtn" onClick={closeProductModal} aria-label="Close modal">
              <FiX />
            </button>

            {/* Left Column: Image & Gallery */}
            <div className="HomeOurProducts-modalLeftPane">
              <div className="HomeOurProducts-modalHeroImage">
                {selectedProduct.isSale && <span className="HomeOurProducts-modalSaleBadge">%</span>}

                {activeGallery.length > 1 && (
                  <button 
                    className="HomeOurProducts-navArrow prev"
                    onClick={() => setActiveImageIdx(prev => (prev === 0 ? activeGallery.length - 1 : prev - 1))}
                  >
                    ‹
                  </button>
                )}

                <img 
                  src={activeGallery[activeImageIdx] || selectedProduct.img} 
                  alt={selectedProduct.name} 
                  className="HomeOurProducts-modalCoreImg"
                />

                {activeGallery.length > 1 && (
                  <button 
                    className="HomeOurProducts-navArrow next"
                    onClick={() => setActiveImageIdx(prev => (prev === activeGallery.length - 1 ? 0 : prev + 1))}
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {activeGallery.length > 1 && (
                <div className="HomeOurProducts-modalThumbs">
                  {activeGallery.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      className={`HomeOurProducts-thumbBtn ${idx === activeImageIdx ? 'active' : ''}`}
                      onClick={() => setActiveImageIdx(idx)}
                    >
                      <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Ordering */}
            <div className="HomeOurProducts-modalRightPane">
              <div className="HomeOurProducts-modalStars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="HomeOurProducts-star">★</span>
                ))}
              </div>

              <h2 className="HomeOurProducts-modalTitle">{selectedProduct.name}</h2>

              <p className="HomeOurProducts-modalDesc">
                Pure, family-sized alkaline water enriched with vital minerals for everyday cellular energy.
              </p>

              <div className="HomeOurProducts-modalPriceRow">
                {selectedProduct.originalPrice && (
                  <span className="HomeOurProducts-modalOldPrice">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}.00
                  </span>
                )}
                <span className="HomeOurProducts-modalActivePrice">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}.00
                </span>
              </div>

              {/* Product Specifications */}
              <div className="HomeOurProducts-modalSpecs">
                <div className="HomeOurProducts-specRow">
                  <div className="HomeOurProducts-specIcon"><FiDroplet /></div>
                  <div className="HomeOurProducts-specText">
                    <span className="HomeOurProducts-specLabel">Category</span>
                    <span className="HomeOurProducts-specVal">{selectedProduct.category}</span>
                  </div>
                </div>

                <div className="HomeOurProducts-specRow">
                  <div className="HomeOurProducts-specIcon"><FiTag /></div>
                  <div className="HomeOurProducts-specText">
                    <span className="HomeOurProducts-specLabel">Tag</span>
                    <span className="HomeOurProducts-tagGreen">New</span>
                  </div>
                </div>

                <div className="HomeOurProducts-specRow">
                  <div className="HomeOurProducts-specIcon"><FiBox /></div>
                  <div className="HomeOurProducts-specText">
                    <span className="HomeOurProducts-specLabel">Pack Size</span>
                    <span className="HomeOurProducts-specVal">{selectedProduct.packSize}</span>
                  </div>
                </div>

                <div className="HomeOurProducts-specRow">
                  <div className="HomeOurProducts-specIcon"><FiFeather /></div>
                  <div className="HomeOurProducts-specText">
                    <span className="HomeOurProducts-specLabel">Type</span>
                    <span className="HomeOurProducts-specVal">{selectedProduct.type}</span>
                  </div>
                </div>

                <div className="HomeOurProducts-specRow">
                  <div className="HomeOurProducts-specIcon"><FiShield /></div>
                  <div className="HomeOurProducts-specText">
                    <span className="HomeOurProducts-specLabel">Benefits</span>
                    <span className="HomeOurProducts-specVal">{selectedProduct.benefits}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="HomeOurProducts-modalQuantity">
                <span className="HomeOurProducts-qtyTitle">Quantity</span>
                <div className="HomeOurProducts-qtyControls">
                  <button 
                    type="button" 
                    onClick={() => setModalQuantity(prev => Math.max(prev - 1, 1))}
                  >
                    –
                  </button>
                  <span>{modalQuantity}</span>
                  <button 
                    type="button" 
                    onClick={() => setModalQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="HomeOurProducts-modalActions">
                <button 
                  className="HomeOurProducts-modalAddBtn"
                  onClick={closeProductModal}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button 
                  className="HomeOurProducts-modalBuyBtn"
                  onClick={closeProductModal}
                >
                  <FiZap /> Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeOurProducts;