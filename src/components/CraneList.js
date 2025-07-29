import React from 'react';

function CraneList() {
  const cranes = [
    {
      id: 'C-001',
      location: 'Construction Site A',
      load: '46%',
      temp: '73°C',
      status: 'Operational'
    },
    {
      id: 'C-002',
      location: 'Port Facility B',
      load: '36%',
      temp: '64°C',
      status: 'Operational'
    },
    {
      id: 'C-003',
      location: 'Manufacturing Plant C',
      load: '50%',
      temp: '81°C',
      status: 'Maintenance Soon'
    },
    {
      id: 'C-004',
      location: 'Shipping Yard D',
      load: '95%',
      temp: '106°C',
      status: 'Critical Issue'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return '#48bb78';
      case 'Maintenance Soon':
        return '#f6ad55';
      case 'Critical Issue':
        return '#f56565';
      default:
        return '#a0aec0';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'Operational':
        return '#f0fff4';
      case 'Maintenance Soon':
        return '#fffaf0';
      case 'Critical Issue':
        return '#fff5f5';
      default:
        return '#f7fafc';
    }
  };

  return (
    <div className="crane-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
          <option>All Cranes</option>
        </select>
        <button style={{ 
          padding: '8px', 
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#edf2f7',
          cursor: 'pointer'
        }}>
          ↻
        </button>
      </div>

      <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
        {cranes.map(crane => (
          <div
            key={crane.id}
            style={{
              padding: '16px',
              borderLeft: `4px solid ${getStatusColor(crane.status)}`,
              backgroundColor: 'white',
              marginBottom: '8px',
              borderRadius: '4px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <h4 style={{ color: '#2d3748', marginBottom: '4px' }}>Crane #{crane.id}</h4>
                <div style={{ color: '#718096', fontSize: '14px' }}>{crane.location}</div>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: getStatusBg(crane.status),
                color: getStatusColor(crane.status),
                fontSize: '14px'
              }}>
                {crane.status}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
              <div>
                <div style={{ color: '#718096', fontSize: '12px' }}>Load</div>
                <div style={{ color: '#2d3748' }}>{crane.load}</div>
              </div>
              <div>
                <div style={{ color: '#718096', fontSize: '12px' }}>Temp</div>
                <div style={{ color: '#2d3748' }}>{crane.temp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CraneList; 