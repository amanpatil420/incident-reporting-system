const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// ✅ User route
const userRoute = require('./routes/user');
app.use('/user', userRoute);


// ✅ Route handlers
const sosRoute = require('./routes/sos');
const reportRoute = require('./routes/report');

app.use('/sos', sosRoute);       // SOS API — sends SMS and stores real-time alerts
app.use('/report', reportRoute); // Incident form submission API

// ✅ Default API status route
app.get('/', (req, res) => res.send('Incident Reporting API Running'));

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
