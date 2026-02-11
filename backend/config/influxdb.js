const { InfluxDB, Point } = require('@influxdata/influxdb-client');
require('dotenv').config();

// Create InfluxDB client
const influxDB = new InfluxDB({
  url: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
});

// Get write API for your org and bucket
const writeApi = influxDB.getWriteApi(
  process.env.INFLUX_ORG,
  process.env.INFLUX_BUCKET
);

writeApi.useDefaultTags({ app: 'industrial-iot' });

module.exports = writeApi;
