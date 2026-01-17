import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Badge, Toast, ToastContainer, Table, Modal } from "react-bootstrap";
import axios from "../api/axios"; // axios 
import "./Appoinments.css";

const Appointments = () => {
  // --- STATE ---
  const [garages, setGarages] = useState([]); 
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [formData, setFormData] = useState({
    ownerName: "", vehicleNumber: "", vehicleModel: "", serviceType: "", appointmentDate: "", appointmentTime: "",
  });

  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // User Email & Role (LocalStorage )
  const currentUserEmail = localStorage.getItem("userEmail");
  
  // --- 1. LOAD DATA ---
  useEffect(() => {
    fetchGarages();      
    if(currentUserEmail) {
        fetchAppointments(); 
    }
  }, [currentUserEmail]);

  // 🔥 1.1 Fetch Registered Garages
  const fetchGarages = async () => {
    try {
      const response = await axios.get("/api/users/garages");
      
      
      const formattedGarages = response.data.map(user => ({
        id: user.id,
        name: user.businessName || user.fullName || "Unnamed Garage", // businessName 
        location: user.businessAddress || "Sri Lanka", // businessAddress 
        rating: 4.5, 
        type: "General Service",
        image: "https://cdn-icons-png.flaticon.com/512/1995/1995470.png"
      }));
      setGarages(formattedGarages);
    } catch (error) {
      console.error("Error fetching garages:", error);
    }
  };

  // 1.2 Fetch My Appointments
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`/api/appointments/my-appointments/${currentUserEmail}`);
      setAppointmentHistory(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBookNow = (garage) => {
    setSelectedGarage(garage);
    setEditingId(null);
    setFormData({ ownerName: "", vehicleNumber: "", vehicleModel: "", serviceType: "", appointmentDate: "", appointmentTime: "" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- 2. SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUserEmail) {
        alert("Please Login First!");
        return;
    }

    const appointmentData = {
      ...formData,
      garageName: selectedGarage.name, 
      userEmail: currentUserEmail,
      status: "Pending"
    };

    try {
      if (editingId) {
        await axios.put(`/api/appointments/update/${editingId}`, appointmentData);
        alert("Appointment Updated!");
      } else {
        await axios.post("/api/appointments/book", appointmentData);
        setShowToast(true);
      }
      setSelectedGarage(null);
      setEditingId(null);
      fetchAppointments();
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to book appointment.");
    }
  };

  // --- 3. EDIT & DELETE ---
  const handleEdit = (appt) => {
    const garage = garages.find(g => g.name === appt.garageName);
    setSelectedGarage(garage || { name: appt.garageName, location: "Unknown", rating: 0 });

    setFormData({
        ownerName: appt.ownerName,
        vehicleNumber: appt.vehicleNumber,
        vehicleModel: appt.vehicleModel,
        serviceType: appt.serviceType,
        appointmentDate: appt.appointmentDate,
        appointmentTime: appt.appointmentTime
    });

    setEditingId(appt.id);
    setShowModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if(window.confirm("Cancel appointment?")) {
      await axios.delete(`/api/appointments/delete/${id}`);
      fetchAppointments();
    }
  };

  const handleClearAll = async () => {
    if (window.confirm("Delete ALL appointments?")) {
        for (let app of appointmentHistory) {
            await axios.delete(`/api/appointments/delete/${app.id}`);
        }
        fetchAppointments();
        setShowModal(false);
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
        
        {/* BELL ICON */}
        <div className="position-fixed end-0 me-4 p-2 cursor-pointer notification-bell" style={{ zIndex: 1050, top: '90px' }} onClick={() => setShowModal(true)}>
            <div className="bg-dark bg-opacity-75 p-3 rounded-circle border border-secondary shadow-lg position-relative">
                <i className="bi bi-bell-fill text-white fs-4"></i>
                {appointmentHistory.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{appointmentHistory.length}</span>
                )}
            </div>
        </div>

        <ToastContainer position="top-center" className="p-3"><Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success"><Toast.Header><strong className="me-auto">Vehix</strong></Toast.Header><Toast.Body className="text-white">Booking Sent!</Toast.Body></Toast></ToastContainer>

        <div className="text-center text-white mb-5">
          <h1 className="fw-bold display-5">Find & Book Mechanics</h1>
          <p className="lead text-white-50">Select a registered garage below to book your service.</p>
        </div>

        {/* --- GARAGE LIST --- */}
        {!selectedGarage && (
            <Row className="g-4 justify-content-center animate-fade">
                {garages.length > 0 ? (
                    garages.map((garage) => (
                        <Col xl={3} lg={4} md={6} key={garage.id}>
                            <Card className="glass-card h-100 text-center p-3 service-card-hover">
                                <div className="mx-auto bg-white rounded-circle p-2 mb-3" style={{width:'80px', height:'80px'}}>
                                    <img src={garage.image} alt="garage" width="100%" />
                                </div>
                                <h5 className="text-white fw-bold mb-1">{garage.name}</h5>
                                <p className="text-white-50 small mb-2"><i className="bi bi-geo-alt-fill text-danger"></i> {garage.location}</p>
                                <div className="mb-2">{renderStars(garage.rating)}</div>
                                <Badge bg="info" text="dark" className="mb-3 d-inline-block mx-auto">{garage.type}</Badge>
                                <Button variant="primary" className="w-100 fw-bold mt-auto" onClick={() => handleBookNow(garage)}>Book Now</Button>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-white text-center">No garages registered yet.</p>
                )}
            </Row>
        )}

        {/* --- BOOKING FORM --- */}
        {selectedGarage && (
            <Row className="justify-content-center animate-fade">
                <Col lg={6}>
                    <Card className="p-4 shadow-lg glass-card">
                        <div className="d-flex justify-content-between mb-4">
                            <h3 className="text-white">{editingId ? "Edit Appointment" : "Book Appointment"}</h3>
                            <Button variant="outline-light" size="sm" onClick={() => { setSelectedGarage(null); setEditingId(null); }}>Back</Button>
                        </div>
                        <div className="p-3 rounded bg-primary bg-opacity-25 mb-4 border border-primary">
                            <h5 className="text-white mb-0 fw-bold">{selectedGarage.name}</h5>
                            <small className="text-white-50">{selectedGarage.location}</small>
                        </div>
                        <Form onSubmit={handleSubmit}>
                            <Form.Control type="text" name="ownerName" placeholder="Your Name" value={formData.ownerName} onChange={handleChange} required className="mb-3 custom-input"/>
                            <Row><Col><Form.Control type="text" name="vehicleNumber" placeholder="Vehicle No" value={formData.vehicleNumber} onChange={handleChange} required className="mb-3 custom-input"/></Col><Col><Form.Control type="text" name="vehicleModel" placeholder="Model" value={formData.vehicleModel} onChange={handleChange} required className="mb-3 custom-input"/></Col></Row>
                            <Form.Select name="serviceType" value={formData.serviceType} onChange={handleChange} required className="mb-3 custom-input"><option value="">Select Service</option><option value="Full Service">Full Service</option><option value="Oil Change">Oil Change</option><option value="Repair">Repair</option></Form.Select>
                            <Row><Col><Form.Control type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required className="mb-3 custom-input"/></Col><Col><Form.Control type="time" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} required className="mb-3 custom-input"/></Col></Row>
                            <Button type="submit" className={`w-100 fw-bold py-2 ${editingId ? "btn-warning" : "btn-success"}`}>{editingId ? "UPDATE" : "CONFIRM"}</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        )}

        {/* --- MODAL --- */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered contentClassName="bg-dark text-white border-0 glass-card">
            <Modal.Header closeButton closeVariant="white"><Modal.Title>My Appointments</Modal.Title></Modal.Header>
            <Modal.Body>
                {appointmentHistory.length > 0 ? (
                    <Table hover className="text-white align-middle" style={{background: 'transparent'}}>
                        <thead><tr><th>Garage</th><th>Details</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {appointmentHistory.map((appt) => (
                                <tr key={appt.id}>
                                    <td><span className="text-info">{appt.garageName}</span><br/><small>{appt.appointmentDate}</small></td>
                                    <td>{appt.vehicleNumber}<br/><small>{appt.serviceType}</small></td>
                                    <td><Badge bg={appt.status==='Pending'?'warning':'success'}>{appt.status}</Badge></td>
                                    <td>
                                        <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleEdit(appt)}><i className="bi bi-pencil"></i></Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(appt.id)}><i className="bi bi-trash"></i></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : <p className="text-center text-white-50">No appointments yet.</p>}
            </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>{appointmentHistory.length>0 && <Button variant="danger" onClick={handleClearAll}>Clear All</Button>}</Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
};

export default Appointments;