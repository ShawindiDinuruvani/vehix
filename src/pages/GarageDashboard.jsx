import React, { useEffect, useState } from "react";
import { Container, Card, Table, Badge, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "../api/axios";

const GarageDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Login වුන Garage එකේ නම (localStorage එකෙන් ගන්නවා)
  // ⚠️ වැදගත්: Login වෙනකොට මේ නම හරියට Save වෙලා තියෙන්න ඕනේ.
  const myGarageName = localStorage.getItem("myGarageName");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    // Garage Name එක නැත්නම් Data ගන්න බෑ
    if (!myGarageName) {
        setLoading(false);
        setError("Garage Name not found! Please Login again.");
        return;
    }

    try {
      console.log("Fetching bookings for:", myGarageName); // Console එකේ නම වැටෙනවද බලන්න
      
      // Backend එකෙන් මේ නමට අදාළ Bookings ඉල්ලනවා
      const response = await axios.get(`/api/appointments/garage/${myGarageName}`);
      
      console.log("Data received:", response.data); // Data එනවද බලන්න
      setAppointments(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  // Status Update කිරීම (Accept / Reject / Complete)
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/appointments/status/${id}`, { status: newStatus });
      fetchAppointments(); // Update කළාම ආපහු List එක refresh කරනවා
      alert(`Booking marked as ${newStatus}`);
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
                <h2 className="fw-bold text-warning">Garage Dashboard</h2>
                <p className="text-white-50">Manage bookings for: <span className="text-white fw-bold">{myGarageName || "Unknown"}</span></p>
            </div>
            <Button variant="outline-light" onClick={fetchAppointments}><i className="bi bi-arrow-clockwise"></i> Refresh</Button>
        </div>

        {/* Error Message */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* --- STATS CARDS --- */}
        <Row className="mb-4 g-3">
            <Col md={3}>
                <Card className="bg-primary text-white p-3 text-center border-0 shadow">
                    <h3>{appointments.length}</h3>
                    <small>Total Bookings</small>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="bg-warning text-dark p-3 text-center border-0 shadow">
                    <h3>{appointments.filter(a => a.status === 'Pending').length}</h3>
                    <small>Pending</small>
                </Card>
            </Col>
            <Col md={3}>
                <Card className="bg-success text-white p-3 text-center border-0 shadow">
                    <h3>{appointments.filter(a => a.status === 'Confirmed' || a.status === 'Completed').length}</h3>
                    <small>Active/Done</small>
                </Card>
            </Col>
        </Row>

        {/* --- BOOKING TABLE --- */}
        <Card className="p-4 shadow-lg border-0" style={{ background: "rgba(255, 255, 255, 0.05)" }}>
            {loading ? (
                <div className="text-center py-5"><Spinner animation="border" variant="warning" /></div>
            ) : appointments.length > 0 ? (
                <div className="table-responsive">
                    <Table hover variant="dark" className="align-middle mb-0">
                        <thead>
                            <tr className="text-secondary">
                                <th>Customer</th>
                                <th>Vehicle</th>
                                <th>Service</th>
                                <th>Date & Time</th>
                                <th>Status</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appt) => (
                                <tr key={appt.id}>
                                    <td>
                                        <div className="fw-bold">{appt.ownerName}</div>
                                        <small className="text-white-50">{appt.userEmail}</small>
                                    </td>
                                    <td>{appt.vehicleNumber} <br/> <small className="text-white-50">{appt.vehicleModel}</small></td>
                                    <td><span className="text-info">{appt.serviceType}</span></td>
                                    <td>{appt.appointmentDate} <br/> <small>{appt.appointmentTime}</small></td>
                                    <td>
                                        <Badge bg={
                                            appt.status === 'Pending' ? 'warning' : 
                                            appt.status === 'Confirmed' ? 'primary' : 
                                            appt.status === 'Completed' ? 'success' : 'danger'
                                        } text={appt.status === 'Pending' ? 'dark' : 'white'}>
                                            {appt.status}
                                        </Badge>
                                    </td>
                                    <td className="text-end">
                                        {appt.status === 'Pending' && (
                                            <>
                                                <Button size="sm" variant="success" className="me-2" onClick={() => handleStatusChange(appt.id, 'Confirmed')}>Accept</Button>
                                                <Button size="sm" variant="danger" onClick={() => handleStatusChange(appt.id, 'Rejected')}>Reject</Button>
                                            </>
                                        )}
                                        {appt.status === 'Confirmed' && (
                                            <Button size="sm" variant="info" onClick={() => handleStatusChange(appt.id, 'Completed')}>Mark Done</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div className="text-center py-5 text-white-50">
                    <i className="bi bi-inbox display-4 mb-3 d-block"></i>
                    No appointments found for this garage.
                </div>
            )}
        </Card>
      </Container>
    </div>
  );
};

export default GarageDashboard;