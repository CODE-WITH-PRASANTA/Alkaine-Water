import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

// =====================================================
// LAYOUT
// =====================================================

import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";

// =====================================================
// FLOATING
// =====================================================

import Floating from "./Component/Floating/Floating";
import FloatingIcon from "./Component/FloatingIcon/FloatingIcon";

// =====================================================
// PAGES
// =====================================================

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Shop from "./Pages/Shop/Shop";
import Cart from "./Pages/Cart/Cart";
import Cheakout from "./Pages/Cheakout/Cheakout";
import OurServices from "./Pages/OurServices/OurServices";
import WhiteQuartz from "./Pages/WhiteQuartz/WhiteQuartz";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
import GalaryMain from "./Pages/GalaryMain/GalaryMain";
import MainTeam from "./Pages/MainTeam/MainTeam";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Faq from "./Pages/Faq/Faq";
import Blog from "./Pages/Blog/Blog";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Contact from "./Pages/Contact/Contact";

// =====================================================
// SECONDARY COMPONENTS
// =====================================================

import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";
import OurTeam from "./Component/OurTeam/OurTeam";

// =====================================================
// CONDITIONAL FLOATING
// =====================================================

const ConditionalFloating = ({ isOpen, onClose }) => {
  const location = useLocation();

  // Show popup only on homepage
  if (location.pathname !== "/" && location.pathname !== "/home") {
    return null;
  }

  return (
    <Floating
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

// =====================================================
// APP
// =====================================================

function App() {
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  // ===================================================
  // FLOATING POPUP INITIALIZATION
  // ===================================================

  useEffect(() => {
    /*
      Browser Navigation Types:

      "navigate"
        = first website entry / normal navigation

      "reload"
        = browser refresh

      "back_forward"
        = browser back / forward
    */

    const navigationEntry =
      performance.getEntriesByType("navigation")[0];

    const navigationType =
      navigationEntry?.type || "navigate";

    /*
      SHOW POPUP:

      - First website entry
      - Browser refresh

      DON'T SHOW:

      - Back button
      - Forward button
      - React route navigation
    */

    if (
      navigationType === "navigate" ||
      navigationType === "reload"
    ) {
      setIsFloatingOpen(true);
    }
  }, []);

  return (
    <BrowserRouter>
      {/* =========================================
          TOPBAR
      ========================================= */}

      <Topbar />

      {/* =========================================
          NAVBAR
      ========================================= */}

      <Navbar />

      {/* =========================================
          ROUTES
      ========================================= */}

      <Routes>
        {/* =========================================
            HOME
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        {/* =========================================
            ABOUT
        ========================================= */}

        <Route
          path="/about"
          element={<About />}
        />

        {/* =========================================
            SERVICES
        ========================================= */}

        <Route
          path="/services"
          element={<OurServices />}
        />

        <Route
          path="/services/all"
          element={<OurServices />}
        />

        {/* =========================================
            PRODUCTS
        ========================================= */}

        <Route
          path="/product/details"
          element={<WhiteQuartz />}
        />

        <Route
          path="/whitequartz"
          element={<WhiteQuartz />}
        />

        <Route
          path="/pricing"
          element={<PricingAndPlans />}
        />

        <Route
          path="/products/pricing"
          element={<PricingAndPlans />}
        />

        <Route
          path="/products/testimonials"
          element={<Testimonial />}
        />

        <Route
          path="/testimonials"
          element={<Testimonial />}
        />

        {/* =========================================
            SHOP
        ========================================= */}

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/shop/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Cheakout />}
        />

        <Route
          path="/shop/checkout"
          element={<Cheakout />}
        />

        {/* =========================================
            GALLERY
        ========================================= */}

        <Route
          path="/gallery"
          element={<GalaryMain />}
        />

        <Route
          path="/resources/gallary"
          element={<GalaryMain />}
        />

        {/* =========================================
            TEAM
        ========================================= */}

        <Route
          path="/team"
          element={<MainTeam />}
        />

        <Route
          path="/resources/team"
          element={<MainTeam />}
        />

        {/* =========================================
            FAQ
        ========================================= */}

        <Route
          path="/faq"
          element={<Faq />}
        />

        <Route
          path="/resources/faqs"
          element={<Faq />}
        />

        {/* =========================================
            CONTACT
        ========================================= */}

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* =========================================
            BLOG
        ========================================= */}

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/resources/blog"
          element={<Blog />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />

        <Route
          path="/blogdetails/:id"
          element={<BlogDetails />}
        />

        {/* =========================================
            COMPONENT PREVIEWS
        ========================================= */}

        <Route
          path="/our-team-preview"
          element={<OurTeam />}
        />

        <Route
          path="/team-component"
          element={<OurTeam />}
        />

        <Route
          path="/gallery-preview"
          element={<AkaineGalary />}
        />

        <Route
          path="/gallery-component"
          element={<AkaineGalary />}
        />
      </Routes>

      {/* =========================================
          FOOTER
      ========================================= */}

      <Footer />

      {/* =========================================
          ALKA DROPS FLOATING POPUP

          Only visible on:
          /
          /home
      ========================================= */}

      <ConditionalFloating
        isOpen={isFloatingOpen}
        onClose={() => setIsFloatingOpen(false)}
      />

      {/* =========================================
          FLOATING ICON
      ========================================= */}

      <FloatingIcon />
    </BrowserRouter>
  );
}

export default App;