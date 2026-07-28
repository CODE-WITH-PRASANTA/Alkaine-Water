const { Route, RouteAssignment } = require("../models/Route");

/* ===========================================================
   SECTION A — ROUTE / STOPS  (left map panel)
=========================================================== */

exports.getActiveRoute = async (req, res) => {
  try {
    let route = await Route.findOne({ isActive: true }).sort({ updatedAt: -1 });

    if (!route) {
      route = await Route.create({
        title: 'Active Route',
        hubCoords: [20.3050, 85.8280],
        stops: [],
        totalDistance: 0,
        estimatedTime: '0m',
        isActive: true
      });
    }

    res.status(200).json({ success: true, data: route });
  } catch (error) {
    console.error('❌ getActiveRoute error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.postRoute = async (req, res) => {
  try {
    const { stops, totalDistance, estimatedTime, hubCoords } = req.body;

    await Route.updateMany({}, { isActive: false });

    const newRoute = await Route.create({
      stops: stops || [],
      totalDistance: totalDistance || 0,
      estimatedTime: estimatedTime || '0m',
      hubCoords: hubCoords || [20.3050, 85.8280],
      isActive: true
    });

    res.status(201).json({ success: true, data: newRoute });
  } catch (error) {
    console.error('❌ postRoute error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.addStop = async (req, res) => {
  try {
    const { name, distance, coords } = req.body;

    if (!name || !coords || !Array.isArray(coords) || coords.length !== 2) {
      return res.status(400).json({
        success: false,
        message: 'name and coords [lat, lng] are required'
      });
    }

    let route = await Route.findOne({ isActive: true });
    if (!route) {
      route = new Route({ stops: [], hubCoords: [20.3050, 85.8280], isActive: true });
    }

    const newStop = {
      id: Date.now(),
      name: name.trim(),
      distance: parseFloat(distance) || 0,
      coords
    };

    route.stops.push(newStop);

    route.totalDistance = route.stops.reduce((sum, s) => sum + s.distance, 0);
    const totalMinutes = Math.round(route.stops.length * 8 + route.totalDistance * 3.2);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    route.estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

    await route.save();

    res.status(200).json({ success: true, data: route });
  } catch (error) {
    console.error('❌ addStop error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteStop = async (req, res) => {
  try {
    const { stopId } = req.params;
    const route = await Route.findOne({ isActive: true });

    if (!route) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }

    route.stops = route.stops.filter((s) => s.id !== parseInt(stopId));
    route.totalDistance = route.stops.reduce((sum, s) => sum + s.distance, 0);

    const totalMinutes = Math.round(route.stops.length * 8 + route.totalDistance * 3.2);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    route.estimatedTime = hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;

    await route.save();
    res.status(200).json({ success: true, data: route });
  } catch (error) {
    console.error('❌ deleteStop error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

/* ===========================================================
   SECTION B — ROUTE ASSIGNMENT DIRECTORY  (right table)
=========================================================== */

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await RouteAssignment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: assignments.length, data: assignments });
  } catch (error) {
    console.error('❌ getAssignments error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const { date, name, order, locations, vehicleNo, vehicle, image } = req.body;

    if (!date || !name || !order || !vehicleNo || !vehicle) {
      return res.status(400).json({
        success: false,
        message: `Missing required field(s): ${[
          !date && 'date',
          !name && 'name',
          !order && 'order',
          !vehicleNo && 'vehicleNo',
          !vehicle && 'vehicle'
        ].filter(Boolean).join(', ')}`
      });
    }

    const newAssignment = await RouteAssignment.create({
      date,
      name,
      order,
      locations: Array.isArray(locations) ? locations : [],
      vehicleNo,
      vehicle,
      image: image || ''
    });

    res.status(201).json({ success: true, data: newAssignment });
  } catch (error) {
    console.error('❌ createAssignment error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, name, order, locations, vehicleNo, vehicle, image } = req.body;

    const existing = await RouteAssignment.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    existing.date = date ?? existing.date;
    existing.name = name ?? existing.name;
    existing.order = order ?? existing.order;
    existing.locations = Array.isArray(locations) ? locations : existing.locations;
    existing.vehicleNo = vehicleNo ?? existing.vehicleNo;
    existing.vehicle = vehicle ?? existing.vehicle;
    if (image) existing.image = image;

    const updated = await existing.save();
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('❌ updateAssignment error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RouteAssignment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, message: 'Record deleted', data: deleted });
  } catch (error) {
    console.error('❌ deleteAssignment error:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};