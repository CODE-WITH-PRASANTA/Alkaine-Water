const express = require("express");
const router = express.Router();
const { handleSingleImageUpload } = require("../middleware/multer");

// Ensure these names match the controller exports exactly
const teamController = require("../controllers/teamController");

const {
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} = teamController;

// Safely fall back to dummy handler if controller function isn't ready yet
const getHandler = getAllTeamMembers || ((req, res) => res.json({ message: "Get team members" }));
const createHandler = createTeamMember || ((req, res) => res.json({ message: "Create team member" }));
const updateHandler = updateTeamMember || ((req, res) => res.json({ message: "Update team member" }));
const deleteHandler = deleteTeamMember || ((req, res) => res.json({ message: "Delete team member" }));

// Route Endpoints
router.get("/", getHandler);
router.post("/", handleSingleImageUpload("image"), createHandler);
router.put("/:id", handleSingleImageUpload("image"), updateHandler);
router.delete("/:id", deleteHandler);

module.exports = router;