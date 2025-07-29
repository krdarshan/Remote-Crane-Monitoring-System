import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateFuelLevel,
  updateEngineHours,
  acknowledgeAlert,
  selectFuelData,
  selectCosts,
  selectUtilization
} from '../store/fuelAndCostSlice';
import { selectAllCranes } from '../store/cranesSlice';
import './CostAndFuelManagement.css';

const CostAndFuelManagement = () => {
  const dispatch = useDispatch();
  const fuelData = useSelector(selectFuelData) || {
    realTimeLevels: {},
    consumption: {},
    thresholds: { critical: 20, warning: 40 },
    prices: { diesel: 3.50, electricity: 0.12 }
  };
  const costs = useSelector(selectCosts) || {
    budget: { monthly: 50000, used: 35000, remaining: 15000 },
    breakdown: {
      fuel: 15000,
      maintenance: 10000,
      labor: 8000,
      parts: 5000,
      insurance: 4000,
      certification: 2000,
      training: 1000
    }
  };
  const utilization = useSelector(selectUtilization) || {
    engineHours: {},
    idleTime: {},
    costPerHour: {}
  };
  const alerts = useSelector(state => state.fuelAndCost?.alerts) || { active: [], history: [] };
  const cranes = useSelector(selectAllCranes);
  
  const [selectedCrane, setSelectedCrane] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [costView, setCostView] = useState('summary');
  const [showAlerts, setShowAlerts] = useState(false);

  const filteredCranes = useMemo(() => {
    if (selectedCrane === 'all') return cranes;
    return cranes.filter(crane => crane.id === selectedCrane);
  }, [cranes, selectedCrane]);

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      filteredCranes.forEach(crane => {
        // Simulate fuel level changes
        const randomChange = Math.random() * 2 - 1; // -1 to 1
        const currentLevel = fuelData.realTimeLevels[crane.id] || 100;
        const newLevel = Math.max(0, Math.min(100, currentLevel - randomChange));
        
        dispatch(updateFuelLevel({
          craneId: crane.id,
          level: newLevel,
          consumption: 12.5 + Math.random()
        }));

        // Simulate engine hours update
        dispatch(updateEngineHours({
          craneId: crane.id,
          hours: (utilization.engineHours[crane.id] || 0) + 1/60, // Add 1 minute
          idleTime: Math.random() > 0.7 ? (utilization.idleTime[crane.id] || 0) + 1/60 : utilization.idleTime[crane.id] || 0
        }));
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [filteredCranes, dispatch, fuelData.realTimeLevels, utilization.engineHours, utilization.idleTime]);

  const calculateEfficiency = (craneId) => {
    const hours = utilization.engineHours[craneId] || 0;
    const idle = utilization.idleTime[craneId] || 0;
    return hours > 0 ? ((hours - idle) / hours) * 100 : 0;
  };

  const getStatusColor = (value, type) => {
    switch(type) {
      case 'fuel':
        return value > 50 ? '#48bb78' : value > 25 ? '#f6ad55' : '#f56565';
      case 'efficiency':
        return value > 80 ? '#48bb78' : value > 60 ? '#f6ad55' : '#f56565';
      default:
        return '#4299e1';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="cost-fuel-management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Cost & Fuel Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select
            value={selectedCrane}
            onChange={(e) => setSelectedCrane(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
          >
            <option value="all">All Cranes</option>
            {cranes.map(crane => (
              <option key={crane.id} value={crane.id}>{crane.id}</option>
            ))}
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button 
            className="btn-secondary"
            onClick={() => setShowAlerts(!showAlerts)}
            style={{ position: 'relative' }}
          >
            Alerts
            {alerts.active.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: '#f56565',
                color: 'white',
                borderRadius: '50%',
                padding: '2px 6px',
                fontSize: '12px'
              }}>
                {alerts.active.length}
              </span>
            )}
          </button>
          <button className="btn-primary">Generate Report</button>
          <button className="btn-secondary">Export Data</button>
        </div>
      </div>

      {/* Alerts Panel */}
      {showAlerts && alerts.active.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>Active Alerts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alerts.active.map(alert => (
              <div key={alert.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px',
                backgroundColor: alert.type === 'CRITICAL_FUEL' ? '#fff5f5' : '#fffaf0',
                borderRadius: '4px'
              }}>
                <div>
                  <span style={{ fontWeight: '500' }}>{alert.message}</span>
                  <span style={{ marginLeft: '8px', color: '#718096', fontSize: '14px' }}>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <button
                  onClick={() => dispatch(acknowledgeAlert({ alertId: alert.id }))}
                  style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                >
                  Acknowledge
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Budget Card */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '12px' }}>Budget Status</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatCurrency(costs.budget.remaining)}
          </div>
          <div style={{ color: '#718096', fontSize: '14px' }}>
            {((costs.budget.remaining / costs.budget.monthly) * 100).toFixed(1)}% remaining
          </div>
          <div style={{ marginTop: '8px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px' }}>
            <div
              style={{
                width: `${(costs.budget.used / costs.budget.monthly) * 100}%`,
                height: '100%',
                backgroundColor: getStatusColor(costs.budget.remaining / costs.budget.monthly * 100, 'fuel'),
                borderRadius: '2px',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Fuel Efficiency Card */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '12px' }}>Average Fuel Efficiency</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {selectedCrane === 'all' 
              ? (Object.values(fuelData.consumption).reduce((a, b) => a + b, 0) / Object.values(fuelData.consumption).length).toFixed(1)
              : (fuelData.consumption[selectedCrane] || 0).toFixed(1)
            } L/hr
          </div>
          <div style={{ color: '#718096', fontSize: '14px' }}>
            {selectedCrane === 'all' ? 'Fleet Average' : `Crane ${selectedCrane}`}
          </div>
        </div>

        {/* Engine Hours Card */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '12px' }}>Total Engine Hours</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {selectedCrane === 'all'
              ? Object.values(utilization.engineHours).reduce((a, b) => a + b, 0).toFixed(1)
              : (utilization.engineHours[selectedCrane] || 0).toFixed(1)
            }
          </div>
          <div style={{ color: '#718096', fontSize: '14px' }}>
            {((Object.values(utilization.idleTime).reduce((a, b) => a + b, 0) / 
               Object.values(utilization.engineHours).reduce((a, b) => a + b, 1)) * 100).toFixed(1)}% Idle Time
          </div>
        </div>

        {/* Cost per Hour Card */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '12px' }}>Average Cost/Hour</h3>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
            {formatCurrency(costs.budget.used / 
              Object.values(utilization.engineHours).reduce((a, b) => a + b, 1))}
          </div>
          <div style={{ color: '#718096', fontSize: '14px' }}>Per Operating Hour</div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
        {/* Cost Breakdown */}
        <div style={{ flex: '1', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>Cost Breakdown</h2>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCostView('summary')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: costView === 'summary' ? '#4299e1' : 'transparent',
                  color: costView === 'summary' ? 'white' : 'black',
                  border: '1px solid #e2e8f0'
                }}
              >
                Summary
              </button>
              <button
                onClick={() => setCostView('detailed')}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: costView === 'detailed' ? '#4299e1' : 'transparent',
                  color: costView === 'detailed' ? 'white' : 'black',
                  border: '1px solid #e2e8f0'
                }}
              >
                Detailed
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(costs.breakdown).map(([category, amount]) => (
              <div key={category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ textTransform: 'capitalize' }}>{category}</span>
                  <span>{formatCurrency(amount)}</span>
                </div>
                <div style={{ height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${(amount / costs.budget.monthly) * 100}%`,
                      height: '100%',
                      backgroundColor: '#4299e1',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Fuel Levels */}
        <div style={{ flex: '1', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Real-time Fuel Levels</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredCranes.map(crane => (
              <div key={crane.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Crane {crane.id}</span>
                  <span>{(fuelData.realTimeLevels[crane.id] || 0).toFixed(1)}%</span>
                </div>
                <div style={{ height: '24px', backgroundColor: '#e2e8f0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                  <div
                    style={{
                      width: `${fuelData.realTimeLevels[crane.id] || 0}%`,
                      height: '100%',
                      backgroundColor: getStatusColor(fuelData.realTimeLevels[crane.id] || 0, 'fuel'),
                      transition: 'width 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '8px'
                    }}
                  >
                    <span style={{ 
                      color: 'white', 
                      fontSize: '12px',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}>
                      {(fuelData.consumption[crane.id] || 0).toFixed(1)} L/hr
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Efficiency Metrics Table */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Crane Efficiency Metrics</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Crane ID</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Engine Hours</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Idle Time</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Fuel Rate</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Efficiency Score</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredCranes.map(crane => {
              const efficiency = calculateEfficiency(crane.id);
              return (
                <tr key={crane.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>{crane.id}</td>
                  <td style={{ padding: '12px' }}>
                    {(utilization.engineHours[crane.id] || 0).toFixed(1)} hrs
                  </td>
                  <td style={{ padding: '12px' }}>
                    {(utilization.idleTime[crane.id] || 0).toFixed(1)} hrs
                  </td>
                  <td style={{ padding: '12px' }}>
                    {(fuelData.consumption[crane.id] || 0).toFixed(1)} L/hr
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${efficiency}%`,
                            height: '100%',
                            backgroundColor: getStatusColor(efficiency, 'efficiency'),
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                      <span>{efficiency.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: efficiency >= 80 ? '#f0fff4' : efficiency >= 60 ? '#ebf8ff' : '#fff5f5',
                      color: efficiency >= 80 ? '#48bb78' : efficiency >= 60 ? '#4299e1' : '#f56565'
                    }}>
                      {efficiency >= 80 ? 'Optimal' : efficiency >= 60 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CostAndFuelManagement; 