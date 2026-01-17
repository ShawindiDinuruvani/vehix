import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet Icon Fix
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Auto-Recenter Component
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const ServiceMap = ({ serviceCenters, userLocation }) => {
  const defaultPosition = [6.9271, 79.8612];
  const position = userLocation ? [userLocation.lat, userLocation.lng] : defaultPosition;

  // --- NEW FUNCTION: Handle "Select Garage" Click ---
  const handleSelectGarage = (garage) => {
    // You can replace this later to navigate to a Request Page
    alert(`You selected: ${garage.businessName}`);
    console.log("Selected Garage ID:", garage.id);
  };

  return (
    <div className="map-container" style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User Location */}
        {userLocation && (
           <>
             <Marker position={position}>
               <Popup><b>You are here</b></Popup>
             </Marker>
             <RecenterAutomatically lat={userLocation.lat} lng={userLocation.lng} />
           </>
        )}

        {/* Garage Markers */}
        {serviceCenters && serviceCenters.map((center, index) => {
            const lat = parseFloat(center.latitude || center.lat);
            const lng = parseFloat(center.longitude || center.lng);

            if (!lat || !lng || isNaN(lat) || isNaN(lng)) return null;

            // Check if phone number exists (Fallback to a dummy number if missing)
            const phoneNumber = center.phoneNumber || center.mobile || "0770000000";

            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <div style={{ textAlign: "center", minWidth: "150px" }}>
                    
                    {/* Header */}
                    <h6 style={{ margin: "0 0 5px 0", color: "#0d6efd", fontWeight: "bold" }}>
                      {center.businessName || "Garage"}
                    </h6>
                    <p style={{ margin: "0 0 10px 0", fontSize: "12px", color: "#555" }}>
                      {center.businessAddress}
                    </p>

                    {/* --- NEW ACTION BUTTONS --- */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                      
                      {/* 1. CALL BUTTON */}
                      <a 
                        href={`tel:${phoneNumber}`} 
                        style={{
                          backgroundColor: "#198754", // Green
                          color: "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          textDecoration: "none",
                          fontSize: "12px",
                          fontWeight: "bold",
                          display: "block"
                        }}
                      >
                        <i className="bi bi-telephone-fill me-1"></i> Call Now
                      </a>

                      {/* 2. SELECT BUTTON */}
                      <button
                        onClick={() => handleSelectGarage(center)}
                        style={{
                          backgroundColor: "#0d6efd", // Blue
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: "bold",
                          width: "100%"
                        }}
                      >
                        Select Garage
                      </button>

                      {/* 3. DIRECTIONS LINK */}
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ fontSize: "11px", color: "#666", marginTop: "5px", textDecoration: "underline" }}
                      >
                        Get Directions
                      </a>
                    </div>

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