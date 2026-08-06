// Check your src/models/ folder and match the exact filename here
const Testimonial = require("../models/testimonial"); 

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const { name, role, message, rating } = req.body;
    const image = req.file ? req.file.filename : null;

    const newTestimonial = await Testimonial.create({
      name,
      role,
      message,
      rating,
      image,
    });

    res.status(201).json({ success: true, data: newTestimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};