import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCraneById, updateSystemData } from '../store/cranesSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './EquipmentHealth.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatValue = (value, precision = 2) => {
  return typeof value === 'number' ? value.toFixed(precision) : 'N/A';
};

const getStatusColor = (value, thresholds) => {
  if (value >= thresholds.critical) return 'var(--danger-color)';
  if (value >= thresholds.warning) return 'var(--warning-color)';
  return 'var(--success-color)';
};

const SystemCard = ({ title, icon, value, metrics, thresholds }) => {
  const color = getStatusColor(value, thresholds);
  
  const chartData = {
    datasets: [{
      data: [value, 100 - value],
      backgroundColor: [color, '#e0e0e0'],
      borderWidth: 0,
      circumference: 270,
      rotation: 225
    }]
  };

  const chartOptions = {
    cutout: '75%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false }
    }
  };

  return (
    <div className="system-card">
      <div className="system-title">
        <i className={`fas ${icon} system-icon`}></i>
        <span>{title}</span>
      </div>
      <div className="progress-circle">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="progress-value" style={{ color }}>
          {formatValue(value, 1)}%
        </div>
      </div>
      <div className="metrics-grid">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="metric-item">
            <span className="metric-label">{key}</span>
            <span className="metric-value">{formatValue(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EquipmentHealth = () => {
  const { craneId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const crane = useSelector(state => selectCraneById(state, craneId));

  useEffect(() => {
    if (!crane) return;
    
    const interval = setInterval(() => {
      dispatch(updateSystemData({ craneId }));
    }, 5000);

    return () => clearInterval(interval);
  }, [crane, craneId, dispatch]);

  if (!crane) {
    return (
      <div className="equipment-health">
        <div className="error-container">
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <span>Crane not found</span>
          </div>
          <button onClick={() => navigate('/crane-selection')} className="back-button">
            Return to Crane Selection
          </button>
        </div>
      </div>
    );
  }

  const systems = {
    hydraulic: {
      title: 'Hydraulic System',
      icon: 'fa-tint',
      value: crane.systems.hydraulic.efficiency,
      metrics: {
        'Pressure': `${crane.systems.hydraulic.pressure} bar`,
        'Fluid Level': `${crane.systems.hydraulic.fluidLevel}%`,
        'Pump Efficiency': `${crane.systems.hydraulic.pumpEfficiency}%`,
        'Leak Status': crane.systems.hydraulic.leakStatus
      },
      thresholds: { warning: 70, critical: 90 }
    },
    engine: {
      title: 'Engine & Power System',
      icon: 'fa-engine',
      value: crane.systems.engine.efficiency,
      metrics: {
        'Fuel Consumption': `${crane.systems.engine.fuelConsumption} L/h`,
        'Battery Voltage': `${crane.systems.engine.batteryVoltage}V`,
        'Temperature': `${crane.systems.engine.temperature}°C`,
        'Power Load': `${crane.systems.engine.powerLoad}kW`
      },
      thresholds: { warning: 75, critical: 90 }
    },
    loadHandling: {
      title: 'Load Handling System',
      icon: 'fa-weight',
      value: crane.systems.loadHandling.efficiency,
      metrics: {
        'Current Load': `${crane.systems.loadHandling.currentLoad} tons`,
        'Max Capacity': `${crane.systems.loadHandling.maxCapacity} tons`,
        'Safety Factor': `${crane.systems.loadHandling.safetyFactor}x`,
        'Rope Condition': crane.systems.loadHandling.ropeCondition
      },
      thresholds: { warning: 60, critical: 80 }
    },
    braking: {
      title: 'Braking System',
      icon: 'fa-brake-warning',
      value: crane.systems.braking.efficiency,
      metrics: {
        'Pad Thickness': `${crane.systems.braking.padThickness}mm`,
        'Response Time': `${crane.systems.braking.responseTime}ms`,
        'Brake Force': `${crane.systems.braking.brakeForce}kN`,
        'System Type': crane.systems.braking.systemType
      },
      thresholds: { warning: 65, critical: 85 }
    }
  };

  return (
    <div className="equipment-health">
      <div className="equipment-header">
        <div className="header-title">
          <button onClick={() => navigate('/crane-selection')} className="back-button">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Crane Selection</span>
          </button>
          <h1>{crane.name} - Equipment Health</h1>
          <span className={`status-badge ${crane.status.toLowerCase()}`}>
            <i className="fas fa-circle"></i>
            {crane.status}
          </span>
        </div>
      </div>
      <div className="equipment-grid">
        {Object.entries(systems).map(([key, system]) => (
          <SystemCard key={key} {...system} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentHealth; 