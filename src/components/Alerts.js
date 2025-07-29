import React, { useState, useEffect, useCallback } from 'react';
import {
  FaBell,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaFilter,
  FaDownload,
  FaChartLine,
  FaRobot,
  FaWhatsapp,
  FaTelegram,
  FaSlack,
  FaClock,
  FaTag,
  FaShare,
  FaTruck
} from 'react-icons/fa';
import './Alerts.css';

// Mock data for alerts
const mockAlerts = [
  {
    id: 'AL-001',
    type: 'Equipment Malfunction',
    category: 'Motor',
    severity: 'High',
    message: 'Motor temperature exceeding safe limits',
    timestamp: '2024-03-15T10:30:00',
    crane: 'Tower Crane #2',
    status: 'New',
    acknowledgedBy: null,
    resolution: null,
    prediction: {
      probability: 85,
      timeframe: '24 hours',
      recommendedAction: 'Schedule immediate maintenance'
    }
  },
  {
    id: 'AL-002',
    type: 'Safety',
    category: 'Overload',
    severity: 'Medium',
    message: 'Load weight approaching maximum capacity',
    timestamp: '2024-03-15T09:15:00',
    crane: 'Mobile Crane #1',
    status: 'Acknowledged',
    acknowledgedBy: 'John Smith',
    resolution: null,
    prediction: {
      probability: 65,
      timeframe: '48 hours',
      recommendedAction: 'Review load distribution'
    }
  },
  {
    id: 'AL-003',
    type: 'Maintenance',
    category: 'Hydraulics',
    severity: 'Low',
    message: 'Scheduled hydraulic system check due',
    timestamp: '2024-03-15T08:00:00',
    crane: 'Crawler Crane #3',
    status: 'New',
    acknowledgedBy: null,
    resolution: null,
    prediction: {
      probability: 45,
      timeframe: '72 hours',
      recommendedAction: 'Plan routine maintenance'
    }
  }
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filters, setFilters] = useState({
    type: 'All Types',
    severity: 'All Severities',
    status: 'All Status',
    dateRange: 'all'
  });
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    warning: 0,
    info: 0
  });
  const [showNotification, setShowNotification] = useState(null);

  // Update statistics
  useEffect(() => {
    const newStats = {
      total: alerts.length,
      critical: alerts.filter(a => a.severity === 'High').length,
      warning: alerts.filter(a => a.severity === 'Medium').length,
      info: alerts.filter(a => a.severity === 'Low').length
    };
    setStats(newStats);
  }, [alerts]);

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.7) {
        const newAlert = {
          id: `AL-${Math.floor(Math.random() * 1000)}`,
          type: ['Equipment Malfunction', 'Safety', 'Maintenance'][Math.floor(Math.random() * 3)],
          category: ['Motor', 'Hydraulics', 'Brakes', 'Sensors'][Math.floor(Math.random() * 4)],
          severity: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          message: 'New alert detected',
          timestamp: new Date().toISOString(),
          crane: `Crane #${Math.floor(Math.random() * 5) + 1}`,
          status: 'New',
          acknowledgedBy: null,
          resolution: null,
          prediction: {
            probability: Math.floor(Math.random() * 100),
            timeframe: '24 hours',
            recommendedAction: 'Check system'
          }
        };
        setAlerts(prev => [newAlert, ...prev]);
        setShowNotification(newAlert);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        return { ...alert, status: 'Acknowledged', acknowledgedBy: 'Current User' };
      }
      return alert;
    }));
  };

  const handleResolve = (alertId) => {
    setAlerts(prev => prev.map(alert => {
      if (alert.id === alertId) {
        return { ...alert, status: 'Resolved', resolution: 'Issue fixed' };
      }
      return alert;
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Type', 'Category', 'Severity', 'Message', 'Timestamp', 'Crane', 'Status'],
      ...alerts.map(alert => [
        alert.id,
        alert.type,
        alert.category,
        alert.severity,
        alert.message,
        alert.timestamp,
        alert.crane,
        alert.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alerts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filters.type !== 'All Types' && alert.type !== filters.type) return false;
    if (filters.severity !== 'All Severities' && alert.severity !== filters.severity) return false;
    if (filters.status !== 'All Status' && alert.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <div className="header-title">
          <FaBell className="header-icon" />
          <h1>Alerts Management</h1>
        </div>
        <div className="header-actions">
          <button className="action-button" onClick={handleExport}>
            <FaDownload /> Export Alerts
          </button>
          <button className="action-button">
            <FaChartLine /> Analytics
          </button>
        </div>
      </div>

      <div className="alerts-stats">
        <div className="stat-card total">
          <div className="stat-icon">
            <FaBell />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Alerts</span>
          </div>
        </div>
        <div className="stat-card critical">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.critical}</span>
            <span className="stat-label">Critical</span>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon">
            <FaInfoCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.warning}</span>
            <span className="stat-label">Warnings</span>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.info}</span>
            <span className="stat-label">Info</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Alert Type:</label>
          <select 
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
          >
            <option>All Types</option>
            <option>Equipment Malfunction</option>
            <option>Safety</option>
            <option>Maintenance</option>
            <option>Operational</option>
            <option>Network & System</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Severity:</label>
          <select 
            value={filters.severity}
            onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
          >
            <option>All Severities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option>All Status</option>
            <option>New</option>
            <option>Acknowledged</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <div className="alerts-list">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={`alert-card ${alert.severity.toLowerCase()}`}>
            <div className="alert-header">
              <div className="alert-id-type">
                <span className="alert-id">{alert.id}</span>
                <span className="alert-type">{alert.type}</span>
              </div>
              <span className={`severity-badge ${alert.severity.toLowerCase()}`}>
                {alert.severity}
              </span>
            </div>

            <div className="alert-content">
              <p className="alert-message">{alert.message}</p>
              <div className="alert-details">
                <span className="detail-item">
                  <FaClock /> {new Date(alert.timestamp).toLocaleString()}
                </span>
                <span className="detail-item">
                  <FaTruck /> {alert.crane}
                </span>
                <span className="detail-item">
                  <FaTag /> {alert.category}
                </span>
              </div>
            </div>

            {alert.prediction && (
              <div className="prediction-section">
                <FaRobot className="prediction-icon" />
                <div className="prediction-content">
                  <div className="prediction-header">
                    <span>AI Prediction</span>
                    <span className="probability">{alert.prediction.probability}%</span>
                  </div>
                  <p className="prediction-message">{alert.prediction.recommendedAction}</p>
                  <span className="timeframe">Timeframe: {alert.prediction.timeframe}</span>
                </div>
              </div>
            )}

            <div className="alert-actions">
              {alert.status === 'New' && (
                <button 
                  className="action-button acknowledge"
                  onClick={() => handleAcknowledge(alert.id)}
                >
                  <FaCheckCircle /> Acknowledge
                </button>
              )}
              {alert.status === 'Acknowledged' && (
                <button 
                  className="action-button resolve"
                  onClick={() => handleResolve(alert.id)}
                >
                  <FaCheckCircle /> Resolve
                </button>
              )}
              <button className="action-button share">
                <FaShare /> Share
              </button>
            </div>
          </div>
        ))}
      </div>

      {showNotification && (
        <div className={`notification ${showNotification.severity.toLowerCase()}`}>
          <div className="notification-icon">
            {showNotification.severity === 'High' ? <FaExclamationTriangle /> : 
             showNotification.severity === 'Medium' ? <FaInfoCircle /> : 
             <FaCheckCircle />}
          </div>
          <div className="notification-content">
            <div className="notification-title">{showNotification.type} Alert</div>
            <div className="notification-message">{showNotification.message}</div>
          </div>
          <button className="notification-close" onClick={() => setShowNotification(null)}>
            <FaTimesCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default Alerts; 