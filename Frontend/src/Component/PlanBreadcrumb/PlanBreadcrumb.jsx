import React from 'react';
import './PlanBreadcrumb.css';
import planBannerBg from '../../assets/wat 1.jpg'; 

const PlanBreadcrumb = () => {
  return (
    <div className="PlanBreadcrumb-wrapper">
      
      {/* Invisible semantic SEO block */}
      <section className="PlanBreadcrumb-seo"></section>

      {/* Hero Banner Background */}
      <div 
        className="PlanBreadcrumb-banner"
        style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${planBannerBg})` }}
      >
        <div className="PlanBreadcrumb-content">
          <h1 className="PlanBreadcrumb-title">Pricing & Plans</h1>
          
          <div className="PlanBreadcrumb-breadcrumb">
            <a href="/">HOME</a>
            <span className="PlanBreadcrumb-divider">/</span>
            <p className="PlanBreadcrumb-link-current">PRICING & PLANS</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PlanBreadcrumb;