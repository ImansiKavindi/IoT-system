// server.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');  
require('dotenv').config();
const mqttClient = require('./config/mqtt'); // your existing mqtt.js


// Routes
const sensorRoutes = require('./routes/sensor');
const deviceRoutes = require('./routes/device');

const app = express();
app.use(cors());  
// Parse incoming JSON
app.use(bodyParser.json());

// Sensor & Device routes
app.use('/sensor', sensorRoutes);
app.use('/device', deviceRoutes);

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // allow frontend to connect
    methods: ['GET', 'POST']
  }
});

// Make io accessible in other files (e.g., mqtt.js)
app.set('io', io);

// --- MQTT Telemetry Handling ---
mqttClient.on('connect', () => {
  console.log('Connected to HiveMQ Cloud');

  // Subscribe to all telemetry topics
  mqttClient.subscribe('stm32/status/#', (err) => {
    if (err) console.error('MQTT subscribe error:', err);
  });
  mqttClient.subscribe('stm32/pzem/#', (err) => {
    if (err) console.error('MQTT subscribe error:', err);
  });
  mqttClient.subscribe('stm32/error', (err) => {
    if (err) console.error('MQTT subscribe error:', err);
  });
});

mqttClient.on('message', (topic, payload) => {
  const message = payload.toString();
  console.log(`MQTT ${topic}: ${message}`);

  // Emit telemetry to frontend via Socket.io
  io.emit('telemetry', { topic, message });

  // TODO: save data to PostgreSQL / InfluxDB if needed
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
