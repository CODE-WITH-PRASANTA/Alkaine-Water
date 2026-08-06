const mongoose = require('mongoose');

/* ---------------------------------------------------------
   1. ROUTE / STOPS  (left map panel)
--------------------------------------------------------- */
const StopSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  distance: { type: Number, required: true },
  coords: {
    type: [Number], // [Latitude, Longitude]
    required: true
  }
});

const RouteSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Active Route' },
    hubCoords: {
      type: [Number],
      default: [20.3050, 85.8280]
    },
    stops: [StopSchema],
    totalDistance: { type: Number, required: true, default: 0 },
    estimatedTime: { type: String, default: '0m' },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

/* ---------------------------------------------------------
   2. ROUTE ASSIGNMENT DIRECTORY  (right table — "Add New Entry")
--------------------------------------------------------- */
const RouteAssignmentSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    order: { type: String, required: true, trim: true },
    locations: { type: [String], default: [] },
    vehicleNo: { type: String, required: true, trim: true },
    vehicle: { type: String, required: true, trim: true },
    image: { type: String, default: '' }
  },
  { timestamps: true }
);

const Route = mongoose.model('Route', RouteSchema);
const RouteAssignment = mongoose.model('RouteAssignment', RouteAssignmentSchema);

module.exports = { Route, RouteAssignment };