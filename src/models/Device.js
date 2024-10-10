const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Device Schema
const DeviceSchema = new Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  deviceName: {
    type: String,
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Device Model
const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
