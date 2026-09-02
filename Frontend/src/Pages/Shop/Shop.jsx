import React, { useState, useMemo, useEffect } from 'react';
import { 
  FiSearch, 
  FiChevronDown, 
  FiArrowLeft, 
  FiArrowRight, 
  FiShoppingCart, 
  FiCheck,
  FiX,
  FiDroplet,
  FiTag,
  FiBox,
  FiFeather,
  FiShield,
  FiZap
} from 'react-icons/fi';
import './Shop.css';

// =========================================================
// LOCAL IMAGE IMPORTS
// =========================================================
import WhiteQuartzImg from '../../assets/shop1.jpg'; 
import EternalFlowImg from '../../assets/shop_01.jpg';
import MistValleyImg from '../../assets/shop_04.jpg';
import PureGlacierImg from '../../assets/shop_08-357x500 (1).jpg';
import AquaVitaeImg from '../../assets/shop_08-357x500.jpg';
import AlpineDewImg from '../../assets/shop_01.jpg';
import ReverseOsmosisImg from '../../assets/shop_10.jpg';
import BannerBgImg from '../../assets/breadcrum.jpeg';

// =========================================================
// PRODUCT DATA ARRAY
// =========================================================
const ALL_PRODUCTS = [
  { 
    id: 1, 
    name: "White Quartz 2l", 
    price: 3.99, 
    rating: 5, 
    category: "Products", 
    tags: ["#water", "#delivery"], 
    image: WhiteQuartzImg, 
    isSale: false,
    gallery: [WhiteQuartzImg, EternalFlowImg, MistValleyImg, PureGlacierImg],
    packSize: "2 Litre",
    type: "Natural Spring Water",
    benefits: "Active Hydration, Balanced pH, Electrolytes"
  },
  { 
    id: 2, 
    name: "Eternal Flow 0.5l Tide", 
    price: 1.50, 
    rating: 5, 
    category: "Products", 
    tags: ["#water"], 
    image: EternalFlowImg, 
    isSale: false,
    gallery: [EternalFlowImg, WhiteQuartzImg, AlpineDewImg],
    packSize: "0.5 Litre",
    type: "Electrolyte Water",
    benefits: "Rapid Hydration, Trace Minerals"
  },
  { 
    id: 3, 
    name: "Mist Valley 1.5l", 
    price: 2.99, 
    rating: 4, 
    category: "Water", 
    tags: ["#company"], 
    image: MistValleyImg, 
    isSale: false,
    gallery: [MistValleyImg, AquaVitaeImg, ReverseOsmosisImg],
    packSize: "1.5 Litre",
    type: "Mineral Water",
    benefits: "Natural Calcium & Magnesium"
  },
  { 
    id: 4, 
    name: "Pure Glacier 1l", 
    price: 2.10, 
    rating: 5, 
    category: "Water", 
    tags: ["#delivery"], 
    image: PureGlacierImg, 
    isSale: false,
    gallery: [PureGlacierImg, MistValleyImg, WhiteQuartzImg],
    packSize: "1 Litre",
    type: "Glacier Water",
    benefits: "Crisp Taste, Low Mineral Content"
  },
  { 
    id: 5, 
    name: "Aqua Vitae 0.75l", 
    price: 4.50, 
    rating: 5, 
    category: "Filters", 
    tags: ["#experts"], 
    image: AquaVitaeImg, 
    isSale: false,
    gallery: [AquaVitaeImg, EternalFlowImg],
    packSize: "0.75 Litre",
    type: "Alkaline Water",
    benefits: "Detoxification, Cellular Energy"
  },
  { 
    id: 6, 
    name: "Alpine Dew 2.5l", 
    price: 5.00, 
    rating: 4, 
    category: "Company", 
    tags: ["#strategy"], 
    image: AlpineDewImg, 
    isSale: false,
    gallery: [AlpineDewImg, WhiteQuartzImg],
    packSize: "2.5 Litre",
    type: "Mountain Water",
    benefits: "High Purity, Pure Source"
  },
  { 
    id: 7, 
    name: "Liquid Sky 1.5l", 
    price: 2.49, 
    rating: 5, 
    category: "Company", 
    tags: ["#water", "#strategy"], 
    image: WhiteQuartzImg, 
    isSale: false,
    gallery: [WhiteQuartzImg, EternalFlowImg],
    packSize: "1.5 Litre",
    type: "Vapour Distilled",
    benefits: "Essential Minerals Added"
  },
  { 
    id: 8, 
    name: "Calm Source 0.75l", 
    price: 5.99, 
    rating: 4, 
    category: "Filters", 
    tags: ["#services"], 
    image: EternalFlowImg, 
    isSale: false,
    gallery: [EternalFlowImg, PureGlacierImg],
    packSize: "0.75 Litre",
    type: "Spring Blend",
    benefits: "Daily Balance, Clean Finish"
  },
  { 
    id: 9, 
    name: "Blue Pulse 0.5l", 
    price: 2.49, 
    rating: 5, 
    category: "Products", 
    tags: ["#delivery"], 
    image: MistValleyImg, 
    isSale: false,
    gallery: [MistValleyImg, ReverseOsmosisImg],
    packSize: "0.5 Litre",
    type: "Structured Water",
    benefits: "Deep Absorption"
  },
  { 
    id: 10, 
    name: "Reverse Osmosis Pro", 
    price: 6.49, 
    originalPrice: 7.00, 
    rating: 5, 
    category: "Filters", 
    tags: ["#technologies", "#water"], 
    image: ReverseOsmosisImg, 
    isSale: true,
    gallery: [ReverseOsmosisImg, WhiteQuartzImg, PureGlacierImg, AlpineDewImg],
    packSize: "2 Litre",
    type: "Alkaline Mineral Water",
    benefits: "Hydration, pH Balance, Essential Minerals"
  },
  { 
    id: 11, 
    name: "Whisper Spring 0.75l", 
    price: 3.99, 
    rating: 5, 
    category: "Water", 
    tags: ["#experts"], 
    image: PureGlacierImg, 
    isSale: false,
    gallery: [PureGlacierImg, MistValleyImg],
    packSize: "0.75 Litre",
    type: "Artesian Water",
    benefits: "Smooth Taste, Natural Silica"
  },
  { 
    id: 12, 
    name: "Additional Cartridges Pro", 
    price: 5.49, 
    rating: 4, 
    category: "Filters", 
    tags: ["#services", "#technologies"], 
    image: AlpineDewImg, 
    isSale: false,
    gallery: [AlpineDewImg, AquaVitaeImg],
    packSize: "Pack of 2",
    type: "Multi-stage Purifier",
    benefits: "Removes Micro-particles, High Flow"
  }
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortOption, setSortOption] = useState("Default sorting");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [modalQuantity, setModalQuantity] = useState(1);

  const itemsPerPage = 6;

  // Prevent background scrolling when popup is active
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

  // --- ACTIONS ---
  const handleAddToCart = (product, quantity = 1, e) => {
    if (e) e.stopPropagation();
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + quantity } : item);
      }
      return [...prevCart, { ...product, qty: quantity }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseFloat(e.target.value));
    setCurrentPage(1);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setActiveImageIdx(0);
    setModalQuantity(1);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  // --- FILTERING & SORTING LOGIC ---
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    result = result.filter(p => p.price <= priceRange);

    if (selectedCategory) {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedTag) {
      result = result.filter(p => p.tags.includes(selectedTag));
    }

    if (sortOption === "Sort by popularity" || sortOption === "Sort by average rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Sort by latest") {
      result.sort((a, b) => b.id - a.id);
    } else if (sortOption === "Sort by price: low to high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Sort by price: high to low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, priceRange, selectedCategory, selectedTag, sortOption]);

  const totalResults = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const startResultIdx = totalResults === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endResultIdx = Math.min(currentPage * itemsPerPage, totalResults);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);

  const activeGallery = selectedProduct?.gallery?.length 
    ? selectedProduct.gallery 
    : (selectedProduct ? [selectedProduct.image] : []);

  return (
    <div className="Shop">
      {/* Banner */}
      <div className="ShopHeaderBanner" style={{ backgroundImage: `linear-gradient(rgba(44, 62, 80, 0.2), rgba(44, 62, 80, 0.2)), url(${BannerBgImg})` }}>
        <div className="ShopHeaderBreadcrumb">
          <span>Home</span>
          <span className="ShopBreadcrumbDivider">//</span>
          <span className="ShopBreadcrumbActive">Shop</span>
        </div>
      </div>

      <div className="ShopMainContainer">
        {/* Sticky Sidebar Container */}
        <aside className="ShopSidebar">
          {/* Search Box Widget */}
          <div className="ShopSidebarWidget SearchWidget">
            <div className="ShopSearchInputWrapper">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
              <button className="ShopSearchButton" type="button"><FiSearch /></button>
            </div>
          </div>

          {/* Cart View Widget */}
          <div className="ShopSidebarWidget CartWidget">
            <h3 className="ShopWidgetTitle">CART</h3>
            {cart.length === 0 ? (
              <p className="ShopEmptyCartText">No products in the cart.</p>
            ) : (
              <div className="ShopSidebarCartContent">
                <div className="ShopSidebarCartList">
                  {cart.map(item => (
                    <div key={item.id} className="ShopSidebarCartItem">
                      <button className="ShopCartItemRemove" onClick={() => handleRemoveFromCart(item.id)}>
                        <FiX />
                      </button>
                      <img src={item.image} alt={item.name} className="ShopCartItemImage" />
                      <div className="ShopCartItemMeta">
                        <span className="ShopCartItemName">{item.name}</span>
                        <span className="ShopCartItemPrice">{item.qty} x ${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ShopSidebarCartSubtotal">
                  <span>Subtotal:</span>
                  <span className="ShopSubtotalAmount">${cartSubtotal}</span>
                </div>
                <div className="ShopSidebarCartButtons">
                  <button className="ShopCartBtn ViewCartBtn">View cart</button>
                  <button className="ShopCartBtn CheckoutBtn">Checkout</button>
                </div>
              </div>
            )}
          </div>

          {/* Filter Range Widget */}
          <div className="ShopSidebarWidget PriceFilterWidget">
            <h3 className="ShopWidgetTitle">FILTER BY PRICE</h3>
            <div className="ShopPriceSliderWrapper">
              <div className="ShopSliderLineTrack">
                <div className="ShopSliderLineProgress" style={{ width: `${(priceRange / 20) * 100}%` }}></div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="0.01" 
                value={priceRange} 
                onChange={handlePriceChange}
                className="ShopActualSliderInput"
              />
              <div className="ShopSliderKnob left"></div>
              <div className="ShopSliderKnob right" style={{ left: `${(priceRange / 20) * 100}%` }}></div>
            </div>
            <div className="ShopPriceFilterFooter">
              <span className="ShopPriceOutputDisplay">Price: $0 — ${priceRange.toFixed(0)}</span>
              <button className="ShopFilterActionBtn">Filter</button>
            </div>
          </div>

          {/* Categories Filter list */}
          <div className="ShopSidebarWidget CategoriesWidget">
            <h3 className="ShopWidgetTitle">PRODUCT CATEGORIES</h3>
            <ul className="ShopCategoriesList">
              {[
                { name: "Company", count: 11 },
                { name: "Experts", count: 0 },
                { name: "Filters", count: 8 },
                { name: "Our services", count: 0 },
                { name: "Products", count: 2 },
                { name: "Technologies", count: 0 },
                { name: "Water", count: 0 }
              ].map(cat => (
                <li 
                  key={cat.name} 
                  className={`ShopCategoryItem ${selectedCategory === cat.name ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory(selectedCategory === cat.name ? null : cat.name);
                    setCurrentPage(1);
                  }}
                >
                  <span className="ShopCategoryArrow">&gt;</span>
                  <span className="ShopCategoryLabelName">{cat.name}</span>
                  <span className="ShopCategoryCount">({cat.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags Widget */}
          <div className="ShopSidebarWidget TagsWidget">
            <h3 className="ShopWidgetTitle">PRODUCT TAGS</h3>
            <div className="ShopTagsCloudContainer">
              {["#company", "#delivery", "#experts", "#services", "#strategy", "#technologies", "#water"].map(tag => (
                <span 
                  key={tag} 
                  className={`ShopProductTagBadge ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTag(selectedTag === tag ? null : tag);
                    setCurrentPage(1);
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Section Area Grid */}
        <main className="ShopContentGridArea">
          <div className="ShopGridTopControlsBar">
            <div className="ShopResultsCounter">
              Showing {startResultIdx}–{endResultIdx} of {totalResults} results
            </div>
            
            <div className="ShopSortingDropdownWrapper">
              <div className="ShopSelectedSortBox" onClick={() => setIsSortOpen(!isSortOpen)}>
                <span>{sortOption}</span>
                <FiChevronDown className={`ShopDropdownArrowIcon ${isSortOpen ? 'open' : ''}`} />
              </div>
              {isSortOpen && (
                <div className="ShopDropdownOptionsPortalList">
                  {[
                    "Default sorting",
                    "Sort by popularity",
                    "Sort by average rating",
                    "Sort by latest",
                    "Sort by price: low to high",
                    "Sort by price: high to low"
                  ].map((option) => (
                    <div 
                      key={option} 
                      className={`ShopDropdownOptionRow ${sortOption === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSortOption(option);
                        setIsSortOpen(false);
                        setCurrentPage(1);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cards Dynamic Grid */}
          <div className="ShopProductsResponsiveGrid">
            {paginatedProducts.map((product) => {
              const isAddedToCart = cart.some(item => item.id === product.id);
              return (
                <div 
                  key={product.id} 
                  className="ShopProductCardItem clickableCard"
                  onClick={() => openProductModal(product)}
                >
                  <div className="ShopCardImageFrameContainer">
                    {product.isSale && <span className="ShopSaleRibbonBadge">%</span>}
                    <img src={product.image} alt={product.name} className="ShopProductItemCoreImage" />
                    
                    <div className="ShopCardHoverActionOverlay">
                      <button 
                        className={`ShopCardCircleActionBtn ${isAddedToCart ? 'addedSuccessState' : ''}`}
                        onClick={(e) => handleAddToCart(product, 1, e)}
                        aria-label="Add to cart"
                      >
                        {isAddedToCart ? <FiCheck className="ShopActionCheckmark" /> : <FiShoppingCart />}
                      </button>
                    </div>
                  </div>

                  <div className="ShopProductItemCardDetails">
                    <div className="ShopProductItemRatingStars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span 
                          key={i} 
                          className={`ShopStarIconElement ${i < product.rating ? 'filledGold' : 'emptyMuted'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <h4 className="ShopProductCardItemTitleName">{product.name}</h4>
                    <p className="ShopProductCardItemShortDesc">
                      Pure, family-sized alkaline water enriched with vital minerals for everyday cellular energy
                    </p>
                    <div className="ShopProductCardPricingRow">
                      {product.isSale && (
                        <span className="ShopProductCardOriginalCrossedPrice">${product.originalPrice?.toFixed(2)}</span>
                      )}
                      <span className="ShopProductCardActiveSalePrice">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Navigation */}
          {totalPages > 1 && (
            <div className="ShopPaginationNavigationLayout">
              <button 
                className="ShopPaginationArrowBtn" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <FiArrowLeft />
              </button>
              
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx + 1}
                  className={`ShopPaginationPageNumberBtn ${currentPage === idx + 1 ? 'activeCurrentPage' : ''}`}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button 
                className="ShopPaginationArrowBtn" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                <FiArrowRight />
              </button>
            </div>
          )}
        </main>
      </div>

      {/* QUICK VIEW DETAILS MODAL POPUP */}
      {selectedProduct && (
        <div className="ShopModalOverlay" onClick={closeProductModal}>
          <div className="ShopModalCardWrapper" onClick={(e) => e.stopPropagation()}>
            <button className="ShopModalCloseBtn" onClick={closeProductModal}>
              <FiX />
            </button>

            {/* Left Side: Images & Gallery */}
            <div className="ShopModalLeftPane">
              <div className="ShopModalHeroImageContainer">
                {selectedProduct.isSale && <span className="ShopModalSaleBadge">%</span>}
                
                {activeGallery.length > 1 && (
                  <button 
                    className="ShopModalNavArrow prev" 
                    onClick={() => setActiveImageIdx(prev => (prev === 0 ? activeGallery.length - 1 : prev - 1))}
                  >
                    ‹
                  </button>
                )}

                <img 
                  src={activeGallery[activeImageIdx] || selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="ShopModalCoreImg"
                />

                {activeGallery.length > 1 && (
                  <button 
                    className="ShopModalNavArrow next" 
                    onClick={() => setActiveImageIdx(prev => (prev === activeGallery.length - 1 ? 0 : prev + 1))}
                  >
                    ›
                  </button>
                )}
              </div>

              {/* Thumbnails Row */}
              {activeGallery.length > 1 && (
                <div className="ShopModalThumbsRow">
                  {activeGallery.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      className={`ShopModalThumbBtn ${idx === activeImageIdx ? 'selected' : ''}`}
                      onClick={() => setActiveImageIdx(idx)}
                    >
                      <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Product Details */}
            <div className="ShopModalRightPane">
              <div className="ShopModalRatingStars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="ShopModalStar">★</span>
                ))}
              </div>

              <h2 className="ShopModalTitle">{selectedProduct.name}</h2>

              <p className="ShopModalDescription">
                Pure, family-sized alkaline water enriched with vital minerals for everyday cellular energy.
              </p>

              <div className="ShopModalPricingRow">
                {selectedProduct.originalPrice && (
                  <span className="ShopModalOriginalPrice">${selectedProduct.originalPrice.toFixed(2)}</span>
                )}
                <span className="ShopModalFinalPrice">${selectedProduct.price.toFixed(2)}</span>
              </div>

              {/* Info Matrix List */}
              <div className="ShopModalSpecsList">
                <div className="ShopModalSpecItem">
                  <div className="ShopModalSpecIcon"><FiDroplet /></div>
                  <div className="ShopModalSpecText">
                    <span className="ShopModalSpecLabel">Category</span>
                    <span className="ShopModalSpecValue">{selectedProduct.category}</span>
                  </div>
                </div>

                <div className="ShopModalSpecItem">
                  <div className="ShopModalSpecIcon"><FiTag /></div>
                  <div className="ShopModalSpecText">
                    <span className="ShopModalSpecLabel">Tag</span>
                    <span className="ShopModalTagGreenPill">New</span>
                  </div>
                </div>

                <div className="ShopModalSpecItem">
                  <div className="ShopModalSpecIcon"><FiBox /></div>
                  <div className="ShopModalSpecText">
                    <span className="ShopModalSpecLabel">Pack Size</span>
                    <span className="ShopModalSpecValue">{selectedProduct.packSize || "2 Litre"}</span>
                  </div>
                </div>

                <div className="ShopModalSpecItem">
                  <div className="ShopModalSpecIcon"><FiFeather /></div>
                  <div className="ShopModalSpecText">
                    <span className="ShopModalSpecLabel">Type</span>
                    <span className="ShopModalSpecValue">{selectedProduct.type || "Alkaline Mineral Water"}</span>
                  </div>
                </div>

                <div className="ShopModalSpecItem">
                  <div className="ShopModalSpecIcon"><FiShield /></div>
                  <div className="ShopModalSpecText">
                    <span className="ShopModalSpecLabel">Benefits</span>
                    <span className="ShopModalSpecValue">{selectedProduct.benefits || "Hydration, pH Balance, Essential Minerals"}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="ShopModalQuantitySection">
                <span className="ShopModalQtyHeader">Quantity</span>
                <div className="ShopModalQtyInputGroup">
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

              {/* Action Buttons */}
              <div className="ShopModalActionButtonsRow">
                <button 
                  className="ShopModalAddCartBtn"
                  onClick={() => {
                    handleAddToCart(selectedProduct, modalQuantity);
                    closeProductModal();
                  }}
                >
                  <FiShoppingCart /> Add to Cart
                </button>
                <button 
                  className="ShopModalBuyNowBtn"
                  onClick={() => {
                    handleAddToCart(selectedProduct, modalQuantity);
                    closeProductModal();
                  }}
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

export default Shop;