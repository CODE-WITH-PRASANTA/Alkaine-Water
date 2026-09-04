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
  FiZap,
  FiLoader
} from 'react-icons/fi';
import './Shop.css';

// Banner image
import BannerBgImg from '../../assets/breadcrum.jpeg';

import API, { getImageUrl } from '../../api/axios';

const placeholderImg = 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80';

const Shop = () => {
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [maxAvailablePrice, setMaxAvailablePrice] = useState(1000);
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

  // Fetch live products from backend database
  useEffect(() => {
    fetchLiveProducts();
  }, []);

  const fetchLiveProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get('/shop/all');
      let live = [];
      if (res.data && res.data.success && Array.isArray(res.data.products)) {
        live = res.data.products;
      } else if (res.data && Array.isArray(res.data.data)) {
        live = res.data.data;
      } else if (Array.isArray(res.data)) {
        live = res.data;
      }

      const formatted = live.map((p, idx) => {
        const rawImages = Array.isArray(p.images) && p.images.length > 0
          ? p.images.map(img => getImageUrl(img))
          : [placeholderImg];

        const primaryImg = rawImages[0];
        const parsedFinalPrice = typeof p.finalPrice === 'number' ? p.finalPrice : parseFloat(p.finalPrice || p.price) || 0;
        const parsedBasePrice = typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0;
        const discountVal = parseFloat(p.discount) || 0;

        const cleanDesc = p.description ? p.description.replace(/<[^>]*>/g, '').trim() : '';

        return {
          id: p._id || p.id || `prod-${idx}`,
          name: p.name || 'Alka Drops Product',
          price: parsedFinalPrice > 0 ? parsedFinalPrice : parsedBasePrice,
          originalPrice: (discountVal > 0 && parsedBasePrice > parsedFinalPrice) ? parsedBasePrice : null,
          discount: discountVal,
          rating: p.rating || 5,
          category: p.category || 'General',
          tags: Array.isArray(p.tags) && p.tags.length > 0
            ? p.tags.map(t => (String(t).startsWith('#') ? t : `#${t}`))
            : [],
          image: primaryImg,
          isSale: Boolean(discountVal > 0),
          gallery: rawImages,
          packSize: p.type || 'Standard',
          type: p.type || p.category || 'Alkaline Water',
          benefits: cleanDesc ? (cleanDesc.length > 90 ? cleanDesc.substring(0, 90) + '...' : cleanDesc) : 'Pure mineral wellness & active hydration',
          description: p.description || ''
        };
      });

      setProductsList(formatted);

      if (formatted.length > 0) {
        const highestPrice = Math.max(...formatted.map(p => p.price || 0), 500);
        const ceiling = Math.ceil(highestPrice / 100) * 100;
        setMaxAvailablePrice(ceiling);
        setPriceRange(ceiling);
      }
    } catch (err) {
      console.error('Error fetching live shop products from database:', err);
      setProductsList([]);
    } finally {
      setLoading(false);
    }
  };

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

  // Dynamic categories with counts derived from real DB products
  const categoryCounts = useMemo(() => {
    const counts = {};
    productsList.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [productsList]);

  // Dynamic tags derived from real DB products
  const tagList = useMemo(() => {
    const set = new Set();
    productsList.forEach(p => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach(t => {
          if (t && String(t).trim()) set.add(String(t).trim());
        });
      }
    });
    return Array.from(set);
  }, [productsList]);

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
    let result = [...productsList];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q))
      );
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
      result.sort((a, b) => String(b.id).localeCompare(String(a.id)));
    } else if (sortOption === "Sort by price: low to high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Sort by price: high to low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [productsList, searchQuery, priceRange, selectedCategory, selectedTag, sortOption]);

  const totalResults = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  
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
                        <span className="ShopCartItemPrice">{item.qty} x ₹{item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ShopSidebarCartSubtotal">
                  <span>Subtotal:</span>
                  <span className="ShopSubtotalAmount">₹{cartSubtotal}</span>
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
                <div 
                  className="ShopSliderLineProgress" 
                  style={{ width: `${maxAvailablePrice > 0 ? (priceRange / maxAvailablePrice) * 100 : 100}%` }}
                ></div>
              </div>
              <input 
                type="range" 
                min="0" 
                max={maxAvailablePrice} 
                step="10" 
                value={priceRange} 
                onChange={handlePriceChange}
                className="ShopActualSliderInput"
              />
              <div className="ShopSliderKnob left"></div>
              <div 
                className="ShopSliderKnob right" 
                style={{ left: `${maxAvailablePrice > 0 ? (priceRange / maxAvailablePrice) * 100 : 100}%` }}
              ></div>
            </div>
            <div className="ShopPriceFilterFooter">
              <span className="ShopPriceOutputDisplay">Price: ₹0 — ₹{priceRange.toFixed(0)}</span>
              <button 
                className="ShopFilterActionBtn" 
                onClick={() => setCurrentPage(1)}
              >
                Filter
              </button>
            </div>
          </div>

          {/* Categories Filter list (Real Database Data) */}
          {categoryCounts.length > 0 && (
            <div className="ShopSidebarWidget CategoriesWidget">
              <h3 className="ShopWidgetTitle">PRODUCT CATEGORIES</h3>
              <ul className="ShopCategoriesList">
                {categoryCounts.map(cat => (
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
          )}

          {/* Tags Widget (Real Database Data) */}
          {tagList.length > 0 && (
            <div className="ShopSidebarWidget TagsWidget">
              <h3 className="ShopWidgetTitle">PRODUCT TAGS</h3>
              <div className="ShopTagsCloudContainer">
                {tagList.map(tag => (
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
          )}
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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#004ea8' }}>
              <FiLoader className="fa-spin" style={{ fontSize: '32px', marginBottom: '12px' }} />
              <p style={{ fontSize: '16px', fontWeight: '600' }}>Loading products from database...</p>
            </div>
          ) : paginatedProducts.length > 0 ? (
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
                      {product.isSale && <span className="ShopSaleRibbonBadge">{product.discount ? ` ${product.discount}%` : ''}</span>}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="ShopProductItemCoreImage" 
                        onError={(e) => {
                          e.target.src = placeholderImg;
                        }}
                      />
                      
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
                        {product.benefits}
                      </p>
                      <div className="ShopProductCardPricingRow">
                        {product.isSale && product.originalPrice && (
                          <span className="ShopProductCardOriginalCrossedPrice">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="ShopProductCardActiveSalePrice">₹{product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '20px 0' }}>
              <FiBox style={{ fontSize: '48px', color: '#94a3b8', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '8px' }}>No Products Found</h3>
              <p style={{ fontSize: '14px', color: '#64748b' }}>
                {searchQuery || selectedCategory || selectedTag 
                  ? "No products matched your search or filters. Try adjusting your selections."
                  : "No products available in the database catalog yet."}
              </p>
            </div>
          )}

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
                {selectedProduct.isSale && (
                  <span className="ShopModalSaleBadge">
                    {selectedProduct.discount ? ` ${selectedProduct.discount}%` : ''}
                  </span>
                )}
                
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
                  onError={(e) => { e.target.src = placeholderImg; }}
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
                      <img 
                        src={imgSrc} 
                        alt={`Thumbnail ${idx + 1}`} 
                        onError={(e) => { e.target.src = placeholderImg; }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Product Details */}
            <div className="ShopModalRightPane">
              <div className="ShopModalRatingStars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span 
                    key={i} 
                    className="ShopModalStar"
                    style={{ color: i < (selectedProduct.rating || 5) ? '#f59e0b' : '#cbd5e1' }}
                  >
                    ★
                  </span>
                ))}
              </div>

              <h2 className="ShopModalTitle">{selectedProduct.name}</h2>

              {selectedProduct.description ? (
                <div 
                  className="ShopModalDescription"
                  dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                />
              ) : (
                <p className="ShopModalDescription">
                  {selectedProduct.benefits}
                </p>
              )}

              <div className="ShopModalPricingRow">
                {selectedProduct.originalPrice && (
                  <span className="ShopModalOriginalPrice">₹{selectedProduct.originalPrice.toFixed(2)}</span>
                )}
                <span className="ShopModalFinalPrice">₹{selectedProduct.price.toFixed(2)}</span>
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

                {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                  <div className="ShopModalSpecItem">
                    <div className="ShopModalSpecIcon"><FiTag /></div>
                    <div className="ShopModalSpecText">
                      <span className="ShopModalSpecLabel">Tags</span>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {selectedProduct.tags.map((t, idx) => (
                          <span key={idx} className="ShopModalTagGreenPill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedProduct.type && (
                  <div className="ShopModalSpecItem">
                    <div className="ShopModalSpecIcon"><FiFeather /></div>
                    <div className="ShopModalSpecText">
                      <span className="ShopModalSpecLabel">Type</span>
                      <span className="ShopModalSpecValue">{selectedProduct.type}</span>
                    </div>
                  </div>
                )}

                <div className="ShopModalSpecItem">
                  <div className="ShopModalSpecIcon"><FiShield /></div>
                  <div className="ShopModalSpecText">
                    <span className="ShopModalSpecLabel">Benefits</span>
                    <span className="ShopModalSpecValue">{selectedProduct.benefits}</span>
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