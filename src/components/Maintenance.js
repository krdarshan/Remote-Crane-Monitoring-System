import React, { useState } from 'react';
import { FaTools, FaCalendarAlt, FaHistory, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('scheduled');

  const maintenanceData = {
    scheduled: [
      {
        id: 1,
        craneName: 'XCMG Truck Crane',
        type: 'Routine Inspection',
        date: '2024-03-15',
        status: 'upcoming',
        description: 'Regular maintenance check and oil change',
        technician: 'John Smith'
      },
      {
        id: 2,
        craneName: 'POTAIN MDT 219',
        type: 'Major Service',
        date: '2024-02-20',
        status: 'overdue',
        description: 'Complete system inspection and parts replacement',
        technician: 'Mike Johnson'
      }
    ],
    history: [
      {
        id: 3,
        craneName: 'GROVE GRT880',
        type: 'Emergency Repair',
        date: '2024-02-01',
        status: 'completed',
        description: 'Hydraulic system repair',
        technician: 'Sarah Wilson',
        notes: 'Replaced faulty hydraulic pump'
      },
      {
        id: 4,
        craneName: 'Liebherr Crawler Crane',
        type: 'Routine Inspection',
        date: '2024-02-10',
        status: 'completed',
        description: 'Monthly maintenance check',
        technician: 'David Brown',
        notes: 'All systems functioning normally'
      }
    ]
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'upcoming':
        return { color: '#3b82f6', background: '#dbeafe' };
      case 'overdue':
        return { color: '#ef4444', background: '#fee2e2' };
      case 'completed':
        return { color: '#10b981', background: '#d1fae5' };
      default:
        return { color: '#6b7280', background: '#f3f4f6' };
    }
  };

  return (
    <div className="maintenance-container">
      <div className="maintenance-header">
        <h1>Maintenance Management</h1>
        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === 'scheduled' ? 'active' : ''}`}
            onClick={() => setActiveTab('scheduled')}
          >
            <FaCalendarAlt />
            Scheduled Maintenance
          </button>
          <button
            className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <FaHistory />
            Maintenance History
          </button>
        </div>
      </div>

      <div className="maintenance-content">
        {activeTab === 'scheduled' ? (
          <div className="maintenance-grid">
            {maintenanceData.scheduled.map(item => (
              <div key={item.id} className="maintenance-card">
                <div className="card-header">
                  <h3>{item.craneName}</h3>
                  <span 
                    className="status-badge"
                    style={getStatusStyle(item.status)}
                  >
                    {item.status === 'upcoming' ? (
                      <FaCalendarAlt />
                    ) : (
                      <FaExclamationTriangle />
                    )}
                    {item.status}
                  </span>
                </div>
                <div className="card-content">
                  <div className="info-row">
                    <span className="label">Type:</span>
                    <span>{item.type}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Date:</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Technician:</span>
                    <span>{item.technician}</span>
                  </div>
                  <div className="description">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="maintenance-grid">
            {maintenanceData.history.map(item => (
              <div key={item.id} className="maintenance-card">
                <div className="card-header">
                  <h3>{item.craneName}</h3>
                  <span 
                    className="status-badge"
                    style={getStatusStyle(item.status)}
                  >
                    <FaCheckCircle />
                    {item.status}
                  </span>
                </div>
                <div className="card-content">
                  <div className="info-row">
                    <span className="label">Type:</span>
                    <span>{item.type}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Date:</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="info-row">
                    <span className="label">Technician:</span>
                    <span>{item.technician}</span>
                  </div>
                  <div className="description">
                    <p>{item.description}</p>
                  </div>
                  <div className="notes">
                    <strong>Notes:</strong>
                    <p>{item.notes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .maintenance-container {
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .maintenance-header {
          margin-bottom: 2rem;
        }

        .maintenance-header h1 {
          color: #2c3e50;
          font-size: 1.75rem;
          margin-bottom: 1.5rem;
        }

        .tab-navigation {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          background-color: white;
          color: #64748b;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-button:hover {
          background-color: #f1f5f9;
        }

        .tab-button.active {
          background-color: #3b82f6;
          color: white;
        }

        .maintenance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .maintenance-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .card-header {
          padding: 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
        }

        .card-header h3 {
          color: #1e293b;
          font-size: 1.125rem;
          margin: 0;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .card-content {
          padding: 1.25rem;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .label {
          color: #64748b;
          font-weight: 500;
        }

        .description {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .description p {
          color: #475569;
          margin: 0;
          font-size: 0.875rem;
        }

        .notes {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }

        .notes strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }

        .notes p {
          color: #475569;
          margin: 0;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .maintenance-container {
            padding: 1rem;
          }

          .tab-navigation {
            flex-direction: column;
          }

          .maintenance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Maintenance; 