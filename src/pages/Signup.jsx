// src/pages/Signup.jsx
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      // Send POST request to backend
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }
      );

      alert(`Account created successfully! Welcome ${response.data.fullName}`);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create account");
    }
  };

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="auth-card p-4 shadow-lg">
          <h2 className="text-center mb-4">Create Your Account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" className="btn-primary w-100 mb-3">
              Sign Up
            </Button>
          </Form>
          <div className="text-center">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
