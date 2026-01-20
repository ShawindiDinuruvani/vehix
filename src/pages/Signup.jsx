import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "../api/axios";

// Map  Location
const LocationMarker = ({ setLocation }) => {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
};

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    role: "CUSTOMER",
    businessName: "", 
    businessAddress: "", 
    contactNumber: "",
    latitude: null, 
    longitude: null
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (latlng) => {
      setFormData({ ...formData, latitude: latlng.lat, longitude: latlng.lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //  1. Validation: 
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        return;
    }

    // Garage Owner  Location 
    if (formData.role === "GARAGE_OWNER" && !formData.latitude) {
        setError("Please select your Garage Location on the map!");
        return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      await axios.post("/api/auth/register", dataToSend);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#121212" }}>
      <Container>
        <Card className="p-4 mx-auto shadow-lg glass-card" style={{ maxWidth: "500px", background: "rgba(255,255,255,0.1)", color: "white" }}>
          <h2 className="text-center fw-bold mb-3">Create Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="fullName" onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" onChange={handleChange} required />
            </Form.Group>
            
            {/*  Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} required />
            </Form.Group>

            {/*  Confirm Password Field  */}
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" onChange={handleChange} required placeholder="Re-enter password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" onChange={handleChange}>
                <option value="CUSTOMER">Vehicle Owner (Customer)</option>
                <option value="GARAGE_OWNER">Garage Owner</option>
              </Form.Select>
            </Form.Group>``

            
            {formData.role === "GARAGE_OWNER" && (
              <div className="p-3 border border-secondary rounded mb-3 bg-dark bg-opacity-50">
                <h5 className="text-warning mb-3">Garage Details</h5>
                
                <Form.Group className="mb-2"><Form.Control name="businessName" placeholder="Garage Name" onChange={handleChange} required /></Form.Group>
                <Form.Group className="mb-2"><Form.Control name="businessAddress" placeholder="Address" onChange={handleChange} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Control name="contactNumber" placeholder="Phone Number" onChange={handleChange} required /></Form.Group>
                
                <Form.Label className="text-info">Tap on the map to set location:</Form.Label>
                <div style={{ height: "200px", borderRadius: "8px", overflow: "hidden", border: "1px solid #666" }}>
                    <MapContainer center={[6.9271, 79.8612]} zoom={13} style={{ height: "100%", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationMarker setLocation={handleLocationSelect} />
                    </MapContainer>
                </div>
                {formData.latitude && <small className="text-success d-block mt-1">Location Selected! ✅</small>}
              </div>
            )}

            <Button type="submit" className="w-100 btn-primary mt-2">Register</Button>
          </Form>
          <p className="text-center mt-3 text-white-50">Already have an account? <Link to="/login" className="text-warning">Login</Link></p>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;