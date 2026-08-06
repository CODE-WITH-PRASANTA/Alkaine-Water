import React from 'react';
import './MultipleStages.css';
import mountainImage from '../../assets/m1.jpg'; // Ensure you have your image here

const stats = [
  { value: "167m", title: "Water Source Depth", desc: "Protected deep underground to preserve nature's untouched mineral balance." },
  { value: "12.5k", title: "Bottles per Month", desc: "Delivering fresh, crystal-clear water to thousands of homes each mont." },
  { value: "46", title: "Nominations Won", desc: " Award-winning water crafted by nature and perfected through purity." },
  { value: "180+", title: "Countries Drink", desc: "Fueling health, vitality, and optimal hydration across the globe." }
];

const MultipleStages = () => {
  return (
    <section className="ms-container">
      <div className="ms-header">
        <h2 className="ms-title">
         Alka Drops:  <span className="ms-highlight">Multi-stage</span> purified water with    zero<br /> 
          artificial additives—making pure hydration accessible to all.
        </h2>
      </div>

      <div className="ms-image-wrapper">
        <img src={mountainImage} alt="Mountain landscape" className="ms-mountain-img" />
      </div>

      <div className="ms-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="ms-stat-card">
            <h3 className="ms-stat-value">{stat.value}</h3>
            <p className="ms-stat-title">{stat.title}</p>
            <div className="ms-divider"></div>
            <p className="ms-stat-desc">{stat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MultipleStages;