import React, { useState } from 'react';
import { FaTools, FaCalendarAlt, FaExclamationTriangle, FaCheck } from 'react-icons/fa';
import './MaintenanceSchedule.css';

const mockMaintenanceData = [
  {
    id: 1,
    name: 'ACE Mobile Crane',
    lastMaintenance: '2024-03-15',
    status: 'operational',
    scheduledTasks: [
      { id: 1, task: 'Oil Change', priority: 'Medium', dueDate: '2024-04-15' },
      { id: 2, task: 'Safety Inspection', priority: 'High', dueDate: '2024-04-01' }
    ]
  },
  {
    id: 2,
    name: 'Tower Construction Crane',
    lastMaintenance: '2024-02-28',
    status: 'maintenance',
    scheduledTasks: [
      { id: 3, task: 'Cable Inspection', priority: 'High', dueDate: '2024-03-15' },
      { id: 4, task: 'Brake System Check', priority: 'High', dueDate: '2024-03-10' }
    ]
  },
  {
    id: 3,
    name: 'Crawler Crane',
    lastMaintenance: '2024-03-01',
    status: 'critical',
    scheduledTasks: [
      { id: 5, task: 'Hydraulic System', priority: 'High', dueDate: '2024-03-05' },
      { id: 6, task: 'Engine Maintenance', priority: 'High', dueDate: '2024-03-05' },
      { id: 7, task: 'Braking System', priority: 'High', dueDate: '2024-03-05' }
    ]
  }
];

const MaintenanceSchedule = () => {
  const [cranes, setCranes] = useState(mockMaintenanceData);
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#48bb78';
      case 'maintenance': return '#ecc94b';
      case 'critical': return '#f56565';
      default: return '#718096';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return '#f56565';
      case 'medium': return '#ecc94b';
      case 'low': return '#48bb78';
      default: return '#718096';
    }
  };

  const filteredCranes = cranes.filter(crane => 
    filter === 'all' ? true : crane.status === filter
  );

  return (
    <div className="maintenance-schedule">
      <div className="maintenance-header">
        <h1>
          <FaTools className="header-icon" />
          Maintenance Schedule
        </h1>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'operational' ? 'active' : ''}`}
            onClick={() => setFilter('operational')}
          >
            Operational
          </button>
          <button
            className={`filter-btn ${filter === 'maintenance' ? 'active' : ''}`}
            onClick={() => setFilter('maintenance')}
          >
            Maintenance
          </button>
          <button
            className={`filter-btn ${filter === 'critical' ? 'active' : ''}`}
            onClick={() => setFilter('critical')}
          >
            Critical
          </button>
        </div>
      </div>

      <div className="maintenance-grid">
        {filteredCranes.map(crane => (
          <div key={crane.id} className="maintenance-card">
            <div className="card-header">
              <h2>{crane.name}</h2>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(crane.status) }}
              >
                {crane.status}
              </span>
            </div>

            <div className="card-content">
              <div className="maintenance-info">
                <div className="info-item">
                  <FaCalendarAlt className="info-icon" />
                  <div>
                    <label>Last Maintenance</label>
                    <span>{crane.lastMaintenance}</span>
                  </div>
                </div>
              </div>

              <div className="scheduled-tasks">
                <h3>
                  <FaTools className="section-icon" />
                  Scheduled Tasks
                </h3>
                <div className="tasks-list">
                  {crane.scheduledTasks.map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-header">
                        <span className="task-name">{task.task}</span>
                        <span 
                          className="priority-badge"
                          style={{ backgroundColor: getPriorityColor(task.priority) }}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="task-due-date">
                        <FaCalendarAlt className="due-date-icon" />
                        Due: {task.dueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-actions">
              <button className="action-btn complete">
                <FaCheck /> Mark Complete
              </button>
              <button className="action-btn reschedule">
                <FaCalendarAlt /> Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaintenanceSchedule; 