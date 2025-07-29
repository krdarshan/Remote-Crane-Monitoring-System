import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cranesReducer from './cranesSlice';
import maintenanceReducer from './maintenanceSlice';
import alertsReducer from './alertsSlice';
import incidentsReducer from './incidentsSlice';
import analyticsReducer from './analyticsSlice';
import fuelAndCostReducer from './fuelAndCostSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cranes: cranesReducer,
    maintenance: maintenanceReducer,
    alerts: alertsReducer,
    incidents: incidentsReducer,
    analytics: analyticsReducer,
    fuelAndCost: fuelAndCostReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['auth/login/fulfilled', 'auth/login/rejected'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
        // Ignore these paths in the state
        ignoredPaths: ['auth.user', 'cranes.selectedCrane']
      },
      immutableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Enable HMR for reducers in development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./authSlice', () => store.replaceReducer(authReducer));
  module.hot.accept('./cranesSlice', () => store.replaceReducer(cranesReducer));
  module.hot.accept('./maintenanceSlice', () => store.replaceReducer(maintenanceReducer));
  module.hot.accept('./alertsSlice', () => store.replaceReducer(alertsReducer));
  module.hot.accept('./incidentsSlice', () => store.replaceReducer(incidentsReducer));
  module.hot.accept('./analyticsSlice', () => store.replaceReducer(analyticsReducer));
  module.hot.accept('./fuelAndCostSlice', () => store.replaceReducer(fuelAndCostReducer));
}

export default store; 