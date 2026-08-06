const express = require("express");
const router = express.Router();
const { handleDeliveryUploads } = require("../middleware/multer");

const {
  createDeliveryPartner,
  getAllDeliveryPartners,
  loginDeliveryPartner,
  updateDeliveryPartner,
  deleteDeliveryPartner,
} = require("../controllers/deliveryController");

router.get("/", getAllDeliveryPartners);
router.post("/", handleDeliveryUploads, createDeliveryPartner);
router.post("/login", loginDeliveryPartner);
router.put("/:id", handleDeliveryUploads, updateDeliveryPartner);
router.delete("/:id", deleteDeliveryPartner);

module.exports = router;