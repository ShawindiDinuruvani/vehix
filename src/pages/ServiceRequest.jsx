import React, { useState, useEffect } from "react";
import axios from "axios";
import ServiceMap from "./ServiceMap";

// This function calculates distance between two points (in Kilometers)
const getDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1); // Example: "2.5" km
};

const ServiceRequest = () => {
  const [garages, setGarages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // 1. Get where the USER is
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });

    // 2. Get the GARAGES from your Database
    axios.get("http://localhost:8080/api/users/garages")
      .then(res => setGarages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Find a Garage</h2>

      {/* --- THE MAP SECTION --- */}
      <div style={{ height: "400px", width: "100%", marginBottom: "20px" }}>
        <ServiceMap serviceCenters={garages} userLocation={userLocation} />
      </div>

      {/* --- THE LIST SECTION --- */}
      <h4>Garages Near You:</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        {garages.map((g) => (
          <div key={g.id} style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px" }}>
            <h5 style={{ margin: "0" }}>{g.businessName}</h5>
            <p style={{ fontSize: "12px", color: "#666" }}>{g.businessAddress}</p>
            
            {/* Display the Distance here */}
            {userLocation && (
              <p style={{ color: "green", fontWeight: "bold" }}>
                Distance: {getDistance(userLocation.lat, userLocation.lng, g.latitude, g.longitude)} km
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceRequest;