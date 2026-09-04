import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoColorPaletteSharp } from 'react-icons/io5';
import API from '../../api/axios';
import './BlogDetailsHead.css';
import backgroundImg from '../../assets/breadcrum.jpeg';

const BlogDetailsHead = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const fetchBlogDetails = async () => {
    try {
      const res = await API.get(`/blog/${id}`);
      if (res.data.success) {
        setBlog(res.data.blog);
      }
    } catch (err) {
      console.error("Error fetching blog details for breadcrumb:", err);
    }
  };

  const dynamicSlug =
    blog?.metaSlug ||
    blog?.title
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') ||
    "details";

  return (
    <div 
      className="BlogDetailsHead" 
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Floating Left Icon */}
      <div className="BlogDetailsHead-icon-wrapper">
        <IoColorPaletteSharp className="BlogDetailsHead-palette-icon" />
      </div>

      {/* Content Container */}
      <div className="BlogDetailsHead-content">
        <h1 className="BlogDetailsHead-title">
          {blog?.title || "Blog Details"}
        </h1>
        
        <nav className="BlogDetailsHead-breadcrumbs">
          <Link to="/" className="BlogDetailsHead-crumb-link">Home</Link>
          <span className="BlogDetailsHead-separator">/</span>
          <Link to="/blog" className="BlogDetailsHead-crumb-link">Blog</Link>
          <span className="BlogDetailsHead-separator">/</span>
          <span className="BlogDetailsHead-crumb-current">{dynamicSlug}</span>
        </nav>
      </div>
    </div>
  );
};

export default BlogDetailsHead;