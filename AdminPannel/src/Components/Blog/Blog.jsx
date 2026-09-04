import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import API, { IMG_URL, BASE_URL } from "../../api/axios";
import {
  FaRegIdCard,
  FaTag,
  FaCalendarAlt,
  FaSearch,
  FaPencilAlt,
  FaTrashAlt,
  FaTimes,
  FaGlobe,
  FaKey,
  FaFileAlt,
  FaUpload,
  FaUndo,
  FaRegSave,
  FaUserTie,
  FaSpinner,
  FaSyncAlt,
  FaNewspaper
} from "react-icons/fa";
import "./Blog.css";

const emptyForm = {
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
  description: "",
  image: null
};

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Table Controls State
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fileInputRef = useRef(null);

  // Helper to format image URL from backend or external sources
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/150x150?text=No+Cover";
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

  // Fetch all blogs from Backend Database
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await API.get("/blog/all");
      let dataList = [];
      if (response.data && response.data.success && Array.isArray(response.data.blogs)) {
        dataList = response.data.blogs;
      } else if (response.data && Array.isArray(response.data.data)) {
        dataList = response.data.data;
      } else if (Array.isArray(response.data)) {
        dataList = response.data;
      }
      setBlogs(dataList);
    } catch (error) {
      console.error("Error fetching /blog/all, trying fallback /blog:", error);
      try {
        const fallbackRes = await API.get("/blog");
        let dataList = [];
        if (fallbackRes.data && fallbackRes.data.success && Array.isArray(fallbackRes.data.blogs)) {
          dataList = fallbackRes.data.blogs;
        } else if (fallbackRes.data && Array.isArray(fallbackRes.data.data)) {
          dataList = fallbackRes.data.data;
        } else if (Array.isArray(fallbackRes.data)) {
          dataList = fallbackRes.data;
        }
        setBlogs(dataList);
      } catch (err) {
        console.error("Fallback fetch failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Field Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from title if user hasn't explicitly edited the slug manually
    if (name === "title" && !editingId) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setFormData((prev) => ({ ...prev, metaSlug: generatedSlug }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // SEO Keywords Tag Manager
  const handleKeywordKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && keywordInput.trim()) {
      e.preventDefault();
      const formattedKey = keywordInput.trim().replace(/^,/, "");
      if (!formData.metaKeywords.includes(formattedKey)) {
        setFormData((prev) => ({
          ...prev,
          metaKeywords: [...prev.metaKeywords, formattedKey]
        }));
      }
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setFormData((prev) => ({
      ...prev,
      metaKeywords: prev.metaKeywords.filter((k) => k !== keywordToRemove)
    }));
  };

  // Form Reset
  const handleReset = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setPreview("");
    setKeywordInput("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit Action (Create / Update in Database)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !formData.image) {
      alert("Please select a cover image for the blog post.");
      return;
    }

    setSubmitting(true);
    const postData = new FormData();
    postData.append("name", formData.name);
    postData.append("designation", formData.designation);
    postData.append("title", formData.title);
    postData.append("category", formData.category);
    postData.append("date", formData.date || new Date().toISOString().split("T")[0]);
    postData.append("metaTitle", formData.metaTitle || formData.title);
    postData.append("metaSlug", formData.metaSlug || "");
    postData.append("metaKeywords", JSON.stringify(formData.metaKeywords || []));
    postData.append("metaDescription", formData.metaDescription || "");
    postData.append("description", formData.description || "");

    if (formData.image instanceof File) {
      postData.append("image", formData.image);
    }

    try {
      if (editingId) {
        const res = await API.put(`/blog/${editingId}`, postData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data && res.data.success) {
          alert("Blog post updated successfully!");
          fetchBlogs();
          handleReset();
        }
      } else {
        const res = await API.post("/blog/create", postData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        if (res.data && res.data.success) {
          alert("Blog post created successfully!");
          fetchBlogs();
          handleReset();
        }
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(error.response?.data?.message || "Failed to save blog post.");
    } finally {
      setSubmitting(false);
    }
  };

  // Edit Trigger
  const handleEdit = (blog) => {
    const blogId = blog._id || blog.id;
    setEditingId(blogId);
    setFormData({
      _id: blogId,
      name: blog.name || "",
      designation: blog.designation || "",
      title: blog.title || "",
      category: blog.category || "",
      date: blog.date || "",
      metaTitle: blog.metaTitle || "",
      metaSlug: blog.metaSlug || "",
      metaKeywords: Array.isArray(blog.metaKeywords) ? blog.metaKeywords : [],
      metaDescription: blog.metaDescription || "",
      description: blog.description || "",
      image: null
    });
    setPreview(blog.image ? getImageUrl(blog.image) : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Trigger
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this blog entry?")) {
      try {
        const res = await API.delete(`/blog/${id}`);
        if (res.data && res.data.success) {
          alert("Blog post deleted successfully!");
          fetchBlogs();
          if (editingId === id) handleReset();
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert(error.response?.data?.message || "Failed to delete blog post.");
      }
    }
  };

  // Table Logic (Search & Pagination)
  const filteredBlogs = (Array.isArray(blogs) ? blogs : []).filter((blog) => {
    const title = blog?.title ? String(blog.title).toLowerCase() : "";
    const name = blog?.name ? String(blog.name).toLowerCase() : "";
    const category = blog?.category ? String(blog.category).toLowerCase() : "";
    const metaSlug = blog?.metaSlug ? String(blog.metaSlug).toLowerCase() : "";
    const search = (searchTerm || "").toLowerCase();

    return (
      title.includes(search) ||
      name.includes(search) ||
      category.includes(search) ||
      metaSlug.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredBlogs.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <div className="Blog-container">
      {/* 1. Form Section Card */}
      <div className="Blog-card">
        <div className="Blog-header">
          <div className="Blog-header-info">
            <h2>{editingId ? "Update Blog Entry" : "Create New Blog"}</h2>
            <p>Configure post content, author details, and SEO metadata.</p>
          </div>
          {editingId && (
            <button type="button" className="Blog-btn-cancel-edit" onClick={handleReset}>
              <FaTimes /> Cancel Editing
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="Blog-form">
          {/* Row 1: Author & Designation */}
          <div className="Blog-row">
            <div className="Blog-group">
              <label>Author Name *</label>
              <div className="Blog-input-wrapper">
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <FaRegIdCard className="Blog-icon" />
              </div>
            </div>

            <div className="Blog-group">
              <label>Author Designation *</label>
              <div className="Blog-input-wrapper">
                <input
                  type="text"
                  name="designation"
                  placeholder="e.g. Senior Editor"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
                <FaUserTie className="Blog-icon" />
              </div>
            </div>
          </div>

          {/* Row 2: Title & Category */}
          <div className="Blog-row">
            <div className="Blog-group">
              <label>Blog Title *</label>
              <div className="Blog-input-wrapper">
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Future of Design Systems"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <FaFileAlt className="Blog-icon" />
              </div>
            </div>

            <div className="Blog-group">
              <label>Category *</label>
              <div className="Blog-input-wrapper">
                <input
                  type="text"
                  name="category"
                  placeholder="e.g. Technology"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
                <FaTag className="Blog-icon" />
              </div>
            </div>
          </div>

          {/* Row 3: Publish Date & Cover Image */}
          <div className="Blog-row">
            <div className="Blog-group">
              <label>Publish Date *</label>
              <div className="Blog-input-wrapper">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <FaCalendarAlt className="Blog-icon" />
              </div>
            </div>

            <div className="Blog-group">
              <label>Cover Image {editingId ? "(Optional to change)" : "*"}</label>
              <div className="Blog-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  required={!editingId && !preview}
                />
                <FaUpload className="Blog-icon" />
              </div>
            </div>
          </div>

          {/* Image Preview Box */}
          {preview && (
            <div className="Blog-preview-wrapper">
              <img src={preview} alt="Blog Thumbnail Preview" />
              <button
                type="button"
                className="Blog-remove-preview"
                onClick={() => {
                  setPreview("");
                  setFormData((prev) => ({ ...prev, image: null }));
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
              >
                <FaTimes /> Remove Image
              </button>
            </div>
          )}

          {/* SEO Metadata Sub-section */}
          <div className="Blog-seo-fieldset">
            <div className="Blog-seo-header">
              <FaGlobe /> <span>SEO Metadata Settings</span>
            </div>

            <div className="Blog-row">
              <div className="Blog-group">
                <label>Meta Title</label>
                <div className="Blog-input-wrapper">
                  <input
                    type="text"
                    name="metaTitle"
                    placeholder="Page title for search engines"
                    value={formData.metaTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="Blog-group">
                <label>Meta Slug</label>
                <div className="Blog-input-wrapper">
                  <input
                    type="text"
                    name="metaSlug"
                    placeholder="e.g. future-of-design-systems"
                    value={formData.metaSlug}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="Blog-group">
              <label>Meta Keywords (Press Enter or Comma)</label>
              <div className="Blog-input-wrapper">
                <input
                  type="text"
                  placeholder="Add keyword..."
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                />
                <FaKey className="Blog-icon" />
              </div>

              {formData.metaKeywords.length > 0 && (
                <div className="Blog-tags-badge-list">
                  {formData.metaKeywords.map((kw, idx) => (
                    <span key={idx} className="Blog-tag-pill">
                      {kw}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                      >
                        <FaTimes />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="Blog-group" style={{ marginTop: "12px" }}>
              <label>Meta Description</label>
              <textarea
                name="metaDescription"
                rows="2"
                placeholder="Brief summary for Google search result snippets..."
                value={formData.metaDescription}
                onChange={handleChange}
                className="Blog-textarea"
              ></textarea>
            </div>
          </div>

          {/* Rich Text Main Content Description */}
          <div className="Blog-group">
            <label>Main Body Content</label>
            <Editor
              tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js"
              value={formData.description}
              init={{
                height: 240,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "table",
                  "wordcount"
                ],
                toolbar:
                  "undo redo | blocks | bold italic underline forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image table | removeformat",
                content_style:
                  "body { font-family:Inter,sans-serif; font-size:13px }"
              }}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, description: content }))
              }
            />
          </div>

          {/* Form Actions */}
          <div className="Blog-actions">
            <button
              type="button"
              className="Blog-btn-reset"
              onClick={handleReset}
              disabled={submitting}
            >
              <FaUndo /> Reset
            </button>
            <button type="submit" className="Blog-btn-save" disabled={submitting}>
              {submitting ? (
                <>
                  <FaSpinner className="fa-spin" /> Saving...
                </>
              ) : (
                <>
                  <FaRegSave /> {editingId ? "Update Article" : "Save Article"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Published Articles Data Table Card */}
      <div className="Blog-card Blog-table-card">
        <div className="Blog-header Blog-table-header">
          <div>
            <h2>Published Articles ({blogs.length})</h2>
            <p>Live database records. Search, review, edit, or delete articles.</p>
          </div>
          <button
            type="button"
            className="Blog-btn-refresh"
            onClick={fetchBlogs}
            disabled={loading}
            title="Reload from Database"
          >
            <FaSyncAlt className={loading ? "fa-spin" : ""} /> Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="Blog-controls">
          <div className="Blog-show-entries">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            entries
          </div>

          <div className="Blog-search">
            <input
              type="text"
              placeholder="Search by title, author, category, slug..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <button type="button" className="Blog-search-btn">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="Blog-table-wrapper">
          <table className="Blog-table">
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Cover</th>
                <th style={{ width: "240px" }}>Article Info</th>
                <th style={{ width: "160px" }}>Author</th>
                <th style={{ width: "180px" }}>SEO / Slug</th>
                <th style={{ width: "130px" }}>Category</th>
                <th style={{ width: "110px" }}>Date</th>
                <th style={{ width: "100px", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="Blog-empty-td">
                    <FaSpinner className="fa-spin" style={{ fontSize: "20px", marginBottom: "8px" }} />
                    <div>Loading articles from database...</div>
                  </td>
                </tr>
              ) : currentBlogs.length > 0 ? (
                currentBlogs.map((blog) => {
                  const blogId = blog._id || blog.id;
                  return (
                    <tr key={blogId}>
                      <td>
                        <img
                          src={getImageUrl(blog.image)}
                          alt={blog.title || "Blog cover"}
                          className="Blog-table-img"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://placehold.co/70x70?text=No+Image";
                          }}
                        />
                      </td>
                      <td className="Blog-title-cell">
                        <span className="Blog-post-title">{blog.title || "Untitled"}</span>
                        <div
                          className="Blog-post-desc-preview"
                          dangerouslySetInnerHTML={{ __html: blog.description || "" }}
                        />
                      </td>
                      <td>
                        <div className="Blog-author-info">
                          <span className="Blog-author-name">{blog.name || "N/A"}</span>
                          <span className="Blog-author-desig">
                            {blog.designation || ""}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="Blog-seo-cell">
                          {blog.metaSlug ? (
                            <code className="Blog-slug-code">/{blog.metaSlug}</code>
                          ) : (
                            <span style={{ color: "#94a3b8", fontSize: "11px" }}>No slug</span>
                          )}
                          {Array.isArray(blog.metaKeywords) && blog.metaKeywords.length > 0 && (
                            <div className="Blog-table-keywords">
                              {blog.metaKeywords.map((kw, kIdx) => (
                                <span key={kIdx} className="Blog-mini-badge">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="Blog-category-badge">
                          {blog.category || "General"}
                        </span>
                      </td>
                      <td className="Blog-date-cell">{blog.date || "N/A"}</td>
                      <td className="Blog-actions-cell" style={{ justifyContent: "center" }}>
                        <button
                          type="button"
                          className="Blog-action-edit"
                          onClick={() => handleEdit(blog)}
                          title="Edit Article"
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          type="button"
                          className="Blog-action-delete"
                          onClick={() => handleDelete(blogId)}
                          title="Delete Article"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="Blog-empty-td">
                    <FaNewspaper style={{ fontSize: "32px", color: "#cbd5e1", marginBottom: "8px" }} />
                    <div style={{ fontWeight: 600, color: "#64748b" }}>No articles found in database.</div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "4px" }}>
                      Fill out the form above and click "Save Article" to create your first blog post.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="Blog-footer">
          <div className="Blog-showing-info">
            Showing {filteredBlogs.length ? startIndex + 1 : 0} to{" "}
            {Math.min(startIndex + entriesPerPage, filteredBlogs.length)} of{" "}
            {filteredBlogs.length} entries
          </div>
          <div className="Blog-pagination">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;