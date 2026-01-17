import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Badge, Toast, ToastContainer, Table, Modal } from "react-bootstrap";
import "./Appoinments.css";

const Appointments = () => {
  // --- DATA & STATE ---
  const garages = [
    { id: 1, name: "Auto Miraj Premium", location: "Colombo 07", rating: 4.8, type: "Hybrid Specialist", image: "https://cdn-icons-png.flaticon.com/512/2316/2316021.png" },
    { id: 2, name: "Nimal Motors", location: "Gampaha", rating: 4.5, type: "General Repair", image: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png" },
    { id: 3, name: "Sparkle Auto Care", location: "Kandy", rating: 4.9, type: "Detailing & Wash", image: "https://cdn-icons-png.flaticon.com/512/2042/2042840.png" },
    { id: 4, name: "TechWheel Garage", location: "Galle", rating: 4.2, type: "Engine Tuneup", image: "https://cdn-icons-png.flaticon.com/512/3204/3204043.png" },
  ];

  const [selectedGarage, setSelectedGarage] = useState(null);
  const [formData, setFormData] = useState({
    ownerName: "", vehicleNumber: "", vehicleModel: "", serviceType: "", appointmentDate: "", appointmentTime: "",
  });

  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("myAppointments")) || [];
    setAppointmentHistory(storedData);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBookNow = (garage) => {
    setSelectedGarage(garage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = { ...formData, garageName: selectedGarage.name, id: Date.now(), status: "Pending" };
    const updatedList = [...appointmentHistory, newAppointment];
    setAppointmentHistory(updatedList);
    localStorage.setItem("myAppointments", JSON.stringify(updatedList));

    setShowToast(true);
    setSelectedGarage(null);
    setFormData({ ownerName: "", vehicleNumber: "", vehicleModel: "", serviceType: "", appointmentDate: "", appointmentTime: "" });
  };

  const handleDelete = (id) => {
    if(window.confirm("Cancel this appointment?")) {
      const updatedList = appointmentHistory.filter(app => app.id !== id);
      setAppointmentHistory(updatedList);
      localStorage.setItem("myAppointments", JSON.stringify(updatedList));
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`bi bi-star${i < Math.round(rating) ? "-fill text-warning" : " text-white-50"} me-1`}></i>
    ));
  };

  return (
    <div className="appointment-page min-vh-100 py-5 position-relative">
      <Container>
        
        {/* 🔥 NOTIFICATION BELL ICON (LOWERED POSITION) */}
        {/* 'top: 90px' මගින් එය Navbar එකට යටින් පිහිටුවයි */}
        <div 
            className="position-fixed end-0 me-4 p-2 cursor-pointer notification-bell" 
            style={{ zIndex: 1050, top: '90px' }} 
            onClick={() => setShowModal(true)}
        >
            <div className="bg-dark bg-opacity-75 p-3 rounded-circle border border-secondary shadow-lg position-relative">
                <i className="bi bi-bell-fill text-white fs-4"></i>
                {appointmentHistory.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">
                        {appointmentHistory.length}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                )}
            </div>
        </div>

        {/* Success Toast */}
        <ToastContainer position="top-center" className="p-3" style={{ zIndex: 9999, position: 'fixed' }}>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success">
            <Toast.Header><strong className="me-auto text-success">Vehix</strong></Toast.Header>
            <Toast.Body className="text-white fw-bold">Booking Request Sent Successfully!</Toast.Body>
          </Toast>
        </ToastContainer>

        <div className="text-center text-white mb-5">
          <h1 className="fw-bold display-5">Find & Book Mechanics</h1>
          <p className="lead text-white-50">Select a garage below to book your service.</p>
        </div>

        {/* --- GARAGE LIST --- */}
        {!selectedGarage && (
            <Row className="g-4 justify-content-center animate-fade">
                {garages.map((garage) => (
                    <Col xl={3} lg={4} md={6} key={garage.id}>
                        <Card className="glass-card h-100 text-center p-3 service-card-hover">
                            <div className="mx-auto bg-white rounded-circle p-2 mb-3" style={{width:'80px', height:'80px'}}>
                                <img src={garage.image} alt={garage.name} width="100%" />
                            </div>
                            <h5 className="text-white fw-bold mb-1">{garage.name}</h5>
                            <p className="text-white-50 small mb-2"><i className="bi bi-geo-alt-fill text-danger"></i> {garage.location}</p>
                            <div className="mb-2">{renderStars(garage.rating)}</div>
                            <Badge bg="info" text="dark" className="mb-3 d-inline-block mx-auto">{garage.type}</Badge>
                            <Button variant="primary" className="w-100 fw-bold mt-auto" onClick={() => handleBookNow(garage)}>Book Now</Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        )}

        {/* --- BOOKING FORM --- */}
        {selectedGarage && (
            <Row className="justify-content-center animate-fade">
                <Col lg={6}>
                    <Card className="p-4 shadow-lg glass-card">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="text-white mb-0">Book Appointment</h3>
                            <Button variant="outline-light" size="sm" onClick={() => setSelectedGarage(null)}>
                                <i className="bi bi-arrow-left me-1"></i> Back
                            </Button>
                        </div>
                        <div className="p-3 rounded bg-primary bg-opacity-25 mb-4 border border-primary">
                            <h5 className="text-white mb-0 fw-bold">{selectedGarage.name}</h5>
                            <small className="text-white-50">{selectedGarage.location} | {selectedGarage.rating} Stars</small>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3"><Form.Label className="text-white-50">Owner Name</Form.Label><Form.Control type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="custom-input"/></Form.Group>
                            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label className="text-white-50">Vehicle Number</Form.Label><Form.Control type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required className="custom-input"/></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label className="text-white-50">Model</Form.Label><Form.Control type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required className="custom-input"/></Form.Group></Col></Row>
                            <Form.Group className="mb-3"><Form.Label className="text-white-50">Service Type</Form.Label><Form.Select name="serviceType" value={formData.serviceType} onChange={handleChange} required className="custom-input"><option value="">Select Service...</option><option value="Full Service">Full Service</option><option value="Oil Change">Oil Change</option><option value="Repair">General Repair</option><option value="Inspection">Inspection</option></Form.Select></Form.Group>
                            <Row><Col md={6}><Form.Group className="mb-3"><Form.Label className="text-white-50">Date</Form.Label><Form.Control type="date" name="appointmentDate" min={new Date().toISOString().split("T")[0]} value={formData.appointmentDate} onChange={handleChange} required className="custom-input"/></Form.Group></Col><Col md={6}><Form.Group className="mb-3"><Form.Label className="text-white-50">Time</Form.Label><Form.Control type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required className="custom-input"/></Form.Group></Col></Row>
                            <Button type="submit" className="btn-success w-100 fw-bold py-2 mt-2">CONFIRM BOOKING</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )}

        {/* --- LIGHTBOX MODAL --- */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered contentClassName="bg-dark text-white border-0 glass-card">
            <Modal.Header closeButton closeVariant="white" className="border-secondary">
                <Modal.Title><i className="bi bi-calendar-check-fill me-2 text-warning"></i>My Upcoming Appointments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {appointmentHistory.length > 0 ? (
                    <div className="table-responsive">
                        <Table hover className="mb-0 text-white align-middle" style={{background: 'transparent'}}>
                            <thead className="bg-secondary bg-opacity-25">
                                <tr>
                                    <th>Garage</th>
                                    <th>Vehicle</th>
                                    <th>Date/Time</th>
                                    <th>Status</th>
                                    <th className="text-end">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointmentHistory.map((appt) => (
                                    <tr key={appt.id} style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                                        <td className="fw-bold text-info">{appt.garageName}</td>
                                        <td>{appt.vehicleNumber} <br/><small className="text-white-50">{appt.serviceType}</small></td>
                                        <td>{appt.appointmentDate} <br/><small className="text-white-50">{appt.appointmentTime}</small></td>
                                        <td><Badge bg="warning" text="dark">{appt.status}</Badge></td>
                                        <td className="text-end">
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(appt.id)}>
                                                <i className="bi bi-x-lg"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <i className="bi bi-calendar-x display-1 text-white-50"></i>
                        <p className="mt-3 text-white-50">No upcoming appointments found.</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="border-secondary">
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
};

export default Appointments;