import React from 'react';
import './CostAndFuel.css';

const CostAndFuel = () => {
  return (
    <div className="cost-fuel-page">
      <div className="cost-fuel-header">
        <h1>Cost & Fuel Management</h1>
        <p>Monitor and analyze operational costs and fuel consumption</p>
      </div>

      <div className="cost-fuel-grid">
        <div className="summary-card">
          <h3>Monthly Overview</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">$24,580</span>
              <span className="stat-label">Total Costs</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">4,280L</span>
              <span className="stat-label">Fuel Usage</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">$3.45</span>
              <span className="stat-label">Avg. Cost/L</span>
            </div>
          </div>
        </div>

        <div className="cost-breakdown-card">
          <h3>Cost Breakdown</h3>
          <div className="cost-items">
            <div className="cost-item">
              <div className="cost-info">
                <span className="cost-category">Fuel</span>
                <span className="cost-amount">$14,766</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="cost-item">
              <div className="cost-info">
                <span className="cost-category">Maintenance</span>
                <span className="cost-amount">$6,532</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div className="cost-item">
              <div className="cost-info">
                <span className="cost-category">Operations</span>
                <span className="cost-amount">$3,282</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '13%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="fuel-consumption-card">
          <h3>Fuel Consumption by Crane</h3>
          <div className="consumption-list">
            <div className="consumption-item">
              <div className="crane-info">
                <span className="crane-name">Tower Crane #1</span>
                <span className="consumption-value">1,245L</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div className="consumption-item">
              <div className="crane-info">
                <span className="crane-name">Mobile Crane #2</span>
                <span className="consumption-value">980L</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="consumption-item">
              <div className="crane-info">
                <span className="crane-name">Tower Crane #3</span>
                <span className="consumption-value">865L</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAndFuel; 