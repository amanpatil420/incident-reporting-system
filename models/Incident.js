const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,   // Optional for form-based submissions
  type: { type: String, required: true },   // e.g., 'Harassment', 'Theft'
  description: { type: String },            // Detailed description or form input
  details: { type: String },                // Alternate optional field (for form support)
  severity: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' }, // NEW
  timestamp: { type: Date, default: Date.now },
  location: {
    lat: Number,
    lng: Number
  },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Incident', incidentSchema);
