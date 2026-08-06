import React from 'react';
import './Popular.css';
import waterImage from '../../assets/ak.jpg'; // Ensure your image is named correctly

const questions = [
  "What are Alka Drops and how do they work?",
  "How do Alka Drops compare to pre-bottled alkaline water?",
  "Are Alka Drops safe for daily long-term consumption?",
  "Do Alka Drops help with workout recovery and fatigue?"
];

const Popular = () => {
  return (
    <section className="popular-container">
      {/* Left Side: Questions */}
      <div className="popular-content">
        <h2 className="popular-title">Popular Questions About Drinking Water</h2>
        
        <div className="popular-list">
          {questions.map((q, index) => (
            <div key={index} className="popular-question-item">
              <span className="popular-plus-icon">+</span>
              <p>{q}</p>
            </div>
          ))}
        </div>

        <button className="popular-read-more">Read More</button>
      </div>

      {/* Right Side: Image */}
      <div className="popular-image-wrapper">
        <img src={waterImage} alt="Water glass and filters" className="popular-img" />
      </div>
    </section>
  );
};

export default Popular;