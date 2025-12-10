import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page d-flex flex-column min-vh-100">
      
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center text-center text-white">
        <Container>
          <h1 className="display-3 fw-bold hero-title">Welcome to Vehix</h1>
          <p className="lead hero-subtitle">
            Track, schedule, and manage all your vehicle maintenance in one place.
          </p>
          <div className="hero-buttons mt-4">
            <Link to="/login">
              <button className="btn btn-primary btn-lg me-3">Get Started</button>
            </Link>
           
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Why Choose Vehix?</h2>
          <div className="row justify-content-center">
            
            {/* Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4 text-center h-100">
                <i className="bi bi-car-front display-4 text-primary mb-3"></i>
                <h5 className="fw-bold">Add Your Vehicle</h5>
                <p>Keep all your vehicles organized with detailed info.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4 text-center h-100">
                <i className="bi bi-calendar-check display-4 text-primary mb-3"></i>
                <h5 className="fw-bold">Book Services</h5>
                <p>Schedule maintenance and avoid missed appointments.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="feature-card p-4 text-center h-100">
                <i className="bi bi-clipboard-data display-4 text-primary mb-3"></i>
                <h5 className="fw-bold">Track History</h5>
                <p>View past services and upcoming reminders easily.</p>
              </div>
            </div>

          </div>
        </Container>
      </section>

    </div>
  );
};

export default Home;
