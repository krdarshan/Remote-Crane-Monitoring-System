import React from 'react';
import {
  FaCog,
  FaBell,
  FaUser,
  FaLock,
  FaDatabase,
  FaLanguage,
  FaPalette,
  FaEnvelope
} from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure system preferences and options</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h2>
            <FaUser className="section-icon" />
            Profile Settings
          </h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Display Name</label>
              <input type="text" placeholder="John Smith" />
            </div>
            <div className="setting-item">
              <label>Email</label>
              <input type="email" placeholder="john.smith@example.com" />
            </div>
            <div className="setting-item">
              <label>Job Title</label>
              <input type="text" placeholder="Senior Technician" />
            </div>
            <div className="setting-item">
              <label>Phone</label>
              <input type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <button className="btn-primary">Update Profile</button>
          </div>
        </div>

        <div className="settings-section">
          <h2>
            <FaBell className="section-icon" />
            Notification Preferences
          </h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Email Notifications</label>
              <div className="toggle-switch">
                <input type="checkbox" id="email-notifications" />
                <label htmlFor="email-notifications"></label>
              </div>
            </div>
            <div className="setting-item">
              <label>SMS Alerts</label>
              <div className="toggle-switch">
                <input type="checkbox" id="sms-alerts" />
                <label htmlFor="sms-alerts"></label>
              </div>
            </div>
            <div className="setting-item">
              <label>Desktop Notifications</label>
              <div className="toggle-switch">
                <input type="checkbox" id="desktop-notifications" checked />
                <label htmlFor="desktop-notifications"></label>
              </div>
            </div>
            <button className="btn-primary">Save Preferences</button>
          </div>
        </div>

        <div className="settings-section">
          <h2>
            <FaLock className="section-icon" />
            Security Settings
          </h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Change Password</label>
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm New Password" />
            </div>
            <div className="setting-item">
              <label>Two-Factor Authentication</label>
              <div className="toggle-switch">
                <input type="checkbox" id="two-factor" />
                <label htmlFor="two-factor"></label>
              </div>
            </div>
            <button className="btn-primary">Update Security</button>
          </div>
        </div>

        <div className="settings-section">
          <h2>
            <FaDatabase className="section-icon" />
            System Preferences
          </h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Data Refresh Rate</label>
              <select>
                <option value="5">Every 5 seconds</option>
                <option value="10">Every 10 seconds</option>
                <option value="30">Every 30 seconds</option>
                <option value="60">Every minute</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Auto-logout Timer</label>
              <select>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="never">Never</option>
              </select>
            </div>
            <button className="btn-primary">Save Preferences</button>
          </div>
        </div>

        <div className="settings-section">
          <h2>
            <FaLanguage className="section-icon" />
            Language & Region
          </h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Language</label>
              <select>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Time Zone</label>
              <select>
                <option value="utc">UTC</option>
                <option value="est">Eastern Time</option>
                <option value="pst">Pacific Time</option>
                <option value="gmt">GMT</option>
              </select>
            </div>
            <button className="btn-primary">Save Preferences</button>
          </div>
        </div>

        <div className="settings-section">
          <h2>
            <FaPalette className="section-icon" />
            Appearance
          </h2>
          <div className="settings-card">
            <div className="setting-item">
              <label>Theme</label>
              <select>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Font Size</label>
              <select>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button className="btn-primary">Apply Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 