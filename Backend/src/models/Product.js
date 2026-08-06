const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  size: { 
    type: String, 
    required: true, 
    trim: true 
  },
  cost: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  dealer: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  retail: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  tax: { 
    type: Number, 
    default: 0, 
    min: 0 
  },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    default: 'Active' 
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Product', productSchema);