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
  FaBrain
} from 'react-icons/fa';
import './IncidentManagement.css';

// Mock data for incidents
const mockIncidents = [
  {
    id: 'INC-1001',
    title: 'Load Cell Malfunction',
    description: 'Main hoist load cell showing erratic readings',
    crane: 'C-001',
    severity: 'High',
    status: 'Open',
    reportedBy: 'John Operator',
    assignedTo: 'Sarah Engineer',
    dateReported: '2024-03-15T10:30:00',
    lastUpdated: '2024-03-15T14:45:00',
    attachments: ['load_cell_reading.pdf', 'sensor_data.csv'],
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
        message: 'Investigating load cell calibration',
        type: 'update'
      }
    ]
  },
  {
    id: 'INC-1002',
    title: 'Hydraulic System Pressure Drop',
    description: 'Sudden pressure drop in main hydraulic system',
    crane: 'C-002',
    severity: 'Critical',
    status: 'In Progress',
    reportedBy: 'Mike Technician',
    assignedTo: 'David Mechanic',
    dateReported: '2024-03-15T09:15:00',
    lastUpdated: '2024-03-15T13:20:00',
    attachments: ['pressure_log.xlsx'],
    updates: [
      {
        time: '2024-03-15T09:15:00',
        user: 'Mike Technician',
        message: 'Critical pressure drop detected',
        type: 'create'
      },
      {
        time: '2024-03-15T13:20:00',
        user: 'David Mechanic',
        message: 'Identified leak in hydraulic line, replacement parts ordered',
        type: 'update'
      }
    ]
  },
  {
    id: 'INC-1003',
    title: 'Control System Failure',
    description: 'Complete failure of crane control system',
    crane: 'C-003',
    severity: 'Critical',
    status: 'Open',
    reportedBy: 'Alex Operator',
    assignedTo: 'Emma Engineer',
    dateReported: '2024-03-15T15:00:00',
    lastUpdated: '2024-03-15T15:00:00',
    attachments: ['error_log.txt', 'diagnostic_report.pdf'],
    updates: [
      {
        time: '2024-03-15T15:00:00',
        user: 'Alex Operator',
        message: 'Control system completely unresponsive',
        type: 'create'
      }
    ]
  }
];

// Mock data for AI predictions
const mockPredictions = [
  {
    id: 'PRED-001',
    crane: 'C-001',
    component: 'Load Cell',
    probability: 85,
    timeframe: '7 days',
    recommendation: 'Schedule calibration and sensitivity testing',
    impact: 'High',
    supportingData: {
      historicalFailures: 3,
      recentAnomalies: 5,
      trendDirection: 'increasing'
    }
  },
  {
    id: 'PRED-002',
    crane: 'C-002',
    component: 'Hydraulic System',
    probability: 92,
    timeframe: '3 days',
    recommendation: 'Immediate inspection of seals and pressure testing',
    impact: 'Critical',
    supportingData: {
      historicalFailures: 2,
      recentAnomalies: 7,
      trendDirection: 'rapidly increasing'
    }
  }
];

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [predictions, setPredictions] = useState(mockPredictions);
  const [showNewIncidentModal, setShowNewIncidentModal] = useState(false);
  const [showPredictiveModal, setShowPredictiveModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filters, setFilters] = useState({
    status: 'All',
    severity: 'All',
    crane: 'All',
    dateRange: 'all'
  });
  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    crane: '',
    severity: 'Medium',
    attachments: []
  });
  const [notification, setNotification] = useState(null);

  // Initialize data on component mount
  useEffect(() => {
    // Simulate loading data
    setIncidents(mockIncidents);
    setPredictions(mockPredictions);
  }, []);

  // Show notification with auto-dismiss
  const showNotification = useCallback((message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  // Handle file upload
  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map(file => file.name);
    setNewIncident(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newFiles]
    }));
  };

  // Submit new incident
  const handleSubmitIncident = () => {
    const incident = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      ...newIncident,
      status: 'Open',
      reportedBy: 'Current User',
      dateReported: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      updates: [{
        time: new Date().toISOString(),
        user: 'Current User',
        message: 'Initial report submitted',
        type: 'create'
      }]
    };

    setIncidents(prev => [incident, ...prev]);
    setShowNewIncidentModal(false);
    setNewIncident({
      title: '',
      description: '',
      crane: '',
      severity: 'Medium',
      attachments: []
    });
    showNotification('Incident reported successfully', 'success');

    // Auto-escalate critical incidents
    if (incident.severity === 'Critical') {
      handleEscalateIncident(incident.id);
    }
  };

  // Update incident status
  const handleUpdateStatus = (incidentId, newStatus) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          status: newStatus,
          lastUpdated: new Date().toISOString(),
          updates: [...inc.updates, {
            time: new Date().toISOString(),
            user: 'Current User',
            message: `Status updated to ${newStatus}`,
            type: 'status'
          }]
        };
      }
      return inc;
    }));
    showNotification(`Incident status updated to ${newStatus}`, 'success');
  };

  // Escalate incident
  const handleEscalateIncident = (incidentId) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId) {
        return {
          ...inc,
          severity: 'Critical',
          lastUpdated: new Date().toISOString(),
          updates: [...inc.updates, {
            time: new Date().toISOString(),
            user: 'System',
            message: 'Incident escalated to Critical - Management notified',
            type: 'escalation'
          }]
        };
      }
      return inc;
    }));
    showNotification('Incident escalated to management', 'warning');
  };

  // Generate incident report
  const handleGenerateReport = () => {
    const reportData = {
      incidents: incidents,
      predictions: predictions,
      generatedAt: new Date().toISOString(),
      summary: {
        total: incidents.length,
        open: incidents.filter(inc => inc.status === 'Open').length,
        critical: incidents.filter(inc => inc.severity === 'Critical').length
      }
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `incident-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    showNotification('Report generated successfully', 'success');
  };

  // Filter incidents
  const filteredIncidents = incidents.filter(incident => {
    if (filters.status !== 'All' && incident.status !== filters.status) return false;
    if (filters.severity !== 'All' && incident.severity !== filters.severity) return false;
    if (filters.crane !== 'All' && incident.crane !== filters.crane) return false;
    return true;
  });

  // Update predictions periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        probability: Math.min(100, pred.probability + (Math.random() * 5 - 2)),
        timeframe: pred.probability > 95 ? '24 hours' : pred.timeframe
      })));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="incident-management">
      {notification && (
        <div className={`notification ${notification.type}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)}><FaTimes /></button>
        </div>
      )}

      <div className="header">
        <div className="title">
          <FaClipboardList className="icon" />
          <h1>Incident Management</h1>
        </div>
        <div className="actions">
          <button className="primary" onClick={() => setShowNewIncidentModal(true)}>
            <FaExclamationTriangle /> Report Incident
          </button>
          <button onClick={() => setShowPredictiveModal(true)}>
            <FaBrain /> View Predictions
          </button>
          <button onClick={handleGenerateReport}>
            <FaDownload /> Generate Report
          </button>
        </div>
      </div>

      <div className="filters">
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <select
          value={filters.severity}
          onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <select
          value={filters.crane}
          onChange={(e) => setFilters(prev => ({ ...prev, crane: e.target.value }))}
        >
          <option>All</option>
          <option>C-001</option>
          <option>C-002</option>
          <option>C-003</option>
        </select>
      </div>

      <div className="incidents-list">
        {filteredIncidents.map(incident => (
          <div key={incident.id} className={`incident-card ${incident.severity.toLowerCase()}`}>
            <div className="incident-header">
              <h3>{incident.title}</h3>
              <span className={`status ${incident.status.toLowerCase().replace(' ', '-')}`}>
                {incident.status}
              </span>
            </div>
            <div className="incident-details">
              <p><strong>ID:</strong> {incident.id}</p>
              <p><strong>Crane:</strong> {incident.crane}</p>
              <p><strong>Reported:</strong> {new Date(incident.dateReported).toLocaleString()}</p>
              <p><strong>Assigned:</strong> {incident.assignedTo || 'Unassigned'}</p>
            </div>
            <div className="incident-description">
              {incident.description}
            </div>
            {incident.attachments.length > 0 && (
              <div className="attachments">
                {incident.attachments.map(file => (
                  <span key={file} className="attachment">
                    <FaPaperclip /> {file}
                  </span>
                ))}
              </div>
            )}
            <div className="incident-actions">
              <button onClick={() => setSelectedIncident(incident)}>
                View Details
              </button>
              <button 
                onClick={() => handleUpdateStatus(incident.id, 'In Progress')}
                disabled={incident.status === 'Closed'}
              >
                Update Status
              </button>
              <button 
                onClick={() => handleEscalateIncident(incident.id)}
                disabled={incident.severity === 'Critical'}
              >
                Escalate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Incident Modal */}
      {showNewIncidentModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Report New Incident</h2>
              <button onClick={() => setShowNewIncidentModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newIncident.title}
                  onChange={(e) => setNewIncident(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief incident title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newIncident.description}
                  onChange={(e) => setNewIncident(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed incident description"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Crane</label>
                  <select
                    value={newIncident.crane}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, crane: e.target.value }))}
                  >
                    <option value="">Select Crane</option>
                    <option>C-001</option>
                    <option>C-002</option>
                    <option>C-003</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Severity</label>
                  <select
                    value={newIncident.severity}
                    onChange={(e) => setNewIncident(prev => ({ ...prev, severity: e.target.value }))}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Attachments</label>
                <div className="file-upload">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <div className="file-list">
                    {newIncident.attachments.map(file => (
                      <div key={file} className="file-item">
                        <FaFile /> {file}
                        <button onClick={() => setNewIncident(prev => ({
                          ...prev,
                          attachments: prev.attachments.filter(f => f !== file)
                        }))}>
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="secondary" onClick={() => setShowNewIncidentModal(false)}>
                Cancel
              </button>
              <button
                className="primary"
                onClick={handleSubmitIncident}
                disabled={!newIncident.title || !newIncident.description || !newIncident.crane}
              >
                Submit Incident
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Predictive Analysis Modal */}
      {showPredictiveModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Predictive Analysis</h2>
              <button onClick={() => setShowPredictiveModal(false)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="predictions-list">
                {predictions.map(prediction => (
                  <div key={prediction.id} className={`prediction-card ${prediction.impact.toLowerCase()}`}>
                    <div className="prediction-header">
                      <h3>{prediction.component} - {prediction.crane}</h3>
                      <div className="probability">
                        <div className="probability-bar">
                          <div
                            className="probability-fill"
                            style={{ width: `${prediction.probability}%` }}
                          />
                        </div>
                        <span>{prediction.probability}% Failure Probability</span>
                      </div>
                    </div>
                    <div className="prediction-details">
                      <p><strong>Timeframe:</strong> {prediction.timeframe}</p>
                      <p><strong>Impact:</strong> {prediction.impact}</p>
                      <p><strong>Recommendation:</strong> {prediction.recommendation}</p>
                    </div>
                    <div className="supporting-data">
                      <h4>Supporting Data</h4>
                      <ul>
                        <li>Historical Failures: {prediction.supportingData.historicalFailures}</li>
                        <li>Recent Anomalies: {prediction.supportingData.recentAnomalies}</li>
                        <li>Trend: {prediction.supportingData.trendDirection}</li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Incident Details - {selectedIncident.id}</h2>
              <button onClick={() => setSelectedIncident(null)}><FaTimes /></button>
            </div>
            <div className="modal-body">
              <div className="incident-full-details">
                <div className="detail-section">
                  <h3>Basic Information</h3>
                  <p><strong>Title:</strong> {selectedIncident.title}</p>
                  <p><strong>Description:</strong> {selectedIncident.description}</p>
                  <p><strong>Crane:</strong> {selectedIncident.crane}</p>
                  <p><strong>Severity:</strong> {selectedIncident.severity}</p>
                  <p><strong>Status:</strong> {selectedIncident.status}</p>
                </div>
                <div className="detail-section">
                  <h3>Assignment</h3>
                  <p><strong>Reported By:</strong> {selectedIncident.reportedBy}</p>
                  <p><strong>Assigned To:</strong> {selectedIncident.assignedTo || 'Unassigned'}</p>
                  <p><strong>Date Reported:</strong> {new Date(selectedIncident.dateReported).toLocaleString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(selectedIncident.lastUpdated).toLocaleString()}</p>
                </div>
                <div className="detail-section">
                  <h3>Attachments</h3>
                  <div className="attachments-list">
                    {selectedIncident.attachments.map(file => (
                      <div key={file} className="attachment-item">
                        <FaFile /> {file}
                        <button className="download-button">
                          <FaDownload />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="detail-section">
                  <h3>Updates Timeline</h3>
                  <div className="updates-timeline">
                    {selectedIncident.updates.map((update, index) => (
                      <div key={index} className={`timeline-item ${update.type}`}>
                        <div className="timeline-icon">
                          {update.type === 'create' && <FaExclamationTriangle />}
                          {update.type === 'update' && <FaUserCog />}
                          {update.type === 'status' && <FaCheck />}
                          {update.type === 'escalation' && <FaArrowUp />}
                        </div>
                        <div className="timeline-content">
                          <p className="update-message">{update.message}</p>
                          <p className="update-meta">
                            <span>{update.user}</span>
                            <span>{new Date(update.time).toLocaleString()}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <select
                value={selectedIncident.status}
                onChange={(e) => handleUpdateStatus(selectedIncident.id, e.target.value)}
                disabled={selectedIncident.status === 'Closed'}
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
              </select>
              <button
                className="escalate"
                onClick={() => handleEscalateIncident(selectedIncident.id)}
                disabled={selectedIncident.severity === 'Critical'}
              >
                Escalate to Critical
              </button>
              <button onClick={() => setSelectedIncident(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentManagement; 