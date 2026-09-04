import React, { useState, useEffect } from "react";
import API, { IMG_URL, BASE_URL } from "../../api/axios";
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
  const [blogs, setBlogs] = useState([]);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal / Editor Drawer state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyBlogForm);
  const [keywordInput, setKeywordInput] = useState("");

  // Helper to format image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80";
    if (typeof imagePath === "string" && /^https?:\/\//i.test(imagePath)) {
      return imagePath;
    }
    const cleanPath = String(imagePath).replace(/\\/g, "/").replace(/^\/+/, "");
    const hostBase = IMG_URL
      ? IMG_URL.replace(/\/$/, "")
      : (BASE_URL ? BASE_URL.replace(/\/$/, "") : "http://localhost:5000");

    if (cleanPath.startsWith("uploads/")) {
      return `${hostBase}/${cleanPath}`;
    }
    return `${hostBase}/uploads/${cleanPath}`;
  };

  // Fetch blogs from backend database
  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blog/all");
      let list = [];
      if (response.data && response.data.success && Array.isArray(response.data.blogs)) {
        list = response.data.blogs;
      } else if (response.data && Array.isArray(response.data.data)) {
        list = response.data.data;
      } else if (Array.isArray(response.data)) {
        list = response.data;
      }
      setBlogs(list);
    } catch (error) {
      console.error("Error fetching /blog/all, trying fallback /blog:", error);
      try {
        const fallback = await API.get("/blog");
        let list = [];
        if (fallback.data && fallback.data.success && Array.isArray(fallback.data.blogs)) {
          list = fallback.data.blogs;
        } else if (fallback.data && Array.isArray(fallback.data.data)) {
          list = fallback.data.data;
        } else if (Array.isArray(fallback.data)) {
          list = fallback.data;
        }
        setBlogs(list);
      } catch (err) {
        console.error("Fallback fetch error:", err);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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
    setFormData({
      _id: blog._id || blog.id,
      name: blog.name || "",
      designation: blog.designation || "",
      title: blog.title || "",
      category: blog.category || "",
      date: blog.date || "",
      metaTitle: blog.metaTitle || "",
      metaSlug: blog.metaSlug || "",
      metaKeywords: Array.isArray(blog.metaKeywords) ? blog.metaKeywords : [],
      metaDescription: blog.metaDescription || "",
      status: blog.status || "Published",
      image: blog.image || ""
    });
    setActiveDropdown(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        const res = await API.delete(`/blog/${id}`);
        if (res.data && res.data.success) {
          fetchBlogs();
          setActiveDropdown(null);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert(error.response?.data?.message || "Failed to delete article");
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        designation: formData.designation,
        title: formData.title,
        category: formData.category,
        date: formData.date || new Date().toISOString().split("T")[0],
        metaTitle: formData.metaTitle || formData.title,
        metaSlug: formData.metaSlug || "",
        metaKeywords: formData.metaKeywords || [],
        metaDescription: formData.metaDescription || "",
        status: formData.status || "Published",
        image: formData.image || ""
      };

      if (formData._id) {
        // Update existing
        const res = await API.put(`/blog/${formData._id}`, payload);
        if (res.data && res.data.success) {
          fetchBlogs();
          setIsModalOpen(false);
        }
      } else {
        // Create new
        const res = await API.post("/blog/create", payload);
        if (res.data && res.data.success) {
          fetchBlogs();
          setIsModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(error.response?.data?.message || "Failed to save article");
    }
  };

  // Filtering Logic
  const filteredBlogs = (Array.isArray(blogs) ? blogs : []).filter((blog) => {
    const title = blog?.title ? String(blog.title).toLowerCase() : "";
    const name = blog?.name ? String(blog.name).toLowerCase() : "";
    const metaSlug = blog?.metaSlug ? String(blog.metaSlug).toLowerCase() : "";
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(search) ||
      name.includes(search) ||
      metaSlug.includes(search);

    const matchesCategory =
      selectedCategory === "All" || blog?.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE) || 1;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))];

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
                    <th style={{ textAlign: "center", width: "160px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item) => {
                      const itemId = item._id || item.id;
                      return (
                        <tr key={itemId}>
                          <td>
                            <div className="BM-article-cell">
                              <img
                                src={getImageUrl(item.image)}
                                alt={item.title || "Blog cover"}
                                className="BM-article-thumb"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80";
                                }}
                              />
                              <div className="BM-article-info">
                                <span className="BM-article-title">
                                  {item.title || "Untitled"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="BM-author-cell">
                              <span className="BM-author-name">{item.name || "N/A"}</span>
                              <span className="BM-author-role">
                                {item.designation || ""}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="BM-seo-cell">
                              {item.metaSlug ? (
                                <code className="BM-slug-badge">/{item.metaSlug}</code>
                              ) : (
                                <span style={{ color: "#94a3b8", fontSize: "11px" }}>No slug</span>
                              )}
                              {Array.isArray(item.metaKeywords) && item.metaKeywords.length > 0 && (
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
                              {item.category || "General"}
                            </span>
                          </td>
                          <td className="BM-date-cell">{item.date || "N/A"}</td>
                          <td>
                            <span
                              className={`BM-status-badge ${(item.status || "published").toLowerCase()}`}
                            >
                              {item.status || "Published"}
                            </span>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <div className="BM-table-actions-group">
                              <button
                                type="button"
                                className="BM-table-btn BM-btn-edit"
                                onClick={() => handleEdit(item)}
                                title="Edit Article"
                              >
                                <FaEdit />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                className="BM-table-btn BM-btn-delete"
                                onClick={() => handleDelete(itemId)}
                                title="Delete Article"
                              >
                                <FaTrash />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
            {currentItems.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="BM-grid-card">
                  <div
                    className="BM-card-media"
                    style={{ backgroundImage: `url(${getImageUrl(item.image)})` }}
                  >
                    <span
                      className={`BM-status-badge float ${(item.status || "published").toLowerCase()}`}
                    >
                      {item.status || "Published"}
                    </span>
                    <div className="BM-grid-actions">
                      <button
                        className="BM-action-btn glass"
                        onClick={(e) => toggleDropdown(itemId, e)}
                      >
                        <FaEllipsisV />
                      </button>
                      {activeDropdown === itemId && (
                        <div className="BM-dropdown-menu right-aligned">
                          <button onClick={() => handleEdit(item)}>
                            <FaEdit /> Edit
                          </button>
                          <button
                            className="BM-delete-action"
                            onClick={() => handleDelete(itemId)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="BM-card-body">
                    <span className="BM-category-badge">{item.category || "General"}</span>
                    <h3 className="BM-card-title">{item.title || "Untitled"}</h3>
                    {item.metaSlug && <code className="BM-slug-badge">/{item.metaSlug}</code>}

                    <div className="BM-card-footer">
                      <div>
                        <span className="BM-author-name">{item.name || "N/A"}</span>
                        <span className="BM-author-role">{item.designation || ""}</span>
                      </div>
                      <span className="BM-date-cell">{item.date || "N/A"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
                className={`BM-page-num ${currentPage === page ? "active" : ""
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