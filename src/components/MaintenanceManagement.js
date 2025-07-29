import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask } from '../store/maintenanceSlice';
import './MaintenanceManagement.css';

const MaintenanceManagement = () => {
  const tasks = useSelector(state => state.maintenance.tasks);
  const stats = useSelector(state => state.maintenance.stats);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    status: 'All Status',
    crane: 'All Cranes',
    technician: 'All Technicians',
    type: 'All Types',
    dateRange: { start: '', end: '' }
  });

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to remove this task?')) {
      dispatch(removeTask(taskId));
    }
  };

  return (
    <div className="maintenance-management">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Maintenance Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary">Schedule New</button>
          <button className="btn-primary">Assign Technician</button>
          <button className="btn-secondary">Work Orders</button>
          <button className="btn-secondary">Import/Export</button>
          <button className="btn-secondary">Generate Report</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#48bb78', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
            <h3>Completed Tasks</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.completed}</div>
          <div style={{ color: 'green', fontSize: '14px' }}>↑ 3 since last week</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#f6ad55', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🕒</span>
            <h3>Upcoming Tasks</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.upcoming}</div>
          <div style={{ color: 'gray', fontSize: '14px' }}>No change</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#f56565', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</span>
            <h3>Overdue Tasks</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.overdue}</div>
          <div style={{ color: 'red', fontSize: '14px' }}>↑ 1 since last week</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#4299e1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>%</span>
            <h3>Compliance Rate</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.complianceRate}</div>
          <div style={{ color: 'green', fontSize: '14px' }}>↑ 2% increase</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <select 
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Status</option>
          <option>Scheduled</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Overdue</option>
        </select>

        <select 
          value={filters.crane}
          onChange={(e) => setFilters({ ...filters, crane: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Cranes</option>
          <option>C-001</option>
          <option>C-002</option>
          <option>C-003</option>
          <option>C-004</option>
        </select>

        <select 
          value={filters.technician}
          onChange={(e) => setFilters({ ...filters, technician: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Technicians</option>
          <option>John Doe</option>
          <option>Mike Jones</option>
          <option>Jane Smith</option>
        </select>

        <select 
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Types</option>
          <option>Inspection</option>
          <option>Repair</option>
          <option>Maintenance</option>
        </select>

        <input
          type="date"
          value={filters.dateRange.start}
          onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        />

        <button 
          onClick={() => setFilters({
            status: 'All Status',
            crane: 'All Cranes',
            technician: 'All Technicians',
            type: 'All Types',
            dateRange: { start: '', end: '' }
          })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          Reset Filters
        </button>
      </div>

      <div className="maintenance-table" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>
                <input type="checkbox" />
              </th>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Crane</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Task</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Assigned To</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Due Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>
                  <input type="checkbox" />
                </td>
                <td style={{ padding: '12px' }}>{task.id}</td>
                <td style={{ padding: '12px' }}>{task.craneId}</td>
                <td style={{ padding: '12px' }}>
                  <div>{task.task}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{task.description}</div>
                </td>
                <td style={{ padding: '12px' }}>{task.type}</td>
                <td style={{ padding: '12px' }}>{task.assignedTo}</td>
                <td style={{ padding: '12px' }}>{task.dueDate}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 
                      task.status === 'Completed' ? '#f0fff4' :
                      task.status === 'In Progress' ? '#ebf8ff' :
                      task.status === 'Overdue' ? '#fff5f5' :
                      '#f7fafc',
                    color:
                      task.status === 'Completed' ? '#48bb78' :
                      task.status === 'In Progress' ? '#4299e1' :
                      task.status === 'Overdue' ? '#f56565' :
                      '#a0aec0'
                  }}>
                    {task.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button title="View Details">👁</button>
                    <button title="Edit">✏️</button>
                    <button title="Complete">✓</button>
                    <button title="Delete" onClick={() => handleDelete(task.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MaintenanceManagement; 