import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from '../api/axios'; 
import "./Signin.css";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        // 1. Send login request to backend
        const response = await api.post('/api/auth/login', {
            email: formData.email,
            password: formData.password
        });
        
        console.log("Login Success:", response.data);

        // 2. Save Token
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }

        
        localStorage.setItem("userEmail", formData.email);

      
        alert("Login Successful!");
        navigate("/"); 
        
    } catch (err) {
        console.error("Login Error:", err);
        setError(err.response?.data?.message || "Invalid email or password. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4 shadow-lg glass-card">
          <div className="text-center mb-4">
             <h2 className="fw-bold text-white">Welcome Back</h2>
             <p className="text-white-50">Sign in to manage your vehicle services</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="custom-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="custom-input"
              />
            </Form.Group>

            <Button 
                type="submit" 
                className="btn-primary w-100 mb-3 py-2 fw-bold" 
                disabled={loading}
            >
              {loading ? (
                 <>
                   <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                   &nbsp; Signing In...
                 </>
              ) : (
                 "Sign In"
              )}
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span className="text-white-50">Don't have an account? </span>
            <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign Up</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;