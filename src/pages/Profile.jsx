import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, ProgressBar, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // State (කලින් කෝඩ් එකේ තිබුණ විදියටම)
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState({
      fullName: "", email: "", contactNumber: "", role: "", profileImage: "", businessName: "",
      businessAddress: "", vehicles: [], rating: 0, totalServices: 0, isActive: true
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Data Fetching
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const email = localStorage.getItem("email") || localStorage.getItem("Email");
        const token = localStorage.getItem("token");

        if (!token || !email) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`/api/profile/${email}`);
        setUser({
            ...response.data,
            profileImage: response.data.profileImage || "", 
            contactNumber: response.data.contactNumber || "",
            businessName: response.data.businessName || "",
            businessAddress: response.data.businessAddress || "",
            rating: 4.8, // Default
            totalServices: 12 // Default
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [navigate]);

  // Handle Changes
  const handleInputChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  
  const handleImageClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => setUser((prev) => ({ ...prev, profileImage: reader.result }));
          reader.readAsDataURL(file);
      }
  };

  const handleSaveChanges = async () => {
      setUpdating(true);
      setError("");
      setSuccessMsg("");
      try {
          await axios.put("/api/profile/update", user);
          setSuccessMsg("Profile Updated Successfully!");
          localStorage.setItem("fullName", user.fullName);
          setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
          setError("Failed to update.");
      } finally {
          setUpdating(false);
      }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark"><Spinner animation="border" variant="warning" /></div>;

  return (
    <div className="profile-page">
      
      {/* 🔥 1. HERO COVER SECTION */}
      <div className="profile-cover">
         {/* මෙතන අවශ්‍ය නම් "Welcome Back" කියලා ලොකුවට දාන්න පුළුවන් */}
      </div>

      <Container>
        <Row className="g-4">
          
          {/* 🔥 2. LEFT SIDEBAR (Profile Card) - Overlaps Cover */}
          <Col lg={4} className="profile-sidebar">
            <Card className="glass-card text-center p-4 border-0 mb-4">
                
                {/* Profile Image with Ring */}
                <div className="profile-img-container" onClick={handleImageClick}>
                    <img 
                        src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/3209/3209265.png"} 
                        alt="Profile" 
                        className="profile-img" 
                    />
                    <div className="camera-icon"><i className="bi bi-camera-fill"></i></div>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange} />
                </div>

                <h4 className="fw-bold text-white mb-1">{user.fullName}</h4>
                <p className="text-white-50 small mb-3">{user.email}</p>
                
                <Badge bg={user.role === "CUSTOMER" ? "info" : "warning"} className="mb-4 px-3 py-2 rounded-pill text-dark fw-bold">
                    {user.role === "CUSTOMER" ? "Vehicle Owner" : "Garage Manager"}
                </Badge>

                {/* Status Badges */}
                <div className="d-flex justify-content-center gap-3 mb-4">
                    <div className="text-center">
                        <h5 className="mb-0 fw-bold text-success">{user.isActive ? "Active" : "Banned"}</h5>
                        <small className="text-secondary">Status</small>
                    </div>
                    <div className="border-end border-secondary"></div>
                    <div className="text-center">
                        <h5 className="mb-0 fw-bold text-warning">4.8</h5>
                        <small className="text-secondary">Rating</small>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="d-grid gap-2">
                    <button className={`nav-btn ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                        <i className="bi bi-grid-fill"></i> Dashboard
                    </button>
                    <button className={`nav-btn ${activeTab === "settings" ? "active" : ""}`} onClick={() => setActiveTab("settings")}>
                        <i className="bi bi-gear-fill"></i> Settings / Edit Profile
                    </button>
                    <button className={`nav-btn text-danger`} onClick={handleLogout}>
                        <i className="bi bi-box-arrow-left"></i> Logout
                    </button>
                </div>
            </Card>
          </Col>

          {/* 🔥 3. RIGHT CONTENT SECTION */}
          <Col lg={8} className="mt-lg-4">
            
            {/* Alerts */}
            {successMsg && <Alert variant="success" className="text-center fw-bold rounded-pill">{successMsg}</Alert>}
            {error && <Alert variant="danger" className="text-center rounded-pill">{error}</Alert>}

            <Card className="glass-card p-4 border-0">
                
                {/* --- TAB: DASHBOARD --- */}
                {activeTab === "dashboard" && (
                    <div className="fade-in">
                        <h3 className="fw-bold mb-4 text-warning">Overview</h3>
                        
                        {/* Stats Cards */}
                        <Row className="g-3 mb-4">
                            <Col md={6}>
                                <div className="stat-card">
                                    <i className="bi bi-tools fs-1 text-info mb-2"></i>
                                    <h3 className="fw-bold text-white">{user.role === "CUSTOMER" ? "2" : user.totalServices}</h3>
                                    <p className="text-white-50 mb-0">{user.role === "CUSTOMER" ? "Active Vehicles" : "Total Services Done"}</p>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="stat-card">
                                    <i className="bi bi-calendar-check fs-1 text-success mb-2"></i>
                                    <h3 className="fw-bold text-white">5</h3>
                                    <p className="text-white-50 mb-0">Upcoming Appointments</p>
                                </div>
                            </Col>
                        </Row>

                        <h5 className="text-white mb-3">Quick Info</h5>
                        <div className="bg-dark bg-opacity-50 p-4 rounded-3 border border-secondary">
                            <Row>
                                <Col sm={6} className="mb-3">
                                    <small className="text-secondary d-block">Full Name</small>
                                    <span className="fw-bold">{user.fullName}</span>
                                </Col>
                                <Col sm={6} className="mb-3">
                                    <small className="text-secondary d-block">Phone</small>
                                    <span className="fw-bold">{user.contactNumber || "Not Set"}</span>
                                </Col>
                                {user.role === "GARAGE_OWNER" && (
                                    <Col sm={12}>
                                        <small className="text-secondary d-block">Garage Address</small>
                                        <span className="fw-bold text-warning">{user.businessAddress || "N/A"}</span>
                                    </Col>
                                )}
                            </Row>
                        </div>
                    </div>
                )}

                {/* --- TAB: SETTINGS (EDIT) --- */}
                {activeTab === "settings" && (
                    <div className="fade-in">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-bold text-warning">Edit Profile</h3>
                            <Badge bg="secondary">Editable</Badge>
                        </div>
                        
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Full Name</Form.Label>
                                        <Form.Control type="text" name="fullName" value={user.fullName} onChange={handleInputChange} className="custom-input" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Role (Locked)</Form.Label>
                                        <Form.Control type="text" value={user.role} className="custom-input text-white-50" disabled />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Email Address (Locked)</Form.Label>
                                        <Form.Control type="email" name="email" value={user.email} className="custom-input text-white-50" disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Phone Number</Form.Label>
                                        <Form.Control type="text" name="contactNumber" value={user.contactNumber} onChange={handleInputChange} className="custom-input" placeholder="07x-xxxxxxx" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {user.role === "GARAGE_OWNER" && (
                                <>
                                    <h5 className="text-info mt-4 mb-3"><i className="bi bi-shop"></i> Business Details</h5>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-white-50">Garage Name</Form.Label>
                                                <Form.Control type="text" name="businessName" value={user.businessName} onChange={handleInputChange} className="custom-input" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="text-white-50">Address</Form.Label>
                                                <Form.Control type="text" name="businessAddress" value={user.businessAddress} onChange={handleInputChange} className="custom-input" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </>
                            )}

                            <div className="d-flex justify-content-end mt-4">
                                <Button variant="warning" size="lg" className="px-5 fw-bold rounded-pill" onClick={handleSaveChanges} disabled={updating}>
                                    {updating ? <Spinner animation="border" size="sm" /> : "Save Changes"}
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}

            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;