import React from 'react';
import RelayControl from '../components/RelayControl';
import SensorCharts from '../components/SensorCharts';

export default function Home() {
  const relays = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Industrial IoT Dashboard</h1>

      <h2>Relays</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {relays.map((id) => (
          <RelayControl key={id} id={id} />
        ))}
      </div>

      <h2>Sensor Data</h2>
      <SensorCharts />
    </div>
  );
}
