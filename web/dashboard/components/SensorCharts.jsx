import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SensorCharts = () => {
  const [dataPoints, setDataPoints] = useState({
    voltage: [],
    current: [],
    power: [],
    timestamps: [],
  });

  // Simulate receiving data from backend (replace later with real API or WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString();
      const voltage = (220 + Math.random() * 5).toFixed(1);
      const current = (5 + Math.random()).toFixed(2);
      const power = (voltage * current).toFixed(1);

      setDataPoints((prev) => ({
        voltage: [...prev.voltage.slice(-9), voltage],
        current: [...prev.current.slice(-9), current],
        power: [...prev.power.slice(-9), power],
        timestamps: [...prev.timestamps.slice(-9), now],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartData = (label, dataset) => ({
    labels: dataPoints.timestamps,
    datasets: [
      {
        label,
        data: dataset,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
      <div style={{ width: '400px' }}>
        <Line data={chartData('Voltage (V)', dataPoints.voltage)} />
      </div>
      <div style={{ width: '400px' }}>
        <Line data={chartData('Current (A)', dataPoints.current)} />
      </div>
      <div style={{ width: '400px' }}>
        <Line data={chartData('Power (W)', dataPoints.power)} />
      </div>
    </div>
  );
};

export default SensorCharts;
