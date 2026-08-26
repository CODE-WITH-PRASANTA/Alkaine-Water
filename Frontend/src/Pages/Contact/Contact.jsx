import React, { useState } from 'react';
import axios from 'axios';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiFileText, 
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiAlertCircle
} from 'react-icons/fi';
import './Contact.css';

// -------------------------------------------------------------
// LOCAL ASSET IMPORTS
// -------------------------------------------------------------
import ContactsBannerBg from '../../assets/breadcrum.jpeg'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      
      if (response.data.success) {
        setStatus({
          loading: false,
          success: true,
          error: null
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      console.error("CONTACT SUBMIT ERROR:", err);
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || "Failed to send message. Please try again."
      });
    }
  };

  return (
    <div className="ContactContainer">
      
      {/* COMPONENT WINDOW 1: SINGLE IMAGE HERO BANNER */}
      <section className="ContactHeroBanner" style={{ backgroundImage: `url(${ContactsBannerBg})` }}>
        <div className="ContactHeroOverlay">
          <div className="ContactHeroContent">
            <h1 className="ContactHeroTitle">
              Best Water Suppliers & Packaged Drinking Water in Bhubaneswar
            </h1>
            <div className="ContactHeroBreadcrumbs">
              <span className="ContactBreadcrumbLink">Home</span>
              <span className="ContactBreadcrumbDivider">//</span>
              <span className="ContactBreadcrumbActive">Contact Alka Drops</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT WINDOW 2: SPLIT CONTACT FORM GRID */}
      <section className="ContactFormSection">
        <div className="ContactFormGrid">
          
          {/* Left Text / Info Panel */}
          <div className="ContactFormLeftPanel">
            <div className="ContactLabelContainer">
              <span className="ContactFormLabel">DRINKING WATER SUPPLY IN BHUBANESWAR</span>
              <div className="ContactLabelLine"></div>
            </div>
            
            <h2 className="ContactFormTitle">
              Need Pure Mineral Water? <br />
              <span className="HighlightTitle">Connect With Alka Drops</span>
            </h2>
            
            <p className="ContactFormDescription">
              Looking for reliable 20 litre water bottle suppliers in Bhubaneswar with quick doorstep delivery? Whether you require 20L water jars for your home, commercial mineral water wholesale supplies for your workplace, or event deliveries across Odisha, our team is ready to assist you.
            </p>
            
            <div className="ContactFormInfoList">
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiUser />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Company Name</span>
                  <span className="ContactFormInfoValue">Alka Drops</span>
                </div>
              </div>

              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiPhone />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Helpline & Orders</span>
                  <a href="tel:+917327092477" className="ContactFormInfoLink">
                    +91 7327092477
                  </a>
                </div>
              </div>
              
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiMapPin />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Factory & Office Address</span>
                  <span className="ContactFormInfoValue">
                    Plot-N5/22, Main Street, Block N5, IRC Village, Nayapalli, Bhubaneswar, Odisha 751012
                  </span>
                </div>
              </div>
              
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiMail />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Email Inquiries</span>
                  <a href="mailto:support@alkadrops.com" className="ContactFormInfoLink">
                    support@alkadrops.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inputs Column */}
          <div className="ContactFormRightPanel">
            <div className="PremiumFormCard">
              <form onSubmit={handleFormSubmit} className="ContactFormElement">
                
                {/* Form Status Messages */}
                {status.success && (
                  <div className="FormStatusMessage success">
                    <FiCheckCircle className="StatusIcon" />
                    <span>Your request has been sent! Our water supply team will contact you shortly.</span>
                  </div>
                )}

                {status.error && (
                  <div className="FormStatusMessage error">
                    <FiAlertCircle className="StatusIcon" />
                    <span>{status.error}</span>
                  </div>
                )}

                <div className="ContactFormInputRow">
                  <div className="ContactFormFieldGroup">
                    <label className="ContactFormFieldLabel" htmlFor="contact-name">Your Full Name</label>
                    <div className="ContactFormInputWrapper">
                      <FiUser className="ContactFormInputIcon" />
                      <input 
                        id="contact-name"
                        type="text" 
                        name="name" 
                        placeholder="e.g. Rajesh Mohanty" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="ContactFormInput" 
                        required
                      />
                      <span className="InputFocusBorder"></span>
                    </div>
                  </div>

                  <div className="ContactFormFieldGroup">
                    <label className="ContactFormFieldLabel" htmlFor="contact-phone">Phone Number</label>
                    <div className="ContactFormInputWrapper">
                      <FiPhone className="ContactFormInputIcon" />
                      <input 
                        id="contact-phone"
                        type="tel" 
                        name="phone" 
                        placeholder="+91 7327092477" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="ContactFormInput" 
                        required
                      />
                      <span className="InputFocusBorder"></span>
                    </div>
                  </div>
                </div>

                <div className="ContactFormInputRow">
                  <div className="ContactFormFieldGroup">
                    <label className="ContactFormFieldLabel" htmlFor="contact-email">Email Address</label>
                    <div className="ContactFormInputWrapper">
                      <FiMail className="ContactFormInputIcon" />
                      <input 
                        id="contact-email"
                        type="email" 
                        name="email" 
                        placeholder="you@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="ContactFormInput" 
                        required
                      />
                      <span className="InputFocusBorder"></span>
                    </div>
                  </div>

                  <div className="ContactFormFieldGroup">
                    <label className="ContactFormFieldLabel" htmlFor="contact-subject">Requirement Type</label>
                    <div className="ContactFormInputWrapper">
                      <FiFileText className="ContactFormInputIcon" />
                      <input 
                        id="contact-subject"
                        type="text" 
                        name="subject" 
                        placeholder="20L Jar Delivery / Wholesale Inquiry" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="ContactFormInput" 
                        required
                      />
                      <span className="InputFocusBorder"></span>
                    </div>
                  </div>
                </div>

                <div className="ContactFormFieldGroup">
                  <label className="ContactFormFieldLabel" htmlFor="contact-message">Delivery Address / Requirements</label>
                  <div className="ContactFormTextareaWrapper">
                    <textarea 
                      id="contact-message"
                      name="message" 
                      placeholder="Please specify delivery quantity, locality in Bhubaneswar, or wholesale requirements..." 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="ContactFormTextarea" 
                      rows="5"
                      required
                    ></textarea>
                    <span className="InputFocusBorder"></span>
                  </div>
                </div>

                <div className="ContactFormActionRow">
                  <button 
                    type="submit" 
                    className="ContactFormSubmitButton"
                    disabled={status.loading}
                  >
                    {status.loading ? (
                      <span className="LoadingSpinner"></span>
                    ) : (
                      <>
                        <span>Submit Water Order Inquiry</span>
                        <FiSend className="ButtonSubmitIcon" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* COMPONENT WINDOW 3: GOOGLE MAP (IRC VILLAGE, NAYAPALLI) */}
      <section className="ContactMapSection">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.062305593883!2d85.80800677592965!3d20.30155461183359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190995c6218d6f%3A0xe2be3d159df13e55!2sIRC%20Village%2C%20Nayapalli%2C%20Bhubaneswar%2C%20Odisha%20751012!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
          className="ContactMapCanvas"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Alka Drops Nayapalli Bhubaneswar Location Map"
        ></iframe>
      </section>

    </div>
  );
};

export default Contact;