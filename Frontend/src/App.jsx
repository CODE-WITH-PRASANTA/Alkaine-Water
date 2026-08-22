import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
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
import Contact from "./Pages/Contact/Contact";
import Blog from "./Pages/Blog/Blog";
import PricingAndPlans from "./Pages/PricingAndPlans/PricingAndPlans";
import MainTeam from "./Pages/MainTeam/MainTeam";
import GalaryMain from "./Pages/GalaryMain/GalaryMain";
import OurServices from "./Pages/OurServices/OurServices";
import WhiteQuartz from "./Pages/WhiteQuartz/WhiteQuartz";
import Testimonial from "./Pages/Testimonial/Testimonial";
import Cart from "./Pages/Cart/Cart";
import Cheakout from "./Pages/Cheakout/Cheakout";
import Faq from "./Pages/Faq/Faq";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";

// =====================================================
// SECONDARY COMPONENTS
// =====================================================

import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";
import OurTeam from "./Component/OurTeam/OurTeam";

function App() {

  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  useEffect(() => {

    /*
      Browser Navigation Types:

      "navigate"
        = normal website entry

      "reload"
        = browser refresh

      "back_forward"
        = browser back/forward
    */

    const navigationEntry =
      performance.getEntriesByType("navigation")[0];

    const navigationType =
      navigationEntry?.type || "navigate";

    /*
      SHOW POPUP:

      1. First time website opens
      2. Browser refreshes

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

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        {/* CORE */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/blog"
          element={<Blog />}
        />

        <Route
          path="/products/pricing"
          element={<PricingAndPlans />}
        />

        {/* BLOG */}

        <Route
          path="/resources/blog"
          element={<Blog />}
        />

        <Route
          path="/blogdetails/:id"
          element={<BlogDetails />}
        />

        {/* RESOURCES */}

        <Route
          path="/resources/team"
          element={<MainTeam />}
        />

        <Route
          path="/resources/gallary"
          element={<GalaryMain />}
        />

        <Route
          path="/resources/faqs"
          element={<Faq />}
        />

        {/* TESTIMONIAL */}

        <Route
          path="/products/testimonials"
          element={<Testimonial />}
        />

        {/* CART */}

        <Route
          path="/shop/cart"
          element={<Cart />}
        />

        {/* CHECKOUT */}

        <Route
          path="/shop/checkout"
          element={<Cheakout />}
        />

        {/* SERVICES */}

        <Route
          path="/services/all"
          element={<OurServices />}
        />

        {/* WHITE QUARTZ */}

        <Route
          path="/whitequartz"
          element={<WhiteQuartz />}
        />

        {/* TEAM */}

        <Route
          path="/team-component"
          element={<OurTeam />}
        />

        {/* GALLERY */}

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
          ALKA DROPS POPUP

          IMPORTANT:
          This is outside Routes.
      ========================================= */}

      <Floating
        isOpen={isFloatingOpen}
        onClose={() => setIsFloatingOpen(false)}
      />

      {/* =========================================
          FLOATING ICONS
      ========================================= */}

      <FloatingIcon />

    </BrowserRouter>
  );
}

export default App;