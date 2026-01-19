import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import axios from "../api/axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // navigate අයින් කළා, මොකද අපි window.location.href පාවිච්චි කරනවා

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Backend එකට Login Request එක යවනවා
      const response = await axios.post("/api/auth/login", { email, password });

      // 2. 🔥 Data Browser එකේ Save කරගන්නවා
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("role", response.data.role); 

      // 3. Role එක අනුව අදාළ පිටුවට යවනවා (Refresh වෙමින්)
      if (response.data.role === "GARAGE_OWNER") {
          // Garage Owner සඳහා විශේෂ දත්ත Save කිරීම
          localStorage.setItem("myGarageName", response.data.businessName);
          
          // 🔥 Dashboard එකේ Emergency Request වැඩ කරන්න මේ ID එක අනිවාර්යයි
          localStorage.setItem("garageId", response.data.id); 

          // 🔥 Page එක Refresh වී Dashboard එකට යයි (එවිට Navbar එක Update වේ)
          window.location.href = "/garage-dashboard";
      } else {
          // Customer නම් Home Page එකට යයි
          window.location.href = "/"; 
      }

    } catch (err) {
      console.error(err);
      setError("Login Failed. Please check email & password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "#121212" }}>
      <Container>
        <Card className="p-4 mx-auto shadow-lg glass-card" style={{ maxWidth: "400px", background: "rgba(255,255,255,0.1)", color: "white" }}>
          <h2 className="text-center fw-bold mb-3">Welcome Back</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-primary mt-2">Login</Button>
          </Form>
          
          <p className="text-center mt-3 text-white-50">
            New here? <Link to="/signup" className="text-warning">Create Account</Link>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;