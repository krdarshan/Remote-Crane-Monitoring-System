import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPreview.css';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const dummyCraneLocations = [
  { id: 1, name: 'ACE Mobile Crane', position: [51.505, -0.09], status: 'operational' },
  { id: 2, name: 'Tower Crane', position: [51.51, -0.1], status: 'maintenance' },
  { id: 3, name: 'Crawler Crane', position: [51.515, -0.09], status: 'error' }
];

const MapPreview = ({ onClick }) => {
  const getMarkerColor = (status) => {
    switch (status) {
      case 'operational':
        return '#2ecc71';
      case 'maintenance':
        return '#f1c40f';
      case 'error':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  };

  const createCustomIcon = (status) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${getMarkerColor(status)}"></div>`,
      iconSize: [20, 20],
    });
  };

  return (
    <div className="map-preview-container" onClick={onClick}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        className="map-preview"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {dummyCraneLocations.map((crane) => (
          <Marker
            key={crane.id}
            position={crane.position}
            icon={createCustomIcon(crane.status)}
          >
            <Popup>
              <div className="popup-content">
                <h3>{crane.name}</h3>
                <p>Status: {crane.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="map-preview-overlay">
        <span>Click to view full map</span>
      </div>
    </div>
  );
};

export default MapPreview; 