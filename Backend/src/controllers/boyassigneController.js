const BoyAssigne = require('../models/boyassigne');

// GET ALL & METRICS
exports.getAllDeliveryBoys = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const deliveryBoys = await BoyAssigne.find(query).sort({ createdAt: -1 });

    const totalCount = await BoyAssigne.countDocuments();
    const activeCount = await BoyAssigne.countDocuments({ status: 'Active' });
    const onDeliveryCount = await BoyAssigne.countDocuments({ status: 'On-Delivery' });
    const inactiveCount = await BoyAssigne.countDocuments({ status: 'Inactive' });

    return res.status(200).json({
      success: true,
      metrics: {
        totalCount,
        activeCount,
        onDeliveryCount,
        inactiveCount
      },
      data: deliveryBoys
    });
  } catch (error) {
    console.error('Get Delivery Boys Error:', error);
    return res.status(500).json({ success: false, message: 'Server error while fetching delivery boys' });
  }
};

// CREATE DELIVERY BOY
exports.createDeliveryBoy = async (req, res) => {
  try {
    const { name, mobile, vehicle, orders, status } = req.body;

    if (!name || !mobile || !vehicle) {
      return res.status(400).json({ success: false, message: 'Name, mobile, and vehicle are required' });
    }

    const newBoy = await BoyAssigne.create({
      name,
      mobile,
      vehicle,
      orders: orders || 0,
      status: status || 'Active'
    });

    return res.status(201).json({ success: true, message: 'Delivery boy created successfully', data: newBoy });
  } catch (error) {
    console.error('Create Delivery Boy Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE STATUS
exports.updateDeliveryBoyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ['Active', 'On-Delivery', 'Inactive'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status provided' });
    }

    const updatedBoy = await BoyAssigne.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

    if (!updatedBoy) {
      return res.status(404).json({ success: false, message: 'Delivery boy not found' });
    }

    return res.status(200).json({ success: true, message: 'Status updated successfully', data: updatedBoy });
  } catch (error) {
    console.error('Update Status Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE DELIVERY BOY
exports.deleteDeliveryBoy = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBoy = await BoyAssigne.findByIdAndDelete(id);

    if (!deletedBoy) {
      return res.status(404).json({ success: false, message: 'Delivery boy not found' });
    }

    return res.status(200).json({ success: true, message: 'Delivery boy deleted successfully' });
  } catch (error) {
    console.error('Delete Delivery Boy Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};