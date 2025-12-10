// src/components/ServiceMap.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons for React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ServiceMap = ({ serviceCenters }) => {
  return (
    <MapContainer
      center={[6.9271, 79.8612]} // Colombo, Sri Lanka as default
      zoom={10}
      style={{ height: "400px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {serviceCenters.map((center, idx) => (
        <Marker key={idx} position={[center.lat, center.lng]}>
          <Popup>
            <strong>{center.name}</strong>
            <br />
            {center.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ServiceMap;
