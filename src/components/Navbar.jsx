import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const NavbarComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mechanics, setMechanics] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    try {
      // 🔹 Call backend API to search mechanics
      const response = await axios.get("http://localhost:8080/api/mechanics/search", {
        params: { city: searchTerm, type: searchTerm },
      });
      setMechanics(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error fetching mechanics:", error);
      alert("Could not fetch mechanic data. Check your backend connection.");
    }
  };

  return (
    <div className="navbar-container position-relative">
      <Navbar expand="lg" className="custom-navbar" variant="dark" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-white">
            Vehix
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/service">Service</Nav.Link>
              <Nav.Link as={Link} to="/track-history">Track History</Nav.Link>
              <Nav.Link as={Link} to="/appoinments">Appointments</Nav.Link>

              <NavDropdown title="Account" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/login">Signin</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signup">Signup</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Help</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            {/* 🔍 Search Bar */}
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="search"
                placeholder="Search mechanic by city or service"
                className="me-2"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit" variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🔽 Dropdown Search Results */}
      {showResults && mechanics.length > 0 && (
        <div className="search-results bg-white shadow rounded p-3 mt-5 position-absolute w-100">
          <Container>
            <h5 className="fw-bold text-primary mb-3">🔧 Mechanics Found</h5>
            {mechanics.slice(0, 5).map((m, index) => (
              <Card key={index} className="mb-2 p-2">
                <Card.Body>
                  <Card.Title>{m.name}</Card.Title>
                  <Card.Text>
                    <strong>Service:</strong> {m.serviceType} <br />
                    <strong>City:</strong> {m.city} <br />
                    <strong>Contact:</strong> {m.contactNumber}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
            <Button
              variant="primary"
              className="w-100 mt-2"
              onClick={() => setShowResults(false)}
            >
              Close
            </Button>
          </Container>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
