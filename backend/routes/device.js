const express = require('express');
const router = express.Router();
const mqttClient = require('../config/mqtt');

// POST /device/control
// Body: { "id": 1, "state": "ON" }
router.post('/control', (req, res) => {
  const { id, state } = req.body;

  if (!id || !state) {
    return res.status(400).json({ error: 'id and state are required' });
  }

  if (id < 1 || id > 12) {
    return res.status(400).json({ error: 'Invalid device id' });
  }

  const command = `${state}${id}`; // "ON1" or "OFF1"
  
  // Publish to ESP32
  mqttClient.publish('stm32/commands', command, { qos: 1, retain: false }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to send command' });
    }
    console.log(`Sent MQTT command: ${command}`);
    return res.json({ status: 'success', command });
  });
});

module.exports = router;
