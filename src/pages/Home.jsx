import React from "react";
import { Container, Row, Col, Navbar, Nav, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page d-flex flex-column min-vh-100">
      
      {/* 1. Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3 sticky-top">
        <Container>
          <Navbar.Brand href="#" className="fw-bold fs-3 text-primary">Vehix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#features" className="text-white me-3">Features</Nav.Link>
              <Nav.Link href="#how-it-works" className="text-white me-3">How it Works</Nav.Link>
              <Link to="/login">
                <Button variant="outline-light" className="me-2">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 2. Hero Section (Updated) */}
      <section className="hero-section d-flex align-items-center text-center text-white">
        <div className="hero-overlay"></div> {/* Dark overlay for readability */}
        <Container className="position-relative z-index-1">
          <h1 className="display-3 fw-bold hero-title">Care For Your Car, <span className="text-primary">The Right Way</span></h1>
          <p className="lead hero-subtitle mb-4">
            Find nearby garages, schedule appointments, and track vehicle health instantly.
          </p>
          <div className="hero-buttons">
            <Link to="/register">
              <button className="btn btn-primary btn-lg me-3 px-5 py-3 fw-bold">Find a Garage</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-outline-light btn-lg px-5 py-3">Login</button>
            </Link>
          </div>
        </Container>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold section-title">Why Choose Vehix?</h2>
            <p className="text-muted">Everything you need to manage your vehicle in one app.</p>
          </div>
          
          <Row className="justify-content-center">
            {/* Feature 1 */}
            <Col md={4} className="mb-4">
              <Card className="feature-card h-100 border-0 shadow-sm text-center p-4">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-geo-alt-fill display-4 text-primary"></i>
                  </div>
                  <Card.Title className="fw-bold">Garage Locator</Card.Title>
                  <Card.Text>
                    Broke down? Find the nearest reliable garage using GPS location instantly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 2 */}
            <Col md={4} className="mb-4">
              <Card className="feature-card h-100 border-0 shadow-sm text-center p-4">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-calendar-check-fill display-4 text-primary"></i>
                  </div>
                  <Card.Title className="fw-bold">Easy Appointments</Card.Title>
                  <Card.Text>
                    Book service slots online without calling. Get reminders before due dates.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 3 */}
            <Col md={4} className="mb-4">
              <Card className="feature-card h-100 border-0 shadow-sm text-center p-4">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <i className="bi bi-clock-history display-4 text-primary"></i>
                  </div>
                  <Card.Title className="fw-bold">Service History</Card.Title>
                  <Card.Text>
                    Keep a digital log of all repairs and maintenance for higher resale value.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. How It Works Section (New) */}
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

      {/* 5. Footer (New) */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <Container>
          <Row>
            <Col md={6}>
              <h4 className="fw-bold text-primary">Vehix</h4>
              <p className="small text-white-50">
                The smart way to manage vehicle maintenance and find help when you need it most.
              </p>
            </Col>
            <Col md={3}>
              <h6 className="fw-bold">Quick Links</h6>
              <ul className="list-unstyled small">
                <li><a href="#" className="text-white-50 text-decoration-none">Home</a></li>
                <li><a href="#features" className="text-white-50 text-decoration-none">Services</a></li>
                <li><a href="/login" className="text-white-50 text-decoration-none">Login</a></li>
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