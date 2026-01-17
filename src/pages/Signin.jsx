import React, { useState } from "react";
import { Container, Form, Button, Card, Spinner, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; 
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
        const response = await api.post('/api/auth/login', formData);
        const userData = response.data;

        // දත්ත LocalStorage හි Save කිරීම
        localStorage.setItem("token", userData.token);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userRole", userData.role);
        localStorage.setItem("userName", userData.fullName);

        if (userData.role === "GARAGE_OWNER" && userData.businessName) {
            localStorage.setItem("myGarageName", userData.businessName);
        }

        alert("Login Successful!");

        // 🔥 වෙනස් කළ කොටස: කෙලින්ම Home Page එකට යැවීම 🔥
        // Role එක check කර කර ඉන්න අවශ්‍ය නෑ, මොකද Nav Bar එකෙන් ඒක බලාගන්නවා.
        navigate("/"); 
        
        // Note: NavBar එක refresh නොවන්නේ නම්, පහත පේළිය භාවිතා කරන්න:
        // window.location.href = "/";

    } catch (err) {
        console.error("Login Error:", err);
        setError(err.response?.data?.message || "Invalid email or password.");
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
              <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required className="custom-input" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Enter password" onChange={handleChange} required className="custom-input" />
            </Form.Group>

            <Button type="submit" className="btn-primary w-100 mb-3 py-2 fw-bold" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Sign In"}
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