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

// සිතියම User ඉන්න තැනට Auto Center වීමට
const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const ServiceMap = ({ serviceCenters, userLocation }) => {
  // Default Location: Colombo (User Location නැති නම්)
  const defaultPosition = [6.9271, 79.8612];
  const position = userLocation ? [userLocation.lat, userLocation.lng] : defaultPosition;

  return (
    // 👇 UPDATE 1: Height eka 100% kala (Full screen penenna)
    <div className="map-container" style={{ height: "100%", width: "100%", overflow: "hidden" }}>
      
      {/* 👇 UPDATE 2: scrollWheelZoom={true} kala */}
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        
        {/* OpenStreetMap Layer */}
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* 1. User ගේ Location එක */}
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
        {serviceCenters.map((center, index) => (
          <Marker key={index} position={[center.lat, center.lng]}>
            <Popup>
              <div style={{ textAlign: "center" }}>
                <h6 style={{ margin: "0", color: "#0d6efd", fontWeight: "bold" }}>{center.name}</h6>
                <p style={{ margin: "5px 0", fontSize: "12px" }}>{center.address}</p>
                
                {/* 👇 UPDATE 3: Correct Google Maps Direction Link */}
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ fontSize: "12px", color: "blue", textDecoration: "underline", fontWeight: "bold" }}
                >
                  <i className="bi bi-cursor-fill me-1"></i> Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;