import React, { useState } from 'react';
import { Navigation, Clock, Route as RouteIcon } from 'lucide-react';
// Leaflet Core Imports
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Import Leaflet base styling and your custom component styles
import 'leaflet/dist/leaflet.css';
import './RoutePlanner.css';

// Fix default marker icon issues in Leaflet (re-pointing to asset CDN)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Teal Marker Config for delivery stops
const stopIcon = (number) => new L.DivIcon({
  html: `<div class="map-stop-marker">${number}</div>`,
  className: 'custom-stop-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// Custom Hub Icon Config
const hubIcon = new L.DivIcon({
  html: `<div class="map-hub-marker"><svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>`,
  className: 'custom-hub-icon',
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

const RoutePlanner = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  // Exact coordinated waypoints matching Bhubaneswar Geography
  const hubCoords = [20.3015, 85.8338]; // Base / Starting Point near Vani Vihar

  const stops = [
    { id: 1, name: "Patia", orders: 5, distance: "2.1 KM", coords: [20.3534, 85.8264] },
    { id: 2, name: "KIIT Square", orders: 8, distance: "3.4 KM", coords: [20.3503, 85.8193] },
    { id: 3, name: "Sailashree Vihar", orders: 4, distance: "2.8 KM", coords: [20.3345, 85.8164] },
    { id: 4, name: "Chandrasekharpur", orders: 6, distance: "3.2 KM", coords: [20.3244, 85.8189] },
  ];

  // Path Line connecting starting Hub -> Stop 1 -> Stop 2 -> Stop 3 -> Stop 4 -> Back to Hub
  const routePolyline = [
    hubCoords,
    ...stops.map(stop => stop.coords),
    hubCoords
  ];

  const handleStartNavigation = () => {
    setIsNavigating(!isNavigating);
    if (!isNavigating) {
      // Formatted using official Google Maps Direction URL scheme 
      const origin = hubCoords.join(',');
      const destination = hubCoords.join(',');
      const waypoints = stops.map(s => s.coords.join(',')).join('|');
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypoints}&travelmode=driving`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="rp-wrapper">
      <div className="rp-card">
        
        {/* Header Section */}
        <div className="rp-header">
          <div className="rp-badge-step">2</div>
          <h2 className="rp-title">Route Planner</h2>
        </div>

        {/* Core Layout Split */}
        <div className="rp-main-layout">
          
          {/* Map Preview Canvas */}
          <div className="rp-map-container">
            <MapContainer 
              center={[20.3340, 85.8230]} 
              zoom={13} 
              className="rp-leaflet-map"
              scrollWheelZoom={false}
              dragging={!L.Browser.mobile}
            >
              {/* Sleek Minimalist Map Theme Layer */}
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              {/* Base Station Hub Marker */}
              <Marker position={hubCoords} icon={hubIcon}>
                <Popup><b>Starting Hub Office</b></Popup>
              </Marker>

              {/* Waypoint Destination Markers */}
              {stops.map((stop, index) => (
                <Marker key={stop.id} position={stop.coords} icon={stopIcon(index + 1)}>
                  <Popup>
                    <strong>{stop.name}</strong> <br />
                    {stop.orders} Delivery Orders ({stop.distance})
                  </Popup>
                </Marker>
              ))}

              {/* Dynamic Path Polyline connecting points */}
              <Polyline positions={routePolyline} color="#0b6b55" weight={4} opacity={0.8} />
            </MapContainer>
          </div>

          {/* Location Stop Directory */}
          <div className="rp-stops-list">
            <div className="rp-stops-scroll-container">
              {stops.map((stop) => (
                <div key={stop.id} className="rp-stop-item">
                  <div className="rp-stop-info">
                    <h3 className="rp-stop-name">{stop.name}</h3>
                    <span className="rp-stop-orders">{stop.orders} Orders</span>
                  </div>
                  <div className="rp-stop-distance">{stop.distance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Summary Info */}
        <div className="rp-summary-panel">
          <div className="rp-metric">
            <RouteIcon className="rp-icon" />
            <span className="rp-metric-label">Total Distance</span>
            <span className="rp-metric-val">: 14.2 KM</span>
          </div>
          <div className="rp-metric">
            <Clock className="rp-icon" />
            <span className="rp-metric-label">Estimated Time</span>
            <span className="rp-metric-val">: 1h 20m</span>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="rp-btn-container">
          <button 
            onClick={handleStartNavigation} 
            className={`rp-nav-btn ${isNavigating ? 'active' : ''}`}
          >
            <Navigation className="rp-btn-icon" />
            {isNavigating ? "Navigation Active" : "Start Navigation"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoutePlanner;