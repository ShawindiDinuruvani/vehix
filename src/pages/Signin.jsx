import React, { useState } from "react";
import { Container, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "../api/axios";

// 🔥 වැදගත්ම දේ: CSS එක Import කරන්න
import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", response.data.email);
      localStorage.setItem("fullName", response.data.fullName);
      localStorage.setItem("role", response.data.role); 

      if (response.data.role === "GARAGE_OWNER") {
          localStorage.setItem("myGarageName", response.data.businessName);
          localStorage.setItem("garageId", response.data.id); 
      }

      if (response.data.role === "ADMIN") {
          navigate("/admin-dashboard");
      } else if (response.data.role === "GARAGE_OWNER") {
          navigate("/garage-dashboard");
      } else {
          navigate("/");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
      } else {
          setError("Login Failed. Please check email & password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🔥 මෙතන className="signin-bg" තියෙනවද බලන්න
    <div className="signin-bg">
      <Container>
        <Card className="glass-card mx-auto shadow-lg" style={{ maxWidth: "400px" }}>
          <div className="text-center mb-4">
            <h2 className="fw-bold text-white">Welcome Back</h2>
            <p className="text-white-50">Please login to your account</p>
          </div>
          
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-white">Email Address</Form.Label>
              <Form.Control 
                className="auth-input"
                type="email" 
                placeholder="Enter email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control 
                className="auth-input"
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </Form.Group>

            <Button type="submit" className="w-100 btn-primary fw-bold" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Login"}
            </Button>
          </Form>
          
          <div className="text-center mt-4">
            <p className="text-white-50 mb-0">
              New here? <Link to="/signup" className="text-warning text-decoration-none fw-bold">Create Account</Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Signin;