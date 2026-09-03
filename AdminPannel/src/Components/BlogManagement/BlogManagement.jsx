import React, { useState, useEffect } from "react";
import {
  FaThLarge,
  FaList,
  FaSearch,
  FaPlus,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaGlobe,
  FaTag,
  FaTimes,
  FaKey,
  FaCalendarAlt,
  FaUser,
  FaFileAlt
} from "react-icons/fa";
import "./BlogManagement.css";

// Sample initial data with SEO fields
const initialBlogs = [
  {
    _id: "1",
    name: "Alex Johnson",
    designation: "Tech Architect",
    title: "Designing Scalable Micro Frontends in 2026",
    category: "Architecture",
    date: "2026-03-01",
    metaTitle: "Designing Scalable Micro Frontends | Modern Web",
    metaSlug: "designing-scalable-micro-frontends-2026",
    metaKeywords: ["MicroFrontend", "React", "Architecture"],
    metaDescription: "Learn how to build scalable and decoupled web micro frontends using current web tools.",
    status: "Published",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "2",
    name: "Sophia Martinez",
    designation: "UI/UX Lead",
    title: "The Evolution of Motion Design in Web Apps",
    category: "Design",
    date: "2026-02-18",
    metaTitle: "The Evolution of Motion Design in Web Apps",
    metaSlug: "evolution-of-motion-design-web-apps",
    metaKeywords: ["UI/UX", "Animation", "CSS"],
    metaDescription: "Discover how functional motion design improves usability and user retention.",
    status: "Draft",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "3",
    name: "David Chen",
    designation: "DevOps Engineer",
    title: "Zero-Downtime Deployments with Kubernetes",
    category: "DevOps",
    date: "2026-01-22",
    metaTitle: "Zero-Downtime Kubernetes Deployments Guide",
    metaSlug: "zero-downtime-deployments-kubernetes",
    metaKeywords: ["DevOps", "Kubernetes", "CI/CD"],
    metaDescription: "A step-by-step tutorial on rolling updates and blue-green deployments.",
    status: "Published",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
  }
];

const emptyBlogForm = {
  _id: null,
  name: "",
  designation: "",
  title: "",
  category: "",
  date: "",
  metaTitle: "",
  metaSlug: "",
  metaKeywords: [],
  metaDescription: "",
  status: "Draft",
  image: ""
};

const ITEMS_PER_PAGE = 6;

const BlogManagement = () => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal / Editor Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyBlogForm);
  const [keywordInput, setKeywordInput] = useState("");

  // Handle outside click for action dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".BM-action-btn") &&
        !event.target.closest(".BM-dropdown-menu")
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  // Form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate meta slug from title if modifying title
    if (name === "title" && !formData._id) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setFormData((prev) => ({ ...prev, metaSlug: generatedSlug }));
    }
  };

  // SEO Keywords Tag input
  const handleKeywordKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && keywordInput.trim()) {
      e.preventDefault();
      const newTag = keywordInput.trim().replace(/^,/, "");
      if (!formData.metaKeywords.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          metaKeywords: [...prev.metaKeywords, newTag]
        }));
      }
      setKeywordInput("");
    }
  };

  const removeKeywordTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter((tag) => tag !== tagToRemove)
    }));
  };

  // Actions
  const handleOpenCreateModal = () => {
    setFormData(emptyBlogForm);
    setKeywordInput("");
    setIsModalOpen(true);
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setActiveDropdown(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setBlogs((prev) => prev.filter((item) => item._id !== id));
      setActiveDropdown(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData._id) {
      // Update existing
      setBlogs((prev) =>
        prev.map((item) => (item._id === formData._id ? { ...formData } : item))
      );
    } else {
      // Create new
      const newEntry = {
        ...formData,
        _id: String(Date.now()),
        image:
          formData.image ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80"
      };
      setBlogs([newEntry, ...blogs]);
    }
    setIsModalOpen(false);
  };

  // Filtering Logic
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.metaSlug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category)))];

  return (
    <div className="BM-container">
      {/* Top Header */}
      <header className="BM-header">
        <div>
          <h1 className="BM-title">Blog Management</h1>
          <p className="BM-subtitle">
            Create, manage, and optimize your published articles and SEO tags.
          </p>
        </div>

        <div className="BM-header-actions">
          <div className="BM-view-toggle">
            <button
              className={`BM-toggle-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
              title="Table View"
            >
              <FaList /> Table
            </button>
            <button
              className={`BM-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
              title="Grid View"
            >
              <FaThLarge /> Grid
            </button>
          </div>

          <button className="BM-btn-primary" onClick={handleOpenCreateModal}>
            <FaPlus /> Add New Article
          </button>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <div className="BM-filter-bar">
        <div className="BM-search-box">
          <FaSearch className="BM-search-icon" />
          <input
            type="text"
            placeholder="Search by title, author, or slug..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="BM-category-filters">
          <span>Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`BM-category-pill ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content View */}
      <main className="BM-content">
        {viewMode === "list" ? (
          /* PREMIUM QUALITY TABLE DESIGN */
          <div className="BM-table-card">
            <div className="BM-table-wrapper">
              <table className="BM-table">
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Author</th>
                    <th>SEO & Slug</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="BM-text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className="BM-article-cell">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="BM-article-thumb"
                            />
                            <div className="BM-article-info">
                              <span className="BM-article-title">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="BM-author-cell">
                            <span className="BM-author-name">{item.name}</span>
                            <span className="BM-author-role">
                              {item.designation}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div className="BM-seo-cell">
                            <code className="BM-slug-badge">/{item.metaSlug}</code>
                            {item.metaKeywords && item.metaKeywords.length > 0 && (
                              <div className="BM-tag-list">
                                {item.metaKeywords.slice(0, 2).map((kw, idx) => (
                                  <span key={idx} className="BM-mini-tag">
                                    {kw}
                                  </span>
                                ))}
                                {item.metaKeywords.length > 2 && (
                                  <span className="BM-mini-tag opacity">
                                    +{item.metaKeywords.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="BM-category-badge">
                            {item.category}
                          </span>
                        </td>
                        <td className="BM-date-cell">{item.date}</td>
                        <td>
                          <span
                            className={`BM-status-badge ${item.status.toLowerCase()}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="BM-text-right BM-pos-relative">
                          <button
                            className="BM-action-btn"
                            onClick={(e) => toggleDropdown(item._id, e)}
                          >
                            <FaEllipsisV />
                          </button>

                          {activeDropdown === item._id && (
                            <div className="BM-dropdown-menu">
                              <button onClick={() => handleEdit(item)}>
                                <FaEdit /> Edit
                              </button>
                              <button
                                className="BM-delete-action"
                                onClick={() => handleDelete(item._id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="BM-empty-table">
                        No articles match your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="BM-grid-layout">
            {currentItems.map((item) => (
              <div key={item._id} className="BM-grid-card">
                <div
                  className="BM-card-media"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <span
                    className={`BM-status-badge float ${item.status.toLowerCase()}`}
                  >
                    {item.status}
                  </span>
                  <div className="BM-grid-actions">
                    <button
                      className="BM-action-btn glass"
                      onClick={(e) => toggleDropdown(item._id, e)}
                    >
                      <FaEllipsisV />
                    </button>
                    {activeDropdown === item._id && (
                      <div className="BM-dropdown-menu right-aligned">
                        <button onClick={() => handleEdit(item)}>
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="BM-delete-action"
                          onClick={() => handleDelete(item._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="BM-card-body">
                  <span className="BM-category-badge">{item.category}</span>
                  <h3 className="BM-card-title">{item.title}</h3>
                  <code className="BM-slug-badge">/{item.metaSlug}</code>

                  <div className="BM-card-footer">
                    <div>
                      <span className="BM-author-name">{item.name}</span>
                      <span className="BM-author-role">{item.designation}</span>
                    </div>
                    <span className="BM-date-cell">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <footer className="BM-pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="BM-page-nav"
          >
            Previous
          </button>

          <div className="BM-page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`BM-page-num ${
                  currentPage === page ? "active" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="BM-page-nav"
          >
            Next
          </button>
        </footer>
      )}

      {/* ARTICLE EDITOR MODAL WITH SEO FIELDS */}
      {isModalOpen && (
        <div className="BM-modal-overlay">
          <div className="BM-modal-content">
            <div className="BM-modal-header">
              <h2>{formData._id ? "Edit Article" : "Create Article"}</h2>
              <button
                className="BM-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="BM-form">
              {/* Row 1: Basic Info */}
              <div className="BM-form-row">
                <div className="BM-field">
                  <label>Author Name *</label>
                  <div className="BM-input-icon">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <FaUser />
                  </div>
                </div>

                <div className="BM-field">
                  <label>Designation *</label>
                  <input
                    type="text"
                    name="designation"
                    required
                    placeholder="e.g. Senior Tech Writer"
                    value={formData.designation}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 2: Title & Category */}
              <div className="BM-form-row">
                <div className="BM-field">
                  <label>Article Title *</label>
                  <div className="BM-input-icon">
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="Article title..."
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    <FaFileAlt />
                  </div>
                </div>

                <div className="BM-field">
                  <label>Category *</label>
                  <input
                    type="text"
                    name="category"
                    required
                    placeholder="e.g. Technology"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Row 3: Date, Status, Image URL */}
              <div className="BM-form-row three-col">
                <div className="BM-field">
                  <label>Publish Date</label>
                  <div className="BM-input-icon">
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                    <FaCalendarAlt />
                  </div>
                </div>

                <div className="BM-field">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="BM-field">
                  <label>Cover Image URL</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* SEO METADATA SECTION */}
              <div className="BM-seo-section">
                <div className="BM-seo-title">
                  <FaGlobe /> SEO Metadata Configuration
                </div>

                <div className="BM-form-row">
                  <div className="BM-field">
                    <label>Meta Title</label>
                    <input
                      type="text"
                      name="metaTitle"
                      placeholder="Browser tab title for search engines"
                      value={formData.metaTitle}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="BM-field">
                    <label>Meta Slug</label>
                    <input
                      type="text"
                      name="metaSlug"
                      placeholder="url-friendly-slug"
                      value={formData.metaSlug}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="BM-field">
                  <label>Meta Keywords (Press Enter or Comma)</label>
                  <div className="BM-input-icon">
                    <input
                      type="text"
                      placeholder="Type keyword and press enter..."
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      onKeyDown={handleKeywordKeyDown}
                    />
                    <FaKey />
                  </div>

                  {formData.metaKeywords.length > 0 && (
                    <div className="BM-tag-container">
                      {formData.metaKeywords.map((tag, idx) => (
                        <span key={idx} className="BM-pill-tag">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeKeywordTag(tag)}
                          >
                            <FaTimes />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="BM-field" style={{ marginTop: "12px" }}>
                  <label>Meta Description</label>
                  <textarea
                    name="metaDescription"
                    rows="2"
                    placeholder="Brief description for search result snippets..."
                    value={formData.metaDescription}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="BM-modal-actions">
                <button
                  type="button"
                  className="BM-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="BM-btn-primary">
                  {formData._id ? "Update Article" : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;