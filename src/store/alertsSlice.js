import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [
    {
      id: 'AL-1027',
      time: '10:45 AM',
      date: 'Today',
      craneId: 'C-004',
      type: 'Load',
      severity: 'Critical',
      message: 'Load capacity exceeded 93% threshold',
      details: 'Current: 93%, Threshold: 90%',
      status: 'New'
    },
    {
      id: 'AL-1026',
      time: '09:23 AM',
      date: 'Today',
      craneId: 'C-003',
      type: 'Temperature',
      severity: 'Warning',
      message: 'Motor temperature approaching high threshold',
      details: 'Current: 82°C, Threshold: 85°C',
      status: 'Acknowledged'
    }
  ],
  stats: {
    critical: 3,
    warning: 7,
    maintenance: 4,
    info: 8
  },
  loading: false,
  error: null
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.unshift(action.payload);
      // Update stats based on severity
      state.stats[action.payload.severity.toLowerCase()]++;
    },
    updateAlertStatus: (state, action) => {
      const { id, status } = action.payload;
      const alert = state.alerts.find(a => a.id === id);
      if (alert) {
        alert.status = status;
      }
    },
    acknowledgeAlert: (state, action) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.status = 'Acknowledged';
      }
    },
    clearAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    }
  }
});

export const {
  addAlert,
  updateAlertStatus,
  acknowledgeAlert,
  clearAlert,
  updateStats
} = alertsSlice.actions;

export default alertsSlice.reducer; 