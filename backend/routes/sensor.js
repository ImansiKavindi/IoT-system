const express = require('express');
const router = express.Router();
const { saveSensorData } = require('../controllers/sensorController');

// POST endpoint to receive sensor data
router.post('/data', saveSensorData);

module.exports = router;
