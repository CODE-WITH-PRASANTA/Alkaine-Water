import React, { useState } from 'react';
import './Popular.css';
import waterImage from '../../assets/ak.jpg';

const faqData = [
  {
    question: "What are Alka Drops and how do they work?",
    answer: "Alka Drops are concentrated liquid mineral formulas designed to increase the pH level of ordinary drinking water, transforming it into alkaline water rich in essential minerals."
  },
  {
    question: "How do Alka Drops compare to pre-bottled alkaline water?",
    answer: "Alka Drops are much more cost-effective, eco-friendly, and convenient compared to buying plastic pre-bottled alkaline water. You can make alkaline water anywhere on the go."
  },
  {
    question: "Are Alka Drops safe for daily long-term consumption?",
    answer: "Yes, when used as directed, Alka Drops provide natural minerals like potassium and sodium that support daily hydration and overall bodily balance."
  },
  {
    question: "Do Alka Drops help with workout recovery and fatigue?",
    answer: "Alkaline water helps neutralize acid buildup in the body, improving hydration efficiency which aids faster muscle recovery and reduces fatigue after workouts."
  }
];

const Popular = () => {
  // -1 का मतलब है कि शुरुआत में कोई भी dropdown खुला नहीं रहेगा।
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    // अगर वही सवाल दोबारा क्लिक हो तो बंद कर दो (null), नहीं तो नया सवाल खोल दो
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="popular-container">
      {/* Left Side: Questions & Answers */}
      <div className="popular-content">
        <h2 className="popular-title">Popular Questions About Drinking Water</h2>
        
        <div className="popular-list">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index} 
                className={`popular-question-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                <div className="popular-question-header">
                  <span className="popular-plus-icon">{isOpen ? '−' : '+'}</span>
                  <p className="popular-question-text">{item.question}</p>
                </div>

                {/* Dropdown Answer Box */}
                <div className="popular-answer-box">
                  <p className="popular-answer-text">{item.answer}</p>
                </div>
              </div>
            );
          })}
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