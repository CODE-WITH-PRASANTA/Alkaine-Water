import React, { useEffect, useState } from "react";
import API, { IMG_URL } from "../../api/axios";
import "./Testiminial.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  // Form states
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  // Image states
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ============================================================
  // FETCH TESTIMONIALS
  // ============================================================
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonial");
      if (res.data?.success) {
        setTestimonials(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error.response?.data || error.message);
      setTestimonials([]);
    }
  };

  // ============================================================
  // IMAGE URL HELPER (FIXED)
  // ============================================================
  const getImageUrl = (image) => {
    if (!image) return "";
    
    // Remove trailing slash if it exists
    const baseUrl = IMG_URL.replace(/\/$/, ""); 
    
    // Safely construct the URL to ensure /uploads is included
    if (baseUrl.endsWith("uploads")) {
      return `${baseUrl}/testimonial/${image}`;
    } else {
      return `${baseUrl}/uploads/testimonial/${image}`;
    }
  };

  // ============================================================
  // IMAGE CHANGE
  // ============================================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB.");
      e.target.value = "";
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ============================================================
  // SUBMIT
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanAddress = address.trim();
    const cleanDescription = description.trim();
    const numericRating = Number(rating);

    if (!cleanName) return alert("Name is required.");
    if (!cleanAddress) return alert("Address is required.");
    if (!cleanDescription) return alert("Description is required.");
    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return alert("Please select a rating between 1 and 5.");
    }
    if (!isEditing && !imageFile) {
      return alert("Client photo is required.");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", cleanName);
      formData.append("address", cleanAddress);
      formData.append("description", cleanDescription);
      formData.append("rating", String(numericRating));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      let response;
      if (isEditing) {
        response = await API.put(`/testimonial/${currentId}`, formData);
      } else {
        response = await API.post("/testimonial", formData);
      }

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Operation failed.");
      }

      alert(isEditing ? "Testimonial updated successfully." : "Testimonial added successfully.");
      await fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      alert(`Server Error: ${error.response?.data?.message || error.message || "Operation failed."}`);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // EDIT (FIXED PREVIEW URL)
  // ============================================================
  const handleEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item._id);
    setName(item.name || "");
    setAddress(item.address || "");
    setDescription(item.description || "");
    setRating(Number(item.rating) || 0);
    setImageFile(null);

    // Apply the same fixed URL logic to the Edit preview
    if (item.image) {
      setImagePreview(getImageUrl(item.image));
    } else {
      setImagePreview("");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ============================================================
  // DELETE
  // ============================================================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    try {
      setLoading(true);
      const response = await API.delete(`/testimonial/${id}`);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to delete testimonial.");
      }

      alert("Testimonial deleted successfully.");
      await fetchTestimonials();

      const newTotalPages = Math.ceil((testimonials.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert(error.response?.data?.message || error.message || "Failed to delete testimonial.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // RESET
  // ============================================================
  const resetForm = () => {
    setName("");
    setAddress("");
    setDescription("");
    setRating(0);
    setImagePreview("");
    setImageFile(null);
    setIsEditing(false);
    setCurrentId(null);
    setHoverRating(0);

    const fileInput = document.getElementById("testimonial-file-input");
    if (fileInput) fileInput.value = "";
  };

  // ============================================================
  // PAGINATION & STARS
  // ============================================================
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = testimonials.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const renderStars = (count) => {
    const numericCount = Number(count) || 0;
    return "★".repeat(numericCount) + "☆".repeat(5 - numericCount);
  };

  // ============================================================
  // JSX
  // ============================================================
  return (
    <div className="testimonial-dashboard-container">
      <div className="testimonial-dashboard-row">
        {/* FORM */}
        <div className="testimonial-form-section">
          <div className="testimonial-card shadow-effect">
            <h2 className="testimonial-section-title">
              {isEditing ? "Modify Testimonial" : "Add Testimonial"}
            </h2>
            <form onSubmit={handleSubmit} className="testimonial-data-form">
              {/* IMAGE */}
              <div className="testimonial-upload-group">
                <label className="testimonial-input-label">
                  Client Photo {!isEditing && <span className="testimonial-required-star">*</span>}
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/jpg"
                  id="testimonial-file-input"
                  onChange={handleImageChange}
                  className="hidden-file-element"
                />
                <label htmlFor="testimonial-file-input" className="testimonial-dropzone-box">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Client Preview" className="testimonial-preview-display" />
                  ) : (
                    <div className="testimonial-dropzone-content">
                      <svg className="testimonial-cloud-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 16v-8m0 0l-3 3m3-3l3 3M4.038 8.571A6 6 0 0116.5 6.541A4 4 0 0120 10.3a4.5 4.5 0 01-4.5 4.5H14m-4 4h1.5" />
                      </svg>
                      <span className="testimonial-click-hint">Click to upload photo</span>
                      <span className="testimonial-meta-hint">PNG, JPG or WEBP (Max 2MB)</span>
                    </div>
                  )}
                </label>
              </div>

              {/* NAME & ADDRESS */}
              <div className="testimonial-field-row">
                <div className="testimonial-input-group">
                  <label className="testimonial-input-label">Full Name <span className="testimonial-required-star">*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" className="testimonial-text-field" />
                </div>
                <div className="testimonial-input-group">
                  <label className="testimonial-input-label">Address <span className="testimonial-required-star">*</span></label>
                  <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Bhubaneswar, Odisha" className="testimonial-text-field" />
                </div>
              </div>

              {/* RATING */}
              <div className="testimonial-input-group">
                <label className="testimonial-input-label">Rating <span className="testimonial-required-star">*</span></label>
                <div className="star-rating-selector">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <button
                      type="button"
                      key={starIndex}
                      className={`star-button ${(hoverRating || rating) >= starIndex ? "star-filled" : "star-empty"}`}
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-numerical-badge">{rating > 0 ? `(${rating} / 5)` : "(Select Stars)"}</span>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="testimonial-input-group">
                <label className="testimonial-input-label">Description <span className="testimonial-required-star">*</span></label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Share the client feedback..." rows="4" className="testimonial-textarea-field" />
              </div>

              {/* BUTTONS */}
              <div className="testimonial-action-buttons-row">
                <button type="submit" disabled={loading} className="testimonial-btn testimonial-btn-submit">
                  {loading ? "Processing..." : isEditing ? "Update Review" : "Submit"}
                </button>
                <button type="button" onClick={resetForm} disabled={loading} className="testimonial-btn testimonial-btn-cancel">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* TABLE */}
        <div className="testimonial-table-section">
          <div className="testimonial-card shadow-effect">
            <h2 className="testimonial-section-title">Manage Customer Reviews</h2>
            <div className="testimonial-table-scroll-container">
              <table className="testimonial-data-table">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>Sl No.</th>
                    <th style={{ width: "80px" }}>Image</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th style={{ width: "220px" }}>Description</th>
                    <th style={{ width: "100px" }}>Rating</th>
                    <th style={{ width: "150px", textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={item._id}>
                        <td>{indexOfFirstItem + index + 1}</td>
                        <td>
                          <div className="testimonial-table-preview-wrapper">
                            {item.image ? (
                              <img
                                src={getImageUrl(item.image)}
                                alt={item.name || "Client"}
                                className="testimonial-table-avatar"
                                /* IMPORTANT: I removed the onError that was hiding the image! */
                              />
                            ) : (
                              <div>No Image</div>
                            )}
                          </div>
                        </td>
                        <td className="testimonial-bold-cell">{item.name}</td>
                        <td>{item.address}</td>
                        <td className="testimonial-desc-cell">{item.description}</td>
                        <td><span className="table-stars-display">{renderStars(item.rating)}</span></td>
                        <td>
                          <div className="testimonial-row-actions">
                            <button type="button" onClick={() => handleEdit(item)} className="row-action-btn btn-action-edit">Edit</button>
                            <button type="button" onClick={() => handleDelete(item._id)} className="row-action-btn btn-action-delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="testimonial-table-empty">No client testimonials recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="testimonial-pagination">
                <button type="button" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="testimonial-page-nav-btn">
                  &laquo; Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button type="button" key={i + 1} onClick={() => paginate(i + 1)} className={`testimonial-page-num-btn ${currentPage === i + 1 ? "testimonial-page-active" : ""}`}>
                    {i + 1}
                  </button>
                ))}
                <button type="button" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="testimonial-page-nav-btn">
                  Next &raquo;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;