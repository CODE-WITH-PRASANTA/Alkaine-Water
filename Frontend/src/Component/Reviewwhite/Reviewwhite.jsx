import React, { useEffect, useState } from "react";
import "./Reviewwhite.css";
import API, { IMG_URL } from "../../api/axios";

const Reviewwhite = () => {
  const [reviewDataList, setReviewDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // 1. FETCH DATA FROM BACKEND API
  // ============================================================
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await API.get("/testimonial");

      if (response.data?.success) {
        // Ensure data is an array before slicing
        const dataArray = Array.isArray(response.data.data) ? response.data.data : [];
        // Fetch latest 10 testimonials
        const latestTestimonials = dataArray.slice(0, 10);
        setReviewDataList(latestTestimonials);
      }
    } catch (error) {
      console.error("Testimonial Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 2. RATING STARS BUILDER
  // ============================================================
  const buildStarsRow = (filledCount) => {
    const safeCount = Number(filledCount) || 5; // Default to 5 if undefined
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < safeCount ? "rw-star-blue" : "rw-star-dim"}
      >
        ★
      </span>
    ));
  };

  // ============================================================
  // 3. IMAGE URL HELPER (Handles correct /uploads paths)
  // ============================================================
  const getImageUrl = (image) => {
    if (!image) return "https://placehold.co/120x120?text=User";
    
    if (image.startsWith("http")) return image;

    const baseUrl = IMG_URL.replace(/\/$/, ""); 
    
    // Safely construct the URL based on your server configuration
    if (baseUrl.endsWith("uploads")) {
      return `${baseUrl}/testimonial/${image}`;
    } else {
      return `${baseUrl}/uploads/testimonial/${image}`;
    }
  };

  // ============================================================
  // 4. RENDER UI
  // ============================================================
  if (loading) {
    return (
      <div className="rw-testimonial-section">
        <div style={{ textAlign: "center", padding: "60px 0", fontSize: "18px" }}>
          Loading testimonials...
        </div>
      </div>
    );
  }

  return (
    <div className="rw-testimonial-section">
      <div className="rw-viewport-slider-container">
        <div className="rw-track-animate-slider">
          {reviewDataList.length > 0 ? (
            reviewDataList.map((review, index) => (
              <div
                className="rw-review-card"
                key={review._id || index}
              >
                {/* Avatar */}
                <div className="rw-avatar-header-holder">
                  <img
                    src={getImageUrl(review.image)}
                    alt={review.name || "Reviewer"}
                    onError={(e) => {
                      // Safe fallback that won't cause infinite render loops
                      e.currentTarget.src = "https://placehold.co/120x120?text=User";
                    }}
                  />
                  <div className="rw-speech-pointer-tail"></div>
                </div>

                {/* Stars */}
                <div className="rw-stars-row-layout">
                  {buildStarsRow(review.rating)}
                </div>

                {/* Headline / Name */}
                <h3 className="rw-card-title-headline">
                  {review.name}
                </h3>

                {/* Description */}
                <p className="rw-card-body-paragraph">
                  {review.description}
                </p>

                {/* Footer */}
                <div className="rw-card-footer-author-meta">
                  <span className="rw-author-name-txt">
                    {review.name}{review.address ? "," : ""}
                  </span>
                  {review.address && (
                    <span className="rw-location-link-txt">
                      {" "}{review.address}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                padding: "40px 0",
                fontSize: "16px",
              }}
            >
              No testimonials available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviewwhite;