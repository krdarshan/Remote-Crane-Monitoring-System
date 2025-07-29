import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    performance: {
      daily: [],
      weekly: [],
      monthly: []
    },
    efficiency: {
      daily: [],
      weekly: [],
      monthly: []
    },
    maintenance: {
      scheduled: [],
      completed: [],
      pending: []
    },
    costs: {
      fuel: [],
      maintenance: [],
      operation: []
    }
  },
  status: 'idle',
  error: null
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action) => {
      state.data = action.payload;
    },
    updatePerformanceData: (state, action) => {
      state.data.performance = {
        ...state.data.performance,
        ...action.payload
      };
    },
    updateEfficiencyData: (state, action) => {
      state.data.efficiency = {
        ...state.data.efficiency,
        ...action.payload
      };
    },
    updateMaintenanceData: (state, action) => {
      state.data.maintenance = {
        ...state.data.maintenance,
        ...action.payload
      };
    },
    updateCostsData: (state, action) => {
      state.data.costs = {
        ...state.data.costs,
        ...action.payload
      };
    }
  }
});

export const {
  setAnalyticsData,
  updatePerformanceData,
  updateEfficiencyData,
  updateMaintenanceData,
  updateCostsData
} = analyticsSlice.actions;

export const selectAnalyticsData = (state) => state.analytics.data;
export const selectPerformanceData = (state) => state.analytics.data.performance;
export const selectEfficiencyData = (state) => state.analytics.data.efficiency;
export const selectMaintenanceData = (state) => state.analytics.data.maintenance;
export const selectCostsData = (state) => state.analytics.data.costs;

export default analyticsSlice.reducer; 