import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "./Service.css";

const commonIssues = [
  "Dead Battery",
  "Engine Issues",
  "Flat Tire",
  "Out of Fuel",
  "Overheating",
  "Electrical Problem",
  "Brake Issues",
  "Locked Out",
  "Transmission Problem",
  "AC/Heating Problem",
  "Other",
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
     <div className="service-page">
      <Container>
        <h2 className="mb-4 text-center text-white">Vehicle Service Request</h2>
        <Row className="gy-4">
          {/* Form Section */}
          <Col md={6}>
            {/* ✅ CHANGED: Added class "form-card" to make background white */}
            <Card className="p-4 shadow-sm form-card">
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
            <h5 className="mb-3 text-white">Common Issues</h5>
            {commonIssues.map((issue, index) => {
              const colorClasses = [
                "issue-primary",
                "issue-secondary",
                "issue-success",
                "issue-danger",
                "issue-warning",
                "issue-info",
                "issue-dark",
              ];
              const className =
                colorClasses[index % colorClasses.length] +
                " mb-2 p-3 shadow-sm";
              return (
                <Card key={index} className={className}>
                  {issue}
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Service;