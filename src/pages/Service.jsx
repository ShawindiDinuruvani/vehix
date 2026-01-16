// src/pages/Service.jsx
import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import ServiceMap from "../components/ServiceMap";
import "./Service.css";
import axios from "../api/axios";

// Common vehicle issues


const commonIssues = [
  "Dead Battery", "Engine Issues", "Flat Tire", "Out of Fuel", "Overheating",
  "Electrical Problem", "Brake Issues", "Locked Out", "Transmission Problem",
  "AC/Heating Problem", "Other",
];

// Sample service centers
const sampleServiceCenters = [
  { name: "City Auto Service", address: "123 Colombo Rd", lat: 6.9271, lng: 79.8612 },
  { name: "QuickFix Garage", address: "456 Kandy Rd", lat: 6.9147, lng: 79.9723 },
  { name: "AutoPro Center", address: "789 Galle Rd", lat: 6.9025, lng: 79.8578 },
];

const Service = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    vehicleModel: "",
    ownerName: "",
    issue: "",
    additionalNotes: "",
  });

  const [serviceCenters, setServiceCenters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Form submitted:", formData);

  // 🧭 Get user location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      console.log("User Location:", userLat, userLng);

      // Show nearby garages based on user location
      const nearby = sampleServiceCenters.filter(
        (c) =>
          Math.abs(c.lat - userLat) < 0.1 &&
          Math.abs(c.lng - userLng) < 0.1
      );

      setServiceCenters(nearby);
      setUserLocation({ lat: userLat, lng: userLng }); //  store in state

      alert("Service request submitted! Showing nearby garages.");
    },
    (error) => {
      console.error("Location error:", error);
      alert("Please allow location access to show nearby garages.");
    }
  );

  // Reset form after submission
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
                      <option key={index} value={item}>{item}</option>
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

                <Button type="submit" className="btn-primary w-100">Submit Request</Button>
              </Form>
            </Card>
          </Col>

          {/* Common Issues Section */}
          <Col md={6}>
            <h5 className="mb-3 text-white">Common Issues</h5>
            {commonIssues.map((issue, index) => {
              const colorClasses = [
                "issue-primary", "issue-secondary", "issue-success",
                "issue-danger", "issue-warning", "issue-info", "issue-dark"
              ];
              const className = colorClasses[index % colorClasses.length] + " mb-2 p-3 shadow-sm commonissue";
              return <Card key={index} className={className}>{issue}</Card>;
            })}
          </Col>
        </Row>

        {/* Map Section */}
        {serviceCenters.length > 0 && (
          <div className="mt-5">
            <h5 className="text-white mb-3">Nearby Service Centers</h5>
              <ServiceMap serviceCenters={serviceCenters} userLocation={userLocation} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default Service;
