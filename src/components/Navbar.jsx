import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Dropdown, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"; 

const NavbarComponent = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  // Active Link logic
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <Navbar expand="lg" className="custom-navbar sticky-top">
      <Container fluid>
        {/* 1. Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          VEH<span className="text-primary">IX</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          {/* 2. Centered Navigation Links */}
          <Nav className="mx-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/" className={`nav-item ${isActive("/")}`}>Home</Nav.Link>
            <Nav.Link as={Link} to="/service" className={`nav-item ${isActive("/service")}`}>Service</Nav.Link>
            <Nav.Link as={Link} to="/track-history" className={`nav-item ${isActive("/track-history")}`}>Track History</Nav.Link>
            <Nav.Link as={Link} to="/appoinments" className={`nav-item ${isActive("/appoinments")}`}>Appointments</Nav.Link>
          </Nav>

          {/* 3. Right Side: Search & Profile */}
          <div className="d-flex align-items-center gap-3">
            {/* Search Bar */}
            <Form className="d-flex search-form">
              <div className="input-group">
                <span className="input-group-text bg-transparent border-0 text-white">
                  <i className="bi bi-search"></i>
                </span>
                <FormControl
                  type="search"
                  placeholder="Search mechanic..."
                  className="bg-transparent border-0 text-white shadow-none"
                  aria-label="Search"
                />
              </div>
            </Form>

            {/* Profile Dropdown (Modern Avatar) */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" id="dropdown-profile" className="p-0 border-0 remove-arrow">
                 {/* Profile Picture Placeholder */}
                 <div className="profile-icon">
                    <i className="bi bi-person-circle display-6 text-white"></i>
                 </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-dark shadow-lg">
                <Dropdown.Header>Welcome, User!</Dropdown.Header>
                
                {/* 👇 Fixed the path here to match App.js */}
                <Dropdown.Item as={Link} to="/profile">My Profile</Dropdown.Item>
                
                <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

             {/* Mobile Login Button (If needed explicitly) */}
             {/* <Button variant="primary" className="btn-glow">Login</Button> */}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;