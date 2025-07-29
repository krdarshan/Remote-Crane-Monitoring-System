import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaFilter, FaDownload, FaChartLine } from 'react-icons/fa';
import './CraneManagement.css';

const mockCranes = [
  {
    id: 1,
    name: 'ACE Mobile Crane',
    model: 'LTM 1100-4.2',
    location: 'Site A',
    status: 'operational',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    uptime: 95,
    efficiency: 88,
    load: '75%',
    fuelLevel: '85%',
    alerts: [],
    healthScore: 92
  },
  {
    id: 2,
    name: 'Tower Construction Crane',
    model: 'Liebherr 550 EC-H',
    location: 'Site B',
    status: 'maintenance',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-02-20',
    uptime: 78,
    efficiency: 72,
    load: '45%',
    fuelLevel: '60%',
    alerts: ['Scheduled maintenance due'],
    healthScore: 75
  },
  {
    id: 3,
    name: 'Crawler Crane',
    model: 'Manitowoc 18000',
    location: 'Site C',
    status: 'critical',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-03-01',
    uptime: 65,
    efficiency: 58,
    load: '90%',
    fuelLevel: '30%',
    alerts: ['High load detected', 'Low fuel warning'],
    healthScore: 45
  }
];

const CraneManagement = () => {
  const [cranes, setCranes] = useState(mockCranes);
  const [filteredCranes, setFilteredCranes] = useState(mockCranes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    const filtered = cranes.filter(crane => {
      const matchesSearch = crane.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || crane.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
    setFilteredCranes(filtered);
  }, [searchTerm, statusFilter, cranes]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const handleEditCrane = (crane) => {
    setSelectedCrane(crane);
    // Implement edit functionality
  };

  const handleDeleteCrane = (craneId) => {
    const updatedCranes = cranes.filter(crane => crane.id !== craneId);
    setCranes(updatedCranes);
  };

  const handleGenerateReport = () => {
    // Implement report generation
    console.log('Generating report...');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#48bb78';
      case 'maintenance': return '#ecc94b';
      case 'critical': return '#f56565';
      default: return '#718096';
    }
  };

  const renderDashboard = () => (
    <div className="dashboard-overview">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Cranes</h3>
          <p>{cranes.length}</p>
        </div>
        <div className="stat-card">
          <h3>Operational</h3>
          <p>{cranes.filter(c => c.status === 'operational').length}</p>
        </div>
        <div className="stat-card">
          <h3>In Maintenance</h3>
          <p>{cranes.filter(c => c.status === 'maintenance').length}</p>
        </div>
        <div className="stat-card">
          <h3>Critical</h3>
          <p>{cranes.filter(c => c.status === 'critical').length}</p>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="analytics-panel">
      <h2>Performance Analytics</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Average Uptime</h3>
          <p>{Math.round(cranes.reduce((acc, curr) => acc + curr.uptime, 0) / cranes.length)}%</p>
        </div>
        <div className="analytics-card">
          <h3>Average Efficiency</h3>
          <p>{Math.round(cranes.reduce((acc, curr) => acc + curr.efficiency, 0) / cranes.length)}%</p>
        </div>
        <div className="analytics-card">
          <h3>Total Alerts</h3>
          <p>{cranes.reduce((acc, curr) => acc + curr.alerts.length, 0)}</p>
        </div>
        <div className="analytics-card">
          <h3>Average Health Score</h3>
          <p>{Math.round(cranes.reduce((acc, curr) => acc + curr.healthScore, 0) / cranes.length)}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cranes-management">
      <div className="cranes-header">
        <h1>Crane Management</h1>
        <div className="header-actions">
          <button className="action-button" onClick={() => setShowAnalytics(!showAnalytics)}>
            <FaChartLine /> {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
          </button>
          <button className="action-button" onClick={handleGenerateReport}>
            <FaDownload /> Generate Report
          </button>
          <button className="action-button primary">
            <FaPlus /> Add New Crane
          </button>
        </div>
      </div>

      {renderDashboard()}
      {showAnalytics && renderAnalytics()}

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search cranes..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="status-filters">
          <FaFilter />
          <button
            className={`filter-button ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-button ${statusFilter === 'operational' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('operational')}
          >
            Operational
          </button>
          <button
            className={`filter-button ${statusFilter === 'maintenance' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('maintenance')}
          >
            Maintenance
          </button>
          <button
            className={`filter-button ${statusFilter === 'critical' ? 'active' : ''}`}
            onClick={() => handleStatusFilter('critical')}
          >
            Critical
          </button>
        </div>
      </div>

      <div className="cranes-grid">
        {filteredCranes.map(crane => (
          <div key={crane.id} className="crane-card">
            <div className="crane-header">
              <h2>{crane.name}</h2>
              <span className="status-badge" style={{ backgroundColor: getStatusColor(crane.status) }}>
                {crane.status}
              </span>
            </div>
            <div className="crane-details">
              <p><strong>Model:</strong> {crane.model}</p>
              <p><strong>Location:</strong> {crane.location}</p>
              <p><strong>Last Maintenance:</strong> {crane.lastMaintenance}</p>
              <p><strong>Next Maintenance:</strong> {crane.nextMaintenance}</p>
              <div className="metrics">
                <div className="metric">
                  <label>Uptime</label>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${crane.uptime}%` }}></div>
                  </div>
                  <span>{crane.uptime}%</span>
                </div>
                <div className="metric">
                  <label>Efficiency</label>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${crane.efficiency}%` }}></div>
                  </div>
                  <span>{crane.efficiency}%</span>
                </div>
                <div className="metric">
                  <label>Health Score</label>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ 
                        width: `${crane.healthScore}%`,
                        backgroundColor: crane.healthScore > 80 ? '#48bb78' : crane.healthScore > 50 ? '#ecc94b' : '#f56565'
                      }}
                    ></div>
                  </div>
                  <span>{crane.healthScore}%</span>
                </div>
              </div>
              {crane.alerts.length > 0 && (
                <div className="alerts">
                  <h3>Alerts</h3>
                  <ul>
                    {crane.alerts.map((alert, index) => (
                      <li key={index} className="alert-item">{alert}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="crane-actions">
              <button className="action-button" onClick={() => handleEditCrane(crane)}>
                <FaEdit /> Edit
              </button>
              <button className="action-button delete" onClick={() => handleDeleteCrane(crane.id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CraneManagement; 