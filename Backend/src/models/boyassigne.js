const mongoose = require('mongoose');

const boyassigneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true
    },
    vehicle: {
      type: String,
      required: [true, 'Vehicle details are required'],
      trim: true
    },
    orders: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Active', 'On-Delivery', 'Inactive'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BoyAssigne', boyassigneSchema);