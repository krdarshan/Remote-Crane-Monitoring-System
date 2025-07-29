import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CraneComponentDashboard = ({ crane }) => {
  const [sensorData, setSensorData] = useState({
    load: { value: 9.8, status: 'fault' },
    vibration: { value: 461.2, status: 'normal' },
    temperature: { value: 35, status: 'normal' },
    power: { value: 220, status: 'normal' },
    distance: { value: 15, status: 'normal' },
    sound: { value: 75, status: 'normal' }
  });

  const [operatingHours, setOperatingHours] = useState('0h 0m');
  const [lastMaintenance, setLastMaintenance] = useState(new Date().toISOString());

  // Simulate real-time data updates
  useEffect(() => {
    const updateSensorData = () => {
      setSensorData(prev => ({
        load: { 
          value: Math.random() * 10,
          status: Math.random() > 0.7 ? 'fault' : 'normal'
        },
        vibration: {
          value: 400 + Math.random() * 200,
          status: Math.random() > 0.8 ? 'warning' : 'normal'
        },
        temperature: {
          value: 30 + Math.random() * 10,
          status: 'normal'
        },
        power: {
          value: 210 + Math.random() * 20,
          status: 'normal'
        },
        distance: {
          value: 10 + Math.random() * 10,
          status: 'normal'
        },
        sound: {
          value: 70 + Math.random() * 10,
          status: 'normal'
        }
      }));
    };

    const interval = setInterval(updateSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'fault':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return '✅';
    }
  };

  const renderSensorCard = (title, icon, value, unit, status) => (
    <div className="sensor-card">
      <div className="sensor-header">
        <div className="sensor-icon">{icon}</div>
        <div className="sensor-title">{title}</div>
        <div className={`status-indicator ${status}`}>
          {getStatusIcon(status)}
        </div>
      </div>
      <div className="sensor-value">
        {value.toFixed(1)}
        <span className="unit">{unit}</span>
      </div>
      <div className={`status-text ${status}`}>
        Status: {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
      <div className="sensor-bar">
        <div 
          className={`bar-fill ${status}`}
          style={{ width: `${(value / getMaxValue(title)) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const getMaxValue = (sensorType) => {
    const maxValues = {
      'Load Sensor': 15,
      'Vibration Sensor': 1000,
      'Temperature Sensor': 50,
      'Power Sensor': 250,
      'Distance Sensor': 30,
      'Sound Sensor': 100
    };
    return maxValues[sensorType] || 100;
  };

  return (
    <div className="crane-dashboard">
      <div className="dashboard-header">
        <h1>
          <i className="bi bi-graph-up"></i>
          INDUSTRIAL CRANE MONITORING DASHBOARD
        </h1>
        <p>Real-time sensor data monitoring and analysis</p>
      </div>

      <div className="crane-title">
        <h2>{crane.name} - TELESCOPIC BOOM</h2>
      </div>

      <div className="operating-info">
        <div className="info-card">
          <div className="info-icon">
            <i className="bi bi-clock-history"></i>
          </div>
          <div className="info-content">
            <h3>Total Operating Hours</h3>
            <div className="info-value">{operatingHours}</div>
            <div className="info-detail">
              Last maintenance: {new Date(lastMaintenance).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="components-grid">
        {crane.equipment.map((equipment) => (
          <div key={equipment.id} className="component-section">
            <h3>{equipment.name}</h3>
            <div className="sensor-info">
              <div className="sensor-count">
                <i className="bi bi-cpu"></i>
                {equipment.sensors.length} sensors available
              </div>
              <div className="status normal">
                Status: Normal
              </div>
            </div>
            <div className="sensors-grid">
              {equipment.sensors.map((sensor, index) => (
                <div key={index} className="sensor-wrapper">
                  {renderSensorCard(
                    sensor,
                    getSensorIcon(sensor),
                    sensorData[getSensorKey(sensor)].value,
                    getSensorUnit(sensor),
                    sensorData[getSensorKey(sensor)].status
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .crane-dashboard {
          padding: 20px;
          background-color: #f8f9fa;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          color: #2c3e50;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #6c757d;
        }

        .crane-title {
          margin: 2rem 0;
          text-align: center;
        }

        .crane-title h2 {
          color: #2c3e50;
          font-size: 1.75rem;
        }

        .operating-info {
          margin-bottom: 2rem;
        }

        .info-card {
          background: linear-gradient(135deg, #2c3e50, #3498db);
          color: white;
          padding: 2rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .info-icon {
          font-size: 2.5rem;
          background: rgba(255, 255, 255, 0.2);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .info-content h3 {
          margin: 0;
          font-size: 1.5rem;
        }

        .info-value {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 0.5rem 0;
        }

        .info-detail {
          opacity: 0.8;
          font-size: 0.9rem;
        }

        .components-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .component-section {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .component-section h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
        }

        .sensor-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .sensor-count {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-weight: 500;
        }

        .status.normal {
          background-color: rgba(46, 204, 113, 0.15);
          color: #2ecc71;
        }

        .sensors-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }

        .sensor-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .sensor-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .sensor-icon {
          font-size: 1.5rem;
        }

        .sensor-title {
          flex: 1;
          font-weight: 500;
          color: #2c3e50;
        }

        .status-indicator {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .sensor-value {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
          margin: 1rem 0;
        }

        .unit {
          font-size: 1rem;
          color: #6c757d;
          margin-left: 0.25rem;
        }

        .status-text {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .status-text.normal {
          color: #2ecc71;
        }

        .status-text.warning {
          color: #f1c40f;
        }

        .status-text.fault {
          color: #e74c3c;
        }

        .sensor-bar {
          height: 8px;
          background: #f1f1f1;
          border-radius: 4px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          transition: width 0.3s ease;
        }

        .bar-fill.normal {
          background-color: #2ecc71;
        }

        .bar-fill.warning {
          background-color: #f1c40f;
        }

        .bar-fill.fault {
          background-color: #e74c3c;
        }

        @media (max-width: 768px) {
          .components-grid {
            grid-template-columns: 1fr;
          }

          .sensors-grid {
            grid-template-columns: 1fr;
          }

          .info-card {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .crane-title h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

const getSensorIcon = (sensorType) => {
  const icons = {
    'Load Sensor': '⚖️',
    'Vibration Sensor': '📳',
    'Temperature Sensor': '🌡️',
    'Power Sensor': '⚡',
    'Distance Sensor': '📏',
    'Sound Sensor': '🔊'
  };
  return icons[sensorType] || '📊';
};

const getSensorUnit = (sensorType) => {
  const units = {
    'Load Sensor': 'kg',
    'Vibration Sensor': 'Hz',
    'Temperature Sensor': '°C',
    'Power Sensor': 'V',
    'Distance Sensor': 'cm',
    'Sound Sensor': 'dB'
  };
  return units[sensorType] || '';
};

const getSensorKey = (sensorType) => {
  const keys = {
    'Load Sensor': 'load',
    'Vibration Sensor': 'vibration',
    'Temperature Sensor': 'temperature',
    'Power Sensor': 'power',
    'Distance Sensor': 'distance',
    'Sound Sensor': 'sound'
  };
  return keys[sensorType] || '';
};

export default CraneComponentDashboard; 