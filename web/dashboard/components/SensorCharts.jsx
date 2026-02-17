import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { io } from 'socket.io-client';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const socket = io('http://localhost:3000'); // backend with socket.io

const SensorCharts = () => {
  const [dataPoints, setDataPoints] = useState({
    voltage: [],
    current: [],
    power: [],
    timestamps: [],
  });

  useEffect(() => {
    socket.on('telemetry', ({ topic, message }) => {
      const now = new Date().toLocaleTimeString();
      setDataPoints(prev => {
        const newData = { ...prev };

        if (topic === 'stm32/pzem/voltage') newData.voltage.push(message);
        if (topic === 'stm32/pzem/current') newData.current.push(message);
        if (topic === 'stm32/pzem/power') newData.power.push(message);

        newData.timestamps.push(now);

        // Keep only last 10 points
        newData.voltage = newData.voltage.slice(-10);
        newData.current = newData.current.slice(-10);
        newData.power = newData.power.slice(-10);
        newData.timestamps = newData.timestamps.slice(-10);

        return newData;
      });
    });
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
