const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const ShopProduct = require("../models/shop");

// Helper to parse tags
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
        if (Array.isArray(parsed)) list = parsed;
        else list = [parsed];
      } catch (e) {
        list = trimmed.split(/[,;\s]+/);
      }
    } else {
      list = trimmed.split(/[,;\s]+/);
    }
  }
  return list
    .map((t) => String(t).trim())
    .filter(Boolean);
};

// Helper to parse existing images list from body
const parseExistingImages = (images) => {
  if (!images) return [];
  let list = [];
  if (Array.isArray(images)) {
    list = images;
  } else if (typeof images === "string") {
    const trimmed = images.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) list = parsed;
        else list = [parsed];
      } catch (e) {
        list = [trimmed];
      }
    } else if (trimmed) {
      list = [trimmed];
    }
  }
  return list.filter(Boolean);
};

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
      path.join(__dirname, "../../uploads/shop", path.basename(sanitized)),
      path.join(__dirname, "../uploads/shop", path.basename(sanitized)),
    ];

    for (const p of possiblePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        fs.unlinkSync(p);
      }
    }
  } catch (err) {
    console.warn("Could not delete shop image file:", filePath, err.message);
  }
};

// ================= 1. Get All Shop Products =================
const getAllProducts = async (req, res) => {
  try {
    const { category, type, search, q, tag, inStock, limit, page } = req.query;
    let filter = {};

    if (category) {
      filter.category = new RegExp(`^${category.trim()}$`, "i");
    }

    if (type) {
      filter.type = new RegExp(type.trim(), "i");
    }

    if (tag) {
      filter.tags = { $in: [new RegExp(`^${tag.trim()}$`, "i")] };
    }

    if (inStock !== undefined) {
      filter.inStock = inStock === "true" || inStock === true;
    }

    const searchTerm = search || q;
    if (searchTerm && searchTerm.trim()) {
      const reg = new RegExp(searchTerm.trim(), "i");
      filter.$or = [
        { name: reg },
        { category: reg },
        { type: reg },
        { tags: { $in: [reg] } },
        { description: reg },
      ];
    }

    let query = ShopProduct.find(filter).sort({ createdAt: -1 });

    if (limit && Number(limit) > 0) {
      const pageNum = Number(page) > 0 ? Number(page) : 1;
      const skipCount = (pageNum - 1) * Number(limit);
      query = query.skip(skipCount).limit(Number(limit));
    }

    const products = await query.lean();
    const totalCount = await ShopProduct.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total: totalCount,
      products,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching shop products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= 2. Get Single Shop Product By ID =================
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID format" });
    }

    const product = await ShopProduct.findById(id).lean();
    if (!product) {
      return res.status(404).json({ success: false, message: "Shop product not found" });
    }

    res.status(200).json({
      success: true,
      product,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching shop product by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ================= 3. Create Shop Product =================
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      finalPrice,
      category,
      type,
      tags,
      rating,
      inStock,
      isActive,
      existingImages,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "Product name, base price, and category are required",
      });
    }

    // Collect newly uploaded files from multer
    let newUploadedImages = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      newUploadedImages = req.files.map((file) => file.filename.replace(/\\/g, "/"));
    } else if (req.file) {
      newUploadedImages = [req.file.filename.replace(/\\/g, "/")];
    }

    // Combine with any pre-existing images sent in body
    const initialImages = parseExistingImages(existingImages || req.body.images);
    const combinedImages = [...initialImages, ...newUploadedImages];

    const parsedPrice = parseFloat(price) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    let computedFinalPrice = parseFloat(finalPrice);

    if (isNaN(computedFinalPrice) || computedFinalPrice <= 0) {
      computedFinalPrice = parsedPrice - parsedPrice * (parsedDiscount / 100);
      computedFinalPrice = Math.max(0, computedFinalPrice);
    }

    const newProduct = await ShopProduct.create({
      name: String(name).trim(),
      images: combinedImages,
      description: description || "",
      price: parsedPrice,
      discount: parsedDiscount,
      finalPrice: Number(computedFinalPrice.toFixed(2)),
      category: String(category).trim(),
      type: type ? String(type).trim() : "",
      tags: parseTags(tags),
      rating: rating ? Math.min(5, Math.max(1, Number(rating))) : 5,
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({
      success: true,
      message: "Shop product created successfully",
      product: newProduct,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating shop product:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ================= 4. Update Shop Product =================
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID format" });
    }

    const existingDoc = await ShopProduct.findById(id);
    if (!existingDoc) {
      return res.status(404).json({ success: false, message: "Shop product not found" });
    }

    const {
      name,
      description,
      price,
      discount,
      finalPrice,
      category,
      type,
      tags,
      rating,
      inStock,
      isActive,
      existingImages,
    } = req.body;

    // Collect newly uploaded files
    let newUploadedImages = [];
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      newUploadedImages = req.files.map((file) => file.filename.replace(/\\/g, "/"));
    } else if (req.file) {
      newUploadedImages = [req.file.filename.replace(/\\/g, "/")];
    }

    // Determine final list of images
    let finalImageList = existingDoc.images || [];
    if (existingImages !== undefined || req.body.images !== undefined || newUploadedImages.length > 0) {
      const retainedImages = parseExistingImages(
        existingImages !== undefined ? existingImages : req.body.images
      );
      finalImageList = [...retainedImages, ...newUploadedImages];
    }

    // Determine pricing calculations
    const currentPrice = price !== undefined ? parseFloat(price) || 0 : existingDoc.price;
    const currentDiscount = discount !== undefined ? parseFloat(discount) || 0 : existingDoc.discount;
    let computedFinalPrice = finalPrice !== undefined ? parseFloat(finalPrice) : null;

    if (computedFinalPrice === null || isNaN(computedFinalPrice)) {
      computedFinalPrice = currentPrice - currentPrice * (currentDiscount / 100);
      computedFinalPrice = Math.max(0, computedFinalPrice);
    }

    const updateFields = {
      images: finalImageList,
      finalPrice: Number(computedFinalPrice.toFixed(2)),
    };

    if (name !== undefined) updateFields.name = String(name).trim();
    if (description !== undefined) updateFields.description = description;
    if (price !== undefined) updateFields.price = currentPrice;
    if (discount !== undefined) updateFields.discount = currentDiscount;
    if (category !== undefined) updateFields.category = String(category).trim();
    if (type !== undefined) updateFields.type = String(type).trim();
    if (tags !== undefined) updateFields.tags = parseTags(tags);
    if (rating !== undefined) updateFields.rating = Math.min(5, Math.max(1, Number(rating)));
    if (inStock !== undefined) updateFields.inStock = Boolean(inStock);
    if (isActive !== undefined) updateFields.isActive = Boolean(isActive);

    // Delete removed images from disk if they are no longer in finalImageList
    if (Array.isArray(existingDoc.images) && existingDoc.images.length > 0) {
      const removedImages = existingDoc.images.filter(
        (oldImg) => !finalImageList.includes(oldImg)
      );
      removedImages.forEach((img) => deleteFileIfLocal(img));
    }

    const updatedProduct = await ShopProduct.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Shop product updated successfully",
      product: updatedProduct,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating shop product:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// ================= 5. Delete Shop Product =================
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Product ID format" });
    }

    const product = await ShopProduct.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Shop product not found" });
    }

    // Clean up local images
    if (Array.isArray(product.images) && product.images.length > 0) {
      product.images.forEach((img) => deleteFileIfLocal(img));
    }

    res.status(200).json({
      success: true,
      message: "Shop product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shop product:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
