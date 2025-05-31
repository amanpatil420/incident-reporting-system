const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { sendAlert } = require('../utils/twilio'); // Adjust path as needed

router.post('/', async (req, res) => {
  try {
    const { identifier, location } = req.body;

    if (!identifier || !location) {
      return res.status(400).json({ error: 'Missing identifier or location' });
    }

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }]
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.emergencyContact || !user.emergencyContact.phone) {
      return res.status(404).json({ error: 'No emergency contact found for this user' });
    }

    const contactPhone = user.emergencyContact.phone;
    const message = `🚨 SOS Alert from ${user.fullName}!\nLocation: https://maps.google.com/?q=${location.lat},${location.lng}`;

    // Send SMS
    await sendAlert(contactPhone, message);

    res.status(200).json({ msg: 'SOS sent successfully to emergency contact' });
  } catch (err) {
    console.error('❌ SOS error:', err.message);
    res.status(500).json({ error: 'Failed to send SOS' });
  }
});

module.exports = router;
