const express = require("express");
const router = express.Router();
const { handleMultipleImagesUpload } = require("../middleware/multer");
const shopController = require("../controllers/shopController");

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = shopController;

// Upload middleware specifically targeting uploads/shop
const uploadShopImages = handleMultipleImagesUpload("images", 10, "shop");

// Read endpoints
router.get("/", getAllProducts);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);

// Create endpoints
router.post("/create", uploadShopImages, createProduct);
router.post("/", uploadShopImages, createProduct);

// Update endpoints
router.put("/:id", uploadShopImages, updateProduct);
router.patch("/:id", uploadShopImages, updateProduct);

// Delete endpoint
router.delete("/:id", deleteProduct);

module.exports = router;
