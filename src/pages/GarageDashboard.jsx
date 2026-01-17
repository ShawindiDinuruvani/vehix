import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
// Note: We are using inline styles for the main container to force full width, 
// so the external CSS file is optional but good for specific component styles if needed.
import "./GarageDashboard.css"; 

const GarageDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // --- MOCK DATA ---
  const [stats] = useState({
    totalEarnings: "LKR 150,000",
    pendingJobs: 5,
    completedJobs: 42,
    rating: 4.8
  });

  const [appointments, setAppointments] = useState([
    { id: 1, customer: "Amal Perera", contact: "077-1112233", vehicle: "Toyota Prius (WP ABC-1234)", type: "Full Service", date: "2025-02-20", time: "10:00 AM", status: "Pending" },
    { id: 2, customer: "Nimal Silva", contact: "071-4433221", vehicle: "Honda Grace (WP CAR-5566)", type: "Oil Change", date: "2025-02-21", time: "02:00 PM", status: "Confirmed" },
    { id: 3, customer: "Sunil Rathnayake", contact: "075-9988776", vehicle: "Nissan Leaf (WP CBA-9988)", type: "Battery Check", date: "2025-02-22", time: "09:30 AM", status: "Completed" },
    { id: 4, customer: "Kamal Gunarathne", contact: "076-1234567", vehicle: "Suzuki WagonR (WP CAD-8899)", type: "Scan", date: "2025-02-23", time: "11:00 AM", status: "Pending" },
  ]);

  const [emergencyRequests] = useState([
    { id: 101, customer: "Kamal (077-1234567)", location: "Kandy Rd, Mile Post 5", issue: "Engine Overheat", distance: "2 km away" }
  ]);

  const [services] = useState([
    { id: 1, name: "Full Service Package", price: "15,000", description: "Engine, Gear, Body full checkup." },
    { id: 2, name: "Express Oil Change", price: "5,000", description: "Quick synthetic oil replacement." },
    { id: 3, name: "Computer Scan", price: "3,000", description: "OBD2 Full system diagnostic." },
  ]);

  // --- ACTIONS ---
  const handleStatusChange = (id, newStatus) => {
    const updatedApps = appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAppointments(updatedApps);
  };

  return (
    // 🔥 FORCE FULL SCREEN STYLE WRAPPER
    <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a2e 100%)",
        paddingTop: "80px", // Space for Navbar
        paddingBottom: "40px",
        zIndex: 1,
        overflowX: "hidden"
    }}>
      <Container fluid className="px-4">
        
        {/* HEADER & NAVIGATION */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 text-white gap-3">
            <div>
                <h2 className="fw-bold mb-0">Garage Owner Dashboard</h2>
                <p className="text-white-50 mb-0">Manage your business, appointments, and services.</p>
            </div>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Button variant={activeTab === "overview" ? "primary" : "outline-light"} onClick={() => setActiveTab("overview")}>Overview</Button>
                <Button variant={activeTab === "appointments" ? "primary" : "outline-light"} onClick={() => setActiveTab("appointments")}>Appointments</Button>
                <Button variant={activeTab === "services" ? "primary" : "outline-light"} onClick={() => setActiveTab("services")}>My Services</Button>
                <Button variant={activeTab === "emergency" ? "danger" : "outline-danger"} onClick={() => setActiveTab("emergency")}>🚨 Emergency ({emergencyRequests.length})</Button>
            </div>
        </div>

        {/* --- 1. OVERVIEW TAB --- */}
        {activeTab === "overview" && (
            <Row className="g-4 animate-fade">
                <Col md={3}>
                    <Card className="glass-card p-3 text-center border-left-success h-100">
                        <h6 className="text-white-50">Total Earnings (Feb)</h6>
                        <h2 className="text-success fw-bold">{stats.totalEarnings}</h2>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="glass-card p-3 text-center border-left-warning h-100">
                        <h6 className="text-white-50">Pending Jobs</h6>
                        <h2 className="text-warning fw-bold">{stats.pendingJobs}</h2>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="glass-card p-3 text-center border-left-info h-100">
                        <h6 className="text-white-50">Completed Jobs</h6>
                        <h2 className="text-info fw-bold">{stats.completedJobs}</h2>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card className="glass-card p-3 text-center border-left-primary h-100">
                        <h6 className="text-white-50">Customer Rating</h6>
                        <h2 className="text-primary fw-bold">{stats.rating} / 5.0</h2>
                    </Card>
                </Col>
            </Row>
        )}

        {/* --- 2. APPOINTMENTS TAB (FULL WIDTH) --- */}
        {activeTab === "appointments" && (
            <Card className="shadow-lg border-0 w-100 animate-fade" style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "15px",
                overflow: "hidden"
            }}>
                <div className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center bg-dark bg-opacity-25">
                    <h4 className="text-white mb-0">Customer Appointments</h4>
                    <Badge bg="primary">{appointments.length} Bookings</Badge>
                </div>

                <div className="table-responsive">
                    <Table hover style={{ color: "white", marginBottom: 0, width: "100%" }}>
                        <thead style={{ background: "rgba(0,0,0,0.3)" }}>
                            <tr className="text-uppercase small text-white-50">
                                <th className="p-3 ps-4">Customer Details</th>
                                <th className="p-3">Vehicle Info</th>
                                <th className="p-3">Service Type</th>
                                <th className="p-3">Date/Time</th>
                                <th className="p-3 text-center">Status</th>
                                <th className="p-3 pe-4 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((app) => (
                                <tr key={app.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    <td className="p-3 ps-4">
                                        <div className="fw-bold fs-5 text-white">{app.customer}</div>
                                        <div className="small text-info"><i className="bi bi-telephone me-1"></i>{app.contact}</div>
                                    </td>
                                    <td className="p-3 align-middle">
                                        <span className="text-white-50 fw-medium">{app.vehicle}</span>
                                    </td>
                                    <td className="p-3 align-middle">
                                        <Badge bg="info" text="dark" className="px-3 py-2 rounded-pill">{app.type}</Badge>
                                    </td>
                                    <td className="p-3 align-middle">
                                        <div className="fw-bold">{app.time}</div>
                                        <div className="small text-white-50">{app.date}</div>
                                    </td>
                                    <td className="p-3 align-middle text-center">
                                        <Badge bg={
                                            app.status === "Confirmed" ? "success" : 
                                            app.status === "Pending" ? "warning" : "secondary"
                                        } className="px-3 py-2 rounded-pill text-uppercase">
                                            {app.status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 pe-4 align-middle text-end">
                                        {app.status === "Pending" && (
                                            <div className="d-flex gap-2 justify-content-end">
                                                <Button variant="success" size="sm" className="px-3 fw-bold" onClick={() => handleStatusChange(app.id, "Confirmed")}>Accept</Button>
                                                <Button variant="outline-danger" size="sm" className="px-3">Reject</Button>
                                            </div>
                                        )}
                                        {app.status === "Confirmed" && (
                                            <Button variant="primary" size="sm" className="w-100 fw-bold" onClick={() => handleStatusChange(app.id, "Completed")}>Mark Done</Button>
                                        )}
                                        {app.status === "Completed" && <span className="text-white-50 small text-uppercase fw-bold">Closed</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>
        )}

        {/* --- 3. EMERGENCY / IMMEDIATE REQUESTS --- */}
        {activeTab === "emergency" && (
            <div className="animate-fade">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-danger fw-bold mb-0">⚠️ Urgent Breakdown Requests</h4>
                    <Badge bg="danger" className="animate-pulse px-3 py-2">Live Updates On</Badge>
                </div>
                
                <Row>
                    {emergencyRequests.map((req) => (
                        <Col md={6} key={req.id}>
                            <Card className="glass-card border-danger p-0 mb-3 overflow-hidden">
                                <div className="p-3 bg-danger bg-opacity-25 d-flex justify-content-between align-items-center">
                                    <h5 className="text-white mb-0 fw-bold">{req.issue}</h5>
                                    <Badge bg="danger">Live</Badge>
                                </div>
                                <div className="p-3">
                                    <p className="text-white mb-2"><i className="bi bi-person-fill me-2 text-danger"></i>{req.customer}</p>
                                    <p className="text-white mb-3"><i className="bi bi-geo-alt-fill me-2 text-danger"></i>{req.location} <b className="text-warning">({req.distance})</b></p>
                                    <div className="d-flex gap-2">
                                        <Button variant="success" className="w-50 fw-bold">Accept & Navigate</Button>
                                        <Button variant="outline-light" className="w-50">Call Customer</Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                    {emergencyRequests.length === 0 && <p className="text-white-50 text-center py-5">No emergency requests at the moment.</p>}
                </Row>
            </div>
        )}

        {/* --- 4. MY SERVICES TAB (FULL WIDTH HORIZONTAL LIST) --- */}
        {activeTab === "services" && (
            <div className="w-100 animate-fade">
                <div className="d-flex justify-content-between align-items-center mb-4 text-white p-3 rounded" style={{background: "rgba(255,255,255,0.05)"}}>
                    <div>
                        <h4 className="mb-0">Services You Offer</h4>
                        <small className="text-white-50">Manage your visible service list.</small>
                    </div>
                    <Button variant="primary" className="fw-bold px-4"><i className="bi bi-plus-lg me-2"></i> Add New</Button>
                </div>

                <div className="d-flex flex-column gap-3">
                    {services.map(svc => (
                        <div key={svc.id} className="p-4 rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 service-item-hover" style={{
                            background: "rgba(255, 255, 255, 0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "all 0.3s ease"
                        }}>
                            <div className="d-flex align-items-center gap-4 w-100">
                                <div className="bg-primary bg-opacity-25 p-3 rounded-circle text-white d-flex align-items-center justify-content-center" style={{width:'60px', height:'60px'}}>
                                    <i className="bi bi-tools fs-4"></i>
                                </div>
                                <div>
                                    <h4 className="text-white mb-1">{svc.name}</h4>
                                    <p className="text-white-50 mb-0 small">{svc.description}</p>
                                </div>
                            </div>
                            
                            <div className="d-flex align-items-center gap-4 w-100 w-md-auto justify-content-between justify-content-md-end">
                                <div className="text-end">
                                    <small className="text-white-50 d-block mb-1 text-uppercase" style={{fontSize: '0.7rem'}}>Service Price</small>
                                    <h3 className="text-success fw-bold mb-0">LKR {svc.price}</h3>
                                </div>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-light" className="px-3"><i className="bi bi-pencil-fill"></i></Button>
                                    <Button variant="outline-danger" className="px-3"><i className="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </Container>
    </div>
  );
};

export default GarageDashboard;