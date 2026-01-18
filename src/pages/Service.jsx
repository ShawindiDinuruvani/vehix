import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Spinner, Alert, Badge } from "react-bootstrap";
import ServiceMap from "../components/ServiceMap"; 
import axios from "../api/axios"; 
import "./Service.css";

const commonIssues = [
  { name: "Dead Battery", icon: "bi-battery-half" },
  { name: "Engine Overheating", icon: "bi-thermometer-high" },
  { name: "Flat Tire", icon: "bi-disc" },
  { name: "Out of Fuel", icon: "bi-fuel-pump" },
  { name: "Brake Failure", icon: "bi-exclamation-octagon" },
  { name: "Locked Out", icon: "bi-key" },
  { name: "Other", icon: "bi-question-circle" },
];

const Service = () => {
  const savedName = localStorage.getItem("fullName") || "";

  const [formData, setFormData] = useState({
    vehicleNumber: "", 
    vehicleModel: "", 
    ownerName: savedName, 
    issue: "", 
    additionalNotes: ""
  });

  const [allGarages, setAllGarages] = useState([]); 
  const [nearbyGarages, setNearbyGarages] = useState([]); 
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMapPage, setShowMapPage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [requestSending, setRequestSending] = useState(false);

  useEffect(() => {
    if (savedName) {
        setFormData(prev => ({ ...prev, ownerName: savedName }));
    }
    fetchRegisteredGarages();
  }, [savedName]);

  const fetchRegisteredGarages = async () => {
    try {
      const response = await axios.get("/api/users/garages");
      const formattedData = response.data.map(user => ({
        id: user.id,
        name: user.businessName || "Garage",
        address: user.businessAddress,
        phone: user.contactNumber || "Not Available", // 🔥 Phone Number එක ගන්නවා
        lat: user.latitude || 6.9271, 
        lng: user.longitude || 79.8612
      }));
      setAllGarages(formattedData);
    } catch (error) {
      console.error("Error fetching garages:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIssueClick = (issueName) => {
    setFormData({ ...formData, issue: issueName });
  };

  const handleFindGarages = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          setUserLocation({ lat: userLat, lng: userLng });

          const nearby = allGarages.filter((garage) => {
             const latDiff = Math.abs(garage.lat - userLat);
             const lngDiff = Math.abs(garage.lng - userLng);
             return latDiff < 0.1 && lngDiff < 0.1;
          });

          if (nearby.length > 0) {
              setNearbyGarages(nearby);
          } else {
              alert("No nearby garages found! Showing all available centers.");
              setNearbyGarages(allGarages);
          }

          setLoading(false);
          setShowMapPage(true);
        },
        (error) => {
          setLoading(false);
          setErrorMsg("Could not access location. Please enable GPS.");
        }
      );
    } else {
      setLoading(false);
      setErrorMsg("Geolocation not supported.");
    }
  };

  const handleSendRequest = async (garage) => {
    if(!window.confirm(`Send request to ${garage.name}?`)) return;

    setRequestSending(true);

    const requestData = {
        ownerName: formData.ownerName,
        vehicleNumber: formData.vehicleNumber,
        vehicleModel: formData.vehicleModel,
        issue: formData.issue,
        additionalNotes: formData.additionalNotes,
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        garageId: garage.id 
    };

    try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        await axios.post("/api/service/request", requestData, config);
        
        alert(`✅ Request sent to ${garage.name} successfully! They will contact you shortly.`);
        window.location.href = "/history"; 

    } catch (err) {
        console.error("Failed to save request:", err);
        alert("Failed to send request. Please try again.");
    } finally {
        setRequestSending(false);
    }
  };

  // --- MAP VIEW ---
  if (showMapPage) {
    return (
      <div className="full-screen-map-container" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 2000, background: "#121212", overflowY: "auto" }}>
        
        {/* Header */}
        <div className="p-3 bg-dark d-flex justify-content-between align-items-center border-bottom border-secondary sticky-top">
            <div>
                <h4 className="text-white m-0"><i className="bi bi-geo-alt-fill text-danger me-2"></i> Select a Garage</h4>
                <small className="text-white-50">Found {nearbyGarages.length} nearby mechanics</small>
            </div>
            <Button variant="outline-light" onClick={() => setShowMapPage(false)}>
                <i className="bi bi-arrow-left me-2"></i> Back
            </Button>
        </div>

        <Container fluid className="p-3">
            <Row>
                <Col lg={8} className="mb-3">
                    <div style={{ height: "60vh", borderRadius: "15px", overflow: "hidden", border: "2px solid rgba(255,255,255,0.1)" }}>
                        <ServiceMap serviceCenters={nearbyGarages} userLocation={userLocation} />
                    </div>
                </Col>

                <Col lg={4}>
                    <h5 className="text-white mb-3">Available Mechanics</h5>
                    <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                        {nearbyGarages.map((garage) => (
                            <Card key={garage.id} className="mb-3 p-3 shadow-sm glass-card border-0">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <div>
                                        <h5 className="text-white fw-bold mb-1">{garage.name}</h5>
                                        <p className="text-white-50 small mb-0"><i className="bi bi-geo-alt me-1"></i> {garage.address}</p>
                                    </div>
                                    <Badge bg="success">Online</Badge>
                                </div>
                                
                                {/* 🔥 Phone Number Section - Highlighted */}
                                <div className="d-flex align-items-center mb-3 p-2 rounded" style={{background: 'rgba(255, 255, 255, 0.1)'}}>
                                    <i className="bi bi-telephone-fill text-warning fs-5 me-2"></i>
                                    {/* Click කළාම Call එක යන විදියට href="tel:" දැම්මා */}
                                    <a href={`tel:${garage.phone}`} className="text-white fw-bold text-decoration-none fs-5 stretched-link" style={{position: 'relative', zIndex: 2}}>
                                        {garage.phone}
                                    </a>
                                </div>

                                {/* Request Button */}
                                <Button 
                                    variant="danger" 
                                    className="w-100 fw-bold py-2" 
                                    onClick={() => handleSendRequest(garage)}
                                    disabled={requestSending}
                                    style={{position: 'relative', zIndex: 3}} // Link එකට උඩින් click වෙන්න
                                >
                                    {requestSending ? "SENDING..." : "REQUEST HELP HERE"} 
                                    <i className="bi bi-send-fill ms-2"></i>
                                </Button>
                            </Card>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
      </div>
    );
  }

  // --- FORM VIEW ---
  return (
    <div className="service-page">
      <Container className="pt-5 pb-5">
        <div className="text-center text-white mb-5">
          <h1 className="fw-bold display-5">Emergency Assistance</h1>
          <p className="lead text-white-50">Tell us the problem, then choose a mechanic.</p>
        </div>

        {errorMsg && <Alert variant="danger" className="text-center">{errorMsg}</Alert>}

        <Row className="gy-4">
          <Col lg={6}>
            <Card className="p-4 shadow-lg glass-card h-100">
              <div className="d-flex align-items-center mb-4">
                 <div className="icon-box bg-primary text-white rounded-circle me-3 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="bi bi-tools fs-4"></i>
                 </div>
                 <h4 className="mb-0 fw-bold text-white">Find Nearby Help</h4>
              </div>

              <Form onSubmit={handleFindGarages}>
                <Form.Group className="mb-3">
                   <Form.Label className="text-white-50">Owner Name</Form.Label>
                   <Form.Control type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required className="custom-input"/>
                </Form.Group>
                
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Vehicle Number</Form.Label>
                        <Form.Control type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} required className="custom-input"/>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label className="text-white-50">Vehicle Model</Form.Label>
                        <Form.Control type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required className="custom-input"/>
                        </Form.Group>
                    </Col>
                </Row>

                 <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Issue Type</Form.Label>
                  <Form.Select name="issue" value={formData.issue} onChange={handleChange} required className="custom-input">
                    <option value="">Select Issue...</option>
                    {commonIssues.map((item, index) => (
                      <option key={index} value={item.name}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" className="btn-primary w-100 py-3 fw-bold shadow-lg mt-2" disabled={loading}>
                  {loading ? <><Spinner as="span" animation="border" size="sm" className="me-2"/> SEARCHING GARAGES...</> : "FIND GARAGES"}
                </Button>
              </Form>
            </Card>
          </Col>

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