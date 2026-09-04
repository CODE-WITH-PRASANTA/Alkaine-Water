const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    designation: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    date: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    metaTitle: { type: String, default: "", trim: true },
    metaSlug: { type: String, default: "", trim: true },
    metaKeywords: { type: [String], default: [] },
    metaDescription: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);