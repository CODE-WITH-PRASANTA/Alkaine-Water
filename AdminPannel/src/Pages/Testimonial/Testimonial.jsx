import React, { useState } from 'react';
import { Star, MessageSquare, User, Briefcase, Mail, CheckCircle2, Search } from 'lucide-react';
import './Testimonial.css';

const initialTestimonials = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav.s@example.com',
    role: 'Product Manager',
    rating: 5,
    message: 'The delivery service is exceptionally prompt and reliable. Highly recommended for daily needs!',
    date: '02 Aug 2026'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    role: 'UI/UX Designer',
    rating: 4,
    message: 'Great user experience and clean packaging. Customer support helped resolve my query within minutes.',
    date: '04 Aug 2026'
  },
  {
    id: 3,
    name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    role: 'Operations Lead',
    rating: 5,
    message: 'Consistent quality and great attention to detail. Seamless platform integration overall.',
    date: '06 Aug 2026'
  }
];

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    rating: 5,
    message: ''
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const newEntry = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };

    setTestimonials([newEntry, ...testimonials]);
    setFormData({ name: '', email: '', role: '', rating: 5, message: '' });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  // Filter Table Results
  const filteredTestimonials = testimonials.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tm-page-wrapper">
      <div className="tm-container">
        
        {/* Header Section */}
        <header className="tm-header">
          <h1 className="tm-title">
            <MessageSquare className="tm-title-icon" /> Client Testimonials
          </h1>
          <p className="tm-subtitle">
            Submit your feedback on the left or browse through community reviews on the right.
          </p>
        </header>

        {/* Main 50 / 50 Split Layout */}
        <div className="tm-content-grid">
          
          {/* LEFT 50%: Testimonial Form */}
          <section className="tm-form-card">
            <div className="tm-card-header">
              <h2>Submit Your Feedback</h2>
              <p>We value your thoughts and suggestions</p>
            </div>

            {submitted && (
              <div className="tm-alert-success">
                <CheckCircle2 size={18} /> Testimonial submitted successfully!
              </div>
            )}

            <form className="tm-form" onSubmit={handleSubmit}>
              
              {/* Full Name */}
              <div className="tm-form-group">
                <label htmlFor="name">Full Name *</label>
                <div className="tm-input-wrapper">
                  <User className="tm-input-icon" size={16} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Ananya Das"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="tm-form-group">
                <label htmlFor="email">Email Address *</label>
                <div className="tm-input-wrapper">
                  <Mail className="tm-input-icon" size={16} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="e.g. ananya@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Designation / Role */}
              <div className="tm-form-group">
                <label htmlFor="role">Designation / Role</label>
                <div className="tm-input-wrapper">
                  <Briefcase className="tm-input-icon" size={16} />
                  <input
                    type="text"
                    id="role"
                    name="role"
                    placeholder="e.g. Software Engineer"
                    value={formData.role}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Interactive Star Rating */}
              <div className="tm-form-group">
                <label>Your Rating *</label>
                <div className="tm-rating-picker">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`tm-star-btn ${
                        star <= (hoverRating || formData.rating) ? 'active' : ''
                      }`}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        size={22}
                        fill={
                          star <= (hoverRating || formData.rating)
                            ? '#f59e0b'
                            : 'none'
                        }
                      />
                    </button>
                  ))}
                  <span className="tm-rating-label">
                    {hoverRating || formData.rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Feedback Message */}
              <div className="tm-form-group">
                <label htmlFor="message">Your Review *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share your experience with us..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="tm-submit-btn">
                Submit Testimonial
              </button>
            </form>
          </section>

          {/* RIGHT 50%: Testimonials Table */}
          <section className="tm-table-card">
            <div className="tm-table-toolbar">
              <div>
                <h2>Recent Reviews</h2>
                <span className="tm-count-badge">
                  {testimonials.length} Entries
                </span>
              </div>

              {/* Search Control */}
              <div className="tm-search-box">
                <Search size={15} className="tm-search-icon" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Responsive Table Wrapper */}
            <div className="tm-table-wrapper">
              <table className="tm-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Rating</th>
                    <th>Feedback</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.length > 0 ? (
                    filteredTestimonials.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="tm-user-info">
                            <span className="tm-avatar">
                              {item.name.charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <strong className="tm-user-name">{item.name}</strong>
                              <span className="tm-user-role">
                                {item.role || 'Verified Customer'}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="tm-stars-display">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < item.rating ? 'star-filled' : 'star-empty'}
                                fill={i < item.rating ? '#f59e0b' : 'none'}
                              />
                            ))}
                          </div>
                        </td>
                        <td>
                          <p className="tm-message-text" title={item.message}>
                            "{item.message}"
                          </p>
                        </td>
                        <td className="tm-date-cell">{item.date}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="tm-empty-state">
                        No testimonials found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Testimonial;