const writeApi = require('../config/influxdb');
const pool = require('../config/postgres');

const saveSensorData = async (req, res) => {
  const { deviceId, voltage, current, power, timestamp } = req.body;

  try {
    // --- Save to InfluxDB ---
    const { Point } = require('@influxdata/influxdb-client');
    const point = new Point('device_data')
      .tag('deviceId', deviceId)
      .floatField('voltage', voltage)
      .floatField('current', current)
      .floatField('power', power)
      .timestamp(new Date(timestamp));

    writeApi.writePoint(point);
    writeApi.flush();

    // --- Save to PostgreSQL ---
    await pool.query(
      'INSERT INTO logs(device_id, voltage, current, power, timestamp) VALUES($1,$2,$3,$4,$5)',
      [deviceId, voltage, current, power, timestamp]
    );

    res.send({ status: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', error: error.message });
  }
};

module.exports = { saveSensorData };
