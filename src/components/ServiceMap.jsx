import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for missing marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// --- NEW: Component to auto-zoom and fit all markers ---
const FitMarkers = ({ markers, userLoc }) => {
  const map = useMap();

  useEffect(() => {
    if (!markers || markers.length === 0) return;

    // Create a boundary box
    const bounds = L.latLngBounds();

    // Add user location to the box
    if (userLoc) bounds.extend([userLoc.lat, userLoc.lng]);

    // Add every garage location to the box
    markers.forEach((m) => {
      if (m.latitude && m.longitude) {
        bounds.extend([m.latitude, m.longitude]);
      }
    });

    // Tell the map to fit that box (with 50px padding)
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [markers, userLoc, map]);

  return null;
};

const ServiceMap = ({ serviceCenters, userLocation }) => {
  // ADD THIS LINE
  console.log("Map received these garages:", serviceCenters);
  const defaultPosition = [6.9271, 79.8612];

  return (
    <div style={{ height: "600px", width: "100%" }}>
      <MapContainer 
        center={defaultPosition} 
        zoom={8} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* This is the magic part that zooms the map automatically */}
        <FitMarkers markers={serviceCenters} userLoc={userLocation} />

        {/* User Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>ඔබ සිටින තැන (You are here)</Popup>
          </Marker>
        )}

        {/* Garage Markers */}
{serviceCenters && serviceCenters.map((center, index) => {
    // Convert to number just in case they are strings
    const lat = parseFloat(center.latitude);
    const lng = parseFloat(center.longitude);

    if (isNaN(lat) || isNaN(lng)) return null;

    return (
        <Marker key={index} position={[lat, lng]}>
            <Popup>
                <strong>{center.businessName}</strong><br/>
                {center.businessAddress}
            </Popup>
        </Marker>
    );
        })}
      </MapContainer>
    </div>
  );
};

export default ServiceMap;