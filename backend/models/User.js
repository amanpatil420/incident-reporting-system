const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String }, // Optional: only if login is required
  address: { type: String },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  },
  contacts: [String],  // Additional emergency contacts (optional)
  photoUrl: { type: String }, // Optional user profile photo
  documents: {
    idCard: String,
    insurance: String,
    other: String
  },
  routes: [String], // e.g., frequent routes, commute path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
