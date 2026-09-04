const express = require("express");
const router = express.Router();
const subscriptionPlanController = require("../controllers/subscriptionPlanController");

const {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
} = subscriptionPlanController;

router.get("/", getAllPlans);
router.get("/all", getAllPlans);
router.get("/:id", getPlanById);

router.post("/create", createPlan);
router.post("/", createPlan);

router.put("/:id", updatePlan);
router.patch("/:id", updatePlan);

router.delete("/:id", deletePlan);

module.exports = router;
