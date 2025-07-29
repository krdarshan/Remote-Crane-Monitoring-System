import React, { useState, useEffect, useCallback } from 'react';
import {
  FaExclamationTriangle,
  FaClipboardList,
  FaUserCog,
  FaCheck,
  FaArrowUp,
  FaHistory,
  FaChartLine,
  FaRobot,
  FaFile,
  FaImage,
  FaPaperclip,
  FaTrash,
  FaTimes,
  FaDownload,
  FaBrain,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTelegram,
  FaSlack,
  FaClock,
  FaWrench,
  FaInfoCircle,
  FaCheckCircle
} from 'react-icons/fa';
import './Incidents.css';

// Mock data for incidents
const mockIncidents = [
  {
    id: 'INC-001',
    title: 'Engine Failure',
    description: 'Complete engine failure during lifting operation',
    category: 'Critical Failure',
    priority: 'High',
    status: 'Open',
    reportedBy: 'John Operator',
    assignedTo: 'Sarah Engineer',
    dateReported: '2024-03-15T10:30:00',
    lastUpdated: '2024-03-15T14:45:00',
    location: {
      site: 'North Site',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      address: '123 Construction Ave'
    },
    attachments: ['engine_diagnostic.pdf', 'error_log.txt'],
    updates: [
      {
        time: '2024-03-15T10:30:00',
        user: 'John Operator',
        message: 'Initial report submitted',
        type: 'create'
      },
      {
        time: '2024-03-15T14:45:00',
        user: 'Sarah Engineer',
        message: 'Investigating engine components',
        type: 'update'
      }
    ],
    resolution: null,
    escalation: {
      level: 1,
      time: '2024-03-15T15:00:00',
      reason: 'No response within 4 hours'
    }
  },
  {
    id: 'INC-002',
    title: 'Unauthorized Access Attempt',
    description: 'Multiple failed attempts to access crane control system',
    category: 'Safety Incident',
    priority: 'High',
    status: 'In Progress',
    reportedBy: 'System',
    assignedTo: 'Security Team',
    dateReported: '2024-03-15T09:15:00',
    lastUpdated: '2024-03-15T13:20:00',
    location: {
      site: 'South Site',
      coordinates: { lat: 40.7129, lng: -74.0061 },
      address: '456 Safety Street'
    },
    attachments: ['access_log.csv', 'security_camera.mp4'],
    updates: [
      {
        time: '2024-03-15T09:15:00',
        user: 'System',
        message: 'Security alert triggered',
        type: 'create'
      },
      {
        time: '2024-03-15T13:20:00',
        user: 'Security Team',
        message: 'Investigating IP address and user credentials',
        type: 'update'
      }
    ],
    resolution: null,
    escalation: null
  }
];

const Incidents = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All Categories',
    priority: 'All Priorities',
    status: 'All Status',
    dateRange: 'all'
  });
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    safety: 0,
    maintenance: 0
  });
  const [notification, setNotification] = useState(null);

  // Update statistics
  useEffect(() => {
    const newStats = {
      total: incidents.length,
      critical: incidents.filter(i => i.category === 'Critical Failure').length,
      safety: incidents.filter(i => i.category === 'Safety Incident').length,
      maintenance: incidents.filter(i => i.category === 'Maintenance Issue').length
    };
    setStats(newStats);
  }, [incidents]);

  // Simulate real-time incident updates
  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.random();
      if (random > 0.7) {
        const newIncident = {
          id: `INC-${Math.floor(Math.random() * 1000)}`,
          title: 'New Incident Detected',
          description: 'System detected a new incident',
          category: ['Critical Failure', 'Safety Incident', 'Maintenance Issue'][Math.floor(Math.random() * 3)],
          priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
          status: 'Open',
          reportedBy: 'System',
          assignedTo: 'Unassigned',
          dateReported: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          location: {
            site: 'Site ' + Math.floor(Math.random() * 5),
            coordinates: { lat: 40.7128 + Math.random(), lng: -74.0060 + Math.random() },
            address: 'Random Location'
          },
          attachments: [],
          updates: [
            {
              time: new Date().toISOString(),
              user: 'System',
              message: 'Initial report submitted',
              type: 'create'
            }
          ],
          resolution: null,
          escalation: null
        };
        setIncidents(prev => [newIncident, ...prev]);
        setNotification(newIncident);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
    setShowModal(true);
  };

  const handleUpdateStatus = (incidentId, newStatus) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        return {
          ...incident,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
          updates: [
            ...incident.updates,
            {
              time: new Date().toISOString(),
              user: 'Current User',
              message: `Status updated to ${newStatus}`,
              type: 'update'
            }
          ]
        };
      }
      return incident;
    }));
  };

  const handleAssign = (incidentId, assignee) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        return {
          ...incident,
          assignedTo: assignee,
          lastUpdated: new Date().toISOString(),
          updates: [
            ...incident.updates,
            {
              time: new Date().toISOString(),
              user: 'Current User',
              message: `Assigned to ${assignee}`,
              type: 'update'
            }
          ]
        };
      }
      return incident;
    }));
  };

  const handleEscalate = (incidentId) => {
    setIncidents(prev => prev.map(incident => {
      if (incident.id === incidentId) {
        const currentLevel = incident.escalation?.level || 0;
        return {
          ...incident,
          escalation: {
            level: currentLevel + 1,
            time: new Date().toISOString(),
            reason: 'Manual escalation'
          },
          lastUpdated: new Date().toISOString(),
          updates: [
            ...incident.updates,
            {
              time: new Date().toISOString(),
              user: 'Current User',
              message: `Incident escalated to level ${currentLevel + 1}`,
              type: 'escalation'
            }
          ]
        };
      }
      return incident;
    }));
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Title', 'Category', 'Priority', 'Status', 'Date Reported', 'Assigned To'],
      ...incidents.map(incident => [
        incident.id,
        incident.title,
        incident.category,
        incident.priority,
        incident.status,
        incident.dateReported,
        incident.assignedTo
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incidents-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredIncidents = incidents.filter(incident => {
    if (filters.category !== 'All Categories' && incident.category !== filters.category) return false;
    if (filters.priority !== 'All Priorities' && incident.priority !== filters.priority) return false;
    if (filters.status !== 'All Status' && incident.status !== filters.status) return false;
    return true;
  });

  return (
    <div className="incidents-page">
      <div className="incidents-header">
        <div className="header-title">
          <FaClipboardList className="header-icon" />
          <h1>Incident Management</h1>
        </div>
        <div className="header-actions">
          <button className="action-button" onClick={handleExport}>
            <FaDownload /> Export Incidents
          </button>
          <button className="action-button">
            <FaChartLine /> Analytics
          </button>
        </div>
      </div>

      <div className="incidents-stats">
        <div className="stat-card total">
          <div className="stat-icon">
            <FaClipboardList />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Incidents</span>
          </div>
        </div>
        <div className="stat-card critical">
          <div className="stat-icon">
            <FaExclamationTriangle />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.critical}</span>
            <span className="stat-label">Critical Failures</span>
          </div>
        </div>
        <div className="stat-card safety">
          <div className="stat-icon">
            <FaUserCog />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.safety}</span>
            <span className="stat-label">Safety Incidents</span>
          </div>
        </div>
        <div className="stat-card maintenance">
          <div className="stat-icon">
            <FaWrench />
          </div>
          <div className="stat-info">
            <span className="stat-value">{stats.maintenance}</span>
            <span className="stat-label">Maintenance Issues</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option>All Categories</option>
            <option>Critical Failure</option>
            <option>Safety Incident</option>
            <option>Maintenance Issue</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Priority:</label>
          <select 
            value={filters.priority}
            onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          >
            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Escalated</option>
          </select>
        </div>
      </div>

      <div className="incidents-list">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className={`incident-card ${incident.priority.toLowerCase()}`}>
            <div className="incident-header">
              <div className="incident-id-category">
                <span className="incident-id">{incident.id}</span>
                <span className="incident-category">{incident.category}</span>
              </div>
              <span className={`priority-badge ${incident.priority.toLowerCase()}`}>
                {incident.priority}
              </span>
            </div>

            <div className="incident-content">
              <h2 className="incident-title">{incident.title}</h2>
              <p className="incident-description">{incident.description}</p>
              
              <div className="incident-details">
                <div className="detail-item">
                  <FaUserCog />
                  <span>Reported by: {incident.reportedBy}</span>
                </div>
                <div className="detail-item">
                  <FaUserCog />
                  <span>Assigned to: {incident.assignedTo}</span>
                </div>
                <div className="detail-item">
                  <FaMapMarkerAlt />
                  <span>{incident.location.site}</span>
                </div>
                <div className="detail-item">
                  <FaClock />
                  <span>{new Date(incident.dateReported).toLocaleString()}</span>
                </div>
              </div>

              {incident.attachments.length > 0 && (
                <div className="attachments-section">
                  <FaPaperclip className="attachment-icon" />
                  <span>{incident.attachments.length} attachments</span>
                </div>
              )}

              {incident.escalation && (
                <div className="escalation-section">
                  <FaArrowUp className="escalation-icon" />
                  <div className="escalation-content">
                    <span>Escalated to Level {incident.escalation.level}</span>
                    <span className="escalation-time">
                      {new Date(incident.escalation.time).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="incident-actions">
              <button 
                className="action-button view"
                onClick={() => handleViewDetails(incident)}
              >
                View Details
              </button>
              <button 
                className="action-button update"
                onClick={() => handleUpdateStatus(incident.id, 'In Progress')}
              >
                Update Status
              </button>
              <button 
                className="action-button escalate"
                onClick={() => handleEscalate(incident.id)}
              >
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedIncident && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Incident Details - {selectedIncident.id}</h2>
              <button className="close-button" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Basic Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Title:</span>
                    <span className="value">{selectedIncident.title}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Description:</span>
                    <span className="value">{selectedIncident.description}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Category:</span>
                    <span className="value">{selectedIncident.category}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Priority:</span>
                    <span className={`value priority-${selectedIncident.priority.toLowerCase()}`}>
                      {selectedIncident.priority}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Status:</span>
                    <span className={`value status-${selectedIncident.status.toLowerCase()}`}>
                      {selectedIncident.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Location Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="label">Site:</span>
                    <span className="value">{selectedIncident.location.site}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Address:</span>
                    <span className="value">{selectedIncident.location.address}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Coordinates:</span>
                    <span className="value">
                      {selectedIncident.location.coordinates.lat}, {selectedIncident.location.coordinates.lng}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Timeline</h3>
                <div className="timeline">
                  {selectedIncident.updates.map((update, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-icon">
                        {update.type === 'create' ? <FaClipboardList /> :
                         update.type === 'update' ? <FaCheck /> :
                         update.type === 'escalation' ? <FaArrowUp /> : null}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="timeline-user">{update.user}</span>
                          <span className="timeline-time">
                            {new Date(update.time).toLocaleString()}
                          </span>
                        </div>
                        <p className="timeline-message">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedIncident.attachments.length > 0 && (
                <div className="detail-section">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {selectedIncident.attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <FaFile className="attachment-icon" />
                        <span className="attachment-name">{attachment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="action-button"
                onClick={() => {
                  handleUpdateStatus(selectedIncident.id, 'In Progress');
                  setShowModal(false);
                }}
              >
                Update Status
              </button>
              <button 
                className="action-button assign"
                onClick={() => {
                  handleAssign(selectedIncident.id, 'New Assignee');
                  setShowModal(false);
                }}
              >
                Assign
              </button>
              <button 
                className="action-button escalate"
                onClick={() => {
                  handleEscalate(selectedIncident.id);
                  setShowModal(false);
                }}
              >
                Escalate
              </button>
              <button 
                className="action-button secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {notification && (
        <div className={`notification ${notification.priority.toLowerCase()}`}>
          <div className="notification-icon">
            {notification.priority === 'High' ? <FaExclamationTriangle /> :
             notification.priority === 'Medium' ? <FaInfoCircle /> :
             <FaCheckCircle />}
          </div>
          <div className="notification-content">
            <div className="notification-title">{notification.category}</div>
            <div className="notification-message">{notification.title}</div>
          </div>
          <button className="notification-close" onClick={() => setNotification(null)}>
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default Incidents; 