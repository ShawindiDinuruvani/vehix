import React, { useEffect, useState } from "react";
import { Container, Card, Table, Badge, Button, Row, Col, Spinner, Alert, Tab, Tabs } from "react-bootstrap";
import axios from "../api/axios";

const GarageDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]); // Emergency Requests
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Login විස්තර ගන්නවා
  const myGarageName = localStorage.getItem("myGarageName");
  const garageId = localStorage.getItem("garageId"); // 🔥 ID එක අනිවාර්යයි

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    if (!myGarageName || !garageId) {
        setLoading(false);
        setError("Garage Details not found! Please Logout and Login again.");
        return;
    }

    setLoading(true);
    try {
      // 1. Appointments ගන්නවා (By Name)
      const apptRes = await axios.get(`/api/appointments/garage/${myGarageName}`);
      
      // 2. Emergency Requests ගන්නවා (By ID)
      const reqRes = await axios.get(`/api/service/garage/${garageId}`);
      
      setAppointments(apptRes.data);
      setRequests(reqRes.data);

    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  // Status Update Function (General)
  const updateStatus = async (type, id, newStatus) => {
    try {
      const endpoint = type === 'appointment' 
        ? `/api/appointments/status/${id}` 
        : `/api/service/status/${id}`; // Emergency Request API

      await axios.put(endpoint, { status: newStatus });
      
      alert(`Status updated to ${newStatus}`);
      fetchAllData(); // Refresh Data

    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ background: "#1a1a1a", color: "white" }}>
      <Container className="mt-4">
        
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h2 className="fw-bold text-warning"><i className="bi bi-speedometer2"></i> Garage Dashboard</h2>
                <p className="text-white-50">Manage: <span className="text-white fw-bold">{myGarageName}</span></p>
            </div>
            <Button variant="outline-light" onClick={fetchAllData}><i className="bi bi-arrow-clockwise"></i> Refresh</Button>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* --- STATS CARDS --- */}
        <Row className="mb-4 g-3">
            <Col md={3}>
                <Card className="bg-danger text-white p-3 text-center border-0 shadow">
                    <h3>{requests.filter(r => r.status === 'Pending').length}</h3>
                    <small className="fw-bold">🚨 Emergency Requests</small>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="bg-primary text-white p-3 text-center border-0 shadow">
                    <h3>{appointments.filter(a => a.status === 'Pending').length}</h3>
                    <small>Pending Appointments</small>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="bg-success text-white p-3 text-center border-0 shadow">
                    <h3>{requests.length + appointments.length}</h3>
                    <small>Total Jobs</small>
                </Card>
            </Col>
        </Row>

        {/* --- TABS SECTION --- */}
        <Tabs defaultActiveKey="emergency" id="dashboard-tabs" className="mb-3 custom-tabs">
            
            {/* 🔥 TAB 1: EMERGENCY REQUESTS (අලුත් කොටස) */}
            <Tab eventKey="emergency" title={<span>🚨 Emergency Requests <Badge bg="danger">{requests.filter(r => r.status === 'Pending').length}</Badge></span>}>
                <Card className="p-4 shadow-lg border-0" style={{ background: "rgba(255, 0, 0, 0.1)" }}>
                    <h4 className="text-danger mb-3 fw-bold">Incoming Emergency Alerts</h4>
                    {loading ? <Spinner animation="border" /> : requests.length > 0 ? (
                        <div className="table-responsive">
                            <Table hover variant="dark" className="align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Vehicle & Issue</th>
                                        <th>Location</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req.id}>
                                            <td>{req.ownerName} <br/><small className="text-secondary">{req.requestTime?.split("T")[0]}</small></td>
                                            <td><span className="fw-bold text-warning">{req.issue}</span> <br/> <small>{req.vehicleNumber} ({req.vehicleModel})</small></td>
                                            <td>
                                                <a href={`https://www.google.com/maps?q=${req.latitude},${req.longitude}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info">
                                                    <i className="bi bi-geo-alt-fill"></i> View Map
                                                </a>
                                            </td>
                                            <td>
                                                {/* Customer ගේ Phone Number එක Database එකේ Save කරලා තියෙන්න ඕනේ. නැත්නම් මෙතන Pending */}
                                                <Button size="sm" variant="outline-success" href={`tel:${req.contactNumber || ''}`}><i className="bi bi-telephone"></i> Call</Button>
                                            </td>
                                            <td>
                                                <Badge bg={req.status === 'Pending' ? 'danger' : req.status === 'Accepted' ? 'success' : 'secondary'}>{req.status}</Badge>
                                            </td>
                                            <td className="text-end">
                                                {req.status === 'Pending' && (
                                                    <>
                                                        <Button size="sm" variant="success" className="me-2" onClick={() => updateStatus('request', req.id, 'Accepted')}>Accept</Button>
                                                        <Button size="sm" variant="outline-danger" onClick={() => updateStatus('request', req.id, 'Rejected')}>Reject</Button>
                                                    </>
                                                )}
                                                {req.status === 'Accepted' && <span className="text-success"><i className="bi bi-check-circle"></i> Team Dispatched</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-white-50 p-5">No emergency requests received yet.</p>
                    )}
                </Card>
            </Tab>

            {/* 🔥 TAB 2: APPOINTMENTS (පරණ කොටස) */}
            <Tab eventKey="appointments" title="📅 Scheduled Appointments">
                <Card className="p-4 shadow-lg border-0" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
                    {loading ? <Spinner animation="border" /> : appointments.length > 0 ? (
                        <div className="table-responsive">
                            <Table hover variant="dark" className="align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th>Customer</th>
                                        <th>Vehicle</th>
                                        <th>Service</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th className="text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map((appt) => (
                                        <tr key={appt.id}>
                                            <td>{appt.ownerName}</td>
                                            <td>{appt.vehicleNumber}</td>
                                            <td>{appt.serviceType}</td>
                                            <td>{appt.appointmentDate}</td>
                                            <td><Badge bg={appt.status === 'Confirmed' ? 'primary' : 'warning'}>{appt.status}</Badge></td>
                                            <td className="text-end">
                                                {appt.status === 'Pending' && (
                                                    <>
                                                        <Button size="sm" variant="success" className="me-2" onClick={() => updateStatus('appointment', appt.id, 'Confirmed')}>Confirm</Button>
                                                        <Button size="sm" variant="outline-danger" onClick={() => updateStatus('appointment', appt.id, 'Rejected')}>Reject</Button>
                                                    </>
                                                )}
                                                {appt.status === 'Confirmed' && <Button size="sm" variant="info" onClick={() => updateStatus('appointment', appt.id, 'Completed')}>Mark Done</Button>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-white-50 p-5">No bookings available.</p>
                    )}
                </Card>
            </Tab>

        </Tabs>

      </Container>
    </div>
  );
};

export default GarageDashboard;