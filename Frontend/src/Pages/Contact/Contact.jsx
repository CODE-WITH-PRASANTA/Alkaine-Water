import React, { useState } from 'react';

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
      // Axios request matching your Express structure
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      
      if (response.data.success) {
        setStatus({
          loading: false,
          success: true,
          error: null
        });
        // Clear form after successful submit
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
      
      {/* COMPONENT WINDOW 1: SINGLE IMAGE HERO BANNER (60vh) */}
      <section className="ContactHeroBanner" style={{ backgroundImage: `url(${ContactsBannerBg})` }}>
        <div className="ContactHeroOverlay">
          <div className="ContactHeroContent">
            <h1 className="ContactHeroTitle">Contacts</h1>
            <div className="ContactHeroBreadcrumbs">
              <span className="ContactBreadcrumbLink">Home</span>
              <span className="ContactBreadcrumbDivider">//</span>
              <span className="ContactBreadcrumbActive">Contacts</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPONENT WINDOW 2: SPLIT PREMIUM CONTACT FORM GRID */}
      <section className="ContactFormSection">
        <div className="ContactFormGrid">
          
          {/* Left Text / Info Panel */}
          <div className="ContactFormLeftPanel">
            <div className="ContactLabelContainer">
              <span className="ContactFormLabel">CONTACT FORM</span>
              <div className="ContactLabelLine"></div>
            </div>
            
            <h2 className="ContactFormTitle">
              Have a question? <br />
              <span className="HighlightTitle">Contact us now</span>
            </h2>
            
            <p className="ContactFormDescription">
             Get in touch with us! Whether you are seeking order assistance, looking to inquire about bulk water deliveries,Reach out,and a member of our team will get back to you shortly.
            </p>
            
            <div className="ContactFormInfoList">
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiUser />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Name</span>
                  <span className="ContactFormInfoValue">All India Cine Workers Association</span>
                </div>
              </div>

              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiPhone />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Call Us</span>
                  <span className="ContactFormInfoValue">+91 500-025-200</span>
                </div>
              </div>
              
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiMapPin />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Visit Us</span>
                  <span className="ContactFormInfoValue">Bamphakuda, Bhubaneswar, Odisha, India</span>
                </div>
              </div>
              
              <div className="ContactFormInfoItem">
                <div className="ContactFormIconBadge">
                  <FiMail />
                </div>
                <div className="ContactInfoText">
                  <span className="ContactInfoLabel">Email Us</span>
                  <span className="ContactFormInfoValue">support@association.com</span>
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
                    <span>Your message has been sent successfully! We will get back to you soon.</span>
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
                    <label className="ContactFormFieldLabel" htmlFor="contact-name">Your Name</label>
                    <div className="ContactFormInputWrapper">
                      <FiUser className="ContactFormInputIcon" />
                      <input 
                        id="contact-name"
                        type="text" 
                        name="name"
                        placeholder="Enter your full name" 
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
                        placeholder="+91 500-025-200" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="ContactFormInput" 
                      />
                      <span className="InputFocusBorder"></span>
                    </div>
                  </div>
                </div>

                <div className="ContactFormInputRow">
                  <div className="ContactFormFieldGroup">
                    <label className="ContactFormFieldLabel" htmlFor="contact-email">Your Email</label>
                    <div className="ContactFormInputWrapper">
                      <FiMail className="ContactFormInputIcon" />
                      <input 
                        id="contact-email"
                        type="email" 
                        name="email"
                        placeholder="support@association.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="ContactFormInput" 
                        required
                      />
                      <span className="InputFocusBorder"></span>
                    </div>
                  </div>

                  <div className="ContactFormFieldGroup">
                    <label className="ContactFormFieldLabel" htmlFor="contact-subject">Subject</label>
                    <div className="ContactFormInputWrapper">
                      <FiFileText className="ContactFormInputIcon" />
                      <input 
                        id="contact-subject"
                        type="text" 
                        name="subject"
                        placeholder="Enter dynamic subject context" 
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
                  <label className="ContactFormFieldLabel" htmlFor="contact-message">Message</label>
                  <div className="ContactFormTextareaWrapper">
                    <textarea 
                      id="contact-message"
                      name="message"
                      placeholder="Type your message log details here..." 
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
                        <span>Send Message</span>
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

      {/* COMPONENT WINDOW 3: PREMIUM GOOGLE MAP OVERLAY */}
      <section className="ContactMapSection">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14963.782875151522!2d85.9080649!3d20.3438883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190ea4d02b542b%3A0xe72688f0e0be2694!2sBamphakuda%2C%20Bhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="ContactMapCanvas"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bamphakuda Bhubaneswar Map"
        ></iframe>
      </section>

    </div>
  );
};

export default Contact;