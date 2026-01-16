import React, { useState, useEffect } from "react";
import { Container, Card, Table, Form, Row, Col, Alert } from "react-bootstrap";
import { Line } from "react-chartjs-2";
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
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);
// Ensure these are #fff (White) to match the Dark CSS
const chartOptions = {
    // ...
    scales: {
      x: {
        ticks: { color: "#fff" }, // White Text
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      y: {
        ticks: { color: "#fff" }, // White Text
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
    // ...
};

const TrackHistory = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);

  // Load data from Local Storage when the page loads
  useEffect(() => {
    // 1. Get existing history from storage
    const storedHistory = localStorage.getItem("serviceHistory");
    
    if (storedHistory) {
      setServices(JSON.parse(storedHistory));
    } else {
      // Optional: Load sample data if storage is empty for testing
      setServices([
        { date: "2025-01-15", vehicle: "Sample Car", service: "Oil Change", cost: 50 }
      ]);
    }
  }, []);

  // Filter services based on search input
  const filteredServices = services.filter(
    (service) =>
      (service.vehicle && service.vehicle.toLowerCase().includes(search.toLowerCase())) ||
      (service.service && service.service.toLowerCase().includes(search.toLowerCase()))
  );

  // Chart data configuration
  const chartData = {
    labels: services.map((s) => s.date),
    datasets: [
      {
        label: "Service Cost ($)",
        data: services.map((s) => s.cost || 0), // Default to 0 if no cost
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#0d6efd",
        pointBorderColor: "#fff",
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#fff" } },
      tooltip: {
        backgroundColor: "rgba(0,123,255,0.85)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#fff" },
        grid: { color: "rgba(255,255,255,0.2)" },
      },
    },
  };

  return (
    <div className="track-page">
      <Container className="py-5 track-history-page">
        <h2 className="text-center mb-4 text-white">Your Vehicle Service History</h2>

        {/* Chart Section */}
        {services.length > 0 ? (
          <Card className="p-4 shadow glass-card mb-5">
            <Line data={chartData} options={chartOptions} />
          </Card>
        ) : (
          <Alert variant="info" className="text-center">No service history found. Book an appointment to see data here!</Alert>
        )}

        {/* Search & Table Section */}
        <Card className="p-4 shadow glass-card">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search by vehicle or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>

          <Table responsive hover className="text-center table-glass">
            <thead>
              <tr>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Service</th>
                <th>Cost ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((s, idx) => (
                  <tr key={idx}>
                    <td>{s.date}</td>
                    <td>{s.vehicle}</td>
                    <td>{s.service}</td>
                    <td>${s.cost || "Pending"}</td>
                    <td>
                      <span className="badge bg-success">Completed</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-white">No records found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};


export default TrackHistory;