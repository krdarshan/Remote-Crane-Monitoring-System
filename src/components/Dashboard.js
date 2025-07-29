import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { selectSelectedCrane } from '../store/cranesSlice';
import SensorGauges from './SensorGauges';
import './Dashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const navigate = useNavigate();
  const selectedCrane = useSelector(selectSelectedCrane);
  const [sensorData, setSensorData] = useState({
    temperature: 45,
    load: 72,
    vibration: 3.5,
    pressure: 120,
    fuel: 85
  });

  // Simulate real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setSensorData(prev => ({
        temperature: Math.max(30, Math.min(80, prev.temperature + (Math.random() - 0.5) * 5)),
        load: Math.max(0, Math.min(100, prev.load + (Math.random() - 0.5) * 10)),
        vibration: Math.max(0, Math.min(6, prev.vibration + (Math.random() - 0.5) * 0.5)),
        pressure: Math.max(80, Math.min(160, prev.pressure + (Math.random() - 0.5) * 8)),
        fuel: Math.max(0, Math.min(100, prev.fuel - Math.random() * 0.5))
      }));
    }, 3000);

    return () => clearInterval(updateInterval);
  }, []);

  const alerts = [
    {
      type: 'info',
      title: 'Operator Shift Change',
      message: 'Routine inspection passed',
      time: 'Just now'
    },
    {
      type: 'critical',
      title: 'Critical Load Detected',
      message: 'Emergency button pressed by operator',
      time: 'Just now'
    },
    {
      type: 'critical',
      title: 'Critical Load Detected',
      message: 'Stress levels above threshold',
      time: '5 min ago'
    }
  ];

  const maintenanceTasks = [
    {
      craneId: 'C-003',
      system: 'Hydraulic System',
      progress: 52,
      daysUntil: 16
    },
    {
      craneId: 'C-002',
      system: 'Cable Wear',
      progress: 14,
      daysUntil: 28
    }
  ];

  const temperatureData = {
    labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
    datasets: [
      {
        label: 'Temperature',
        data: [65, 59, 80, 81, 56],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const vibrationData = {
    labels: ['Current', 'Safe', 'Warning'],
    datasets: [{
      label: 'Vibration Levels',
      data: [2.5, 3, 4],
      backgroundColor: [
        'rgba(46, 204, 113, 0.8)',
        'rgba(149, 165, 166, 0.8)',
        'rgba(231, 76, 60, 0.8)'
      ],
      borderColor: [
        'rgb(46, 204, 113)',
        'rgb(149, 165, 166)',
        'rgb(231, 76, 60)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#2c3e50'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#2c3e50'
        }
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{selectedCrane?.name || 'Crane Dashboard'}</h1>
        <div className="header-actions">
          <button className="refresh-btn">
            <i className="fas fa-sync"></i>
            Refresh
          </button>
        </div>
      </div>

      <SensorGauges temperature={sensorData.temperature} load={sensorData.load} vibration={sensorData.vibration / 6} />

      <div className="dashboard-grid">
        <div className="card alerts-card">
          <div className="card-header">
            <h2>Real-Time Alerts</h2>
            <span className="alert-count">{alerts.length}</span>
            <select className="filter-dropdown">
              <option>All Alerts</option>
            </select>
          </div>
          <div className="alerts-list">
            {alerts.map((alert, index) => (
              <div key={index} className={`alert-item ${alert.type}`}>
                <i className={`fas fa-${alert.type === 'info' ? 'info-circle' : 'exclamation-circle'}`}></i>
                <div className="alert-content">
                  <h3>{alert.title}</h3>
                  <p>{alert.message}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card maintenance-card">
          <div className="card-header">
            <h2>Predictive Maintenance</h2>
            <select className="filter-dropdown">
              <option>Sort by Urgency</option>
            </select>
          </div>
          <div className="maintenance-list">
            {maintenanceTasks.map((task, index) => (
              <div key={index} className="maintenance-item">
                <div className="maintenance-header">
                  <h3>Crane #{task.craneId}</h3>
                  <span>{task.system}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress" 
                    style={{ width: `${task.progress}%`, backgroundColor: task.progress > 50 ? '#f1c40f' : '#2ecc71' }}
                  ></div>
                </div>
                <div className="maintenance-footer">
                  <span>{task.progress}%</span>
                  <span>~{task.daysUntil} days until maintenance</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card map-preview-card" onClick={() => navigate('/map')}>
          <div className="card-header">
            <h2>Location Tracking</h2>
            <button className="view-map-btn">
              View Full Map
              <i className="fas fa-external-link-alt"></i>
            </button>
          </div>
          <div className="map-preview">
            <img src="/images/map-preview.png" alt="Map Preview" />
            <div className="map-overlay">
              <p>Click to view detailed map with real-time tracking</p>
            </div>
          </div>
        </div>

        <div className="card temperature-card">
          <div className="card-header">
            <h2>Temperature Monitoring</h2>
            <select className="chart-type">
              <option>Line Chart</option>
            </select>
          </div>
          <div className="chart-container">
            <Line data={temperatureData} options={chartOptions} />
          </div>
        </div>

        <div className="card vibration-card">
          <div className="card-header">
            <h2>Vibration Analysis</h2>
            <select className="filter-dropdown">
              <option>All Cranes</option>
            </select>
          </div>
          <div className="chart-container">
            <Bar data={vibrationData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 