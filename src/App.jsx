import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/authSlice';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CraneSelection from './components/CraneSelection';
import CranesManagement from './components/CranesManagement';
import MaintenanceSchedule from './components/MaintenanceSchedule';
import Alerts from './components/Alerts';
import Incidents from './components/Incidents';
import Analytics from './components/Analytics';
import CostAndFuel from './components/CostAndFuel';
import Settings from './components/Settings';
import EquipmentHealth from './components/EquipmentHealth';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import Maintenance from './components/Maintenance';
import FuelManagement from './components/FuelManagement';
import CostManagement from './components/CostManagement';
import Profile from './components/Profile';
import './App.css';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <main className="main-content">
      {children}
    </main>
  </div>
);

const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/select-crane" /> : <Login />
        } />
        
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              <Navigate to="/select-crane" />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/select-crane" element={
          <PrivateRoute>
            <Layout>
              <CraneSelection />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cranes-management" element={
          <PrivateRoute>
            <Layout>
              <CranesManagement />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/map-view" element={
          <PrivateRoute>
            <Layout>
              <MapView />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/maintenance" element={
          <PrivateRoute>
            <Layout>
              <Maintenance />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/alerts" element={
          <PrivateRoute>
            <Layout>
              <Alerts />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/incidents" element={
          <PrivateRoute>
            <Layout>
              <Incidents />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/analytics" element={
          <PrivateRoute>
            <Layout>
              <Analytics />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cost-fuel" element={
          <PrivateRoute>
            <Layout>
              <CostAndFuel />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/settings" element={
          <PrivateRoute>
            <Layout>
              <Settings />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/equipment-health/:craneId" element={
          <PrivateRoute>
            <Layout>
              <EquipmentHealth />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/fuel-management" element={
          <PrivateRoute>
            <Layout>
              <FuelManagement />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/cost-management" element={
          <PrivateRoute>
            <Layout>
              <CostManagement />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Layout>
              <Profile />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="*" element={<Navigate to="/select-crane" />} />
      </Routes>
    </Router>
  );
};

export default App; 