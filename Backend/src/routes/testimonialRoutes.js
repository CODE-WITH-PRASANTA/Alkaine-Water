const express = require("express");

const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

// CORRECT IMPORT: Destructure your custom middleware wrapper
const { handleSingleImageUpload } = require("../middleware/multer");

const router = express.Router();

// ============================================================
// GET ALL TESTIMONIALS
// GET /api/testimonial
// ============================================================
router.get("/", getTestimonials);

// ============================================================
// CREATE TESTIMONIAL
// POST /api/testimonial
// ============================================================
// USE YOUR CUSTOM WRAPPER HERE
router.post("/", handleSingleImageUpload("image"), createTestimonial);

// ============================================================
// UPDATE TESTIMONIAL
// PUT /api/testimonial/:id
// ============================================================
// USE YOUR CUSTOM WRAPPER HERE
router.put("/:id", handleSingleImageUpload("image"), updateTestimonial);

// ============================================================
// DELETE TESTIMONIAL
// DELETE /api/testimonial/:id
// ============================================================
router.delete("/:id", deleteTestimonial);

module.exports = router;