import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  
  // localStorage එකෙන් විස්තර ගන්නවා
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 
  const fullName = localStorage.getItem("fullName") || "User";

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 shadow-sm sticky-top">
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          Vehix<span className="text-white">.lk</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>

            {/* ✅ Customer හෝ Garage Owner යන දෙදෙනාටම මේවා පෙන්වනවා */}
            {token && (role === "CUSTOMER" || role === "GARAGE_OWNER") && (
              <>
                <Nav.Link as={Link} to="/service" className="mx-2">Find Services</Nav.Link>
                <Nav.Link as={Link} to="/history" className="mx-2">History</Nav.Link>
                <Nav.Link as={Link} to="/appointments" className="mx-2">My Appointments</Nav.Link>
              </>
            )}

            {/* ✅ Garage Owner ට විතරක් Dashboard එක අමතරව පෙන්වනවා */}
            {token && role === "GARAGE_OWNER" && (
              <Nav.Link as={Link} to="/garage-dashboard" className="mx-2 text-warning fw-bold border border-warning rounded px-3">
                Garage Dashboard
              </Nav.Link>
            )}

            {/* Login වී ඇති විට නම සහ Logout Button */}
            {token ? (
              <div className="d-flex align-items-center ms-3">
                <span className="text-white me-3 border-end pe-3">
                  <i className="bi bi-person-circle me-2"></i> {fullName}
                </span>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              /* Login වී නැති විට */
              <div className="ms-3">
                <Link to="/login">
                  <Button variant="outline-light" className="me-2">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </div>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;