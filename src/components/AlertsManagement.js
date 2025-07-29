import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { acknowledgeAlert, clearAlert } from '../store/alertsSlice';
import './AlertsManagement.css';

function AlertsManagement() {
  const alerts = useSelector(state => state.alerts.alerts);
  const stats = useSelector(state => state.alerts.stats);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    severity: 'All Severity',
    type: 'All Types',
    status: 'All Status',
    crane: 'All Cranes',
    date: ''
  });

  const handleAcknowledge = (alertId) => {
    dispatch(acknowledgeAlert(alertId));
  };

  const handleClear = (alertId) => {
    if (window.confirm('Are you sure you want to clear this alert?')) {
      dispatch(clearAlert(alertId));
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return { bg: '#fff5f5', text: '#f56565' };
      case 'warning':
        return { bg: '#fffaf0', text: '#f6ad55' };
      case 'maintenance':
        return { bg: '#ebf8ff', text: '#4299e1' };
      case 'info':
        return { bg: '#f7fafc', text: '#a0aec0' };
      default:
        return { bg: '#f7fafc', text: '#a0aec0' };
    }
  };

  return (
    <div className="alerts-management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Alerts Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary">Configure Alerts</button>
          <button className="btn-primary">Notification Settings</button>
          <button className="btn-secondary">Export Log</button>
          <button className="btn-secondary">Clear All</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#f56565', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</span>
            <h3>Critical</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.critical}</div>
          <div style={{ color: 'red', fontSize: '14px' }}>↑ 2 new alerts</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#f6ad55', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚠️</span>
            <h3>Warning</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.warning}</div>
          <div style={{ color: 'orange', fontSize: '14px' }}>↑ 1 new alert</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#4299e1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔧</span>
            <h3>Maintenance</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.maintenance}</div>
          <div style={{ color: 'blue', fontSize: '14px' }}>No change</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#a0aec0', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ℹ️</span>
            <h3>Info</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.info}</div>
          <div style={{ color: 'gray', fontSize: '14px' }}>No change</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <select 
          value={filters.severity}
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Severity</option>
          <option>Critical</option>
          <option>Warning</option>
          <option>Maintenance</option>
          <option>Info</option>
        </select>

        <select 
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Types</option>
          <option>Load</option>
          <option>Temperature</option>
          <option>Maintenance</option>
          <option>System</option>
        </select>

        <select 
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Status</option>
          <option>New</option>
          <option>Acknowledged</option>
          <option>Resolved</option>
        </select>

        <select 
          value={filters.crane}
          onChange={(e) => setFilters({ ...filters, crane: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Cranes</option>
          <option>C-001</option>
          <option>C-002</option>
          <option>C-003</option>
          <option>C-004</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        />

        <button 
          onClick={() => setFilters({
            severity: 'All Severity',
            type: 'All Types',
            status: 'All Status',
            crane: 'All Cranes',
            date: ''
          })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          Reset Filters
        </button>
      </div>

      <div className="alerts-table" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>Time</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Alert ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Crane</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Severity</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Message</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map(alert => (
              <tr key={alert.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>
                  <div>{alert.time}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{alert.date}</div>
                </td>
                <td style={{ padding: '12px' }}>{alert.id}</td>
                <td style={{ padding: '12px' }}>{alert.craneId}</td>
                <td style={{ padding: '12px' }}>{alert.type}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    ...getSeverityColor(alert.severity)
                  }}>
                    {alert.severity}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div>{alert.message}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{alert.details}</div>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 
                      alert.status === 'New' ? '#fff5f5' :
                      alert.status === 'Acknowledged' ? '#ebf8ff' :
                      '#f0fff4',
                    color:
                      alert.status === 'New' ? '#f56565' :
                      alert.status === 'Acknowledged' ? '#4299e1' :
                      '#48bb78'
                  }}>
                    {alert.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button title="View Details">👁</button>
                    {alert.status === 'New' && (
                      <button title="Acknowledge" onClick={() => handleAcknowledge(alert.id)}>✓</button>
                    )}
                    <button title="Clear" onClick={() => handleClear(alert.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlertsManagement; 