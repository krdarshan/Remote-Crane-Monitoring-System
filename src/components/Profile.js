import React from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaTools,
  FaClock,
  FaHistory,
  FaCalendarAlt,
  FaEdit
} from 'react-icons/fa';
import './Profile.css';

const mockUserData = {
  name: 'John Smith',
  role: 'Senior Technician',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  employeeId: 'EMP001',
  department: 'Maintenance',
  joinDate: '2020-03-15',
  specialization: 'Mechanical',
  experience: '8 years',
  certifications: [
    'Certified Crane Operator',
    'Industrial Safety Specialist',
    'Equipment Maintenance Expert'
  ],
  recentActivity: [
    {
      id: 'A001',
      type: 'maintenance',
      description: 'Completed crane maintenance at Site A',
      timestamp: '2024-03-15 09:30:00'
    },
    {
      id: 'A002',
      type: 'inspection',
      description: 'Performed safety inspection at Site B',
      timestamp: '2024-03-14 14:45:00'
    },
    {
      id: 'A003',
      type: 'training',
      description: 'Attended safety protocol workshop',
      timestamp: '2024-03-13 11:00:00'
    }
  ]
};

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar">
          <FaUser className="avatar-icon" />
        </div>
        <div className="profile-info">
          <h1>{mockUserData.name}</h1>
          <p className="role">{mockUserData.role}</p>
          <button className="btn-edit">
            <FaEdit className="btn-icon" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="info-card">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div className="info-content">
                <label>Email</label>
                <p>{mockUserData.email}</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div className="info-content">
                <label>Phone</label>
                <p>{mockUserData.phone}</p>
              </div>
            </div>
            <div className="info-item">
              <FaIdCard className="info-icon" />
              <div className="info-content">
                <label>Employee ID</label>
                <p>{mockUserData.employeeId}</p>
              </div>
            </div>
            <div className="info-item">
              <FaTools className="info-icon" />
              <div className="info-content">
                <label>Department</label>
                <p>{mockUserData.department}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Professional Details</h2>
          <div className="info-card">
            <div className="info-item">
              <FaTools className="info-icon" />
              <div className="info-content">
                <label>Specialization</label>
                <p>{mockUserData.specialization}</p>
              </div>
            </div>
            <div className="info-item">
              <FaClock className="info-icon" />
              <div className="info-content">
                <label>Experience</label>
                <p>{mockUserData.experience}</p>
              </div>
            </div>
            <div className="info-item">
              <FaCalendarAlt className="info-icon" />
              <div className="info-content">
                <label>Join Date</label>
                <p>{mockUserData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Certifications</h2>
          <div className="info-card">
            <div className="certifications-list">
              {mockUserData.certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <FaIdCard className="cert-icon" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Recent Activity</h2>
          <div className="info-card">
            <div className="activity-timeline">
              {mockUserData.recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <FaHistory />
                  </div>
                  <div className="activity-content">
                    <p className="activity-description">{activity.description}</p>
                    <span className="activity-time">{activity.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 