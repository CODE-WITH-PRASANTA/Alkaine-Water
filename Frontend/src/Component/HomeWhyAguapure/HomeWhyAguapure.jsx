import React from 'react';
import './HomeWhyAguapure.css';

// --- LOCAL ASSET PATHS ---
import trolleyImg from '../../assets/choose-style1-img.jpg'; 

const HomeWhyAguapure = () => {
  const features = [
    {
      id: 1,
      title: 'High Quality',
      desc: 'Multi-stage advanced filtration ensures essential minerals like Calcium and Magnesium are preserved for optimum hydration.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z"/>
          <path d="M12 18a3 3 0 0 0 3-3c0-1.5-3-5-3-5s-3 3.5-3 3a3 3 0 0 0 3 5z" opacity="0.6"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'No Contract',
      desc: 'Flexible ordering with complete freedom—no lock-in contracts or hidden commitment fees for homes or offices.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <path d="M10 9H8"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Reliable',
      desc: 'Trusted Bhubaneswar water suppliers ensuring seamless, scheduled delivery of fresh packaged drinking water daily..',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 11 11 13 15 9"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Certified',
      desc: 'Tested and certified to meet rigid health, safety, and purity benchmarks for uncompromising water quality.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7"/>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
        </svg>
      )
    },
    {
      id: 5,
      title: 'Affordable',
      desc: 'Get premium-grade alkaline drinking water at competitive prices with transparent subscription and bulk discounts.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      id: 6,
      title: 'Fast Delivery',
      desc: 'Prompt and safe doorstep dispatch across Bhubaneswar, making clean mineral water accessible whenever you need it',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    }
  ];

  return (
    <div className="HomeWhyAguapure-container">
      {/* Decorative center background wavy layout asset */}
      <div className="HomeWhyAguapure-bgWaves">
        <svg viewBox="0 0 100 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30,0 C55,100 5,200 30,300 C45,350 15,380 30,400" stroke="#ebf2fc" strokeWidth="2" fill="none" />
          <path d="M50,0 C75,100 25,200 50,300 C65,350 35,380 50,400" stroke="#ebf2fc" strokeWidth="2" fill="none" />
          <path d="M70,0 C95,100 45,200 70,300 C85,350 55,380 70,400" stroke="#ebf2fc" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="HomeWhyAguapure-wrapper">
        {/* --- LEFT HAND SIDE TROLLEY & BADGE GRAPHIC BLOCK --- */}
        <div className="HomeWhyAguapure-leftVisual">
          <div className="HomeWhyAguapure-trolleyFrame">
            <img 
              src={trolleyImg} 
              alt="Water delivery trolley" 
              className="HomeWhyAguapure-trolleyImg"
              onError={(e) => { e.target.style.visibility = 'hidden'; }}
            />
            {/* Layered Content Round Badge */}
            <div className="HomeWhyAguapure-badgeOuter">
              <div className="HomeWhyAguapure-badgeInner">
                <div className="HomeWhyAguapure-badgeContent">
                  <span>No</span>
                  <span className="HomeWhyAguapure-badgeMiddle">Minimum</span>
                  <span>Order</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT HAND SIDE CONTENT BLOCK --- */}
        <div className="HomeWhyAguapure-rightContent">
          <div className="HomeWhyAguapure-headerBlock">
            <span className="HomeWhyAguapure-tagline">WHY AQUAPURE</span>
            <h2 className="HomeWhyAguapure-heading">You'll love fresh taste of our natural water</h2>
            <svg className="HomeWhyAguapure-miniWave" viewBox="0 0 40 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 4C5 1 5 7 10 4C15 1 15 7 20 4C25 1 25 7 30 4C35 1 35 7 40 4" stroke="#5ac8fa" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Features Grid Layout Container */}
          <div className="HomeWhyAguapure-featuresGrid">
            {features.map((item) => (
              <div key={item.id} className="HomeWhyAguapure-featureItem">
                <div className="HomeWhyAguapure-iconShape">
                  <div className="HomeWhyAguapure-iconInside">
                    {item.icon}
                  </div>
                </div>
                <div className="HomeWhyAguapure-textBlock">
                  <h3 className="HomeWhyAguapure-featureTitle">{item.title}</h3>
                  <p className="HomeWhyAguapure-featureDesc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWhyAguapure;