import React from 'react';
import { FaFileAlt, FaDownload, FaChartBar, FaCalendarAlt } from 'react-icons/fa';
import './Reports.css';

const mockReports = [
  {
    id: 'R001',
    title: 'Monthly Equipment Performance',
    type: 'Performance',
    date: '2024-03-01',
    status: 'completed',
    size: '2.5 MB'
  },
  {
    id: 'R002',
    title: 'Maintenance Cost Analysis',
    type: 'Financial',
    date: '2024-03-05',
    status: 'pending',
    size: '1.8 MB'
  },
  {
    id: 'R003',
    title: 'Inventory Status Report',
    type: 'Inventory',
    date: '2024-03-10',
    status: 'completed',
    size: '3.1 MB'
  }
];

const Reports = () => {
  return (
    <div className="reports">
      <div className="reports-header">
        <h1>Reports Dashboard</h1>
        <p>Generate and manage system reports</p>
      </div>

      <div className="reports-actions">
        <button className="btn-primary">
          <FaFileAlt className="btn-icon" />
          Generate New Report
        </button>
        <button className="btn-secondary">
          <FaChartBar className="btn-icon" />
          Custom Analytics
        </button>
        <button className="btn-secondary">
          <FaCalendarAlt className="btn-icon" />
          Schedule Report
        </button>
      </div>

      <div className="reports-filters">
        <select className="filter-select">
          <option value="">All Types</option>
          <option value="performance">Performance</option>
          <option value="financial">Financial</option>
          <option value="inventory">Inventory</option>
        </select>
        <select className="filter-select">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
        <input
          type="date"
          className="filter-date"
          placeholder="Select Date"
        />
      </div>

      <div className="reports-list">
        {mockReports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-icon">
              <FaFileAlt />
            </div>
            <div className="report-content">
              <div className="report-header">
                <h3>{report.title}</h3>
                <span className={`status-badge ${report.status}`}>
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
              <div className="report-details">
                <div className="detail-row">
                  <span className="detail-label">Report ID:</span>
                  <span className="detail-value">{report.id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{report.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Generated:</span>
                  <span className="detail-value">{report.date}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Size:</span>
                  <span className="detail-value">{report.size}</span>
                </div>
              </div>
              <div className="report-actions">
                <button className="btn-primary">
                  <FaDownload className="btn-icon" />
                  Download
                </button>
                <button className="btn-secondary">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports; 