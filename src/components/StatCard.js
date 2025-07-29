import React from 'react';

function StatCard({ title, value, change, type }) {
  const getChangeColor = () => {
    if (change.includes('+')) return 'red';
    if (change.includes('-')) return 'green';
    return 'gray';
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'danger':
        return '✕';
      case 'info':
        return '🕒';
      default:
        return '';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#48bb78';
      case 'warning':
        return '#f6ad55';
      case 'danger':
        return '#f56565';
      case 'info':
        return '#4299e1';
      default:
        return '#a0aec0';
    }
  };

  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ 
          backgroundColor: getIconColor(),
          color: 'white',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px'
        }}>
          {getIcon()}
        </span>
        <h3 style={{ color: '#4a5568', fontSize: '14px' }}>{title}</h3>
      </div>
      <div style={{ marginLeft: '44px' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748', marginBottom: '4px' }}>
          {value}
        </div>
        <div style={{ fontSize: '12px', color: getChangeColor() }}>
          {change}
        </div>
      </div>
    </div>
  );
}

export default StatCard; 