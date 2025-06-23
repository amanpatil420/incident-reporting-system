const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const User = require('../models/user');

const router = express.Router();


// ✅ Clean, modern config (no deprecated options, no Promise)
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: async (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: 'uploads' // Default GridFS bucket
  })
});



const upload = multer({ storage });

// ✅ Upload and save user info
router.post(
  '/',
  upload.fields([
    { name: 'idCard', maxCount: 1 },
    { name: 'insurance', maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        phone,
        address,
        emergencyName,
        emergencyRelation,
        emergencyPhone
      } = req.body;

      const user = new User({
        fullName,
        email,
        phone,
        address,
        emergencyContact: {
          name: emergencyName,
          relation: emergencyRelation,
          phone: emergencyPhone
        },
        documents: {
          idCard: req.files?.idCard?.[0]?.filename || '',
          insurance: req.files?.insurance?.[0]?.filename || ''
        }
      });

      await user.save();
      res.status(201).json({ msg: 'User profile created', user });
    } catch (err) {
      console.error('❌ Error saving user:', err.message);
      res.status(500).json({ error: 'User creation failed' });
    }
  }
);

module.exports = router;
