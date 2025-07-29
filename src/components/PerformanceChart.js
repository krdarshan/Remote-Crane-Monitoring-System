import React from 'react';

function PerformanceChart() {
  return (
    <div className="performance-chart">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#48bb78', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Load Capacity</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#4299e1', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Energy Consumption</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', backgroundColor: '#f6ad55', borderRadius: '2px' }}></div>
            <span style={{ fontSize: '14px', color: '#4a5568' }}>Maintenance Indicators</span>
          </div>
        </div>
        <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
          <option>Line Chart</option>
          <option>Bar Chart</option>
        </select>
      </div>

      <div style={{ 
        height: '300px', 
        backgroundColor: '#f7fafc',
        borderRadius: '4px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#718096', fontSize: '14px' }}>
          Chart visualization would go here
          (Note: For actual chart implementation, you would need to use a charting library like Chart.js or Recharts)
        </div>
      </div>
    </div>
  );
}

export default PerformanceChart; 