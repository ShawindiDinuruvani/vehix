import React from "react";
import { Container, Row, Col, Navbar, Nav, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; 
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); 

  const handleNavigation = (destination) => {
    if (token) {
      navigate(destination);
    } else {
      navigate("/login", { state: { from: destination } });
    }
  };

  return (
    <div className="home-page d-flex flex-column min-vh-100">

      {/* 1. Navbar (Glass Effect) */}
      
              
      

      {/* 2. Hero Section (Parallax) */}
      <section className="hero-section d-flex align-items-center text-center text-white">
        <div className="hero-overlay"></div>
        <Container className="position-relative z-index-1">
          <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill text-uppercase tracking-wider">
            Premium Car Care
          </span>
          <h1 className="display-2 fw-bold hero-title mb-3">
            Your Car Deserves <br/> <span className="text-warning">The Best Care</span>
          </h1>
          <p className="lead hero-subtitle mb-5 text-white-50 mx-auto" style={{maxWidth: '700px'}}>
            Find top-rated garages, schedule repairs instantly, and keep your vehicle running like new. All in one place.
          </p>
          <div className="hero-buttons">
            <Button 
                className="btn-glow btn-lg me-3 px-5 py-3 rounded-pill fw-bold border-0"
                onClick={() => handleNavigation("/service")}
            >
                Find a Garage <i className="bi bi-arrow-right ms-2"></i>
            </Button>
          </div>
        </Container>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-5 section-bg">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-warning text-uppercase fw-bold ls-2">Our Services</h6>
            <h2 className="fw-bold text-white display-5">Why Choose Vehix?</h2>
          </div>
          
          <Row className="g-4">
            {/* Feature 1 */}
            <Col md={4}>
              <Card className="feature-card h-100 text-center p-4" onClick={() => handleNavigation("/service")}>
                <div className="card-glow"></div>
                <Card.Body>
                  <div className="icon-box mb-4">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <Card.Title className="fw-bold text-white h4">Garage Locator</Card.Title>
                  <Card.Text className="text-white-50 mt-3">
                    Stuck on the road? Use our GPS locator to find the nearest mechanic instantly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 2 */}
            <Col md={4}>
              <Card className="feature-card h-100 text-center p-4" onClick={() => handleNavigation("/appointments")}>
                <div className="card-glow"></div>
                <Card.Body>
                  <div className="icon-box mb-4 color-2">
                    <i className="bi bi-calendar-check-fill"></i>
                  </div>
                  <Card.Title className="fw-bold text-white h4">Easy Booking</Card.Title>
                  <Card.Text className="text-white-50 mt-3">
                    No more waiting calls. Book your service slot online in just a few clicks.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Feature 3 */}
            <Col md={4}>
              <Card className="feature-card h-100 text-center p-4" onClick={() => handleNavigation("/track-history")}>
                <div className="card-glow"></div>
                <Card.Body>
                  <div className="icon-box mb-4 color-3">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <Card.Title className="fw-bold text-white h4">Service History</Card.Title>
                  <Card.Text className="text-white-50 mt-3">
                    Keep a digital log of all your repairs and maintenance for better resale value.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. How It Works (Steps) */}
      <section className="py-5 bg-darker text-white position-relative">
        <Container>
          <h2 className="text-center mb-5 fw-bold">How It Works</h2>
          <div className="steps-container">
              <div className="step-line d-none d-md-block"></div> {/* Connecting Line */}
              
              <Row className="text-center position-relative z-index-1">
                <Col md={4} className="mb-4">
                  <div className="step-circle mx-auto mb-3">1</div>
                  <h4 className="fw-bold">Register</h4>
                  <p className="text-white-50 px-4">Create your account and add your vehicle details securely.</p>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="step-circle mx-auto mb-3">2</div>
                  <h4 className="fw-bold">Find & Book</h4>
                  <p className="text-white-50 px-4">Search nearby garages and confirm your appointment.</p>
                </Col>
                <Col md={4} className="mb-4">
                  <div className="step-circle mx-auto mb-3">3</div>
                  <h4 className="fw-bold">Get Fixed</h4>
                  <p className="text-white-50 px-4">Visit the garage, get serviced, and leave a review.</p>
                </Col>
              </Row>
          </div>
        </Container>
      </section>

      {/* 5. Footer */}
      <footer className="footer-dark py-5 mt-auto">
        <Container>
          <Row className="gy-4">
            <Col md={5}>
              <h3 className="fw-bold text-white brand-text">Veh<span className="text-warning">ix</span></h3>
              <p className="text-white-50 mt-3">
                Connecting vehicle owners with the best mechanics in town. Reliable, Fast, and Secure.
              </p>
            </Col>
            <Col md={3}>
              <h5 className="text-white fw-bold mb-3">Navigation</h5>
              <ul className="list-unstyled text-white-50">
                <li className="mb-2"><Link to="/" className="footer-link">Home</Link></li>
                <li className="mb-2"><Link to="/login" className="footer-link">Login</Link></li>
              </ul>
            </Col>
            <Col md={4}>
              <h5 className="text-white fw-bold mb-3">Contact Us</h5>
              <p className="text-white-50">
                <i className="bi bi-geo-alt me-2 text-warning"></i> Colombo, Sri Lanka <br/>
                <i className="bi bi-envelope me-2 text-warning"></i> help@vehix.lk <br/>
                <i className="bi bi-phone me-2 text-warning"></i> +94 77 123 4567
              </p>
            </Col>
          </Row>
          <hr className="border-secondary my-4" />
          <p className="text-center text-white-50 small mb-0">&copy; 2026 Vehix.lk | Built for Sri Lanka</p>
        </Container>
      </footer>

    </div>
  );
};

export default Home;