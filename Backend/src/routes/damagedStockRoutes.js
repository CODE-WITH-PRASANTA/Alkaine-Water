const express = require("express");
const router = express.Router();

const {
  createDamagedStock,
  getDamagedStockSummary,
} = require("../controllers/damagedStockController");

// GET LIST + SUMMARY
router.get("/", getDamagedStockSummary);

// CREATE DAMAGE
router.post("/", createDamagedStock);

module.exports = router;