import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    garageName: ""
  });

  useEffect(() => {
    // 1. LocalStorage එකෙන් Login වුන කෙනාගේ විස්තර ගන්නවා
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");
    const storedRole = localStorage.getItem("userRole");
    const storedGarage = localStorage.getItem("myGarageName");

    // විස්තර නැත්නම් (Login වෙලා නැත්නම්) Login පිටුවට යවනවා
    if (!storedEmail) {
      navigate("/login");
    } else {
      setUser({
        name: storedName,
        email: storedEmail,
        role: storedRole,
        garageName: storedGarage
      });
    }
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")){
        localStorage.clear();
        navigate("/login");
    }
  };

  return (
    <div className="profile-page min-vh-100 py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-4 shadow-lg glass-card text-white" style={{ maxWidth: "600px", width: "100%", background: "rgba(0, 0, 0, 0.7)" }}>
          
          <div className="text-center mb-4">
            <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: "100px", height: "100px" }}>
                <i className="bi bi-person-fill display-3 text-white"></i>
            </div>
            <h2 className="fw-bold">{user.name}</h2>
            <Badge bg={user.role === "GARAGE_OWNER" ? "warning" : "info"} text="dark" className="px-3 py-2 mt-1">
                {user.role === "GARAGE_OWNER" ? "Garage Owner" : "Vehicle Owner"}
            </Badge>
          </div>

          <div className="p-3 border border-secondary rounded bg-dark bg-opacity-50">
            <h5 className="text-primary mb-3 border-bottom border-secondary pb-2">Account Details</h5>
            
            <Row className="mb-3">
                <Col sm={4} className="text-white-50">Full Name:</Col>
                <Col sm={8} className="fw-bold">{user.name}</Col>
            </Row>
            
            <Row className="mb-3">
                <Col sm={4} className="text-white-50">Email:</Col>
                <Col sm={8} className="fw-bold">{user.email}</Col>
            </Row>

            {/* Garage Owner නම් Garage Name එක පෙන්වයි */}
            {user.role === "GARAGE_OWNER" && user.garageName && (
                <Row className="mb-3">
                    <Col sm={4} className="text-white-50">Garage Name:</Col>
                    <Col sm={8} className="fw-bold text-warning">{user.garageName}</Col>
                </Row>
            )}
          </div>

          <div className="mt-4 d-flex justify-content-between">
            <Button variant="outline-light" onClick={() => navigate("/")}>
                <i className="bi bi-arrow-left me-2"></i>Back to Home
            </Button>
            <Button variant="danger" onClick={handleLogout}>
                Logout <i className="bi bi-box-arrow-right ms-2"></i>
            </Button>
          </div>

        </Card>
      </Container>
    </div>
  );
};

export default Profile;