import React from "react";
import { Container, Row, Col, Navbar, Nav, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // useNavigate එකතු කළා
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // 🔐 Login වී ඇත්දැයි පරීක්ෂා කර අදාළ පිටුවට යවන Function එක
  const handleNavigation = (destination) => {
    const token = localStorage.getItem("token"); // Token එක තිබේදැයි බලන්න

    if (token) {
      // Login වී ඇත්නම් කෙලින්ම අදාළ පිටුවට යන්න
      navigate(destination);
    } else {
      // Login වී නැත්නම්, Login page එකට යන්න (Login වූ පසු යන්න ඕන තැන state එකක් ලෙස යවමු)
      navigate("/login", { state: { from: destination } });
    }
  };

  return (
    <div className="home-page d-flex flex-column min-vh-100">
      
    
          

      {/* 2. Hero Section */}
      <section className="hero-section d-flex align-items-center text-center text-white">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-index-1">
          <h1 className="display-3 fw-bold hero-title">Care For Your Car, <span className="text-primary">The Right Way</span></h1>
          <p className="lead hero-subtitle mb-4">
            Find nearby garages, schedule appointments, and track vehicle health instantly.
          </p>
          <div className="hero-buttons">
            {/* Find a Garage Button - Smart Navigation */}
            <Button 
                className="btn btn-primary btn-lg me-3 px-5 py-3 fw-bold"
                onClick={() => handleNavigation("/service")}
            >
                Find a Garage
            </Button>
            
            <Link to="/login">
              <button className="btn btn-outline-light btn-lg px-5 py-3">Login</button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 3. Features Section (Clickable Cards) */}
      <section id="features" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Why Choose Vehix?</h2>
            <p className="text-muted">Tap on any feature below to get started.</p>
          </div>
          
          <Row className="justify-content-center">
            
            {/* Feature 1: Garage Locator -> Goes to /service */}
            <Col md={4} className="mb-4">
              <Card 
                className="feature-card h-100 border-0 shadow-sm text-center p-4 clickable-card"
                onClick={() => handleNavigation("/service")}
              >
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-geo-alt-fill display-4 text-primary"></i>
                  </div>
                  <Card.Title className="fw-bold">Garage Locator</Card.Title>
                  <Card.Text>
                    Broke down? Tap here to find the nearest reliable garage using GPS instantly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 2: Appointments -> Goes to /appointments */}
            <Col md={4} className="mb-4">
              <Card 
                className="feature-card h-100 border-0 shadow-sm text-center p-4 clickable-card"
                onClick={() => handleNavigation("/appointments")}
              >
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-calendar-check-fill display-4 text-primary"></i>
                  </div>
                  <Card.Title className="fw-bold">Book Service</Card.Title>
                  <Card.Text>
                    Schedule maintenance slots online without calling. Click to book now.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 3: History -> Goes to /track-history */}
            <Col md={4} className="mb-4">
              <Card 
                className="feature-card h-100 border-0 shadow-sm text-center p-4 clickable-card"
                onClick={() => handleNavigation("/track-history")}
              >
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-clock-history display-4 text-primary"></i>
                  </div>
                  <Card.Title className="fw-bold">Service History</Card.Title>
                  <Card.Text>
                    View your past repairs and maintenance logs. Click to track history.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold section-title">How It Works</h2>
          <Row className="text-center">
            <Col md={3}>
              <div className="step-circle bg-primary text-white mx-auto mb-3">1</div>
              <h5>Register</h5>
              <p className="text-muted">Create an account and add your vehicle details.</p>
            </Col>
            <Col md={1} className="d-none d-md-block pt-2">
              <i className="bi bi-arrow-right fs-1 text-muted"></i>
            </Col>
            <Col md={3}>
              <div className="step-circle bg-primary text-white mx-auto mb-3">2</div>
              <h5>Find Garage</h5>
              <p className="text-muted">Search for nearby services or breakdown help.</p>
            </Col>
            <Col md={1} className="d-none d-md-block pt-2">
              <i className="bi bi-arrow-right fs-1 text-muted"></i>
            </Col>
            <Col md={3}>
              <div className="step-circle bg-primary text-white mx-auto mb-3">3</div>
              <h5>Book & Relax</h5>
              <p className="text-muted">Confirm your appointment and get your car fixed.</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 5. Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <Container>
          <Row>
            <Col md={6}>
              <h4 className="fw-bold text-primary">Vehix</h4>
              <p className="small text-white-50">
                The smart way to manage vehicle maintenance.
              </p>
            </Col>
            <Col md={3}>
              <h6 className="fw-bold">Quick Links</h6>
              <ul className="list-unstyled small">
                <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
                <li><Link to="/service" className="text-white-50 text-decoration-none">Services</Link></li>
                <li><Link to="/login" className="text-white-50 text-decoration-none">Login</Link></li>
              </ul>
            </Col>
            <Col md={3}>
              <h6 className="fw-bold">Contact</h6>
              <p className="small text-white-50">
                <i className="bi bi-envelope me-2"></i> support@vehix.com <br/>
                <i className="bi bi-telephone me-2"></i> +94 77 123 4567
              </p>
            </Col>
          </Row>
          <hr className="border-secondary" />
          <p className="text-center small text-white-50 mb-0">&copy; 2026 Vehix. All Rights Reserved.</p>
        </Container>
      </footer>

    </div>
  );
};

export default Home;