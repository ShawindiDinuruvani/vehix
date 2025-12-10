import React from "react";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavbarComponent = () => {
  return (
   <Navbar expand="lg" className="custom-navbar" variant="dark">

      <Container fluid>
        <Navbar.Brand as={Link} to="/">Vehix</Navbar.Brand>

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

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
