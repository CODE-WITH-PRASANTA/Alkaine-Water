// Example minimal teamController structure
const TeamMember = require("../models/team"); // adjust path to your model if needed

const getAllTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;
    const image = req.file ? req.file.filename : null;

    const newMember = await TeamMember.create({
      name,
      role,
      image,
    });

    res.status(201).json({ success: true, data: newMember });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedMember });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
};