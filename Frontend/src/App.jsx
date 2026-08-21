import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Topbar from "./Component/Topbar/Topbar";
import Navbar from "./Component/Navbar/Navbar";
import Footer from "./Component/Footer/Footer";
import Floating from "./Component/Floating/Floating";

// Page Components
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

// Auxiliary / Demo Components
import OurTeam from "./Component/OurTeam/OurTeam";
import AkaineGalary from "./Component/AkaineGalary/AkaineGalary";

function App() {
  return (
    <BrowserRouter>
      {/* Fixed Layout Components */}
      <Topbar />
      <Navbar />

      {/* Global Floating Popup Form */}
      <Floating />

      {/* Direct Clean Routes */}
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/product/details" element={<WhiteQuartz />} />
        <Route path="/pricing" element={<PricingAndPlans />} />
        <Route path="/gallery" element={<GalaryMain />} />
        <Route path="/team" element={<MainTeam />} />
        <Route path="/testimonials" element={<Testimonial />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />

        {/* E-Commerce */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Cheakout />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Components Preview */}
        <Route path="/our-team-preview" element={<OurTeam />} />
        <Route path="/gallery-preview" element={<AkaineGalary />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;