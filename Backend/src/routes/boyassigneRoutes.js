const express = require('express');
const router = express.Router();
const {
  getAllDeliveryBoys,
  createDeliveryBoy,
  updateDeliveryBoyStatus,
  deleteDeliveryBoy
} = require('../controllers/boyassigneController');

router.route('/')
  .get(getAllDeliveryBoys)
  .post(createDeliveryBoy);

router.patch('/:id/status', updateDeliveryBoyStatus);
router.delete('/:id', deleteDeliveryBoy);

module.exports = router;