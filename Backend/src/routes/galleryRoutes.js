const express = require("express");
const router = express.Router();
const { handleSingleImageUpload } = require("../middleware/multer");

const galleryController = require("../controllers/galleryController");

const {
  createGalleryItem,
  getAllGalleryItems,
  deleteGalleryItem,
} = galleryController;

// Safe fallback handlers
const getHandler = getAllGalleryItems || ((req, res) => res.json({ message: "Get gallery items" }));
const createHandler = createGalleryItem || ((req, res) => res.json({ message: "Create gallery item" }));
const deleteHandler = deleteGalleryItem || ((req, res) => res.json({ message: "Delete gallery item" }));

router.get("/", getHandler);
router.post("/", handleSingleImageUpload("image"), createHandler);
router.delete("/:id", deleteHandler);

module.exports = router;