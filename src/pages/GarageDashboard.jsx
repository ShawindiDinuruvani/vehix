import React, { useEffect, useState, useRef } from "react";
import { Container, Card, Table, Badge, Button, Row, Col, Spinner, Alert, Tab, Tabs, Form, InputGroup } from "react-bootstrap";
import axios from "../api/axios";
import "./GarageDashboard.css"; 

const GarageDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); 

  const prevRequestCount = useRef(0);
  const myGarageName = localStorage.getItem("myGarageName");
  const garageId = localStorage.getItem("garageId");

  useEffect(() => {
    if (Notification.permission !== "granted") Notification.requestPermission();
    fetchAllData();
    const interval = setInterval(() => fetchBackgroundData(), 5000);
    return () => clearInterval(interval);
  }, []);

  const playNotificationSound = () => { const audio = new Audio("/notification.mp3"); audio.play().catch(e => console.log(e)); };
  const showDesktopNotification = (count) => { if (Notification.permission === "granted") new Notification("🚨 Alert!", { body: `You have ${count} pending requests!` }); };
  
  const fetchAllData = async () => { if (!garageId) { setLoading(false); setError("Garage ID missing. Please Logout."); return; } setLoading(true); await fetchBackgroundData(); setLoading(false); };
  
  const fetchBackgroundData = async () => {
    try {
      const [apptRes, reqRes] = await Promise.all([
          axios.get(`/api/appointments/garage/${myGarageName}`),
          axios.get(`/api/service/garage/${garageId}`)
      ]);
      setAppointments(apptRes.data);
      setRequests(reqRes.data);
      const pendingCount = reqRes.data.filter(r => r.status === 'Pending').length;
      if (pendingCount > prevRequestCount.current) { playNotificationSound(); showDesktopNotification(pendingCount); }
      prevRequestCount.current = pendingCount;
    } catch (err) { console.error(err); }
  };

  const updateStatus = async (type, id, newStatus) => {
      try {
        const endpoint = type === 'appointment' ? `/api/appointments/status/${id}` : `/api/service/status/${id}`;
        await axios.put(endpoint, { status: newStatus });
        fetchAllData();
      } catch (error) { alert("Failed"); }
  };

  return (
    <div className="dashboard-bg py-5">
      <Container className="mt-2">
        
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
                <h2 className="fw-bold text-white mb-1">Garage Dashboard</h2>
                <p className="text-white-50 mb-0">Manage: <span className="text-white">{myGarageName}</span></p>
            </div>
            <div>
                 <Button variant="outline-light" className="btn-neon rounded-pill px-4" onClick={fetchAllData}>
                    <i className="bi bi-arrow-clockwise me-2"></i> Refresh
                 </Button>
            </div>
        </div>

        {error && <Alert variant="danger" className="glass-card text-danger border-danger text-center">{error}</Alert>}

        {/* --- STATS CARDS (Updated to Dark Glass Theme) --- */}
        <Row className="mb-5 g-4">
            <Col md={4}>
                <div className="stat-card stat-border-danger">
                    <h6 className="mb-3">Pending Emergency</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="display-4 text-white mb-0">{requests.filter(r => r.status === 'Pending').length}</h1>
                        <i className="bi bi-exclamation-triangle text-danger fs-1 opacity-50"></i>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                <div className="stat-card stat-border-primary">
                    <h6 className="mb-3">Pending Appointments</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="display-4 text-white mb-0">{appointments.filter(a => a.status === 'Pending').length}</h1>
                        <i className="bi bi-calendar-event text-primary fs-1 opacity-50"></i>
                    </div>
                </div>
            </Col>
            <Col md={4}>
                <div className="stat-card stat-border-success">
                    <h6 className="mb-3">Total Jobs Handled</h6>
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="display-4 text-white mb-0">{requests.length + appointments.length}</h1>
                        <i className="bi bi-check-circle text-success fs-1 opacity-50"></i>
                    </div>
                </div>
            </Col>
        </Row>

        {/* --- MAIN CONTENT SECTION --- */}
        <Card className="glass-card p-4 border-0 mb-5">
            
            <Tabs defaultActiveKey="emergency" id="dashboard-tabs" className="mb-4 custom-tabs justify-content-center border-0">
                <Tab eventKey="emergency" title={<span>Emergency Requests <Badge bg="danger" className="ms-2 rounded-circle">{requests.filter(r => r.status === 'Pending').length}</Badge></span>}>
                    
                    {/* Search Bar & Filters */}
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                         <InputGroup className="w-50 glass-input-group">
                            <InputGroup.Text style={{background:'rgba(255,255,255,0.1)', border:'none', color:'white'}}><i className="bi bi-search"></i></InputGroup.Text>
                            <Form.Control 
                                placeholder="Search requests..." 
                                style={{background:'rgba(255,255,255,0.1)', border:'none', color:'white'}}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                         </InputGroup>
                    </div>

                    {loading ? <div className="text-center py-5"><Spinner animation="border" variant="light" /></div> : requests.length > 0 ? (
                        <Table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Customer Info</th>
                                    <th>Vehicle & Issue</th>
                                    <th>Location Map</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.filter(r => r.ownerName.toLowerCase().includes(search.toLowerCase()) || r.vehicleNumber.includes(search)).map((req) => (
                                    <tr key={req.id}>
                                        <td>
                                            <div className="fw-bold text-white">{req.ownerName}</div>
                                            <div className="text-white-50 small"><i className="bi bi-clock me-1"></i>{req.requestTime?.split("T")[0]}</div>
                                        </td>
                                        <td>
                                            <div className="text-warning fw-bold mb-1">{req.issue}</div>
                                            <div className="text-white-50 small">{req.vehicleNumber} ({req.vehicleModel})</div>
                                        </td>
                                        <td>
                                            <a href={`https://www.google.com/maps?q=${req.latitude},${req.longitude}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-neon rounded-pill px-3">
                                                <i className="bi bi-geo-alt-fill me-1"></i> View Map
                                            </a>
                                        </td>
                                        <td>
                                            <Badge bg={req.status === 'Pending' ? 'danger' : req.status === 'Accepted' ? 'success' : 'secondary'} className="badge-glow">
                                                {req.status}
                                            </Badge>
                                        </td>
                                        <td className="text-end">
                                            {req.status === 'Pending' && (
                                                <>
                                                    <Button size="sm" variant="success" className="me-2 rounded-pill fw-bold" onClick={() => updateStatus('request', req.id, 'Accepted')}>Accept</Button>
                                                    <Button size="sm" variant="outline-danger" className="rounded-pill" onClick={() => updateStatus('request', req.id, 'Rejected')}>Reject</Button>
                                                </>
                                            )}
                                            {req.status === 'Accepted' && (
                                                <Button size="sm" variant="outline-success" href={`tel:${req.contactNumber || ''}`} className="rounded-pill btn-neon">
                                                    <i className="bi bi-telephone-fill me-2"></i> Call Now
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : <p className="text-center text-white-50 p-5">No requests found.</p>}
                </Tab>

                <Tab eventKey="appointments" title="Scheduled Appointments">
                     {/* Search Bar for Appointments */}
                     <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                         <h5 className="text-white-50 mb-0">Upcoming Schedule</h5>
                    </div>

                    {loading ? <div className="text-center py-5"><Spinner animation="border" variant="light" /></div> : appointments.length > 0 ? (
                        <Table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Vehicle</th>
                                    <th>Service Type</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((appt) => (
                                    <tr key={appt.id}>
                                        <td>
                                            <div className="fw-bold text-white">{appt.ownerName}</div>
                                            <div className="text-white-50 small">{appt.userEmail}</div>
                                        </td>
                                        <td>{appt.vehicleNumber}</td>
                                        <td><span className="text-info">{appt.serviceType}</span></td>
                                        <td>{appt.appointmentDate} <span className="text-white-50 small ms-1">{appt.appointmentTime}</span></td>
                                        <td><Badge bg={appt.status==='Confirmed'?'primary':'warning'} className="badge-glow">{appt.status}</Badge></td>
                                        <td className="text-end">
                                            {appt.status === 'Pending' && (
                                                <>
                                                 <Button size="sm" variant="success" className="me-2 rounded-pill fw-bold" onClick={()=>updateStatus('appointment', appt.id, 'Confirmed')}>Confirm</Button>
                                                 <Button size="sm" variant="outline-danger" className="rounded-pill" onClick={()=>updateStatus('appointment', appt.id, 'Rejected')}>Reject</Button>
                                                </>
                                            )}
                                            {appt.status === 'Confirmed' && <Button size="sm" variant="info" className="rounded-pill text-white fw-bold" onClick={()=>updateStatus('appointment', appt.id, 'Completed')}>Mark Done</Button>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : <p className="text-center text-white-50 p-5">No bookings found.</p>}
                </Tab>
            </Tabs>
        </Card>

      </Container>
    </div>
  );
};

export default GarageDashboard;