import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, ProgressBar, Nav } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, vehicles, settings
  const [user, setUser] = useState({
    role: "CUSTOMER", // Toggle this to "GARAGE_OWNER" to test
    fullName: "Kasun Perera",
    email: "kasun@example.com",
    phone: "077-1234567",
    nic: "981234567V",
    address: "No 10, Colombo Rd, Kandy",
    profilePic: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    
    // Customer Data
    vehicles: [
      { id: 1, number: "WP CAB-1234", model: "Toyota Axio", type: "Car", nextService: "2026-02-15", health: 80 },
      { id: 2, number: "WP BC-5566", model: "Honda Dio", type: "Bike", nextService: "2026-03-10", health: 95 }
    ],
    // Garage Data
    businessName: "Kasun's Auto Care",
    rating: 4.8,
    totalServices: 120,
    earnings: "LKR 450,000"
  });

  const toggleRole = () => {
    setUser({ 
        ...user, 
        role: user.role === "CUSTOMER" ? "GARAGE_OWNER" : "CUSTOMER",
        profilePic: user.role === "CUSTOMER" 
            ? "https://cdn-icons-png.flaticon.com/512/10484/10484252.png" 
            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
    });
  };

  return (
    <div className="profile-page min-vh-100 py-5">
      <Container>
        
        {/* --- HEADER SECTION --- */}
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-white fw-bold">User Profile</h2>
            <Button variant="outline-warning" size="sm" onClick={toggleRole}>
                Switch View ({user.role === "CUSTOMER" ? "Owner" : "Customer"})
            </Button>
        </div>

        <Row className="g-4">
          
          {/* =======================
              LEFT SIDEBAR (MENU)
             ======================= */}
          <Col lg={3}>
            <Card className="glass-card text-center p-4 h-100 border-0">
                <div className="position-relative mx-auto mb-3" style={{ width: "100px" }}>
                    <img src={user.profilePic} alt="Profile" className="profile-img shadow-lg" />
                    <span className="position-absolute bottom-0 end-0 p-2 bg-success border border-light rounded-circle"></span>
                </div>
                <h5 className="text-white fw-bold mb-0">{user.fullName}</h5>
                <p className="text-white-50 small mb-2">{user.email}</p>
                <Badge bg={user.role === "CUSTOMER" ? "primary" : "warning"} className="mb-4 py-2 px-3">
                    {user.role === "CUSTOMER" ? "Vehicle Owner" : "Garage Manager"}
                </Badge>

                {/* Navigation Menu */}
                <div className="d-grid gap-2 text-start">
                    <Button 
                        variant={activeTab === "dashboard" ? "primary" : "outline-light"} 
                        className="text-start border-0"
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Button>
                    
                    <Button 
                        variant={activeTab === "vehicles" ? "primary" : "outline-light"} 
                        className="text-start border-0"
                        onClick={() => setActiveTab("vehicles")}
                    >
                        {user.role === "CUSTOMER" 
                            ? <><i className="bi bi-car-front me-2"></i> My Vehicles</> 
                            : <><i className="bi bi-tools me-2"></i> My Garage</>}
                    </Button>

                    <Button 
                        variant={activeTab === "settings" ? "primary" : "outline-light"} 
                        className="text-start border-0"
                        onClick={() => setActiveTab("settings")}
                    >
                        <i className="bi bi-gear me-2"></i> Settings
                    </Button>
                    
                    <hr className="border-secondary my-3" />
                    
                    <Button variant="danger" className="text-start">
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </Button>
                </div>
            </Card>
          </Col>

          {/* =======================
              RIGHT CONTENT AREA
             ======================= */}
          <Col lg={9}>
            <Card className="glass-card p-4 h-100 border-0">
                
                {/* --- TAB 1: DASHBOARD OVERVIEW --- */}
                {activeTab === "dashboard" && (
                    <div className="fade-in">
                        <h3 className="text-white mb-4">Overview</h3>
                        <Row className="g-3 mb-4">
                            <Col md={4}>
                                <div className="stat-card bg-primary bg-opacity-25 p-3 rounded">
                                    <h2 className="text-primary fw-bold">
                                        {user.role === "CUSTOMER" ? user.vehicles.length : user.totalServices}
                                    </h2>
                                    <p className="text-white-50 mb-0">
                                        {user.role === "CUSTOMER" ? "Total Vehicles" : "Total Services"}
                                    </p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="stat-card bg-success bg-opacity-25 p-3 rounded">
                                    <h2 className="text-success fw-bold">2</h2>
                                    <p className="text-white-50 mb-0">Upcoming Bookings</p>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="stat-card bg-warning bg-opacity-25 p-3 rounded">
                                    <h2 className="text-warning fw-bold">
                                        {user.role === "CUSTOMER" ? "Good" : "4.8"}
                                    </h2>
                                    <p className="text-white-50 mb-0">
                                        {user.role === "CUSTOMER" ? "Account Status" : "User Rating"}
                                    </p>
                                </div>
                            </Col>
                        </Row>

                        <h5 className="text-white mb-3">Recent Activity</h5>
                        <div className="activity-list">
                            <div className="d-flex align-items-center p-3 mb-2 rounded bg-dark bg-opacity-50">
                                <div className="icon-box bg-primary text-white rounded-circle p-2 me-3">
                                    <i className="bi bi-calendar-check"></i>
                                </div>
                                <div>
                                    <h6 className="text-white mb-0">Service Booked</h6>
                                    <small className="text-white-50">Toyota Axio - Oil Change</small>
                                </div>
                                <span className="ms-auto text-white-50 small">2 hours ago</span>
                            </div>
                            <div className="d-flex align-items-center p-3 rounded bg-dark bg-opacity-50">
                                <div className="icon-box bg-success text-white rounded-circle p-2 me-3">
                                    <i className="bi bi-check-lg"></i>
                                </div>
                                <div>
                                    <h6 className="text-white mb-0">Profile Updated</h6>
                                    <small className="text-white-50">Phone number verified</small>
                                </div>
                                <span className="ms-auto text-white-50 small">Yesterday</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: VEHICLES (CUSTOMER) OR GARAGE (OWNER) --- */}
                {activeTab === "vehicles" && (
                    <div className="fade-in">
                        <div className="d-flex justify-content-between mb-4">
                            <h3 className="text-white">{user.role === "CUSTOMER" ? "My Vehicles" : "Garage Details"}</h3>
                            <Button variant="primary" size="sm">
                                <i className="bi bi-plus-lg me-1"></i> {user.role === "CUSTOMER" ? "Add Vehicle" : "Add Service"}
                            </Button>
                        </div>

                        {user.role === "CUSTOMER" ? (
                            <Row className="g-3">
                                {user.vehicles.map((v) => (
                                    <Col md={6} key={v.id}>
                                        <div className="vehicle-card-pro p-3 rounded border border-secondary position-relative">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h5 className="text-primary fw-bold mb-0">{v.number}</h5>
                                                    <p className="text-white mb-2">{v.model}</p>
                                                </div>
                                                <i className="bi bi-car-front-fill fs-3 text-white-50"></i>
                                            </div>
                                            <div className="mt-3">
                                                <div className="d-flex justify-content-between text-white-50 small mb-1">
                                                    <span>Condition</span>
                                                    <span>{v.health}%</span>
                                                </div>
                                                <ProgressBar variant="success" now={v.health} height="5px" className="mb-2" />
                                                <small className="text-warning">
                                                    <i className="bi bi-clock-history me-1"></i> Next Service: {v.nextService}
                                                </small>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <div>
                                <div className="p-3 mb-3 bg-dark bg-opacity-50 rounded">
                                    <h5 className="text-warning">{user.businessName}</h5>
                                    <p className="text-white-50">Authorized Service Center</p>
                                    <Badge bg="info" className="me-2">Hybrid Specialist</Badge>
                                    <Badge bg="info">Engine Repair</Badge>
                                </div>
                                <h6 className="text-white mt-4">Business Performance</h6>
                                <h1 className="text-success fw-bold">{user.earnings}</h1>
                                <p className="text-white-50">Total Earnings this month</p>
                            </div>
                        )}
                    </div>
                )}

                {/* --- TAB 3: SETTINGS --- */}
                {activeTab === "settings" && (
                    <div className="fade-in">
                        <h3 className="text-white mb-4">Account Settings</h3>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Full Name</Form.Label>
                                        <Form.Control type="text" defaultValue={user.fullName} className="custom-input" />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">NIC Number</Form.Label>
                                        <Form.Control type="text" defaultValue={user.nic} className="custom-input" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Email Address</Form.Label>
                                        <Form.Control type="email" defaultValue={user.email} className="custom-input" disabled />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className="text-white-50">Phone Number</Form.Label>
                                        <Form.Control type="text" defaultValue={user.phone} className="custom-input" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-4">
                                <Form.Label className="text-white-50">Address</Form.Label>
                                <Form.Control as="textarea" rows={2} defaultValue={user.address} className="custom-input" />
                            </Form.Group>

                            <Button variant="success" className="px-4 fw-bold">Save Changes</Button>
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