import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import axios from "../api/axios";

//CSS 
import "./Signup.css";

// Map Location Component
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
  const [loading, setLoading] = useState(false); // Loading State 
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
    setLoading(true); // Load

    // 1. Validation: 
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
    }

    // Garage Owner Location Validation
    if (formData.role === "GARAGE_OWNER" && !formData.latitude) {
        setError("Please select your Garage Location on the map!");
        setLoading(false);
        return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;

      await axios.post("/api/auth/register", dataToSend);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      // UPDATE: Backend Validation Errors 
      if (err.response && err.response.data) {
        if (typeof err.response.data === "object") {
           // List
           const firstError = Object.values(err.response.data)[0];
           setError(firstError || "Registration Failed");
        } else {
           
           setError(err.response.data); 
        }
      } else {
        setError("Registration Failed. Please try again.");
      }
    } finally {
      setLoading(false); // Loading
    }
  };

  return (
    //  CSS Clas (Inline Style )
    <div className="signup-bg">
      <Container>
        <Card className="glass-card mx-auto" style={{ maxWidth: "500px" }}>
          <h2 className="text-center fw-bold mb-3">Create Account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control className="auth-input" name="fullName" onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control className="auth-input" type="email" name="email" onChange={handleChange} required />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control className="auth-input" type="password" name="password" onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control className="auth-input" type="password" name="confirmPassword" onChange={handleChange} required placeholder="Re-enter password" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select className="auth-input" name="role" onChange={handleChange}>
                <option value="CUSTOMER">Vehicle Owner (Customer)</option>
                <option value="GARAGE_OWNER">Garage Owner</option>
              </Form.Select>
            </Form.Group>

            {/* Garage Owner Details */}
            {formData.role === "GARAGE_OWNER" && (
              <div className="p-3 border border-secondary rounded mb-3 bg-dark bg-opacity-50">
                <h5 className="text-warning mb-3">Garage Details</h5>
                
                <Form.Group className="mb-2"><Form.Control className="auth-input" name="businessName" placeholder="Garage Name" onChange={handleChange} required /></Form.Group>
                <Form.Group className="mb-2"><Form.Control className="auth-input" name="businessAddress" placeholder="Address" onChange={handleChange} required /></Form.Group>
                <Form.Group className="mb-3"><Form.Control className="auth-input" name="contactNumber" placeholder="Phone Number" onChange={handleChange} required /></Form.Group>
                
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

            {/*  Loading Spinner Button */}
            <Button type="submit" className="w-100 btn-primary mt-2 fw-bold" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Register"}
            </Button>
          </Form>
          <p className="text-center mt-3 text-white-50">Already have an account? <Link to="/login" className="text-warning text-decoration-none fw-bold">Login</Link></p>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;