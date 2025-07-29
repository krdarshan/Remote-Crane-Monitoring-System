import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllCranes } from '../store/cranesSlice';
import './CranesManagement.css';

const CranesManagement = () => {
  const cranes = useSelector(selectAllCranes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCranes = cranes.filter(crane => {
    const matchesSearch = crane.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crane.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crane.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || crane.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="cranes-management">
      <div className="page-header">
        <h1>Cranes Management</h1>
        <p>View and manage all cranes in the system</p>
      </div>

      <div className="filters">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search cranes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-input"
        >
          <option value="all">All Status</option>
          <option value="operational">Operational</option>
          <option value="maintenance">Maintenance</option>
          <option value="error">Error</option>
        </select>

        <button className="button button-primary">
          <i className="fas fa-plus"></i>
          Add New Crane
        </button>
      </div>

      <div className="cranes-grid">
        {filteredCranes.map(crane => (
          <div key={crane.id} className="crane-card">
            <div className="crane-card-header">
              <h2>{crane.name}</h2>
              <span className={`status-badge ${crane.status.toLowerCase()}`}>
                {crane.status}
              </span>
            </div>
            
            <div className="crane-card-content">
              <p><strong>Model:</strong> {crane.model}</p>
              <p><strong>Location:</strong> {crane.location}</p>
              <p><strong>Last Maintenance:</strong> {crane.lastMaintenance}</p>
              
              <div className="metrics-grid">
                <div className="metric-item">
                  <h3>Uptime</h3>
                  <p className="metric-value">{crane.metrics?.uptime || '0'}%</p>
                </div>
                <div className="metric-item">
                  <h3>Efficiency</h3>
                  <p className="metric-value">{crane.metrics?.efficiency || '0'}%</p>
                </div>
              </div>
            </div>

            <div className="crane-card-footer">
              <button className="button button-secondary">
                <i className="fas fa-edit"></i>
                Edit
              </button>
              <button className="button button-danger">
                <i className="fas fa-trash"></i>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CranesManagement; 