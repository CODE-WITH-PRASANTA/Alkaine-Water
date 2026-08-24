const Testimonial = require("../models/testimonial");
const fs = require("fs");
const path = require("path");

// ============================================================
// GET ALL TESTIMONIALS
// ============================================================

const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: testimonials,
    });
  } catch (error) {
    console.error("GET TESTIMONIAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
      error: error.message,
    });
  }
};

// ============================================================
// CREATE TESTIMONIAL
// ============================================================

const createTestimonial = async (req, res) => {
  try {
    console.log("========== CREATE TESTIMONIAL ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, address, description, rating } = req.body;

    // Validation
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!address?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const numericRating = Number(rating);

    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Client image is required",
      });
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      address: address.trim(),
      description: description.trim(),
      rating: numericRating,
      image: req.file.filename,
    });

    console.log("Created testimonial:", testimonial);

    return res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("CREATE TESTIMONIAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create testimonial",
    });
  }
};

// ============================================================
// UPDATE TESTIMONIAL
// ============================================================

const updateTestimonial = async (req, res) => {
  try {
    console.log("========== UPDATE TESTIMONIAL ==========");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    const { name, address, description, rating } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!address?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    if (!description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Description is required",
      });
    }

    const numericRating = Number(rating);

    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Update basic fields
    testimonial.name = name.trim();
    testimonial.address = address.trim();
    testimonial.description = description.trim();
    testimonial.rating = numericRating;

    // Replace image only if a new one exists
    if (req.file) {
      // Delete old image
      if (testimonial.image) {
        const oldImagePath = path.join(
          process.cwd(),
          "uploads",
          "testimonial",
          testimonial.image
        );

        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (deleteError) {
            console.warn(
              "Could not delete old image:",
              deleteError.message
            );
          }
        }
      }

      testimonial.image = req.file.filename;
    }

    await testimonial.save();

    return res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error("UPDATE TESTIMONIAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update testimonial",
    });
  }
};

// ============================================================
// DELETE TESTIMONIAL
// ============================================================

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    // Delete image
    if (testimonial.image) {
      const imagePath = path.join(
        process.cwd(),
        "uploads",
        "testimonial",
        testimonial.image
      );

      if (fs.existsSync(imagePath)) {
        try {
          fs.unlinkSync(imagePath);
        } catch (deleteError) {
          console.warn("Could not delete image:", deleteError.message);
        }
      }
    }

    await Testimonial.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TESTIMONIAL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete testimonial",
    });
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};