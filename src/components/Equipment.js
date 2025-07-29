import React from 'react';
import { FaTruck, FaTools, FaClipboardCheck, FaExclamationTriangle } from 'react-icons/fa';
import './Equipment.css';

const mockEquipment = [
  {
    id: 'CR001',
    name: 'Tower Crane A',
    status: 'operational',
    lastMaintenance: '2024-03-10',
    nextMaintenance: '2024-04-10',
    healthScore: 92,
    location: 'Site 1'
  },
  {
    id: 'CR002',
    name: 'Mobile Crane B',
    status: 'maintenance',
    lastMaintenance: '2024-03-12',
    nextMaintenance: '2024-03-16',
    healthScore: 75,
    location: 'Site 2'
  },
  {
    id: 'CR003',
    name: 'Crawler Crane C',
    status: 'warning',
    lastMaintenance: '2024-03-08',
    nextMaintenance: '2024-03-18',
    healthScore: 85,
    location: 'Site 3'
  }
];

const Equipment = () => {
  return (
    <div className="equipment">
      <div className="equipment-header">
        <h1>Equipment Management</h1>
        <p>Monitor and manage your crane fleet</p>
      </div>

      <div className="equipment-stats">
        <div className="stat-card">
          <FaTruck className="stat-icon" />
          <div className="stat-content">
            <h3>Total Equipment</h3>
            <p>{mockEquipment.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTools className="stat-icon" />
          <div className="stat-content">
            <h3>In Maintenance</h3>
            <p>{mockEquipment.filter(e => e.status === 'maintenance').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaClipboardCheck className="stat-icon" />
          <div className="stat-content">
            <h3>Operational</h3>
            <p>{mockEquipment.filter(e => e.status === 'operational').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaExclamationTriangle className="stat-icon" />
          <div className="stat-content">
            <h3>Warnings</h3>
            <p>{mockEquipment.filter(e => e.status === 'warning').length}</p>
          </div>
        </div>
      </div>

      <div className="equipment-list">
        {mockEquipment.map(equipment => (
          <div key={equipment.id} className="equipment-card">
            <div className="equipment-card-header">
              <h3>{equipment.name}</h3>
              <span className={`status-badge ${equipment.status}`}>
                {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
              </span>
            </div>
            <div className="equipment-details">
              <div className="detail-row">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{equipment.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Health Score:</span>
                <span className={`detail-value ${equipment.healthScore >= 90 ? 'high' : equipment.healthScore >= 80 ? 'medium' : 'low'}`}>
                  {equipment.healthScore}%
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{equipment.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Maintenance:</span>
                <span className="detail-value">{equipment.lastMaintenance}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Next Maintenance:</span>
                <span className="detail-value">{equipment.nextMaintenance}</span>
              </div>
            </div>
            <div className="equipment-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Schedule Maintenance</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Equipment; 