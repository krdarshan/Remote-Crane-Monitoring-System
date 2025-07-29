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

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CranePredictiveMaintenance = ({ crane }) => {
  const [loading, setLoading] = useState(true);
  const [anomalyData, setAnomalyData] = useState([]);
  const [sensorData, setSensorData] = useState({
    temperature: [],
    vibration: [],
    load: [],
    fuel: []
  });
  const [healthScore, setHealthScore] = useState(65);
  const [remainingLife, setRemainingLife] = useState(125);
  const [componentHealth, setComponentHealth] = useState({
    temperature: 88,
    vibration: 17,
    sound: 99,
    load: 54,
    power: 86,
    fuel: 46,
    distance: 90,
    overall: 65
  });

  useEffect(() => {
    const generateTimeData = () => {
      const now = new Date();
      return Array.from({ length: 12 }, (_, i) => {
        const time = new Date(now);
        time.setMinutes(time.getMinutes() - (11 - i) * 5);
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      });
    };

    const generateData = () => {
      const timestamps = generateTimeData();
      return {
        temperature: Array.from({ length: 12 }, () => Math.floor(Math.random() * 40 + 20)),
        vibration: Array.from({ length: 12 }, () => Math.floor(Math.random() * 800 + 200)),
        load: Array.from({ length: 12 }, () => Math.floor(Math.random() * 8 + 2)),
        fuel: Array.from({ length: 12 }, () => Math.floor(Math.random() * 80 + 20)),
        anomaly: Array.from({ length: 12 }, () => Math.floor(Math.random() * 70 + 30)),
        timestamps
      };
    };

    const updateData = () => {
      const newData = generateData();
      setSensorData(prev => ({
        temperature: newData.temperature,
        vibration: newData.vibration,
        load: newData.load,
        fuel: newData.fuel,
        timestamps: newData.timestamps
      }));
      setAnomalyData(newData.anomaly);
      setLoading(false);
    };

    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 3
      }
    }
  };

  const generateChartData = (data, label, color) => ({
    labels: sensorData.timestamps,
    datasets: [{
      label,
      data,
      borderColor: color,
      backgroundColor: `${color}15`,
      fill: true,
      borderWidth: 2
    }]
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="predictive-maintenance-container">
      <div className="dashboard-header">
        <h2>
          <i className="bi bi-graph-up"></i>
          PREDICTIVE MAINTENANCE DASHBOARD
        </h2>
        <p>AI-powered anomaly detection and early fault prediction</p>
      </div>

      <div className="dashboard-grid">
        <div className="chart-section anomaly-detection">
          <h3>Anomaly Detection</h3>
          <div className="chart-container">
            <Line
              data={generateChartData(anomalyData, 'Anomaly Score', '#dc3545')}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="chart-section health-score">
          <h3>Equipment Health Score Trend</h3>
          <div className="chart-container">
            <Line
              data={generateChartData(sensorData.temperature, 'Health Score', '#0d6efd')}
              options={chartOptions}
            />
          </div>
        </div>

        <div className="info-card remaining-life">
          <h3>Remaining Useful Life</h3>
          <div className="rul-content">
            <div className="rul-value">{remainingLife}</div>
            <div className="rul-unit">days</div>
            <div className="rul-status">Equipment in good condition</div>
            <div className="rul-details">
              <p>Estimated RUL: 2994 hours</p>
              <p>Last updated: {new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="sensor-trends">
          <h3>Critical Sensor Trends</h3>
          <div className="trends-grid">
            <div className="trend-card temperature">
              <h4>Temperature Trend</h4>
              <div className="trend-chart">
                <Line
                  data={generateChartData(sensorData.temperature, 'Temperature (°C)', '#dc3545')}
                  options={chartOptions}
                />
              </div>
            </div>
            <div className="trend-card vibration">
              <h4>Vibration Trend</h4>
              <div className="trend-chart">
                <Line
                  data={generateChartData(sensorData.vibration, 'Vibration (Hz)', '#ffc107')}
                  options={chartOptions}
                />
              </div>
            </div>
            <div className="trend-card load">
              <h4>Load Trend</h4>
              <div className="trend-chart">
                <Line
                  data={generateChartData(sensorData.load, 'Load (kg)', '#0dcaf0')}
                  options={chartOptions}
                />
              </div>
            </div>
            <div className="trend-card fuel">
              <h4>Fuel Level Trend</h4>
              <div className="trend-chart">
                <Line
                  data={generateChartData(sensorData.fuel, 'Fuel Level (L)', '#198754')}
                  options={chartOptions}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="status-section">
          <h3>Component Health Status</h3>
          <div className="status-grid">
            {Object.entries(componentHealth).map(([component, health]) => (
              <div key={component} className={`status-card ${component.toLowerCase()}`}>
                <h4>{component.charAt(0).toUpperCase() + component.slice(1)} System</h4>
                <div className="health-gauge">
                  <div className="gauge-value">{health}%</div>
                  <div className="gauge-bar">
                    <div
                      className="gauge-fill"
                      style={{
                        width: `${health}%`,
                        backgroundColor: health >= 80 ? '#198754' : health >= 50 ? '#ffc107' : '#dc3545'
                      }}
                    ></div>
                  </div>
                </div>
                <p className="gauge-label">
                  Based on {component.toLowerCase()} sensor readings
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .predictive-maintenance-container {
          padding: 20px;
          background-color: #f8f9fa;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .dashboard-header h2 {
          color: #2c3e50;
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #6c757d;
        }

        .dashboard-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(12, 1fr);
        }

        .chart-section {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .anomaly-detection {
          grid-column: span 12;
        }

        .health-score {
          grid-column: span 8;
        }

        .remaining-life {
          grid-column: span 4;
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .sensor-trends {
          grid-column: span 12;
        }

        .trends-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .trend-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
        }

        .status-section {
          grid-column: span 12;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .status-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          text-align: center;
        }

        .health-gauge {
          margin: 1rem 0;
        }

        .gauge-value {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .gauge-bar {
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          margin: 0.5rem 0;
        }

        .gauge-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .gauge-label {
          font-size: 0.875rem;
          color: #6c757d;
          margin: 0;
        }

        .chart-container {
          height: 300px;
        }

        .trend-chart {
          height: 200px;
        }

        .rul-content {
          text-align: center;
        }

        .rul-value {
          font-size: 3.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .rul-unit {
          font-size: 1.25rem;
          color: #6c757d;
          margin-top: -0.5rem;
        }

        .rul-status {
          color: #198754;
          font-weight: 500;
          margin: 1rem 0;
        }

        .rul-details {
          color: #6c757d;
          font-size: 0.875rem;
        }

        .rul-details p {
          margin: 0.25rem 0;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1200px) {
          .health-score {
            grid-column: span 12;
          }
          .remaining-life {
            grid-column: span 12;
          }
          .trends-grid {
            grid-template-columns: 1fr;
          }
          .status-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default CranePredictiveMaintenance; 