import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaChartBar,
  FaBell,
  FaExclamationTriangle,
  FaTruck,
  FaBoxes,
  FaFileAlt,
  FaUsers,
  FaShieldAlt,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaMapMarkedAlt
} from 'react-icons/fa';
import './Sidebar.css';

const menuItems = [
  { path: '/select-crane', icon: <FaTruck />, label: 'Select Crane' },
  { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
  { path: '/map', icon: <FaMapMarkedAlt />, label: 'Map View' },
  { path: '/alerts', icon: <FaExclamationTriangle />, label: 'Alerts' },
  { path: '/incidents', icon: <FaTruck />, label: 'Incidents' },
  { path: '/equipment', icon: <FaTruck />, label: 'Equipment' },
  { path: '/inventory', icon: <FaBoxes />, label: 'Inventory' },
  { path: '/reports', icon: <FaFileAlt />, label: 'Reports' },
  { path: '/team', icon: <FaUsers />, label: 'Team' },
  { path: '/security', icon: <FaShieldAlt />, label: 'Security' },
  { path: '/settings', icon: <FaCog />, label: 'Settings' }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Crane Manager</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/profile" className="nav-item">
          <span className="nav-icon"><FaUser /></span>
          <span className="nav-label">Profile</span>
        </Link>
        <Link to="/logout" className="nav-item logout">
          <span className="nav-icon"><FaSignOutAlt /></span>
          <span className="nav-label">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 