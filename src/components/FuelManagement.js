import React, { useState, useEffect } from 'react';
import { FaGasPump, FaChartLine, FaTruck, FaCalendarAlt, FaFilter, FaDollarSign } from 'react-icons/fa';
import './FuelManagement.css';

const mockFuelData = [
  {
    id: 1,
    crane: 'Crane A',
    date: '2024-03-15',
    fuelAmount: 150,
    cost: 450,
    efficiency: 85,
    operator: 'John Doe',
    location: 'Site 1',
    notes: 'Regular refueling'
  },
  {
    id: 2,
    crane: 'Crane B',
    date: '2024-03-14',
    fuelAmount: 180,
    cost: 540,
    efficiency: 82,
    operator: 'Jane Smith',
    location: 'Site 2',
    notes: 'High consumption due to heavy lifting'
  }
];

const FuelManagement = () => {
  const [fuelData, setFuelData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    crane: 'all',
    dateRange: 'all',
    efficiency: 'all'
  });
  const [stats, setStats] = useState({
    totalCost: 0,
    averageEfficiency: 0,
    totalFuel: 0
  });

  useEffect(() => {
    // Simulate loading data
    setFuelData(mockFuelData);
    calculateStats(mockFuelData);
  }, []);

  const calculateStats = (data) => {
    const totalCost = data.reduce((sum, entry) => sum + entry.cost, 0);
    const totalFuel = data.reduce((sum, entry) => sum + entry.fuelAmount, 0);
    const avgEfficiency = data.reduce((sum, entry) => sum + entry.efficiency, 0) / data.length;

    setStats({
      totalCost,
      totalFuel,
      averageEfficiency: avgEfficiency.toFixed(1)
    });
  };

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setShowModal(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredData = fuelData.filter(entry => {
    if (filters.crane !== 'all' && entry.crane !== filters.crane) return false;
    if (filters.efficiency !== 'all') {
      const efficiency = parseInt(filters.efficiency);
      if (efficiency === 90 && entry.efficiency < 90) return false;
      if (efficiency === 80 && (entry.efficiency < 80 || entry.efficiency >= 90)) return false;
      if (efficiency === 70 && entry.efficiency >= 80) return false;
    }
    return true;
  });

  return (
    <div className="fuel-management">
      <div className="fuel-header">
        <h1>Fuel Management</h1>
        <p>Track and optimize fuel consumption across your crane fleet</p>
      </div>

      <div className="fuel-stats">
        <div className="stat-card">
          <FaGasPump className="stat-icon" />
          <div className="stat-content">
            <h3>Total Fuel Cost</h3>
            <p>${stats.totalCost.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div className="stat-content">
            <h3>Average Efficiency</h3>
            <p>{stats.averageEfficiency}%</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTruck className="stat-icon" />
          <div className="stat-content">
            <h3>Total Fuel Used</h3>
            <p>{stats.totalFuel}L</p>
          </div>
        </div>
      </div>

      <div className="fuel-filters">
        <div className="filter-group">
          <FaFilter className="filter-icon" />
          <select name="crane" value={filters.crane} onChange={handleFilterChange}>
            <option value="all">All Cranes</option>
            <option value="Crane A">Crane A</option>
            <option value="Crane B">Crane B</option>
          </select>
        </div>
        <div className="filter-group">
          <FaCalendarAlt className="filter-icon" />
          <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange}>
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div className="filter-group">
          <FaChartLine className="filter-icon" />
          <select name="efficiency" value={filters.efficiency} onChange={handleFilterChange}>
            <option value="all">All Efficiency</option>
            <option value="90">90%+</option>
            <option value="80">80-89%</option>
            <option value="70">Below 80%</option>
          </select>
        </div>
      </div>

      <div className="fuel-list">
        {filteredData.map(entry => (
          <div key={entry.id} className="fuel-card">
            <div className="fuel-card-header">
              <h3>{entry.crane}</h3>
              <span className={`efficiency-badge ${entry.efficiency >= 90 ? 'high' : entry.efficiency >= 80 ? 'medium' : 'low'}`}>
                {entry.efficiency}% Efficiency
              </span>
            </div>
            <div className="fuel-details">
              <div className="detail-item">
                <FaGasPump className="detail-icon" />
                <span>{entry.fuelAmount}L</span>
              </div>
              <div className="detail-item">
                <FaDollarSign className="detail-icon" />
                <span>${entry.cost}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt className="detail-icon" />
                <span>{entry.date}</span>
              </div>
            </div>
            <div className="fuel-actions">
              <button onClick={() => handleViewDetails(entry)} className="view-btn">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedEntry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Fuel Entry Details</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Crane:</span>
                <span className="detail-value">{selectedEntry.crane}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedEntry.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Fuel Amount:</span>
                <span className="detail-value">{selectedEntry.fuelAmount}L</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cost:</span>
                <span className="detail-value">${selectedEntry.cost}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Efficiency:</span>
                <span className={`detail-value ${selectedEntry.efficiency >= 90 ? 'high' : selectedEntry.efficiency >= 80 ? 'medium' : 'low'}`}>
                  {selectedEntry.efficiency}%
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Operator:</span>
                <span className="detail-value">{selectedEntry.operator}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{selectedEntry.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Notes:</span>
                <span className="detail-value">{selectedEntry.notes}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="close-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuelManagement; 