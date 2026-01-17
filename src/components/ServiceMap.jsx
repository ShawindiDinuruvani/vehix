import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet Icon Fix for React
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to auto-center map on user location
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const ServiceMap = ({ serviceCenters, userLocation }) => {
  // Default Location: Colombo (Used if User Location is missing)
  const defaultPosition = [6.9271, 79.8612];
  const position = userLocation ? [userLocation.lat, userLocation.lng] : defaultPosition;

  return (
    <div className="map-container" style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        
        {/* OpenStreetMap Layer */}
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 1. User Location Marker */}
        {userLocation && (
           <>
             <Marker position={position}>
               <Popup>
                 <b>ඔබ සිටින තැන (You are here)</b>
               </Popup>
             </Marker>
             <RecenterAutomatically lat={userLocation.lat} lng={userLocation.lng} />
           </>
        )}

        {/* 2. Registered Garage Locations */}
        {serviceCenters && serviceCenters.map((center, index) => {
            // --- SAFETY CHECK (Prevents the crash) ---
            // 1. Try to read latitude/longitude (standard names) OR lat/lng (short names)
            // 2. Ensure they are treated as Numbers
            const lat = parseFloat(center.latitude || center.lat);
            const lng = parseFloat(center.longitude || center.lng);

            // If coordinates are invalid or missing, SKIP this garage (return null)
            // This prevents "Invalid LatLng object" error
            if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
                return null; 
            }

            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <div style={{ textAlign: "center" }}>
                    {/* Fallback for Name: Try 'businessName', if missing try 'name', if missing show 'Garage' */}
                    <h6 style={{ margin: "0", color: "#0d6efd", fontWeight: "bold" }}>
                      {center.businessName || center.name || "Unknown Garage"}
                    </h6>

                    {/* Fallback for Address */}
                    <p style={{ margin: "5px 0", fontSize: "12px" }}>
                      {center.businessAddress || center.address || "No address provided"}
                    </p>
                    
                    {/* Corrected Google Maps Direction Link */}
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ fontSize: "12px", color: "blue", textDecoration: "underline", fontWeight: "bold" }}
                    >
                      <i className="bi bi-cursor-fill me-1"></i> Get Directions
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
        })}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;