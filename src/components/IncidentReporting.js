import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addIncident, updateIncidentStatus, assignIncident, resolveIncident } from '../store/incidentsSlice';

// Dummy data for demonstration
const DUMMY_TECHNICIANS = [
  { id: 'T001', name: 'John Doe', specialization: 'Mechanical' },
  { id: 'T002', name: 'Jane Smith', specialization: 'Electrical' },
  { id: 'T003', name: 'Mike Johnson', specialization: 'Hydraulics' },
  { id: 'T004', name: 'Sarah Wilson', specialization: 'Controls' }
];

const INCIDENT_TYPES = [
  'Mechanical Failure',
  'Electrical Issue',
  'Hydraulic System',
  'Control System',
  'Structural Problem',
  'Safety System',
  'Operational Error',
  'Other'
];

function IncidentReporting() {
  const incidents = useSelector(state => state.incidents.incidents);
  const history = useSelector(state => state.incidents.history);
  const stats = useSelector(state => state.incidents.stats);
  const dispatch = useDispatch();

  const [showNewIncidentForm, setShowNewIncidentForm] = useState(false);
  const [newIncident, setNewIncident] = useState({
    craneId: '',
    title: '',
    description: '',
    type: '',
    severity: 'Low',
    reportedBy: '',
    attachments: []
  });

  const [filters, setFilters] = useState({
    status: 'All Status',
    severity: 'All Severity',
    crane: 'All Cranes',
    dateRange: { start: '', end: '' }
  });

  const handleSubmitIncident = (e) => {
    e.preventDefault();
    const incident = {
      ...newIncident,
      id: 'INC-' + Date.now(),
      reportedOn: new Date().toISOString(),
      status: 'Open',
      assignedTo: null
    };
    dispatch(addIncident(incident));
    setShowNewIncidentForm(false);
    setNewIncident({
      craneId: '',
      title: '',
      description: '',
      type: '',
      severity: 'Low',
      reportedBy: '',
      attachments: []
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewIncident(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files.map(file => file.name)]
    }));
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return { bg: '#fff5f5', text: '#f56565' };
      case 'medium':
        return { bg: '#fffaf0', text: '#f6ad55' };
      case 'low':
        return { bg: '#f0fff4', text: '#48bb78' };
      default:
        return { bg: '#f7fafc', text: '#a0aec0' };
    }
  };

  return (
    <div className="incident-reporting">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600' }}>Incident Reporting</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn-primary"
            onClick={() => setShowNewIncidentForm(true)}
          >
            Report New Incident
          </button>
          <button className="btn-secondary">Export Reports</button>
          <button className="btn-secondary">Analytics</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#f56565', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</span>
            <h3>Total Incidents</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</div>
          <div style={{ color: 'gray', fontSize: '14px' }}>This Month</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#48bb78', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</span>
            <h3>Resolved</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{history.length}</div>
          <div style={{ color: 'green', fontSize: '14px' }}>↑ 5 this week</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#4299e1', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⏱</span>
            <h3>Avg. Resolution Time</h3>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.avgResolutionTime}</div>
          <div style={{ color: 'blue', fontSize: '14px' }}>↓ 12% improvement</div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#f6ad55', color: 'white', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📊</span>
            <h3>Most Common Issue</h3>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{stats.topIssueType}</div>
          <div style={{ color: 'orange', fontSize: '14px' }}>32% of incidents</div>
        </div>
      </div>

      {showNewIncidentForm && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>Report New Incident</h2>
          <form onSubmit={handleSubmitIncident}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Crane ID *</label>
                <input
                  type="text"
                  required
                  value={newIncident.craneId}
                  onChange={(e) => setNewIncident({ ...newIncident, craneId: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Incident Type *</label>
                <select
                  required
                  value={newIncident.type}
                  onChange={(e) => setNewIncident({ ...newIncident, type: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                >
                  <option value="">Select Type</option>
                  {INCIDENT_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Title *</label>
                <input
                  type="text"
                  required
                  value={newIncident.title}
                  onChange={(e) => setNewIncident({ ...newIncident, title: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Severity *</label>
                <select
                  required
                  value={newIncident.severity}
                  onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '8px' }}>Description *</label>
                <textarea
                  required
                  value={newIncident.description}
                  onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0', minHeight: '100px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Reported By *</label>
                <input
                  type="text"
                  required
                  value={newIncident.reportedBy}
                  onChange={(e) => setNewIncident({ ...newIncident, reportedBy: e.target.value })}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px' }}>Attachments</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowNewIncidentForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Submit Incident
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <select 
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Status</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <select 
          value={filters.severity}
          onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          <option>All Severity</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
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

        <input
          type="date"
          value={filters.dateRange.start}
          onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        />

        <button 
          onClick={() => setFilters({
            status: 'All Status',
            severity: 'All Severity',
            crane: 'All Cranes',
            dateRange: { start: '', end: '' }
          })}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
        >
          Reset Filters
        </button>
      </div>

      <div className="incidents-table" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Crane</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Severity</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Reported On</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Assigned To</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map(incident => (
              <tr key={incident.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>{incident.id}</td>
                <td style={{ padding: '12px' }}>{incident.craneId}</td>
                <td style={{ padding: '12px' }}>
                  <div>{incident.title}</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>
                    {incident.description ? incident.description.substring(0, 50) + '...' : 'No description available'}
                  </div>
                </td>
                <td style={{ padding: '12px' }}>{incident.type}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    ...getSeverityColor(incident.severity)
                  }}>
                    {incident.severity}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  {new Date(incident.reportedOn).toLocaleDateString()}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: 
                      incident.status === 'Open' ? '#fff5f5' :
                      incident.status === 'In Progress' ? '#ebf8ff' :
                      incident.status === 'Resolved' ? '#f0fff4' :
                      '#f7fafc',
                    color:
                      incident.status === 'Open' ? '#f56565' :
                      incident.status === 'In Progress' ? '#4299e1' :
                      incident.status === 'Resolved' ? '#48bb78' :
                      '#a0aec0'
                  }}>
                    {incident.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  {incident.assignedTo ? (
                    <div>{incident.assignedTo}</div>
                  ) : (
                    <select
                      onChange={(e) => dispatch(assignIncident({ id: incident.id, assignedTo: e.target.value }))}
                      style={{ padding: '4px', borderRadius: '4px', border: '1px solid #e2e8f0' }}
                    >
                      <option value="">Assign to...</option>
                      {DUMMY_TECHNICIANS.map(tech => (
                        <option key={tech.id} value={tech.name}>{tech.name}</option>
                      ))}
                    </select>
                  )}
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button title="View Details">👁</button>
                    <button 
                      title="Update Status"
                      onClick={() => {
                        const newStatus = incident.status === 'Open' ? 'In Progress' :
                                        incident.status === 'In Progress' ? 'Resolved' :
                                        'Closed';
                        dispatch(updateIncidentStatus({ id: incident.id, status: newStatus }));
                      }}
                    >
                      ⟳
                    </button>
                    {incident.status === 'Resolved' && (
                      <button 
                        title="Close Incident"
                        onClick={() => dispatch(resolveIncident(incident.id))}
                      >
                        ✓
                      </button>
                    )}
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

export default IncidentReporting; 