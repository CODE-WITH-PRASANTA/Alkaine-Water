import React, { useState, useMemo } from 'react';
import { 
  FiSearch, 
  FiChevronDown, 
  FiArrowLeft, 
  FiArrowRight, 
  FiShoppingCart, 
  FiCheck,
  FiX
} from 'react-icons/fi';
import './Shop.css';

// =========================================================
// LOCAL IMAGE IMPORTS (Replace these with your file paths)
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
// PRODUCT DATA ARRAY USING IMPORTED IMAGES
// =========================================================
const ALL_PRODUCTS = [
  // Page 1 Products
  { id: 1, name: "White Quartz 2l", price: 3.99, rating: 5, category: "Products", tags: ["#water", "#delivery"], image: WhiteQuartzImg, isSale: false },
  { id: 2, name: "Eternal Flow 0.5l Tide", price: 1.50, rating: 5, category: "Products", tags: ["#water"], image: EternalFlowImg, isSale: false },
  { id: 3, name: "Mist Valley 1.5l", price: 2.99, rating: 4, category: "Water", tags: ["#company"], image: MistValleyImg, isSale: false },
  { id: 4, name: "Pure Glacier 1l", price: 2.10, rating: 5, category: "Water", tags: ["#delivery"], image: PureGlacierImg, isSale: false },
  { id: 5, name: "Aqua Vitae 0.75l", price: 4.50, rating: 5, category: "Filters", tags: ["#experts"], image: AquaVitaeImg, isSale: false },
  { id: 6, name: "Alpine Dew 2.5l", price: 5.00, rating: 4, category: "Company", tags: ["#strategy"], image: AlpineDewImg, isSale: false },

  // Page 2 Products (Dummy page data layout)
  { id: 7, name: "Liquid Sky 1.5l", price: 2.49, rating: 5, category: "Company", tags: ["#water", "#strategy"], image: WhiteQuartzImg, isSale: false },
  { id: 8, name: "Calm Source 0.75l", price: 5.99, rating: 4, category: "Filters", tags: ["#services"], image: EternalFlowImg, isSale: false },
  { id: 9, name: "Blue Pulse 0.5l", price: 2.49, rating: 5, category: "Products", tags: ["#delivery"], image: MistValleyImg, isSale: false },
  { id: 10, name: "Reverse Osmosis Pro", price: 6.49, originalPrice: 7.00, rating: 5, category: "Filters", tags: ["#technologies", "#water"], image: ReverseOsmosisImg, isSale: true },
  { id: 11, name: "Whisper Spring 0.75l", price: 3.99, rating: 5, category: "Water", tags: ["#experts"], image: PureGlacierImg, isSale: false },
  { id: 12, name: "Additional Cartridges Pro", price: 5.49, rating: 4, category: "Filters", tags: ["#services", "#technologies"], image: AlpineDewImg, isSale: false }
];

const Shop = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(20);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortOption, setSortOption] = useState("Default sorting");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(2); // Starts on Page 2 default

  const itemsPerPage = 6;

  // --- ACTIONS ---
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handlePriceChange = (e) => {
    setPriceRange(parseFloat(e.target.value));
    setCurrentPage(1);
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

  // --- PAGINATION COMPONENT VALUES ---
  const totalResults = filteredAndSortedProducts.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(start, start + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const startResultIdx = totalResults === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endResultIdx = Math.min(currentPage * itemsPerPage, totalResults);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0).toFixed(2);

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
              <button className="ShopSearchButton"><FiSearch /></button>
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
            
            {/* Sorting custom Dropdown wrapper */}
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
                <div key={product.id} className="ShopProductCardItem">
                  <div className="ShopCardImageFrameContainer">
                    {product.isSale && <span className="ShopSaleRibbonBadge">%</span>}
                    <img src={product.image} alt={product.name} className="ShopProductItemCoreImage" />
                    
                    <div className="ShopCardHoverActionOverlay">
                      <button 
                        className={`ShopCardCircleActionBtn ${isAddedToCart ? 'addedSuccessState' : ''}`}
                        onClick={() => handleAddToCart(product)}
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

          {/* Pagination Navigation Controls */}
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
    </div>
  );
};

export default Shop;