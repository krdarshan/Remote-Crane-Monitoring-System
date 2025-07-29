import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const dummyCraneLocations = [
  {
    id: 1,
    name: 'ACE Mobile Crane',
    position: [51.505, -0.09],
    status: 'operational',
    fuelLevel: 85,
    load: 60,
    powerConsumption: 45
  },
  {
    id: 2,
    name: 'Tower Crane',
    position: [51.51, -0.1],
    status: 'maintenance',
    fuelLevel: 65,
    load: 30,
    powerConsumption: 25
  },
  {
    id: 3,
    name: 'Crawler Crane',
    position: [51.515, -0.09],
    status: 'error',
    fuelLevel: 45,
    load: 90,
    powerConsumption: 75
  }
];

// Map event handlers component
const MapEventHandlers = () => {
  const map = useMap();
  
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  
  return null;
};

const MapPage = () => {
  const [weatherData, setWeatherData] = useState({
    temperature: 22,
    windSpeed: 15,
    windDirection: 180,
    humidity: 65
  });

  // Simulate weather updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev => ({
        temperature: Math.round(prev.temperature + (Math.random() - 0.5) * 2),
        windSpeed: Math.round(Math.max(0, Math.min(50, prev.windSpeed + (Math.random() - 0.5) * 5))),
        windDirection: Math.round(prev.windDirection + (Math.random() - 0.5) * 20) % 360,
        humidity: Math.round(Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 5)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    return new L.DivIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${getMarkerColor(status)}"></div>`,
      iconSize: [30, 30],
    });
  };

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>Crane Location Tracking</h1>
        <div className="weather-info">
          <div className="weather-item">
            <i className="fas fa-temperature-high"></i>
            <span>{weatherData.temperature}°C</span>
          </div>
          <div className="weather-item">
            <i className="fas fa-wind"></i>
            <span>{weatherData.windSpeed} km/h</span>
          </div>
          <div className="weather-item">
            <i className="fas fa-compass"></i>
            <span>{weatherData.windDirection}°</span>
          </div>
          <div className="weather-item">
            <i className="fas fa-tint"></i>
            <span>{weatherData.humidity}%</span>
          </div>
        </div>
      </div>

      <div className="map-container">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}
        >
          <MapEventHandlers />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dummyCraneLocations.map((crane) => (
            <React.Fragment key={crane.id}>
              <Marker
                position={crane.position}
                icon={createCustomIcon(crane.status)}
              >
                <Popup>
                  <div className="popup-content">
                    <h3>{crane.name}</h3>
                    <p><strong>Status:</strong> {crane.status}</p>
                    <p><strong>Fuel Level:</strong> {crane.fuelLevel}%</p>
                    <p><strong>Current Load:</strong> {crane.load}%</p>
                    <p><strong>Power Usage:</strong> {crane.powerConsumption}kW</p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={crane.position}
                radius={500}
                pathOptions={{
                  color: getMarkerColor(crane.status),
                  fillColor: getMarkerColor(crane.status),
                  fillOpacity: 0.1
                }}
              />
            </React.Fragment>
          ))}
        </MapContainer>
      </div>

      <div className="map-legend">
        <h3>Status Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
            <span>Operational</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f1c40f' }}></div>
            <span>Maintenance</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#e74c3c' }}></div>
            <span>Error</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage; 