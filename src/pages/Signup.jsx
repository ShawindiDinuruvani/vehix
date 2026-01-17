import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; 
import "./Signup.css"; 

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER", 
    businessName: "", 
    businessAddress: "",
    locationLink: "", 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // 🟢 සරල JSON Request එකක් යැවීම (FormData අවශ්‍ය නැත)
      const response = await api.post("/api/users/signup", formData); 
      
      console.log("Success:", response.data);
      alert("Account created successfully! Please Login.");
      navigate("/login");

    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100 py-5">
        <Card className="p-4 shadow-lg glass-card" style={{ maxWidth: '700px', width: '100%' }}>
          
          <div className="text-center mb-4">
            <h2 className="fw-bold text-white">Create Account</h2>
            <p className="text-white-50">Join Vehix to manage or service vehicles</p>
          </div>

          {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-4">
              <Form.Label className="text-white fw-bold">I am a:</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange} className="custom-input">
                <option value="CUSTOMER">Vehicle Owner (Customer)</option>
                <option value="GARAGE_OWNER">Garage Owner (Mechanic)</option>
              </Form.Select>
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Full Name</Form.Label>
                  <Form.Control type="text" name="fullName" placeholder="Enter full name" onChange={handleChange} required className="custom-input" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Email Address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required className="custom-input" />
                </Form.Group>
              </Col>
            </Row>

            {/* GARAGE OWNER EXTRA FIELDS */}
            {formData.role === "GARAGE_OWNER" && (
              <div className="garage-section p-3 mb-4 rounded border border-secondary">
                <h5 className="text-primary mb-3"><i className="bi bi-tools me-2"></i>Business Details</h5>
                
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Garage Name</Form.Label>
                  <Form.Control type="text" name="businessName" placeholder="E.g. Saman's Motors" onChange={handleChange} required className="custom-input" />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Address</Form.Label>
                        <Form.Control type="text" name="businessAddress" placeholder="City, Street" onChange={handleChange} required className="custom-input" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Google Maps Link</Form.Label>
                        <Form.Control type="text" name="locationLink" placeholder="https://maps.google..." onChange={handleChange} className="custom-input" />
                        </Form.Group>
                    </Col>
                </Row>
              </div>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control type="password" name="password" placeholder="Create password" onChange={handleChange} required className="custom-input" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} required className="custom-input" />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" className="btn-primary w-100 mt-3 py-2 fw-bold" disabled={loading}>
               {loading ? <Spinner animation="border" size="sm" /> : "Create Account"}
            </Button>

            <div className="text-center mt-3">
                <span className="text-white-50">Already have an account? </span>
                <Link to="/login" className="text-primary fw-bold text-decoration-none">Log In</Link>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;