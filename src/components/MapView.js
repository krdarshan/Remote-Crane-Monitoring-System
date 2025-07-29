import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapView.css';

// Fix for default marker icons in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const craneLocations = [
  {
    id: 'CR001',
    name: 'ACE Mobile Crane',
    position: [51.505, -0.09],
    status: 'operational',
    details: {
      model: 'ACE NX-150',
      lastMaintenance: '2024-03-15',
      currentLoad: '75%',
      fuelLevel: '85%'
    }
  },
  {
    id: 'CR002',
    name: 'Tower Construction Crane',
    position: [51.51, -0.1],
    status: 'maintenance',
    details: {
      model: 'Liebherr 550 EC-H',
      lastMaintenance: '2024-02-28',
      currentLoad: '0%',
      fuelLevel: '60%'
    }
  },
  {
    id: 'CR003',
    name: 'Crawler Crane',
    position: [51.515, -0.09],
    status: 'critical',
    details: {
      model: 'Manitowoc 18000',
      lastMaintenance: '2024-03-01',
      currentLoad: '45%',
      fuelLevel: '30%'
    }
  }
];

const MapView = () => {
  const [selectedCrane, setSelectedCrane] = useState(null);
  const [filter, setFilter] = useState('all');

  const getMarkerIcon = (status) => {
    return L.divIcon({
      className: `custom-marker ${status}`,
      html: `<div class="marker-pin"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  const filteredCranes = craneLocations.filter(crane => 
    filter === 'all' || crane.status === filter
  );

  return (
    <div className="map-view">
      <div className="map-controls">
        <h1>Crane Locations</h1>
        <div className="filter-controls">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Cranes</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Under Maintenance</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="map-container">
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={13} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {filteredCranes.map(crane => (
            <Marker
              key={crane.id}
              position={crane.position}
              icon={getMarkerIcon(crane.status)}
              eventHandlers={{
                click: () => setSelectedCrane(crane)
              }}
            >
              <Popup>
                <div className="crane-popup">
                  <h3>{crane.name}</h3>
                  <div className={`status-badge ${crane.status}`}>
                    {crane.status}
                  </div>
                  <div className="popup-details">
                    <p><strong>Model:</strong> {crane.details.model}</p>
                    <p><strong>Last Maintenance:</strong> {crane.details.lastMaintenance}</p>
                    <p><strong>Current Load:</strong> {crane.details.currentLoad}</p>
                    <p><strong>Fuel Level:</strong> {crane.details.fuelLevel}</p>
                  </div>
                  <button 
                    className="view-details-btn"
                    onClick={() => window.location.href = `/cranes/${crane.id}`}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {selectedCrane && (
        <div className="crane-details-panel">
          <h2>{selectedCrane.name}</h2>
          <div className={`status-indicator ${selectedCrane.status}`}>
            {selectedCrane.status.toUpperCase()}
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Model</span>
              <span className="value">{selectedCrane.details.model}</span>
            </div>
            <div className="detail-item">
              <span className="label">Last Maintenance</span>
              <span className="value">{selectedCrane.details.lastMaintenance}</span>
            </div>
            <div className="detail-item">
              <span className="label">Current Load</span>
              <span className="value">{selectedCrane.details.currentLoad}</span>
            </div>
            <div className="detail-item">
              <span className="label">Fuel Level</span>
              <span className="value">{selectedCrane.details.fuelLevel}</span>
            </div>
          </div>
          <div className="action-buttons">
            <button className="action-btn primary">View Full Details</button>
            <button className="action-btn secondary">Generate Report</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView; 