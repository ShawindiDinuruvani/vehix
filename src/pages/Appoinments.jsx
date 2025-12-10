import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "./Appoinments.css";

const Appointments = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    vehicleNumber: "",
    vehicleModel: "",
    appointmentDate: "",
    appointmentTime: "",
    mechanic: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment booked:", formData);
    alert("Your appointment has been successfully booked!");
    setFormData({
      ownerName: "",
      vehicleNumber: "",
      vehicleModel: "",
      appointmentDate: "",
      appointmentTime: "",
      mechanic: "",
      notes: "",
    });
  };

  return (
    <div className="appointment-page">
      <Container>
        <h2 className="text-center mb-4 text-white">Book a Service Appointment</h2>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 shadow-lg glass-card">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="ownerName"
                    placeholder="Enter owner name"
                    value={formData.ownerName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleNumber"
                    placeholder="Enter vehicle number"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Vehicle Model</Form.Label>
                  <Form.Control
                    type="text"
                    name="vehicleModel"
                    placeholder="Enter vehicle model"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Preferred Mechanic (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    name="mechanic"
                    placeholder="Enter mechanic name"
                    value={formData.mechanic}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="notes"
                    rows={3}
                    placeholder="Add notes or details"
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button type="submit" className="btn-primary w-100">
                  Book Appointment
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Appointments;
