import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css"; 

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [scrolled, setScrolled] = useState(false);

  // User details ලබා ගැනීම
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const garageName = localStorage.getItem("myGarageName");

  // Scroll කරනකොට Navbar එකේ පාට වෙනස් වීමට
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={scrolled ? "custom-navbar scrolled" : "custom-navbar"}
    >
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <i className="bi bi-car-front-fill me-2 text-warning"></i>
          Veh<span className="text-warning">ix</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            {/* Home Link (හැමෝටම පේනවා) */}
            <Nav.Link as={Link} to="/" className={`nav-link-custom ${location.pathname === "/" ? "active" : ""}`}>
              Home
            </Nav.Link>

            {/* --- Log වෙලා නැති අයට (Login / Signup Buttons) --- */}
            {!token && (
              <>
                <Link to="/login" className="ms-2">
                  <Button variant="outline-light" className="auth-btn-outline">Login</Button>
                </Link>
                <Link to="/signup" className="ms-2">
                  <Button variant="warning" className="auth-btn-solid">Sign Up</Button>
                </Link>
              </>
            )}

            {/* --- Log වුනාට පස්සේ පේන ටික --- */}
            {token && (
              <>
                
                {/* 1. ADMIN සදහා */}
                {role === "ADMIN" && (
                    <Nav.Link as={Link} to="/admin-dashboard" className={`nav-link-custom ${location.pathname === "/admin-dashboard" ? "active" : ""}`}>
                        <i className="bi bi-shield-lock-fill me-1"></i> Admin
                    </Nav.Link>
                )}

                {/* 2. GARAGE OWNER සදහා */}
                {role === "GARAGE_OWNER" && (
                  <>
                    <Nav.Link as={Link} to="/service" className={`nav-link-custom ${location.pathname === "/service" ? "active" : ""}`}>
                        Services
                    </Nav.Link>
                    <Nav.Link as={Link} to="/appointments" className={`nav-link-custom ${location.pathname === "/appointments" ? "active" : ""}`}>
                        Appointments
                    </Nav.Link>

                    {/* Forum Link */}
                    <Nav.Link as={Link} to="/forum" className={`nav-link-custom ${location.pathname === "/forum" ? "active" : ""}`}>
                        Forum
                    </Nav.Link>

                    {/* 👇 NEW: Reviews Link Added */}
                    <Nav.Link as={Link} to="/reviews" className={`nav-link-custom ${location.pathname === "/reviews" ? "active" : ""}`}>
                        Reviews
                    </Nav.Link>
                    
                    <Nav.Link as={Link} to="/garage-dashboard" className={`nav-link-custom highlight ${location.pathname === "/garage-dashboard" ? "active" : ""}`}>
                        <i className="bi bi-tools me-1"></i> {garageName ? garageName.split(' ')[0] : "My Garage"}
                    </Nav.Link>
                  </>
                )}

                {/* 3. CUSTOMER සදහා */}
                {role === "CUSTOMER" && (
                  <>
                    <Nav.Link as={Link} to="/service" className={`nav-link-custom ${location.pathname === "/service" ? "active" : ""}`}>
                      Services
                    </Nav.Link>
                    <Nav.Link as={Link} to="/appointments" className={`nav-link-custom ${location.pathname === "/appointments" ? "active" : ""}`}>
                      My Bookings
                    </Nav.Link>

                    {/* Forum Link */}
                    <Nav.Link as={Link} to="/forum" className={`nav-link-custom ${location.pathname === "/forum" ? "active" : ""}`}>
                        Forum
                    </Nav.Link>

                    {/* 👇 NEW: Reviews Link Added */}
                    <Nav.Link as={Link} to="/reviews" className={`nav-link-custom ${location.pathname === "/reviews" ? "active" : ""}`}>
                        Reviews
                    </Nav.Link>
                  </>
                )}

                {/* Profile Link (Admin ට ඇරෙන්න අනිත් අයට) */}
                {role !== "ADMIN" && (
                    <Nav.Link as={Link} to="/profile" className={`nav-link-custom ${location.pathname === "/profile" ? "active" : ""}`}>
                        <i className="bi bi-person-circle fs-5"></i>
                    </Nav.Link>
                )}

                {/* Logout Button */}
                <Button variant="danger" size="sm" className="ms-3 rounded-pill px-3 fw-bold" onClick={handleLogout}>
                  Logout
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