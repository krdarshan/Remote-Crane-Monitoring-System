import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incidents: [
    {
      id: 'INC-2023-042',
      craneId: 'C-004',
      title: 'Hydraulic system pressure loss',
      description: 'Sudden drop in hydraulic pressure during operation, affecting lifting capacity',
      reportedOn: '2023-07-19',
      severity: 'Critical',
      status: 'In Progress',
      assignedTo: 'Team A'
    },
    {
      id: 'INC-2023-041',
      craneId: 'C-002',
      title: 'Control panel unresponsive',
      description: 'Control panel not responding to input commands, requiring system restart',
      reportedOn: '2023-07-18',
      severity: 'Moderate',
      status: 'Reported',
      assignedTo: 'Unassigned'
    },
    {
      id: 'INC-2023-040',
      craneId: 'C-003',
      title: 'Unusual vibration in rotation mechanism',
      description: 'Excessive vibration detected during rotation operations',
      reportedOn: '2023-07-17',
      severity: 'Minor',
      status: 'Pending Parts',
      assignedTo: 'Team B'
    }
  ],
  history: [
    {
      id: 'INC-2023-039',
      craneId: 'C-001',
      title: 'Motor overheating during extended operation',
      description: 'Motor temperature exceeding normal operating range during continuous use',
      reportedOn: '2023-07-10',
      resolvedOn: '2023-07-12',
      severity: 'Moderate',
      downtime: '8 hours'
    },
    {
      id: 'INC-2023-038',
      craneId: 'C-004',
      title: 'Load sensor calibration error',
      description: 'Inaccurate load readings from the main load sensor',
      reportedOn: '2023-07-05',
      resolvedOn: '2023-07-06',
      severity: 'Minor',
      downtime: '4 hours'
    }
  ],
  stats: {
    total: 42,
    avgResolutionTime: '12.5 hrs',
    topIssueType: 'Hydraulic',
    mostAffectedCrane: 'C-004'
  },
  loading: false,
  error: null
};

const incidentsSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    addIncident: (state, action) => {
      const incident = {
        ...action.payload,
        description: action.payload.description || 'No description provided'
      };
      state.incidents.unshift(incident);
      state.stats.total++;
    },
    updateIncidentStatus: (state, action) => {
      const { id, status } = action.payload;
      const incident = state.incidents.find(i => i.id === id);
      if (incident) {
        incident.status = status;
      }
    },
    assignIncident: (state, action) => {
      const { id, assignedTo } = action.payload;
      const incident = state.incidents.find(i => i.id === id);
      if (incident) {
        incident.assignedTo = assignedTo;
      }
    },
    resolveIncident: (state, action) => {
      const { id, resolvedOn, downtime } = action.payload;
      const incident = state.incidents.find(i => i.id === id);
      if (incident) {
        // Move to history
        state.history.unshift({
          ...incident,
          resolvedOn,
          downtime
        });
        // Remove from active incidents
        state.incidents = state.incidents.filter(i => i.id !== id);
      }
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    }
  }
});

export const {
  addIncident,
  updateIncidentStatus,
  assignIncident,
  resolveIncident,
  updateStats
} = incidentsSlice.actions;

export default incidentsSlice.reducer; 