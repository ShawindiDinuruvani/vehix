import React, { useState, useEffect } from "react";
import { Container, Card, Table, Form, Row, Col, Badge, Spinner } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import axios from "../api/axios"; 
import "./TrackHistory.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler, // 🔥 1. මේක අලුතින් Import කළා (Chart එක පාට කරන්න)
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, Filler);

const TrackHistory = () => {
  const [search, setSearch] = useState("");
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ cost: 0, count: 0 }); // Summary Data

  const userEmail = localStorage.getItem("userEmail");
  const fullName = localStorage.getItem("fullName");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const appointmentsReq = axios.get(`/api/appointments/my-appointments/${userEmail}`);
      
      const servicesReq = fullName 
          ? axios.get(`/api/service/history/${fullName}`) 
          : Promise.resolve({ data: [] });

      const [apptRes, servRes] = await Promise.all([appointmentsReq, servicesReq]);

      const formattedAppointments = apptRes.data.map(item => ({
        id: `APT-${item.id}`,
        date: item.appointmentDate,
        vehicle: item.vehicleNumber,
        service: item.serviceType,
        type: "Appointment",
        status: item.status,
        cost: 5000 
      }));

      const formattedServices = servRes.data.map(item => ({
        id: `EMG-${item.id}`,
        date: item.requestTime ? item.requestTime.split("T")[0] : "N/A",
        vehicle: item.vehicleNumber,
        service: item.issue,
        type: "Emergency",
        status: item.status,
        cost: 2500 
      }));

      const mergedData = [...formattedAppointments, ...formattedServices].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );

      setHistoryData(mergedData);

      // 🔥 Summary ගණනය කිරීම
      const totalCost = mergedData.reduce((acc, curr) => acc + curr.cost, 0);
      setTotals({ cost: totalCost, count: mergedData.length });

    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = historyData.filter(
    (item) =>
      (item.vehicle && item.vehicle.toLowerCase().includes(search.toLowerCase())) ||
      (item.service && item.service.toLowerCase().includes(search.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(search.toLowerCase()))
  );

  // 🔥 2. ලස්සන Chart Data Configuration එක
  const chartData = {
    labels: historyData.map((s) => s.date).reverse(),
    datasets: [
      {
        label: "Service Expenses (LKR)",
        data: historyData.map((s) => s.cost).reverse(),
        borderColor: "#00d4ff", // Neon Blue Line
        backgroundColor: "rgba(0, 212, 255, 0.2)", // Transparent Blue Fill
        pointBackgroundColor: "#ffffff", // White Dots
        pointBorderColor: "#00d4ff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4, // Curve Line (වක්‍ර රේඛාව)
        fill: true,   // යට පාට කරන්න
      },
    ],
  };

  // 🔥 3. Chart Options (Grid Lines අයින් කරලා Clean Look එකක් ගමු)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
          labels: { color: "#fff", font: { size: 14 } },
          position: 'top'
      },
      tooltip: { 
          backgroundColor: "rgba(0,0,0,0.8)", 
          titleColor: "#00d4ff", 
          bodyColor: "#fff",
          padding: 10,
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1
      },
    },
    scales: {
      x: { 
          ticks: { color: "rgba(255,255,255,0.7)" }, 
          grid: { display: false } // X අක්ෂයේ ඉරි අයින් කළා
      },
      y: { 
          ticks: { color: "rgba(255,255,255,0.7)", callback: (value) => `Rs.${value}` }, 
          grid: { color: "rgba(255,255,255,0.1)", borderDash: [5, 5] } // තිත් ඉරි දැම්මා
      },
    },
  };

  return (
    <div className="track-page">
      <Container className="py-5 track-history-page">
        <h2 className="text-center mb-4 text-white fw-bold">Your Service History</h2>

        {/* 🔥 4. Summary Cards Section (අලුතින් එකතු කළ කොටස) */}
        <Row className="mb-4 g-3">
            <Col md={4}>
                <Card className="p-3 shadow glass-card text-center border-0" style={{background: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(0,212,255,0.05) 100%)'}}>
                    <h6 className="text-white-50">Total Spent</h6>
                    <h3 className="text-white fw-bold">LKR {totals.cost.toLocaleString()}</h3>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="p-3 shadow glass-card text-center border-0" style={{background: 'linear-gradient(135deg, rgba(255,0,128,0.1) 0%, rgba(255,0,128,0.05) 100%)'}}>
                    <h6 className="text-white-50">Total Services</h6>
                    <h3 className="text-white fw-bold">{totals.count}</h3>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="p-3 shadow glass-card text-center border-0" style={{background: 'linear-gradient(135deg, rgba(0,255,136,0.1) 0%, rgba(0,255,136,0.05) 100%)'}}>
                    <h6 className="text-white-50">Last Service</h6>
                    <h3 className="text-white fw-bold">{historyData.length > 0 ? historyData[0].date : "N/A"}</h3>
                </Card>
            </Col>
        </Row>

        {/* Chart Section */}
        {historyData.length > 0 && (
          <Card className="p-4 shadow glass-card mb-5 border-0">
             <div style={{ height: "350px" }}> {/* Chart Height Fix */}
                <Line data={chartData} options={chartOptions} />
             </div>
          </Card>
        )}

        {/* Search & Table Section */}
        <Card className="p-4 shadow glass-card border-0">
          <Row className="mb-3 align-items-center">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="🔍 Search history..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="custom-input rounded-pill px-4"
              />
            </Col>
            <Col md={6} className="text-end mt-3 mt-md-0">
                <Badge bg="primary" className="p-2 me-2 rounded-pill px-3">Appointment</Badge>
                <Badge bg="danger" className="p-2 rounded-pill px-3">Emergency</Badge>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center text-white py-5"><Spinner animation="border" /> <br/> Loading Records...</div>
          ) : (
            <Table responsive hover className="text-center table-glass align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Vehicle</th>
                  <th>Service / Issue</th>
                  <th>Est. Cost</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length > 0 ? (
                  filteredServices.map((s, idx) => (
                    <tr key={idx}>
                      <td>{s.date}</td>
                      <td>
                        <Badge bg={s.type === "Appointment" ? "primary" : "danger"}>
                            {s.type}
                        </Badge>
                      </td>
                      <td>{s.vehicle}</td>
                      <td>{s.service}</td>
                      <td className="fw-bold" style={{color: '#00d4ff'}}>LKR {s.cost}</td>
                      <td>
                        <Badge bg={
                            s.status === 'Pending' ? 'warning' : 
                            s.status === 'Accepted' || s.status === 'Confirmed' ? 'info' :
                            s.status === 'Completed' ? 'success' : 'secondary'
                        } text="dark">
                          {s.status || "Pending"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-white-50 py-4">No records found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default TrackHistory;