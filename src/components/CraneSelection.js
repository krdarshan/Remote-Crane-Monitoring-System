import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllCranes, setSelectedCrane } from '../store/cranesSlice';
import './CraneSelection.css';

const CraneSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cranes = useSelector(selectAllCranes);

  const handleCraneSelect = (crane) => {
    dispatch(setSelectedCrane(crane));
    navigate(`/equipment-health/${crane.id}`);
  };

  return (
    <div className="crane-selection">
      <div className="selection-header">
        <h1>Select a Crane</h1>
        <p>Choose a crane to view its equipment health and monitoring data</p>
      </div>

      <div className="cranes-grid">
        {cranes.map((crane) => (
          <div key={crane.id} className="crane-card">
            <img 
              src={crane.image} 
              alt={crane.name} 
              className="crane-image"
            />
            <div className="crane-details">
              <h3 className="crane-name">{crane.name}</h3>
              
              <div className="crane-info">
                <div className="info-item">
                  <span className="info-label">Model</span>
                  <span className="info-value">{crane.model}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{crane.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Last Maintenance</span>
                  <span className="info-value">{crane.lastMaintenance}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className={`status ${crane.status.toLowerCase()}`}>
                    {crane.status}
                  </span>
                </div>
              </div>

              <div className="crane-metrics">
                <div className="metric-item">
                  <span className="metric-value">{crane.metrics.uptime}%</span>
                  <span className="metric-label">Uptime</span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">{crane.metrics.efficiency}%</span>
                  <span className="metric-label">Efficiency</span>
                </div>
              </div>

              <button 
                className="select-button"
                onClick={() => handleCraneSelect(crane)}
              >
                View Equipment Health
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CraneSelection; 