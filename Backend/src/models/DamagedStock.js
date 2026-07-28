const mongoose = require("mongoose");

const damagedStockSchema = new mongoose.Schema(
  {
    // Manage Stock Product ID or Name
    product: {
      type: String,
      required: true,
    },

    // Dynamic Category from Manage Stock
    category: {
      type: String,
      required: true,
    },

    broken: {
      type: Number,
      default: 0,
    },

    leakage: {
      type: Number,
      default: 0,
    },

    lost: {
      type: Number,
      default: 0,
    },

    customerDamage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DamagedStock", damagedStockSchema);