import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const navigate = useNavigate();

  // LocalStorage එකෙන් User ගේ විස්තර ගන්නවා
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const garageName = localStorage.getItem("myGarageName"); // Garage Owner නම් නම

  const handleLogout = () => {
    // Logout වුනාම සියලු Data මකලා දානවා
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" variant="dark" className="py-3 shadow-sm" style={{ background: "rgba(0, 0, 0, 0.9)" }}>
      <Container>
        {/* Logo / Brand Name */}
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-warning">
          <i className="bi bi-car-front-fill me-2"></i>Vehix.lk
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            
            {/* 1. හැමෝටම පෙනෙන Home Link එක */}
            <Nav.Link as={Link} to="/" className="text-white mx-2">Home</Nav.Link>

            {/* 2. Log වෙලා නැති අයට පෙනෙන Links */}
            {!token && (
              <>
                
                <Link to="/login">
                  <Button variant="outline-light" className="ms-2 rounded-pill px-4">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="warning" className="ms-2 rounded-pill px-4 text-dark fw-bold">Sign Up</Button>
                </Link>
              </>
            )}

            {/* 3. Log වුන අය සඳහා Links */}
            {token && (
              <>
                {/* 🔥 ADMIN නම් මේක පෙන්වන්න */}
                {role === "ADMIN" && (
                    <Nav.Link as={Link} to="/admin-dashboard" className="text-warning fw-bold mx-2">
                        <i className="bi bi-shield-lock me-1"></i> Admin Dashboard
                    </Nav.Link>
                )}

                {/* GARAGE OWNER නම් මේක පෙන්වන්න */}
                {role === "GARAGE_OWNER" && (
                  <Nav.Link as={Link} to="/garage-dashboard" className="text-warning fw-bold mx-2">
                    <i className="bi bi-tools me-1"></i> {garageName || "My Garage"}
                  </Nav.Link>
                )}

                {/* CUSTOMER නම් මේක පෙන්වන්න */}
                {role === "CUSTOMER" && (
                  <>
                    <Nav.Link as={Link} to="/find-services" className="text-white mx-2">Find Garages</Nav.Link>
                    <Nav.Link as={Link} to="/appointments" className="text-white mx-2">My Appointments</Nav.Link>
                  </>
                )}

                {/* Profile Link (Admin ට හැර අනිත් අයට) */}
                {role !== "ADMIN" && (
                    <Nav.Link as={Link} to="/profile" className="text-white mx-2">
                        <i className="bi bi-person-circle"></i>
                    </Nav.Link>
                )}

                {/* Logout Button */}
                <Button variant="danger" size="sm" className="ms-3 rounded-pill px-3" onClick={handleLogout}>
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