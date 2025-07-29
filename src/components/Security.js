import React from 'react';
import {
  FaShieldAlt,
  FaUserShield,
  FaKey,
  FaHistory,
  FaExclamationTriangle,
  FaLock,
  FaUnlock,
  FaClock
} from 'react-icons/fa';
import './Security.css';

const mockSecurityLogs = [
  {
    id: 'S001',
    type: 'access',
    user: 'John Smith',
    action: 'Crane Control Access',
    timestamp: '2024-03-15 09:30:45',
    status: 'authorized',
    location: 'Site A - Control Room'
  },
  {
    id: 'S002',
    type: 'alert',
    user: 'System',
    action: 'Unauthorized Access Attempt',
    timestamp: '2024-03-15 10:15:22',
    status: 'denied',
    location: 'Site B - Equipment Storage'
  },
  {
    id: 'S003',
    type: 'maintenance',
    user: 'Sarah Johnson',
    action: 'Security System Check',
    timestamp: '2024-03-15 11:00:00',
    status: 'completed',
    location: 'All Sites'
  }
];

const Security = () => {
  return (
    <div className="security">
      <div className="security-header">
        <h1>Security Management</h1>
        <p>Monitor and manage system security</p>
      </div>

      <div className="security-stats">
        <div className="stat-card">
          <FaUserShield className="stat-icon" />
          <div className="stat-content">
            <h3>Active Users</h3>
            <p>24</p>
          </div>
        </div>
        <div className="stat-card">
          <FaExclamationTriangle className="stat-icon" />
          <div className="stat-content">
            <h3>Security Alerts</h3>
            <p>2</p>
          </div>
        </div>
        <div className="stat-card">
          <FaKey className="stat-icon" />
          <div className="stat-content">
            <h3>Access Requests</h3>
            <p>5</p>
          </div>
        </div>
        <div className="stat-card">
          <FaHistory className="stat-icon" />
          <div className="stat-content">
            <h3>Recent Activities</h3>
            <p>156</p>
          </div>
        </div>
      </div>

      <div className="security-actions">
        <button className="btn-primary">
          <FaShieldAlt className="btn-icon" />
          Security Check
        </button>
        <button className="btn-secondary">Access Control</button>
        <button className="btn-secondary">Generate Report</button>
      </div>

      <div className="security-filters">
        <select className="filter-select">
          <option value="">All Types</option>
          <option value="access">Access</option>
          <option value="alert">Alert</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <select className="filter-select">
          <option value="">All Status</option>
          <option value="authorized">Authorized</option>
          <option value="denied">Denied</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          className="filter-date"
          placeholder="Select Date"
        />
      </div>

      <div className="security-logs">
        {mockSecurityLogs.map(log => (
          <div key={log.id} className="security-log-card">
            <div className="log-icon">
              {log.type === 'access' && (
                <FaKey className={`icon ${log.status}`} />
              )}
              {log.type === 'alert' && (
                <FaExclamationTriangle className={`icon ${log.status}`} />
              )}
              {log.type === 'maintenance' && (
                <FaShieldAlt className={`icon ${log.status}`} />
              )}
            </div>
            <div className="log-content">
              <div className="log-header">
                <h3>{log.action}</h3>
                <span className={`status-badge ${log.status}`}>
                  {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                </span>
              </div>
              <div className="log-details">
                <div className="detail-item">
                  <FaUserShield className="detail-icon" />
                  <span>{log.user}</span>
                </div>
                <div className="detail-item">
                  <FaClock className="detail-icon" />
                  <span>{log.timestamp}</span>
                </div>
                <div className="detail-item">
                  <FaLock className="detail-icon" />
                  <span>{log.location}</span>
                </div>
              </div>
            </div>
            <div className="log-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Take Action</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Security; 