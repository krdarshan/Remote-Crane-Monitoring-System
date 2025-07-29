import React from 'react';
import { FaUser, FaUserPlus, FaEnvelope, FaPhone, FaIdCard, FaTools, FaClock } from 'react-icons/fa';
import './Team.css';

const mockTeamMembers = [
  {
    id: 'T001',
    name: 'John Smith',
    role: 'Senior Technician',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    specialization: 'Mechanical',
    experience: '8 years',
    currentTask: 'Crane maintenance - Site A'
  },
  {
    id: 'T002',
    name: 'Sarah Johnson',
    role: 'Operations Manager',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    status: 'active',
    specialization: 'Operations',
    experience: '10 years',
    currentTask: 'Team coordination'
  },
  {
    id: 'T003',
    name: 'Mike Chen',
    role: 'Maintenance Technician',
    email: 'mike.c@example.com',
    phone: '+1 (555) 345-6789',
    status: 'on-leave',
    specialization: 'Electrical',
    experience: '5 years',
    currentTask: 'On annual leave'
  }
];

const Team = () => {
  return (
    <div className="team">
      <div className="team-header">
        <h1>Team Management</h1>
        <p>Manage and coordinate team members</p>
      </div>

      <div className="team-actions">
        <button className="btn-primary">
          <FaUserPlus className="btn-icon" />
          Add Team Member
        </button>
        <button className="btn-secondary">Schedule Shift</button>
        <button className="btn-secondary">View Calendar</button>
      </div>

      <div className="team-filters">
        <select className="filter-select">
          <option value="">All Roles</option>
          <option value="technician">Technician</option>
          <option value="manager">Manager</option>
          <option value="operator">Operator</option>
        </select>
        <select className="filter-select">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="on-leave">On Leave</option>
          <option value="off-duty">Off Duty</option>
        </select>
        <input
          type="text"
          className="filter-search"
          placeholder="Search team members..."
        />
      </div>

      <div className="team-grid">
        {mockTeamMembers.map(member => (
          <div key={member.id} className="team-card">
            <div className="team-card-header">
              <div className="member-avatar">
                <FaUser className="avatar-icon" />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <span className={`status-badge ${member.status}`}>
                  {member.status.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            </div>
            
            <div className="member-details">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <span>{member.email}</span>
              </div>
              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <span>{member.phone}</span>
              </div>
              <div className="detail-item">
                <FaIdCard className="detail-icon" />
                <span>{member.specialization}</span>
              </div>
              <div className="detail-item">
                <FaTools className="detail-icon" />
                <span>{member.experience}</span>
              </div>
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <span>{member.currentTask}</span>
              </div>
            </div>

            <div className="team-card-actions">
              <button className="btn-primary">View Profile</button>
              <button className="btn-secondary">Assign Task</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team; 