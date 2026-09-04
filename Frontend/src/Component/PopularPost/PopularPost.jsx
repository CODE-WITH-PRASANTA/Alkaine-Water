import React, { useEffect, useState } from "react";
import API, { IMG_URL, getImageUrl } from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  FaCalendarAlt,
  FaUser,
  FaRegComment,
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram,
  FaSkype,
  FaArrowRight
} from "react-icons/fa";

import { ImQuotesLeft } from "react-icons/im";
import { IoColorPaletteSharp } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";

import "./PopularPost.css";

const PopularPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    fetchBlog();
    fetchBlogs();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      }
    } catch (error) {
      console.error("Error fetching absolute blog post:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blog/all");
      if (res.data.success) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.error("Error fetching all blogs:", error);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput) return alert("Please enter a valid email address.");
    alert(`Thank you for subscribing with: ${emailInput}`);
    setEmailInput("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  if (!blog) {
    return (
      <div className="loading-container">
        Loading...
      </div>
    );
  }

  const otherBlogs = blogs.filter(item => item._id !== id && item.metaSlug !== id);

  const filteredBlogs = otherBlogs.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(blogs.map(item => item.category))];

  const currentIdx = blogs.findIndex(item => item._id === id || item.metaSlug === id);
  const prevPost = currentIdx > 0 ? blogs[currentIdx - 1] : (blogs.length > 1 ? blogs[blogs.length - 1] : null);
  const nextPost = currentIdx !== -1 && currentIdx < blogs.length - 1 ? blogs[currentIdx + 1] : (blogs.length > 1 ? blogs[0] : null);

  return (
    <div className="PopularPost">

      <div className="PopularPost-palette-sticky" onClick={() => alert("Palette options coming soon!")}>
        <IoColorPaletteSharp />
      </div>

      <div className="PopularPost-container">

        <main className="PopularPost-main-content">

          <article className="PopularPost-article-card">

            <div className="PopularPost-main-img-container">
              <img
                src={getImageUrl(blog.image)}
                alt={blog.title}
                className="PopularPost-main-img"
              />

              <div className="PopularPost-badge">
                📁 {blog.category}
              </div>
            </div>

            <div className="PopularPost-meta-row">
              <span className="PopularPost-meta-item">
                <FaCalendarAlt className="PopularPost-meta-icon" />
                {blog.date || "March 15, 2024"}
              </span>
              <span className="PopularPost-meta-item">
                <FaUser className="PopularPost-meta-icon" />
                By {blog.name || "Admin"}
              </span>
              <span className="PopularPost-meta-item">
                <FaRegComment className="PopularPost-meta-icon" />
                0 Comments
              </span>
            </div>

            <h1 className="PopularPost-main-title">{blog.title}</h1>

            <div
              className="PopularPost-rich-content"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />





            {/* Post Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="PopularPost-tags-container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e2e8f0" }}>
                <strong style={{ color: "#334155", fontSize: "14px", marginRight: "4px" }}>Tags:</strong>
                {blog.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "#eff6ff",
                      color: "#2563eb",
                      border: "1px solid #bfdbfe",
                      padding: "4px 12px",
                      borderRadius: "16px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                    onClick={() => navigate("/blog")}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </article>

          <div className="PopularPost-author-card">
            <div className="PopularPost-author-avatar-box">
              <img
                src={getImageUrl(blog.image)}
                alt={blog.name}
                className="PopularPost-author-avatar"
              />
            </div>

            <div className="PopularPost-author-info">
              <h3 className="PopularPost-author-name">{blog.name}</h3>
              <h5>{blog.designation || "Author / Contributor"}</h5>
              <p className="PopularPost-author-bio">
                {blog.description ? `${blog.description.replace(/<[^>]*>/g, '').slice(0, 180)}...` : "Professional content creator sharing strategic domain updates."}
              </p>

              <div className="PopularPost-author-socials">
                <a href="#!"><FaFacebookF /></a>
                <a href="#!"><FaInstagram /></a>
                <a href="#!"><FaSkype /></a>
                <a href="#!"><FaTwitter /></a>
              </div>
            </div>
          </div>

        </main>

        <aside className="PopularPost-sidebar">

          {/* Search */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Search</h3>
            <form onSubmit={handleSearchSubmit} className="PopularPost-search-box">
              <input
                type="text"
                className="PopularPost-search-input"
                placeholder="Search Blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="PopularPost-search-btn">
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Categories</h3>
            <ul className="PopularPost-category-list">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="PopularPost-category-item"
                  onClick={() => setSearchQuery(category)}
                >
                  📁 {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Blogs */}
          <div className="PopularPost-widget">
            <h3 className="PopularPost-widget-title">Popular Posts</h3>
            <div className="PopularPost-sidebar-posts">
              {filteredBlogs.slice(0, 5).map(item => (
                <div
                  key={item._id}
                  className="PopularPost-item"
                  onClick={() => navigate(`/blogdetails/${item.metaSlug || item._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="PopularPost-img-container">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title}
                      className="PopularPost-thumb"
                    />
                  </div>

                  <div className="PopularPost-info">
                    <div className="PopularPost-date-wrapper">
                      <FaCalendarAlt className="PopularPost-calendar-icon" />
                      {item.date}
                    </div>
                    <h4 className="PopularPost-title">{item.title}</h4>
                  </div>
                </div>
              ))}
              {filteredBlogs.length === 0 && <p style={{ fontSize: "0.85rem", color: "#8c95a5" }}>No matching posts found.</p>}
            </div>
          </div>

          {/* Popular Tags */}
          {(() => {
            const allPopularTags = Array.from(
              new Set(
                blogs.flatMap((b) =>
                  Array.isArray(b.tags)
                    ? b.tags
                        .map((t) => (typeof t === "string" && t.trim() ? (t.trim().startsWith("#") ? t.trim() : `#${t.trim()}`) : ""))
                        .filter(Boolean)
                    : []
                )
              )
            );

            if (allPopularTags.length === 0) return null;

            return (
              <div className="PopularPost-widget">
                <h3 className="PopularPost-widget-title">Popular Tags</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {allPopularTags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "#f8fafc",
                        border: "1px solid #cbd5e1",
                        color: "#334155",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "500",
                        cursor: "pointer"
                      }}
                      onClick={() => navigate("/blog")}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Subscribe */}
          <div className="PopularPost-widget">
            <div className="PopularPost-subscribe-card">
              <div className="PopularPost-sub-icon-circle">
                <HiOutlineMailOpen />
              </div>

              <h4 className="PopularPost-sub-title">Subscribe Us</h4>
              <p className="PopularPost-sub-desc">
                Subscribe us & get latest news & articles to inbox.
              </p>

              <form onSubmit={handleSubscribe} className="PopularPost-sub-form">
                <input
                  type="email"
                  className="PopularPost-sub-input"
                  placeholder="Email Address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button type="submit" className="PopularPost-sub-btn">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default PopularPost;