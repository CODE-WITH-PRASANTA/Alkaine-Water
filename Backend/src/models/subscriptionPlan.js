const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    period: {
      type: String,
      required: [true, "Billing period is required"],
      trim: true,
      default: "Monthly",
    },
    price: {
      type: String,
      required: [true, "Price is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    bestFor: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);
