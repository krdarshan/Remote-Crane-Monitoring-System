import React, { useState } from 'react';
import CraneComponentDashboard from './CraneComponentDashboard';
import CranePredictiveMaintenance from './CranePredictiveMaintenance';
import './SelectCrane.css';

const SelectCrane = () => {
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'dashboard', or 'predictive'

  const cranes = [
    {
      id: 1,
      name: 'XCMG Truck Crane (Mobile Crane)',
      model: 'LTM 1100-4.2',
      location: 'Site A',
      status: 'operational',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-03-15',
      uptime: 95,
      efficiency: 88,
      healthScore: 92,
      image: '/images/xcmg-crane.jpg',
      equipment: [
        {
          id: 1,
          name: "Telescopic Boom",
          sensors: ["Load Sensor", "Vibration Sensor"]
        },
        {
          id: 2,
          name: "Hydraulic System",
          sensors: ["Power Sensor", "Temperature Sensor"]
        },
        {
          id: 3,
          name: "Outriggers",
          sensors: ["Load Sensor", "Distance Sensor"]
        }
      ]
    },
    {
      id: 2,
      name: 'POTAIN MDT 219 (Tower Crane)',
      model: 'Liebherr 550 EC-H',
      location: 'Site B',
      status: 'maintenance',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-02-20',
      uptime: 78,
      efficiency: 72,
      healthScore: 75,
      image: '/images/potain-crane.jpg',
      equipment: [
        {
          id: 1,
          name: "Mast System",
          sensors: ["Vibration Sensor", "Temperature Sensor"]
        },
        {
          id: 2,
          name: "Lifting Mechanism",
          sensors: ["Load Sensor", "Power Sensor"]
        },
        {
          id: 3,
          name: "Operator Cabin",
          sensors: ["Temperature Sensor", "Sound Sensor"]
        }
      ]
    },
    {
      id: 3,
      name: 'GROVE GRT880 (Rough Terrain Crane)',
      model: 'Manitowoc 18000',
      location: 'Site C',
      status: 'critical',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-03-01',
      uptime: 65,
      efficiency: 58,
      healthScore: 45,
      image: '/images/grove-crane.jpg',
      equipment: [
        {
          id: 1,
          name: "Engine System",
          sensors: ["Temperature Sensor", "Vibration Sensor"]
        },
        {
          id: 2,
          name: "Hydraulic System",
          sensors: ["Power Sensor", "Temperature Sensor"]
        },
        {
          id: 3,
          name: "Boom Assembly",
          sensors: ["Load Sensor", "Distance Sensor"]
        }
      ]
    },
    {
      id: 4,
      name: 'Liebherr Crawler Crane',
      model: 'LR 1300',
      location: 'Site D',
      status: 'operational',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-03-10',
      uptime: 88,
      efficiency: 82,
      healthScore: 85,
      image: '/images/liebherr-crane.jpg',
      equipment: [
        {
          id: 1,
          name: "Track System",
          sensors: ["Vibration Sensor", "Load Sensor"]
        },
        {
          id: 2,
          name: "Power Unit",
          sensors: ["Temperature Sensor", "Power Sensor"]
        },
        {
          id: 3,
          name: "Main Boom",
          sensors: ["Load Sensor", "Distance Sensor"]
        }
      ]
    }
  ];

  const handleViewDashboard = (crane) => {
    setSelectedCrane(crane);
    setView('dashboard');
  };

  const handlePredictiveAnalysis = (crane) => {
    setSelectedCrane(crane);
    setView('predictive');
  };

  const handleBack = () => {
    setSelectedCrane(null);
    setView('list');
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'operational':
        return {
          background: '#e3fcef',
          color: '#0d9488'
        };
      case 'maintenance':
        return {
          background: '#fef9c3',
          color: '#854d0e'
        };
      case 'critical':
        return {
          background: '#fee2e2',
          color: '#dc2626'
        };
      default:
        return {
          background: '#f1f5f9',
          color: '#475569'
        };
    }
  };

  if (view === 'dashboard' && selectedCrane) {
    return (
      <div className="dashboard-container">
        <button className="back-button" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back to Crane Selection
        </button>
        <CraneComponentDashboard crane={selectedCrane} />
      </div>
    );
  }

  if (view === 'predictive' && selectedCrane) {
    return (
      <div className="dashboard-container">
        <button className="back-button" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back to Crane Selection
        </button>
        <CranePredictiveMaintenance crane={selectedCrane} />
      </div>
    );
  }

  return (
    <div className="select-crane">
      <div className="page-header">
        <h1>Select a Crane</h1>
        <p>Choose a crane to view its monitoring data and health status</p>
      </div>

      <div className="cranes-grid">
        {cranes.map(crane => (
          <div key={crane.id} className="crane-card">
            {crane.image && (
              <div className="crane-image">
                <img src={crane.image} alt={crane.name} />
              </div>
            )}
            <div className="crane-header">
              <h2>{crane.name}</h2>
              <span 
                className="status-badge"
                style={getStatusStyle(crane.status)}
              >
                {crane.status}
              </span>
            </div>

            <div className="crane-info">
              <div className="info-row">
                <div className="info-group">
                  <label>Model</label>
                  <span>{crane.model}</span>
                </div>
                <div className="info-group">
                  <label>Location</label>
                  <span>{crane.location}</span>
                </div>
              </div>

              <div className="info-row">
                <div className="info-group">
                  <label>Last Maintenance</label>
                  <span>{crane.lastMaintenance}</span>
                </div>
                <div className="info-group">
                  <label>Next Maintenance</label>
                  <span>{crane.nextMaintenance}</span>
                </div>
              </div>
            </div>

            <div className="metrics-grid">
              <div className="metric">
                <div className="metric-value">{crane.uptime}%</div>
                <div className="metric-label">UPTIME</div>
              </div>
              <div className="metric">
                <div className="metric-value">{crane.efficiency}%</div>
                <div className="metric-label">EFFICIENCY</div>
              </div>
              <div className="metric">
                <div className="metric-value">{crane.healthScore}%</div>
                <div className="metric-label">HEALTH SCORE</div>
              </div>
            </div>

            <div className="button-group">
              <button 
                className="action-button view-details"
                onClick={() => handleViewDashboard(crane)}
              >
                View Details
              </button>
              <button 
                className="action-button predictive"
                onClick={() => handlePredictiveAnalysis(crane)}
              >
                Predictive Analysis
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .select-crane {
          padding: 2rem;
          background-color: #f8f9fa;
        }

        .page-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .page-header h1 {
          color: #2c3e50;
          font-size: 1.75rem;
          margin: 0;
          margin-bottom: 0.5rem;
        }

        .page-header p {
          color: #64748b;
          margin: 0;
        }

        .cranes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }

        .crane-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .crane-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .crane-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .crane-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .crane-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 1rem;
        }

        .crane-header h2 {
          color: #2c3e50;
          font-size: 1.25rem;
          margin: 0;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .crane-info {
          padding: 0 1.5rem;
          margin-bottom: 1.5rem;
        }

        .info-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .info-group {
          display: flex;
          flex-direction: column;
        }

        .info-group label {
          color: #64748b;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .info-group span {
          color: #1e293b;
          font-weight: 500;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin: 0 1.5rem 1.5rem;
          padding: 1rem;
          background-color: #f8fafc;
          border-radius: 8px;
        }

        .metric {
          text-align: center;
        }

        .metric-value {
          color: #2c3e50;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .metric-label {
          color: #64748b;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .button-group {
          padding: 0 1.5rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        .action-button {
          padding: 0.75rem;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .view-details {
          background-color: #3b82f6;
          color: white;
        }

        .view-details:hover {
          background-color: #2563eb;
        }

        .predictive {
          background-color: #f1f5f9;
          color: #475569;
        }

        .predictive:hover {
          background-color: #e2e8f0;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 1rem;
          font-weight: 500;
        }

        .back-button:hover {
          background-color: #2563eb;
        }

        @media (max-width: 768px) {
          .cranes-grid {
            grid-template-columns: 1fr;
          }

          .info-row {
            grid-template-columns: 1fr;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default SelectCrane; 