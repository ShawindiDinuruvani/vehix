import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./Signin.css"; // Make sure this path is correct
import { Link } from "react-router-dom";
import api from '../api/axios'; //  api  import 
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await api.post('/api/auth/login', {
            email: formData.email,
            password: formData.password
        });
        
        // , Role 
        alert("Login Successful!");
        window.location.href = "/home"; 
        
    } catch (err) {
        // Backend එන Error [cite: 18, 54]
        alert(err.response?.data || "Login failed!");
    }
};

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Signed In:", formData);
    alert("Signed in successfully!");
  };

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4">
          <h2 className="text-center mb-4">Sign In to Vehix</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn-primary w-100 mb-3">
              Sign In
            </Button>
          </Form>
          <div className="text-center">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;

