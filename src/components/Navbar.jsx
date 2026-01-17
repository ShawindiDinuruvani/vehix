import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");
  const isLoggedIn = !!localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-3 sticky-top shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-primary">
          Vehix<span className="text-white">.lk</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
            
            {isLoggedIn ? (
              <>
                {/* =========================================
                    CUSTOMER SECTION
                   ========================================= */}
                {userRole === "CUSTOMER" && (
                  <>
                    <Nav.Link as={Link} to="/service" className="mx-2">Find Services</Nav.Link>
                    <Nav.Link as={Link} to="/track-history" className="mx-2">History</Nav.Link>
                    <Nav.Link as={Link} to="/appointments" className="mx-2 text-info fw-bold">
                       My Appointments
                    </Nav.Link>
                  </>
                )}

                {/* =========================================
                    GARAGE OWNER SECTION (Updated)
                   ========================================= */}
                {userRole === "GARAGE_OWNER" && (
                  <>
                    {/* 1. Dashboard Button */}
                    <Nav.Link as={Link} to="/garage-dashboard" className="mx-2">
                      <Button variant="warning" size="sm" className="fw-bold text-dark">
                        Garage Dashboard
                      </Button>
                    </Nav.Link>

                    {/* 2. 🔥 Added Services & History for Garage Owner 🔥 */}
                    <Nav.Link as={Link} to="/service" className="mx-2">Services</Nav.Link>
                    <Nav.Link as={Link} to="/track-history" className="mx-2">History</Nav.Link>
                  </>
                )}

                <div className="vr bg-white mx-2 d-none d-lg-block"></div> 

                {/* Profile & Logout */}
                <Nav.Link as={Link} to="/profile" className="mx-2 text-white">
                  <i className="bi bi-person-circle me-1"></i> {userName ? userName.split(" ")[0] : "Profile"}
                </Nav.Link>

                <Button variant="outline-danger" size="sm" className="ms-3" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              // Guest User
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
                <Button as={Link} to="/signup" variant="primary" size="sm" className="ms-2 px-4 rounded-pill">
                  Sign Up
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;