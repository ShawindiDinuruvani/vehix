import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "./Service.css";

const commonIssues = [
  "Engine noise",
  "Oil leakage",
  "Brake issues",
  "Battery problem",
  "Tire wear",
];

const Service = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    ownerName: "",
    issue: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Service request submitted successfully!");
    setFormData({
      vehicleNumber: "",
      vehicleModel: "",
      ownerName: "",
      issue: "",
      additionalNotes: "",
    });
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Vehicle Service Request</h2>
      <Row className="gy-4">
        {/* Form Section */}
        <Col md={6}>
          <Card className="p-4 shadow-sm">
            <h5 className="mb-3">Vehicle Information</h5>
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

              <Form.Group className="mb-3">
                <Form.Label>Issue</Form.Label>
                <Form.Select
                  name="issue"
                  value={formData.issue}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an issue</option>
                  {commonIssues.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Additional Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  name="additionalNotes"
                  rows={3}
                  placeholder="Add more details (optional)"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button type="submit" className="btn-primary w-100">
                Submit Request
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Common Issues Section */}
        <Col md={6}>
          <h5 className="mb-3">Common Issues</h5>
          {commonIssues.map((issue, index) => (
            <Card key={index} className="mb-2 p-3 shadow-sm">
              {issue}
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Service;
