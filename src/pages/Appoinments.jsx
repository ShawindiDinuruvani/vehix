import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Table, Badge, Toast, ToastContainer } from "react-bootstrap";
import "./Appoinments.css"; // ෆයිල් එකේ නම Appointments.css ලෙස තිබිය යුතුයි

const Appointments = () => {
  // 1. Form Data State
  const [formData, setFormData] = useState({
    ownerName: "",
    vehicleNumber: "",
    vehicleModel: "",
    serviceType: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  // 2. History & Notification State
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [showToast, setShowToast] = useState(false); // Notification එක පාලනය කිරීමට

  // 3. Load Data (Local Storage)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("myAppointments")) || [];
    setAppointmentHistory(storedData);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newAppointment = {
      ...formData,
      id: Date.now(),
      status: "Pending"
    };

    // Update List & Storage
    const updatedList = [...appointmentHistory, newAppointment];
    setAppointmentHistory(updatedList);
    localStorage.setItem("myAppointments", JSON.stringify(updatedList));

    // Show Notification
    setShowToast(true);

    // Reset Form
    setFormData({
      ownerName: "",
      vehicleNumber: "",
      vehicleModel: "",
      serviceType: "",
      appointmentDate: "",
      appointmentTime: "",
    });
  };

  const handleDelete = (id) => {
    if(window.confirm("Delete this appointment?")) {
      const updatedList = appointmentHistory.filter((item) => item.id !== id);
      setAppointmentHistory(updatedList);
      localStorage.setItem("myAppointments", JSON.stringify(updatedList));
    }
  };

  return (
    <div className="appointment-page min-vh-100 py-5">
      <Container>
        
        {/* 🔥 NOTIFICATION TOAST (Booking එකක් දැමූ විට එන පණිවිඩය) */}
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={4000} autohide bg="success">
            <Toast.Header>
              <strong className="me-auto text-success">Vehix App</strong>
              <small>Just now</small>
            </Toast.Header>
            <Toast.Body className="text-white fw-bold">
              ✅ Booking Successful! <br/> Your schedule has been updated.
            </Toast.Body>
          </Toast>
        </ToastContainer>

        <div className="text-center text-white mb-5">
          <h1 className="fw-bold display-5">Service Booking & History</h1>
          <p className="lead text-white-50">Book a new service or view your upcoming schedule.</p>
        </div>

        <Row className="justify-content-center gy-4">
          
          {/* ==========================
              LEFT: BOOKING FORM 
             ========================== */}
          <Col lg={5}>
            <Card className="p-4 shadow-lg glass-card h-100">
              <h3 className="text-white mb-4"><i className="bi bi-plus-circle me-2"></i>New Appointment</h3>
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                    className="custom-input"
                  />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Vehicle Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="vehicleNumber"
                            placeholder="WP ABC-1234"
                            value={formData.vehicleNumber}
                            onChange={handleChange}
                            required
                            className="custom-input"
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Model</Form.Label>
                        <Form.Control
                            type="text"
                            name="vehicleModel"
                            value={formData.vehicleModel}
                            onChange={handleChange}
                            required
                            className="custom-input"
                        />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label className="text-white-50">Service Type</Form.Label>
                    <Form.Select 
                        name="serviceType" 
                        value={formData.serviceType} 
                        onChange={handleChange} 
                        required 
                        className="custom-input"
                    >
                        <option value="">Select Service...</option>
                        <option value="Full Service">Full Service</option>
                        <option value="Oil Change">Oil Change</option>
                        <option value="Repair">General Repair</option>
                        <option value="Inspection">Inspection</option>
                    </Form.Select>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white-50">Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="appointmentDate"
                        min={new Date().toISOString().split("T")[0]}
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white-50">Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                        className="custom-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button type="submit" className="btn-primary w-100 fw-bold py-2 mt-2">
                  CONFIRM BOOKING
                </Button>
              </Form>
            </Card>
          </Col>

          {/* ==========================
              RIGHT: SCHEDULE / HISTORY
             ========================== */}
          <Col lg={7}>
            <Card className="p-4 shadow-lg glass-card h-100">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="text-white mb-0"><i className="bi bi-clock-history me-2"></i>My Appointments</h3>
                    <Badge bg="primary">{appointmentHistory.length} Bookings</Badge>
                </div>

                {appointmentHistory.length > 0 ? (
                    <div className="table-responsive">
                        <Table className="table-glass align-middle" hover>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentHistory.map((appt) => (
                                    <tr key={appt.id}>
                                        <td>
                                            <div className="fw-bold text-white">{appt.serviceType}</div>
                                            <div className="text-white-50 small">
                                                <i className="bi bi-calendar me-1"></i>{appt.appointmentDate} at {appt.appointmentTime}
                                            </div>
                                            <div className="text-muted small">{appt.vehicleNumber}</div>
                                        </td>
                                        <td>
                                            <Badge bg={appt.status === "Completed" ? "success" : "warning"}>
                                                {appt.status}
                                            </Badge>
                                        </td>
                                        <td>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                onClick={() => handleDelete(appt.id)}
                                            >
                                                <i className="bi bi-x-lg"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-5 d-flex flex-column align-items-center justify-content-center h-75">
                        <div className="p-3 mb-3 border border-secondary rounded p-4 text-white-50" style={{borderStyle: 'dashed !important'}}>
                             <i className="bi bi-calendar-x display-4"></i>
                        </div>
                        <p className="text-white-50">No appointments found. Book your first service now!</p>
                    </div>
                )}
            </Card>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Appointments;