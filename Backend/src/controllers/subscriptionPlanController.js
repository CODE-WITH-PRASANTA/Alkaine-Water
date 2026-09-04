const mongoose = require("mongoose");
const SubscriptionPlan = require("../models/subscriptionPlan");

// Helper to parse tags
const parseTags = (tags) => {
  if (!tags) return [];
  let list = [];
  if (Array.isArray(tags)) {
    list = tags;
  } else if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) list = parsed;
        else list = [parsed];
      } catch (e) {
        list = trimmed.split(/[,;\s]+/);
      }
    } else {
      list = trimmed.split(/[,;\s]+/);
    }
  }
  return list
    .map((t) => String(t).trim())
    .filter(Boolean);
};

// Helper to parse features
const parseFeatures = (features) => {
  if (!features) return [];
  let list = [];
  if (Array.isArray(features)) {
    list = features;
  } else if (typeof features === "string") {
    const trimmed = features.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) list = parsed;
        else list = [parsed];
      } catch (e) {
        list = trimmed.split(/\r?\n|,/);
      }
    } else {
      list = trimmed.split(/\r?\n|,/);
    }
  }
  return list
    .map((f) => String(f).trim())
    .filter((f) => f.length > 0);
};

// Get all subscription plans
const getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({
      success: true,
      count: plans.length,
      plans,
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single subscription plan by ID
const getPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const plan = await SubscriptionPlan.findById(id).lean();
    if (!plan) {
      return res.status(404).json({ success: false, message: "Subscription plan not found" });
    }

    res.status(200).json({ success: true, plan, data: plan });
  } catch (error) {
    console.error("Error fetching subscription plan by ID:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new subscription plan
const createPlan = async (req, res) => {
  try {
    const { name, period, price, tags, bestFor, description, subtext, features, isActive } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Plan name and price are required",
      });
    }

    const parsedTagsList = parseTags(tags);
    const parsedFeaturesList = parseFeatures(features);
    const finalDescription = description || subtext || "";

    const newPlan = await SubscriptionPlan.create({
      name: String(name).trim(),
      period: period ? String(period).trim() : "Monthly",
      price: String(price).trim(),
      tags: parsedTagsList,
      bestFor: bestFor ? String(bestFor).trim() : "",
      description: finalDescription,
      features: parsedFeaturesList,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    res.status(201).json({
      success: true,
      message: "Subscription plan created successfully",
      plan: newPlan,
      data: newPlan,
    });
  } catch (error) {
    console.error("Error creating subscription plan:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update existing subscription plan
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const updateData = { ...req.body };

    if (updateData.name !== undefined) {
      updateData.name = String(updateData.name).trim();
    }
    if (updateData.price !== undefined) {
      updateData.price = String(updateData.price).trim();
    }
    if (updateData.period !== undefined) {
      updateData.period = String(updateData.period).trim();
    }
    if (updateData.bestFor !== undefined) {
      updateData.bestFor = String(updateData.bestFor).trim();
    }
    if (updateData.tags !== undefined) {
      updateData.tags = parseTags(updateData.tags);
    }
    if (updateData.features !== undefined) {
      updateData.features = parseFeatures(updateData.features);
    }
    if (updateData.description === undefined && updateData.subtext !== undefined) {
      updateData.description = updateData.subtext;
    }

    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPlan) {
      return res.status(404).json({ success: false, message: "Subscription plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subscription plan updated successfully",
      plan: updatedPlan,
      data: updatedPlan,
    });
  } catch (error) {
    console.error("Error updating subscription plan:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete subscription plan
const deletePlan = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID format" });
    }

    const deletedPlan = await SubscriptionPlan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ success: false, message: "Subscription plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Subscription plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting subscription plan:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan,
};
