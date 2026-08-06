const express = require('express');
const router = express.Router();
const {
  getActiveRoute,
  postRoute,
  addStop,
  deleteStop,
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} = require("../controllers/routeController");

// --- Route / Stops (map panel) ---
router.get('/active', getActiveRoute);
router.post('/', postRoute);
router.post('/add-stop', addStop);
router.delete('/stop/:stopId', deleteStop);

// --- Route Assignment Directory (table) ---
router.get('/assignments', getAssignments);
router.post('/assignments', createAssignment);
router.put('/assignments/:id', updateAssignment);
router.delete('/assignments/:id', deleteAssignment);

module.exports = router;