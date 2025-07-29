import React from 'react';
import { FaBoxes, FaExclamationTriangle, FaShoppingCart, FaHistory } from 'react-icons/fa';
import './Inventory.css';

const mockInventory = [
  {
    id: 'P001',
    name: 'Hydraulic Oil',
    category: 'Fluids',
    quantity: 50,
    unit: 'L',
    minThreshold: 20,
    status: 'adequate',
    lastRestocked: '2024-03-01',
    location: 'Warehouse A'
  },
  {
    id: 'P002',
    name: 'Steel Cable',
    category: 'Parts',
    quantity: 5,
    unit: 'rolls',
    minThreshold: 3,
    status: 'low',
    lastRestocked: '2024-02-15',
    location: 'Warehouse B'
  },
  {
    id: 'P003',
    name: 'Control Panel',
    category: 'Electronics',
    quantity: 8,
    unit: 'units',
    minThreshold: 5,
    status: 'adequate',
    lastRestocked: '2024-03-10',
    location: 'Warehouse A'
  }
];

const Inventory = () => {
  return (
    <div className="inventory">
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <p>Track and manage spare parts and supplies</p>
      </div>

      <div className="inventory-stats">
        <div className="stat-card">
          <FaBoxes className="stat-icon" />
          <div className="stat-content">
            <h3>Total Items</h3>
            <p>{mockInventory.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaExclamationTriangle className="stat-icon" />
          <div className="stat-content">
            <h3>Low Stock</h3>
            <p>{mockInventory.filter(item => item.status === 'low').length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaShoppingCart className="stat-icon" />
          <div className="stat-content">
            <h3>Pending Orders</h3>
            <p>2</p>
          </div>
        </div>
        <div className="stat-card">
          <FaHistory className="stat-icon" />
          <div className="stat-content">
            <h3>Recent Activity</h3>
            <p>5</p>
          </div>
        </div>
      </div>

      <div className="inventory-actions">
        <button className="btn-primary">Add New Item</button>
        <button className="btn-secondary">Generate Report</button>
        <button className="btn-secondary">Place Order</button>
      </div>

      <div className="inventory-list">
        {mockInventory.map(item => (
          <div key={item.id} className="inventory-card">
            <div className="inventory-card-header">
              <h3>{item.name}</h3>
              <span className={`status-badge ${item.status}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
            <div className="inventory-details">
              <div className="detail-row">
                <span className="detail-label">ID:</span>
                <span className="detail-value">{item.id}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Category:</span>
                <span className="detail-value">{item.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Quantity:</span>
                <span className="detail-value">
                  {item.quantity} {item.unit}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Min Threshold:</span>
                <span className="detail-value">
                  {item.minThreshold} {item.unit}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{item.location}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Restocked:</span>
                <span className="detail-value">{item.lastRestocked}</span>
              </div>
            </div>
            <div className="inventory-card-actions">
              <button className="btn-primary">Update Stock</button>
              <button className="btn-secondary">View History</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory; 