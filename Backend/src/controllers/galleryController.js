const path = require("path");
const fs = require("fs");
const Gallery = require("../models/gallery"); 

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
      path.join(__dirname, "../../uploads/gallery", path.basename(sanitized)),
      path.join(__dirname, "../uploads/gallery", path.basename(sanitized)),
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        fs.unlinkSync(p);
      }
    }
  } catch (err) {
    console.warn("Could not delete gallery image file:", filePath, err.message);
  }
};

const getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createGalleryItem = async (req, res) => {
  try {
    const { title, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newItem = await Gallery.create({
      title,
      category,
      image,
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const deletedItem = await Gallery.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ success: false, message: "Gallery item not found" });
    }

    if (deletedItem.image) {
      deleteFileIfLocal(deletedItem.image);
    }

    res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
};