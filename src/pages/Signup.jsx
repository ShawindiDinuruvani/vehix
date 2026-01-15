import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await api.post('/api/users/signup', formData); // Backend Signup endpoint [cite: 11]
        alert("Registration Successful!");
        window.location.href = "/login";
    } catch (err) {
        // Validation Errors  [cite: 18]
        alert("Check your details again!");
    }
};


const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
    // Garage specific fields
    businessName: "",
    businessAddress: "",
    locationLink: "", // Google Maps Link or Coordinates
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/users/signup", formData);
      alert("Account created successfully!");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Register As</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange}>
              <option value="CUSTOMER">Customer (Vehicle Owner)</option>
              <option value="GARAGE_OWNER">Garage Owner</option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" name="fullName" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          {/* Conditional Rendering for Garage Owners */}
          {formData.role === "GARAGE_OWNER" && (
            <div className="p-3 mb-3 border rounded bg-light">
              <h5>Business Details</h5>
              <Form.Group className="mb-2">
                <Form.Label>Business Name</Form.Label>
                <Form.Control type="text" name="businessName" placeholder="E.g. Saman's Motors" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Business Address</Form.Label>
                <Form.Control as="textarea" rows={2} name="businessAddress" onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Google Maps Location (Link/Coordinates)</Form.Label>
                <Form.Control type="text" name="locationLink" placeholder="Paste Google Maps link here" onChange={handleChange} />
              </Form.Group>
            </div>
          )}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" className="w-100 btn-success">Create Account</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
