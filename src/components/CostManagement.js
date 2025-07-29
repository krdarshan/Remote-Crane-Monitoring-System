import React, { useState, useEffect } from 'react';
import { 
  FaDollarSign, 
  FaChartPie, 
  FaTruck, 
  FaTools, 
  FaUserTie, 
  FaFileAlt, 
  FaGasPump, 
  FaCalendarAlt 
} from 'react-icons/fa';
import './CostManagement.css';

const mockCostData = [
  {
    id: 1,
    category: 'Fuel',
    amount: 4500,
    date: '2024-03-15',
    crane: 'Crane A',
    description: 'Monthly fuel expenses',
    status: 'paid'
  },
  {
    id: 2,
    category: 'Maintenance',
    amount: 2500,
    date: '2024-03-14',
    crane: 'Crane B',
    description: 'Regular maintenance check',
    status: 'pending'
  },
  {
    id: 3,
    category: 'Labor',
    amount: 3500,
    date: '2024-03-13',
    crane: 'All',
    description: 'Operator salaries',
    status: 'paid'
  },
  {
    id: 4,
    category: 'Insurance',
    amount: 1800,
    date: '2024-03-12',
    crane: 'All',
    description: 'Monthly insurance premium',
    status: 'pending'
  }
];

const CostManagement = () => {
  const [costData, setCostData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    dateRange: 'all'
  });
  const [stats, setStats] = useState({
    totalCost: 0,
    averageCost: 0,
    pendingAmount: 0
  });

  useEffect(() => {
    // Simulate loading data
    setCostData(mockCostData);
    calculateStats(mockCostData);
  }, []);

  const calculateStats = (data) => {
    const totalCost = data.reduce((sum, entry) => sum + entry.amount, 0);
    const pendingAmount = data
      .filter(entry => entry.status === 'pending')
      .reduce((sum, entry) => sum + entry.amount, 0);
    const averageCost = totalCost / data.length;

    setStats({
      totalCost,
      averageCost: averageCost.toFixed(2),
      pendingAmount
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

  const filteredData = costData.filter(entry => {
    if (filters.category !== 'all' && entry.category !== filters.category) return false;
    if (filters.status !== 'all' && entry.status !== filters.status) return false;
    return true;
  });

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'fuel':
        return <FaGasPump />;
      case 'maintenance':
        return <FaTools />;
      case 'labor':
        return <FaUserTie />;
      case 'insurance':
        return <FaFileAlt />;
      default:
        return <FaDollarSign />;
    }
  };

  return (
    <div className="cost-management">
      <div className="cost-header">
        <h1>Cost Management</h1>
        <p>Track and analyze costs across your crane fleet</p>
      </div>

      <div className="cost-stats">
        <div className="stat-card">
          <FaDollarSign className="stat-icon" />
          <div className="stat-content">
            <h3>Total Costs</h3>
            <p>${stats.totalCost.toLocaleString()}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaChartPie className="stat-icon" />
          <div className="stat-content">
            <h3>Average Cost</h3>
            <p>${stats.averageCost}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTruck className="stat-icon" />
          <div className="stat-content">
            <h3>Pending Amount</h3>
            <p>${stats.pendingAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="cost-filters">
        <div className="filter-group">
          <FaChartPie className="filter-icon" />
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="all">All Categories</option>
            <option value="Fuel">Fuel</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Labor">Labor</option>
            <option value="Insurance">Insurance</option>
          </select>
        </div>
        <div className="filter-group">
          <FaDollarSign className="filter-icon" />
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="cost-list">
        {filteredData.map(entry => (
          <div key={entry.id} className="cost-card">
            <div className="cost-card-header">
              <div className="category-info">
                {getCategoryIcon(entry.category)}
                <h3>{entry.category}</h3>
              </div>
              <span className={`status-badge ${entry.status}`}>
                {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
              </span>
            </div>
            <div className="cost-details">
              <div className="detail-item">
                <FaDollarSign className="detail-icon" />
                <span>${entry.amount.toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <FaTruck className="detail-icon" />
                <span>{entry.crane}</span>
              </div>
              <div className="detail-item">
                <FaCalendarAlt className="detail-icon" />
                <span>{entry.date}</span>
              </div>
            </div>
            <div className="cost-actions">
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
              <h2>Cost Entry Details</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">&times;</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">
                  {getCategoryIcon(selectedEntry.category)}
                  {selectedEntry.category}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">${selectedEntry.amount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{selectedEntry.date}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Crane:</span>
                <span className="detail-value">{selectedEntry.crane}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`detail-value ${selectedEntry.status}`}>
                  {selectedEntry.status.charAt(0).toUpperCase() + selectedEntry.status.slice(1)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{selectedEntry.description}</span>
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

export default CostManagement; 