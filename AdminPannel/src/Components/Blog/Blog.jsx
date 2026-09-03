import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
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
  FaUserTie
} from "react-icons/fa";
import "./Blog.css";

// Mock Data for UI Demonstration
const initialBlogs = [
  {
    id: 1,
    name: "Alex Johnson",
    designation: "Technical Writer",
    title: "Designing Scalable Web Applications in 2026",
    category: "Development",
    date: "2026-03-15",
    metaTitle: "Designing Scalable Web Applications | Dev Blog",
    metaSlug: "designing-scalable-web-applications-2026",
    metaKeywords: ["React", "WebDev", "Scalability"],
    metaDescription: "A practical guide to building clean, maintainable web applications.",
    description: "<p>Building modern web systems requires modular architecture and clear layout balance...</p>",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    name: "Sophia Martinez",
    designation: "Product Designer",
    title: "Mastering UI Micro-interactions",
    category: "UI/UX Design",
    date: "2026-02-28",
    metaTitle: "Mastering UI Micro-interactions for Modern Web",
    metaSlug: "mastering-ui-micro-interactions",
    metaKeywords: ["UI", "UX", "Micro-interactions"],
    metaDescription: "Learn how small animations improve user engagement.",
    description: "<p>Micro-interactions bridge the gap between static screens and tactile UI experiences...</p>",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=150&q=80"
  }
];

const emptyForm = {
  id: null,
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
  const [blogs, setBlogs] = useState(initialBlogs);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  // Table Controls State
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fileInputRef = useRef(null);

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

  // Local Submit Action
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setBlogs((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...formData,
                image: preview || item.image
              }
            : item
        )
      );
    } else {
      const newBlog = {
        ...formData,
        id: Date.now(),
        image: preview || "https://placehold.co/150x150?text=Blog+Cover"
      };
      setBlogs([newBlog, ...blogs]);
    }

    handleReset();
  };

  // Edit Trigger
  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setFormData({
      ...blog,
      image: null
    });
    setPreview(typeof blog.image === "string" ? blog.image : "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete Trigger
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this blog entry?")) {
      setBlogs((prev) => prev.filter((item) => item.id !== id));
      if (editingId === id) handleReset();
    }
  };

  // Table Logic (Search & Pagination)
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.metaSlug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / entriesPerPage) || 1;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + entriesPerPage
  );

  return (
    <div className="Blog-container">
      {/* Editor / Form Section */}
      <div className="Blog-card">
        <div className="Blog-header">
          <h2>{editingId ? "Update Blog Entry" : "Create New Blog"}</h2>
          <p>Configure post content, author details, and SEO metadata.</p>
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
              <label>Cover Image</label>
              <div className="Blog-input-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
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
            >
              <FaUndo /> Reset
            </button>
            <button type="submit" className="Blog-btn-save">
              <FaRegSave /> {editingId ? "Update Article" : "Save Article"}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="Blog-card">
        <div className="Blog-header">
          <h2>Published Articles</h2>
          <p>Search, review, and edit blog posts & SEO tags.</p>
        </div>

        {/* Filters */}
        <div className="Blog-controls">
          <div className="Blog-show-entries">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            entries
          </div>

          <div className="Blog-search">
            <input
              type="text"
              placeholder="Search by title, author, slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <th>Cover</th>
                <th>Article Info</th>
                <th>Author</th>
                <th>SEO / Slug</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="Blog-table-img"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/70x70?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="Blog-title-cell">
                      <span className="Blog-post-title">{blog.title}</span>
                      <div
                        className="Blog-post-desc-preview"
                        dangerouslySetInnerHTML={{ __html: blog.description }}
                      />
                    </td>
                    <td>
                      <div className="Blog-author-info">
                        <span className="Blog-author-name">{blog.name}</span>
                        <span className="Blog-author-desig">
                          {blog.designation}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="Blog-seo-cell">
                        <code className="Blog-slug-code">/{blog.metaSlug}</code>
                        {blog.metaKeywords && blog.metaKeywords.length > 0 && (
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
                        {blog.category}
                      </span>
                    </td>
                    <td className="Blog-date-cell">{blog.date}</td>
                    <td className="Blog-actions-cell">
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
                        onClick={() => handleDelete(blog.id)}
                        title="Delete Article"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="Blog-empty-td">
                    No articles found match your selection.
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