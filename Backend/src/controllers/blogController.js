const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog");

// Helper to delete an image file from disk
const deleteFileIfLocal = (filePath) => {
  if (!filePath || typeof filePath !== "string") return;
  if (
    filePath.startsWith("http://") ||
    filePath.startsWith("https://") ||
    filePath.startsWith("blob:") ||
    filePath.startsWith("data:")
  ) {
    return;
  }
  try {
    const sanitized = filePath
      .replace(/^\/+/, "")
      .replace(/^uploads\//, "")
      .replace(/^(\.\/)/, "");

    const possiblePaths = [
      path.join(__dirname, "../../uploads", sanitized),
      path.join(__dirname, "../uploads", sanitized),
      path.join(__dirname, "../../uploads/blog", path.basename(sanitized)),
      path.join(__dirname, "../uploads/blog", path.basename(sanitized)),
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        fs.unlinkSync(p);
      }
    }
  } catch (err) {
    console.warn("Could not delete blog image file:", filePath, err.message);
  }
};

// Helper to parse keywords and tags
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

const parseTags = (tags) => {
  if (!tags) return [];
  let list = [];
  if (Array.isArray(tags)) {
    list = tags;
  } else if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          list = parsed;
        } else {
          list = [parsed];
        }
      } catch (e) {
        list = trimmed.split(/[,;\s]+/);
      }
    } else {
      list = trimmed.split(/[,;\s]+/);
    }
  }
  const cleanList = list
    .flatMap((t) => {
      if (typeof t === "string") {
        return t.split(/[,;\s]+/);
      }
      return String(t);
    })
    .map((t) => {
      let clean = String(t).trim();
      if (!clean) return "";
      return clean.startsWith("#") ? clean : `#${clean}`;
    })
    .filter(Boolean);

  return Array.from(new Set(cleanList));
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
    let blog = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      blog = await Blog.findById(id).lean();
    }

    if (!blog) {
      blog = await Blog.findOne({ metaSlug: id }).lean();
    }

    if (!blog) {
      // Case-insensitive search on metaSlug
      blog = await Blog.findOne({
        metaSlug: { $regex: new RegExp(`^${id}$`, "i") }
      }).lean();
    }

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
      tags,
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
    const parsedTags = parseTags(tags);
    const sanitizedCategory = cleanCategory(category);

    const newBlog = await Blog.create({
      image: imageName,
      date: date || new Date().toISOString().split("T")[0],
      name,
      designation,
      title,
      category: sanitizedCategory,
      tags: parsedTags,
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

    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
      // Delete old image from disk
      if (existingBlog.image && existingBlog.image !== req.file.filename) {
        deleteFileIfLocal(existingBlog.image);
      }
    }

    if (updateData.category !== undefined) {
      updateData.category = cleanCategory(updateData.category);
    }

    if (updateData.tags !== undefined) {
      updateData.tags = parseTags(updateData.tags);
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

    // Delete associated image from disk
    if (deletedBlog.image) {
      deleteFileIfLocal(deletedBlog.image);
    }

    res.status(200).json({ success: true, message: "Blog and associated image deleted successfully" });
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