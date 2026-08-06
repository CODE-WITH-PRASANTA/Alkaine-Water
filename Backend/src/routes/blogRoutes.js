const express = require("express");
const router = express.Router();
const { handleSingleImageUpload } = require("../middleware/multer");

const blogController = require("../controllers/blogController");

const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = blogController;

// Fallback handlers to prevent route crashes if any export is missing
const getAllHandler = getAllBlogs || ((req, res) => res.json({ message: "Get blogs" }));
const getByIdHandler = getBlogById || ((req, res) => res.json({ message: "Get blog details" }));
const createHandler = createBlog || ((req, res) => res.json({ message: "Create blog" }));
const updateHandler = updateBlog || ((req, res) => res.json({ message: "Update blog" }));
const deleteHandler = deleteBlog || ((req, res) => res.json({ message: "Delete blog" }));

// Route Endpoints
router.get("/", getAllHandler);
router.get("/:id", getByIdHandler);
router.post("/create", handleSingleImageUpload("image"), createHandler);
router.put("/:id", handleSingleImageUpload("image"), updateHandler);
router.delete("/:id", deleteHandler);

module.exports = router;