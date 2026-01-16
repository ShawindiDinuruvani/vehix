import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Badge, Alert } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  // --- USER DATA STATE ---
  const [user, setUser] = useState({
    fullName: "Kasun Perera",
    email: "kasun@example.com",
    phone: "",
    nic: "",
    role: "CUSTOMER", // Can be "CUSTOMER" or "GARAGE_OWNER"
    isEmailVerified: false,
    isPhoneVerified: false
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(user);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setTempData({ ...tempData, [e.target.name]: e.target.value });
  };

  // Save Changes
  const handleSave = () => {
    setUser(tempData);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Simulate Verification Process
  const handleVerify = (type) => {
    alert(`Verification code sent to your ${type}! (Demo)`);
    if(type === 'email') setUser({...user, isEmailVerified: true});
    if(type === 'phone') setUser({...user, isPhoneVerified: true});
  };

  return (
    <div className="profile-page min-vh-100 py-5">
      <Container>
        
        <h2 className="text-white text-center mb-4">My Account Profile</h2>

        {showSuccess && <Alert variant="success">Profile updated successfully!</Alert>}

        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 glass-card shadow-lg">
              
              <div className="text-center mb-4">
                 <div className="profile-icon-large mx-auto bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mb-3">
                    <span className="display-4 fw-bold">{user.fullName.charAt(0)}</span>
                 </div>
                 <h3 className="text-white">{user.fullName}</h3>
                 <Badge bg="info">{user.role === "CUSTOMER" ? "Vehicle Owner" : "Garage Owner"}</Badge>
              </div>

              <Form>
                {/* 1. Full Name */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="fullName"
                    value={isEditing ? tempData.fullName : user.fullName} 
                    onChange={handleChange}
                    disabled={!isEditing} 
                    className="custom-input"
                  />
                </Form.Group>

                {/* 2. Email Verification Section */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Email Address</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control 
                        type="email" 
                        value={user.email} 
                        disabled 
                        className="custom-input"
                    />
                    {user.isEmailVerified ? (
                        <Button variant="success" disabled><i className="bi bi-check-circle-fill"></i> Verified</Button>
                    ) : (
                        <Button variant="warning" onClick={() => handleVerify('email')}>Verify</Button>
                    )}
                  </div>
                </Form.Group>

                {/* 3. Phone Number Verification */}
                <Form.Group className="mb-3">
                  <Form.Label className="text-white-50">Mobile Number</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control 
                        type="text" 
                        name="phone"
                        placeholder="077-xxxxxxx"
                        value={isEditing ? tempData.phone : user.phone} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="custom-input"
                    />
                     {/* Only show verify button if phone is saved but not verified */}
                     {!isEditing && user.phone && !user.isPhoneVerified && (
                        <Button variant="warning" onClick={() => handleVerify('phone')}>Verify</Button>
                     )}
                     {user.isPhoneVerified && (
                        <Button variant="success" disabled><i className="bi bi-check-circle"></i></Button>
                     )}
                  </div>
                </Form.Group>

                {/* 4. NIC Number */}
                <Form.Group className="mb-4">
                  <Form.Label className="text-white-50">NIC Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nic"
                    placeholder="Enter NIC for identity check"
                    value={isEditing ? tempData.nic : user.nic} 
                    onChange={handleChange}
                    disabled={!isEditing} 
                    className="custom-input"
                  />
                  <Form.Text className="text-white-50 small">
                    Required for identity verification.
                  </Form.Text>
                </Form.Group>

                {/* Action Buttons */}
                {isEditing ? (
                    <div className="d-flex gap-2">
                        <Button variant="success" className="w-100" onClick={handleSave}>Save Changes</Button>
                        <Button variant="secondary" className="w-100" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                ) : (
                    <Button variant="primary" className="w-100 py-2" onClick={() => {
                        setTempData(user);
                        setIsEditing(true);
                    }}>
                        Edit Profile Details
                    </Button>
                )}

              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;