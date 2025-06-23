const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  type: String,
  description: String,
  severity: String,
  timestamp: { type: Date, default: Date.now },
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, default: 'Pending' },
  actionsTaken: String // ✅ NEW field
});

module.exports = mongoose.model('Incident', incidentSchema);
