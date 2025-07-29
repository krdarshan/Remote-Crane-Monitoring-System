import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Map = () => {
  const craneLocations = [
    {
      id: 1,
      name: 'XCMG Truck Crane',
      location: 'Site A',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      status: 'operational'
    },
    {
      id: 2,
      name: 'POTAIN MDT 219',
      location: 'Site B',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      status: 'maintenance'
    },
    {
      id: 3,
      name: 'GROVE GRT880',
      location: 'Site C',
      coordinates: { lat: 40.7549, lng: -73.9840 },
      status: 'critical'
    },
    {
      id: 4,
      name: 'Liebherr Crawler Crane',
      location: 'Site D',
      coordinates: { lat: 40.7489, lng: -73.9680 },
      status: 'operational'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return '#10b981';
      case 'maintenance':
        return '#f59e0b';
      case 'critical':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="map-container">
      <div className="map-header">
        <h1>Crane Locations</h1>
        <div className="map-legend">
          <div className="legend-item">
            <span className="status-dot operational"></span>
            Operational
          </div>
          <div className="legend-item">
            <span className="status-dot maintenance"></span>
            Maintenance
          </div>
          <div className="legend-item">
            <span className="status-dot critical"></span>
            Critical
          </div>
        </div>
      </div>

      <div className="map-content">
        <div className="map-placeholder">
          <div className="map-overlay">
            {craneLocations.map(crane => (
              <div
                key={crane.id}
                className="location-marker"
                style={{
                  left: `${(crane.coordinates.lng + 74.1) * 100}%`,
                  top: `${(40.8 - crane.coordinates.lat) * 100}%`,
                  backgroundColor: getStatusColor(crane.status)
                }}
                title={`${crane.name} - ${crane.location}`}
              >
                <FaMapMarkerAlt />
                <div className="location-tooltip">
                  <strong>{crane.name}</strong>
                  <span>{crane.location}</span>
                  <span className="status" style={{ color: getStatusColor(crane.status) }}>
                    {crane.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="location-list">
          <h2>Crane List</h2>
          {craneLocations.map(crane => (
            <div key={crane.id} className="location-item">
              <div className="location-icon" style={{ backgroundColor: getStatusColor(crane.status) }}>
                <FaMapMarkerAlt />
              </div>
              <div className="location-info">
                <h3>{crane.name}</h3>
                <p>{crane.location}</p>
              </div>
              <span className="status-badge" style={{ backgroundColor: getStatusColor(crane.status) }}>
                {crane.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .map-container {
          padding: 2rem;
          background-color: #f8f9fa;
          min-height: 100vh;
        }

        .map-header {
          margin-bottom: 2rem;
        }

        .map-header h1 {
          color: #2c3e50;
          font-size: 1.75rem;
          margin-bottom: 1rem;
        }

        .map-legend {
          display: flex;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4b5563;
          font-size: 0.875rem;
        }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .status-dot.operational {
          background-color: #10b981;
        }

        .status-dot.maintenance {
          background-color: #f59e0b;
        }

        .status-dot.critical {
          background-color: #ef4444;
        }

        .map-content {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .map-placeholder {
          position: relative;
          width: 100%;
          height: 600px;
          background-color: #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .location-marker {
          position: absolute;
          transform: translate(-50%, -100%);
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .location-marker:hover {
          transform: translate(-50%, -100%) scale(1.1);
        }

        .location-marker:hover .location-tooltip {
          opacity: 1;
          visibility: visible;
        }

        .location-tooltip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 0.75rem;
          border-radius: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          width: max-content;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.2s;
        }

        .location-tooltip strong {
          display: block;
          color: #1e293b;
          margin-bottom: 0.25rem;
        }

        .location-tooltip span {
          display: block;
          color: #64748b;
          font-size: 0.875rem;
        }

        .location-list {
          background: #f8fafc;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .location-list h2 {
          color: #2c3e50;
          font-size: 1.25rem;
          margin-bottom: 1rem;
        }

        .location-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          background: white;
          border-radius: 8px;
          margin-bottom: 0.75rem;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .location-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-right: 1rem;
        }

        .location-info {
          flex: 1;
        }

        .location-info h3 {
          color: #1e293b;
          font-size: 1rem;
          margin: 0 0 0.25rem;
        }

        .location-info p {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          color: white;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        @media (max-width: 1024px) {
          .map-content {
            grid-template-columns: 1fr;
          }

          .map-placeholder {
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};

export default Map; 