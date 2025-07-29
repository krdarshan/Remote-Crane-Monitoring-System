import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SelectCrane from './components/SelectCrane';
import Map from './components/Map';
import Alerts from './components/Alerts';
import Maintenance from './components/Maintenance';
import Security from './components/Security';
import Settings from './components/Settings';
import Login from './components/Login';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={
              <div className="app-container">
                <Sidebar />
                <main className="main-content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/select-crane" element={<SelectCrane />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/alerts" element={<Alerts />} />
                    <Route path="/maintenance" element={<Maintenance />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                  </Routes>
                </main>
              </div>
            }
          />
        </Routes>
      </div>

      <style jsx>{`
        .app {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .app-container {
          display: flex;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          min-height: 100vh;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 60px;
          }
        }
      `}</style>
    </Router>
  );
};

export default App; 