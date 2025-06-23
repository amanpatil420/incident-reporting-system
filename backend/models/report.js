const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, default: Date.now },
  reporterId: { type: String }, // optional user identifier
  status: { type: String, default: 'Pending' }, // 'Pending', 'Resolved'
  actionsTaken: { type: String, default: '' }   // actions taken by authority
});

module.exports = mongoose.model('Report', reportSchema);
