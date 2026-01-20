import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Badge, Tab, Tabs, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [garages, setGarages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // History Popup States
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState({ appointments: [], requests: [] });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const c = await axios.get("/api/admin/customers");
      const g = await axios.get("/api/admin/garages");
      setCustomers(c.data);
      setGarages(g.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  const toggleStatus = async (id) => {
    if(!window.confirm("Change Status?")) return;
    await axios.put(`/api/admin/toggle-status/${id}`);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if(!window.confirm("Delete User Permanently?")) return;
    await axios.delete(`/api/admin/delete/${id}`);
    fetchUsers();
  };

  const viewHistory = async (user) => {
    setSelectedUser(user);
    setShowModal(true);
    try {
        const res = await axios.get(`/api/admin/user-history/${user.id}`);
        setHistory(res.data);
    } catch(e) { alert("Error fetching history"); }
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  return (
    <div className="admin-bg pt-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4 glass-panel">
            <h2>Admin Dashboard</h2>
            
        </div>

        <Row className="mb-4 g-3">
            <Col md={6}><div className="stat-card"><h1>{customers.length}</h1><small>Customers</small></div></Col>
            <Col md={6}><div className="stat-card"><h1>{garages.length}</h1><small>Garages</small></div></Col>
        </Row>

        <div className="glass-panel">
            <Tabs defaultActiveKey="garages" className="mb-3">
                <Tab eventKey="garages" title="Garages">
                    <Table hover className="custom-table">
                        <thead><tr><th>Biz Name</th><th>Owner</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {garages.map(u => (
                                <tr key={u.id} style={{opacity: u.active?1:0.5}}>
                                    <td onClick={()=>viewHistory(u)} style={{cursor:'pointer', fontWeight:'bold', color:'#ffc107'}}>{u.businessName}</td>
                                    <td>{u.fullName}<br/><small>{u.contactNumber}</small></td>
                                    <td><Badge bg={u.active?"success":"danger"}>{u.active?"Active":"Banned"}</Badge></td>
                                    <td>
                                        <Button size="sm" variant="info" className="me-2" onClick={()=>viewHistory(u)}>History</Button>
                                        <Button size="sm" variant={u.active?"warning":"success"} className="me-2" onClick={()=>toggleStatus(u.id)}>{u.active?"Ban":"Activate"}</Button>
                                        <Button size="sm" variant="danger" onClick={()=>deleteUser(u.id)}>Del</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="customers" title="Customers">
                    <Table hover className="custom-table">
                        <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {customers.map(u => (
                                <tr key={u.id} style={{opacity: u.isactive?1:0.5}}>
                                    <td onClick={()=>viewHistory(u)} style={{cursor:'pointer', fontWeight:'bold'}}>{u.fullName}</td>
                                    <td>{u.email}</td>
                                    <td><Badge bg={u.active?"success":"danger"}>{u.active?"Active":"Banned"}</Badge></td>
                                    <td>
                                        <Button size="sm" variant="info" className="me-2" onClick={()=>viewHistory(u)}>History</Button>
                                        <Button size="sm" variant={u.active?"warning":"success"} className="me-2" onClick={()=>toggleStatus(u.id)}>{u.active?"Ban":"Activate"}</Button>
                                        <Button size="sm" variant="danger" onClick={()=>deleteUser(u.id)}>Del</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </div>

        {/* History Modal */}
        <Modal show={showModal} onHide={()=>setShowModal(false)} size="lg" centered contentClassName="glass-panel text-white">
            <Modal.Header closeButton closeVariant="white"><Modal.Title>History: {selectedUser?.fullName}</Modal.Title></Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="appt">
                    <Tab eventKey="appt" title="Appointments">
                        <Table size="sm" className="custom-table mt-2">
                            <thead><tr><th>Date</th><th>Detail</th><th>Status</th></tr></thead>
                            <tbody>{history.appointments?.map(a=><tr key={a.id}><td>{a.appointmentDate}</td><td>{a.serviceType}</td><td>{a.status}</td></tr>)}</tbody>
                        </Table>
                    </Tab>
                    <Tab eventKey="req" title="Requests">
                        <Table size="sm" className="custom-table mt-2">
                            <thead><tr><th>Date</th><th>Issue</th><th>Status</th></tr></thead>
                            <tbody>{history.requests?.map(r=><tr key={r.id}><td>{r.requestTime}</td><td>{r.issue}</td><td>{r.status}</td></tr>)}</tbody>
                        </Table>
                    </Tab>
                </Tabs>
            </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboard;