import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import "./GarageDashboard.css";

const GarageDashboard = () => {
  // Default tab එක Appointments ලෙස තබමු
  const [activeTab, setActiveTab] = useState("appointments");

  // --- MOCK DATA ---
  const [appointments, setAppointments] = useState([
    { id: 1, customer: "Amal Perera", contact: "077-1112233", vehicle: "Toyota Prius (WP ABC-1234)", type: "Full Service", date: "2025-02-20", time: "10:00 AM", status: "Pending" },
    { id: 2, customer: "Nimal Silva", contact: "071-4433221", vehicle: "Honda Grace (WP CAR-5566)", type: "Oil Change", date: "2025-02-21", time: "02:00 PM", status: "Confirmed" },
    { id: 3, customer: "Sunil Rathnayake", contact: "075-9988776", vehicle: "Nissan Leaf (WP CBA-9988)", type: "Battery Check", date: "2025-02-22", time: "09:30 AM", status: "Completed" },
    { id: 4, customer: "Kamal Gunarathne", contact: "076-1234567", vehicle: "Suzuki WagonR (WP CAD-8899)", type: "Scan", date: "2025-02-23", time: "11:00 AM", status: "Pending" },
  ]);

  const [services] = useState([
    { id: 1, name: "Full Service Package (Engine, Gear, Body)", price: "15,000", description: "Complete vehicle checkup and servicing." },
    { id: 2, name: "Express Oil Change & Filter Replacement", price: "5,000", description: "Quick oil change with premium synthetic oil." },
    { id: 3, name: "Computerized Scan & Diagnostic", price: "3,000", description: "Full system scan to identify error codes." },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedApps = appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAppointments(updatedApps);
  };

  return (
    <div className="garage-dashboard min-vh-100 py-5">
      <Container fluid className="px-4">
        
        {/* HEADER & NAVIGATION */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 text-white gap-3">
            <div>
                <h2 className="fw-bold display-6 mb-0">Garage Dashboard</h2>
                <p className="text-white-50 mb-0">Manage your business efficiently.</p>
            </div>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Button variant={activeTab === "overview" ? "primary" : "outline-light"} onClick={() => setActiveTab("overview")}>Overview</Button>
                <Button variant={activeTab === "appointments" ? "primary" : "outline-light"} onClick={() => setActiveTab("appointments")}>Appointments</Button>
                <Button variant={activeTab === "services" ? "primary" : "outline-light"} onClick={() => setActiveTab("services")}>My Services</Button>
                <Button variant={activeTab === "emergency" ? "danger" : "outline-danger"} onClick={() => setActiveTab("emergency")}>🚨 Emergency</Button>
            </div>
        </div>

        {/* --- APPOINTMENTS TAB (UPDATED: FULL WIDTH & CLEAR) --- */}
        {activeTab === "appointments" && (
            <Card className="glass-card p-0 border-0 shadow-lg animate-fade w-100 overflow-hidden">
                <div className="p-4 border-bottom border-secondary d-flex justify-content-between align-items-center bg-dark bg-opacity-25">
                    <h4 className="text-white mb-0"><i className="bi bi-calendar-check me-2"></i>Customer Appointments</h4>
                    <Badge bg="primary" className="fs-6">{appointments.length} Bookings</Badge>
                </div>

                <div className="table-responsive">
                    <Table className="table-dark-glass align-middle mb-0 w-100" hover>
                        <thead className="bg-dark bg-opacity-50">
                            <tr className="text-uppercase text-white-50 small">
                                <th className="py-3 ps-4">Customer Details</th>
                                <th className="py-3">Vehicle Info</th>
                                <th className="py-3">Service Type</th>
                                <th className="py-3">Date & Time</th>
                                <th className="py-3 text-center">Status</th>
                                <th className="py-3 pe-4 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((app) => (
                                <tr key={app.id}>
                                    <td className="ps-4 py-3">
                                        <div className="fw-bold text-white fs-5">{app.customer}</div>
                                        <div className="text-primary small"><i className="bi bi-telephone-fill me-1"></i>{app.contact}</div>
                                    </td>
                                    <td className="py-3">
                                        <span className="text-white-50 fw-medium">{app.vehicle}</span>
                                    </td>
                                    <td className="py-3">
                                        <Badge bg="info" text="dark" className="px-3 py-2 rounded-pill">{app.type}</Badge>
                                    </td>
                                    <td className="py-3">
                                        <div className="text-white fw-bold">{app.time}</div>
                                        <div className="text-white-50 small">{app.date}</div>
                                    </td>
                                    <td className="py-3 text-center">
                                        <Badge bg={
                                            app.status === "Confirmed" ? "success" : 
                                            app.status === "Pending" ? "warning" : "secondary"
                                        } className="px-3 py-2 rounded-pill text-uppercase">
                                            {app.status}
                                        </Badge>
                                    </td>
                                    <td className="pe-4 py-3 text-end">
                                        {app.status === "Pending" && (
                                            <div className="d-flex gap-2 justify-content-end">
                                                <Button variant="success" size="sm" className="fw-bold px-3" onClick={() => handleStatusChange(app.id, "Confirmed")}>
                                                    <i className="bi bi-check-lg me-1"></i> Accept
                                                </Button>
                                                <Button variant="outline-danger" size="sm" className="px-3">
                                                    <i className="bi bi-x-lg"></i>
                                                </Button>
                                            </div>
                                        )}
                                        {app.status === "Confirmed" && (
                                            <Button variant="primary" size="sm" className="fw-bold w-100" onClick={() => handleStatusChange(app.id, "Completed")}>
                                                <i className="bi bi-check2-circle me-1"></i> Mark Done
                                            </Button>
                                        )}
                                        {app.status === "Completed" && <span className="text-white-50 fw-bold small text-uppercase">Closed</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card>
        )}

        {/* --- MY SERVICES TAB (UPDATED: HORIZONTAL LIST VIEW) --- */}
        {activeTab === "services" && (
            <Card className="glass-card p-4 border-0 animate-fade w-100">
                <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
                    <div>
                        <h4 className="text-white mb-1">Services You Offer</h4>
                        <p className="text-white-50 mb-0 small">Manage the services visible to customers.</p>
                    </div>
                    <Button variant="primary" className="fw-bold px-4 py-2">
                        <i className="bi bi-plus-lg me-2"></i> Add New Service
                    </Button>
                </div>
                
                <div className="d-flex flex-column gap-3">
                    {services.map((svc) => (
                        <div key={svc.id} className="service-item-horizontal p-4 rounded-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-4">
                                <div className="icon-box bg-primary bg-opacity-25 text-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{width: '60px', height: '60px'}}>
                                    <i className="bi bi-tools fs-4"></i>
                                </div>
                                <div>
                                    <h4 className="text-white mb-1">{svc.name}</h4>
                                    <p className="text-white-50 mb-0 small">{svc.description}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-4">
                                <div className="text-end">
                                    <small className="text-white-50 d-block mb-1">Price</small>
                                    <h4 className="text-success mb-0 fw-bold">LKR {svc.price}</h4>
                                </div>
                                <div className="d-flex gap-2">
                                    <Button variant="outline-light" className="px-3"><i className="bi bi-pencil-fill"></i></Button>
                                    <Button variant="outline-danger" className="px-3"><i className="bi bi-trash-fill"></i></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        )}

        {/* Placeholders for other tabs */}
        {activeTab === "overview" && <h4 className="text-white text-center mt-5 animate-fade">Overview Section...</h4>}
        {activeTab === "emergency" && <h4 className="text-white text-center mt-5 animate-fade">Emergency Section...</h4>}

      </Container>
    </div>
  );
};

export default GarageDashboard;