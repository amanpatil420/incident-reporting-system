const express = require('express');
const router = express.Router();
const Incident = require('../models/incident');

router.post('/', async (req, res) => {
  const { type, details, severity } = req.body;

  try {
    const incident = new Incident({ type, details, severity });
    await incident.save();
    res.status(201).json({ msg: 'Incident saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save incident' });
  }
});

module.exports = router;
