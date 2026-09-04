const mongoose = require("mongoose");
const Blog = require("../models/blog");

// Helper to parse keywords
const parseKeywords = (keywords) => {
  if (!keywords) return [];
  if (Array.isArray(keywords)) {
    return keywords.map((k) => String(k).trim()).filter(Boolean);
  }
  if (typeof keywords === "string") {
    const trimmed = keywords.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((k) => String(k).trim()).filter(Boolean);
        }
      } catch (e) {
        // Fallback
      }
    }
    return trimmed
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
  }
  return [];
};

// Helper to generate slug
const generateSlug = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Helper to clean category name (strip any existing counts like (2) or (02))
const cleanCategory = (category) => {
  if (!category) return "";
  return String(category).replace(/\s*\(\d+\)\s*$/, "").trim();
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

    // Dynamically calculate counts for each clean category
    const categoryCounts = {};
    blogs.forEach((blog) => {
      const cat = cleanCategory(blog.category);
      if (cat) {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      }
    });

    // Attach dynamic count to category name for frontend consumption
    const blogsWithCategoryCount = blogs.map((blog) => {
      const cat = cleanCategory(blog.category);
      const count = categoryCounts[cat] || 0;
      return {
        ...blog,
        category: cat ? (count > 0 ? `${cat} (${count})` : cat) : "",
      };
    });

    res.status(200).json({ success: true, blogs: blogsWithCategoryCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const blog = await Blog.findById(id).lean();
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    if (blog.category) {
      blog.category = cleanCategory(blog.category);
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const {
      name,
      designation,
      title,
      category,
      date,
      metaTitle,
      metaSlug,
      metaKeywords,
      metaDescription,
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const imageName = req.file.filename;
    const finalSlug = metaSlug ? generateSlug(metaSlug) : generateSlug(title);
    const parsedKeywords = parseKeywords(metaKeywords);
    const sanitizedCategory = cleanCategory(category);

    const newBlog = await Blog.create({
      image: imageName,
      date: date || new Date().toISOString().split("T")[0],
      name,
      designation,
      title,
      category: sanitizedCategory,
      metaTitle: metaTitle || title,
      metaSlug: finalSlug,
      metaKeywords: parsedKeywords,
      metaDescription: metaDescription || "",
      description: description || "",
    });

    res.status(201).json({ success: true, message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    if (updateData.category !== undefined) {
      updateData.category = cleanCategory(updateData.category);
    }

    if (updateData.metaKeywords !== undefined) {
      updateData.metaKeywords = parseKeywords(updateData.metaKeywords);
    }

    if (updateData.metaSlug !== undefined && updateData.metaSlug) {
      updateData.metaSlug = generateSlug(updateData.metaSlug);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};