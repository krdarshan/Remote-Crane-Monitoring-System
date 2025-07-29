import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <h1>🔒 Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <div className="unauthorized-actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            Go Back
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn-dashboard">
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 