import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fuelData: {
    realTimeLevels: {},
    consumption: {},
    thresholds: {
      critical: 20,
      warning: 40
    },
    prices: {
      diesel: 3.50,
      electricity: 0.12
    }
  },
  costs: {
    budget: {
      monthly: 50000,
      used: 35000,
      remaining: 15000
    },
    breakdown: {
      fuel: 15000,
      maintenance: 10000,
      labor: 8000,
      parts: 5000,
      insurance: 4000,
      certification: 2000,
      training: 1000
    }
  },
  utilization: {
    engineHours: {},
    idleTime: {},
    costPerHour: {}
  },
  alerts: {
    active: [],
    history: []
  },
  loading: false,
  error: null
};

const fuelAndCostSlice = createSlice({
  name: 'fuelAndCost',
  initialState,
  reducers: {
    updateFuelLevel: (state, action) => {
      const { craneId, level, consumption } = action.payload;
      state.fuelData.realTimeLevels[craneId] = level;
      state.fuelData.consumption[craneId] = consumption;
      
      // Check for critical levels
      if (level <= state.fuelData.thresholds.critical) {
        state.alerts.active.push({
          id: Date.now(),
          type: 'CRITICAL_FUEL',
          message: `Crane ${craneId} has critical fuel level: ${level}%`,
          timestamp: new Date().toISOString()
        });
      } else if (level <= state.fuelData.thresholds.warning) {
        state.alerts.active.push({
          id: Date.now(),
          type: 'LOW_FUEL',
          message: `Crane ${craneId} has low fuel level: ${level}%`,
          timestamp: new Date().toISOString()
        });
      }
    },
    updateEngineHours: (state, action) => {
      const { craneId, hours, idleTime } = action.payload;
      state.utilization.engineHours[craneId] = hours;
      state.utilization.idleTime[craneId] = idleTime;
      
      // Calculate cost per hour
      const totalCost = Object.values(state.costs.breakdown).reduce((a, b) => a + b, 0);
      state.utilization.costPerHour[craneId] = totalCost / hours;
    },
    updateCosts: (state, action) => {
      const { category, amount } = action.payload;
      state.costs.breakdown[category] = amount;
      state.costs.budget.used = Object.values(state.costs.breakdown).reduce((a, b) => a + b, 0);
      state.costs.budget.remaining = state.costs.budget.monthly - state.costs.budget.used;
      
      // Check for budget threshold
      if (state.costs.budget.remaining <= state.costs.budget.monthly * 0.1) {
        state.alerts.active.push({
          id: Date.now(),
          type: 'BUDGET_WARNING',
          message: 'Budget threshold reached',
          timestamp: new Date().toISOString()
        });
      }
    },
    updateFuelPrices: (state, action) => {
      const { fuelType, price } = action.payload;
      state.fuelData.prices[fuelType] = price;
    },
    acknowledgeAlert: (state, action) => {
      const alertId = action.payload.alertId;
      const alertIndex = state.alerts.active.findIndex(alert => alert.id === alertId);
      if (alertIndex !== -1) {
        const alert = state.alerts.active[alertIndex];
        state.alerts.history.push(alert);
        state.alerts.active.splice(alertIndex, 1);
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  updateFuelLevel,
  updateEngineHours,
  updateCosts,
  updateFuelPrices,
  acknowledgeAlert,
  setLoading,
  setError
} = fuelAndCostSlice.actions;

// Selectors
export const selectFuelData = state => state.fuelAndCost.fuelData;
export const selectCosts = state => state.fuelAndCost.costs;
export const selectUtilization = state => state.fuelAndCost.utilization;
export const selectAlerts = state => state.fuelAndCost.alerts;
export const selectLoading = state => state.fuelAndCost.loading;
export const selectError = state => state.fuelAndCost.error;

export default fuelAndCostSlice.reducer; 