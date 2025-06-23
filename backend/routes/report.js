const express = require('express');
const router = express.Router();
const Incident = require('../models/incident'); // adjust if needed

// GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Incident.find();
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});



// PUT to update status/actionsTaken


router.put('/:id', async (req, res) => {
  try {
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        actionsTaken: req.body.actionsTaken
      },
      { new: true }
    );
    res.json(updatedIncident);
  } catch (err) {
    // ⬇️ This is valid JavaScript and should go inside your backend code
    console.error('❌ PUT error:', err.message);
    res.status(500).json({ error: 'Failed to update report' });
  }
});



module.exports = router;
