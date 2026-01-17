import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card, Spinner } from "react-bootstrap";
import ServiceMap from "../components/ServiceMap"; 
import "./Service.css";

// Common vehicle issues
const commonIssues = [
  { name: "Dead Battery", icon: "bi-battery-dead" },
  { name: "Engine Overheating", icon: "bi-thermometer-high" },
  { name: "Flat Tire", icon: "bi-disc" },
  { name: "Out of Fuel", icon: "bi-fuel-pump" },
  { name: "Brake Failure", icon: "bi-exclamation-octagon" },
  { name: "Locked Out", icon: "bi-key" },
  { name: "Transmission", icon: "bi-gear-wide-connected" },
  { name: "Electrical Issue", icon: "bi-lightning-charge" },
  { name: "Other", icon: "bi-question-circle" },
];

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
  const [loading, setLoading] = useState(false);
  
  // 🔥 Map එක පෙන්වීමට අලුත් State එකක්
  const [showMapPage, setShowMapPage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIssueClick = (issueName) => {
    setFormData({ ...formData, issue: issueName });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;

          const nearby = sampleServiceCenters.filter(
            (c) =>
              Math.abs(c.lat - userLat) < 0.1 &&
              Math.abs(c.lng - userLng) < 0.1
          );

          setServiceCenters(nearby.length > 0 ? nearby : sampleServiceCenters);
          setUserLocation({ lat: userLat, lng: userLng });
          
          setLoading(false);
          setShowMapPage(true); // ✅ Form එක සඟවා Map එක පෙන්වන්න
        },
        (error) => {
          console.error("Location error:", error);
          setLoading(false);
          alert("Could not access location. Please enable GPS.");
        }
      );
    } else {
      setLoading(false);
      alert("Geolocation is not supported.");
    }
  };

  // ✅ 1. Map Page View (Full Screen)
  if (showMapPage) {
    return (
      <div className="full-screen-map-container">
        {/* Top Bar with Back Button */}
        <div className="map-header p-3 bg-dark d-flex justify-content-between align-items-center">
            <h4 className="text-white m-0">
                <i className="bi bi-geo-alt-fill text-danger me-2"></i> 
                Garages Near You
            </h4>
            <Button variant="outline-light" onClick={() => setShowMapPage(false)}>
                <i className="bi bi-arrow-left me-2"></i> Back to Form
            </Button>
        </div>

        {/* Full Screen Map */}
        <div style={{ height: "calc(100vh - 80px)", width: "100%" }}>
            <ServiceMap serviceCenters={serviceCenters} userLocation={userLocation} />
        </div>
      </div>
    );
  }

  // ✅ 2. Normal Form View
  return (
    <div className="service-page">
      <Container className="pt-5 pb-5">
        <div className="text-center text-white mb-5">
          <h1 className="fw-bold display-5">Emergency Assistance</h1>
          <p className="lead text-white-50">Tell us the problem, we'll find the help.</p>
        </div>

        <Row className="gy-4">
          {/* LEFT SIDE: Form */}
          <Col lg={6}>
            <Card className="p-4 shadow-lg glass-card h-100">
              <div className="d-flex align-items-center mb-4">
                 <div className="icon-box bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-tools fs-4"></i>
                 </div>
                 <h4 className="mb-0 fw-bold text-white">Request Service</h4>
              </div>

              <Form onSubmit={handleSubmit}>
                {/* ... (Form Fields same as before) ... */}
                <Form.Group className="mb-3">
                   <Form.Label className="text-white-50">Owner Name</Form.Label>
                   <Form.Control type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
                </Form.Group>
                
                {/* ... Add other form fields here as per previous code ... */}
                {/* For brevity, I am keeping the structure same. Add your inputs back here */}
                 <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Vehicle Number</Form.Label>
                        <Form.Control type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Vehicle Model</Form.Label>
                        <Form.Control type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>

                 <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Issue Type</Form.Label>
                  <Form.Select name="issue" value={formData.issue} onChange={handleChange} required>
                    <option value="">Select Issue...</option>
                    {commonIssues.map((item, index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="btn-primary w-100 py-3 fw-bold shadow-lg" disabled={loading}>
                  {loading ? <Spinner as="span" animation="border" size="sm" /> : "FIND HELP NOW"}
                </Button>
              </Form>
            </Card>
          </Col>

          {/* RIGHT SIDE: Quick Select */}
          <Col lg={6}>
            <div className="h-100 d-flex flex-column">
                <h5 className="text-white mb-3 ms-2">Quick Select Issue</h5>
                <Row className="g-3">
                {commonIssues.map((issue, index) => (
                    <Col xs={6} md={4} key={index}>
                    <div className={`issue-card p-3 text-center rounded-3 cursor-pointer ${formData.issue === issue.name ? 'active-issue' : ''}`} onClick={() => handleIssueClick(issue.name)}>
                        <i className={`bi ${issue.icon} display-6 mb-2 d-block`}></i>
                        <span className="small fw-bold">{issue.name}</span>
                    </div>
                    </Col>
                ))}
                </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Service;