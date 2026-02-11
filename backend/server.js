const express = require('express');
const bodyParser = require('body-parser');
const sensorRoutes = require('./routes/sensor');
const deviceRoutes = require('./routes/device');
require('dotenv').config();
require('./config/mqtt');


const app = express();

// Parse incoming JSON
app.use(bodyParser.json());

// Sensor routes
app.use('/sensor', sensorRoutes);
app.use('/device', deviceRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
