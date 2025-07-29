import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './SensorGauges.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const SensorGauges = ({ temperature, load, vibration }) => {
  const createGaugeData = (value, maxValue, colors) => ({
    labels: ['Value', 'Remaining'],
    datasets: [{
      data: [value, maxValue - value],
      backgroundColor: [colors[0], '#e2e8f0'],
      borderWidth: 0,
      circumference: 180,
      rotation: -90
    }]
  });

  const gaugeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    cutout: '75%'
  };

  const getTemperatureColor = (value) => {
    if (value < 50) return ['#2ecc71', '#27ae60'];
    if (value < 75) return ['#f1c40f', '#f39c12'];
    return ['#e74c3c', '#c0392b'];
  };

  const getLoadColor = (value) => {
    if (value < 60) return ['#2ecc71', '#27ae60'];
    if (value < 85) return ['#f1c40f', '#f39c12'];
    return ['#e74c3c', '#c0392b'];
  };

  const getVibrationColor = (value) => {
    if (value < 0.3) return ['#2ecc71', '#27ae60'];
    if (value < 0.7) return ['#f1c40f', '#f39c12'];
    return ['#e74c3c', '#c0392b'];
  };

  return (
    <div className="sensor-gauges">
      <h2>Real-time Sensor Data</h2>
      <div className="gauges-container">
        <div className="gauge-item">
          <div className="gauge-header">
            <i className="fas fa-thermometer-half" style={{ color: getTemperatureColor(temperature)[0] }}></i>
            <h3>Temperature</h3>
          </div>
          <div className="gauge-chart">
            <Doughnut data={createGaugeData(temperature, 100, getTemperatureColor(temperature))} options={gaugeOptions} />
            <div className="gauge-value">{temperature}°C</div>
          </div>
        </div>

        <div className="gauge-item">
          <div className="gauge-header">
            <i className="fas fa-weight" style={{ color: getLoadColor(load)[0] }}></i>
            <h3>Load</h3>
          </div>
          <div className="gauge-chart">
            <Doughnut data={createGaugeData(load, 100, getLoadColor(load))} options={gaugeOptions} />
            <div className="gauge-value">{load}%</div>
          </div>
        </div>

        <div className="gauge-item">
          <div className="gauge-header">
            <i className="fas fa-wave-square" style={{ color: getVibrationColor(vibration)[0] }}></i>
            <h3>Vibration</h3>
          </div>
          <div className="gauge-chart">
            <Doughnut data={createGaugeData(vibration * 100, 100, getVibrationColor(vibration))} options={gaugeOptions} />
            <div className="gauge-value">{(vibration * 100).toFixed(1)} Hz</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorGauges; 