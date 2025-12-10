import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col } from "react-bootstrap";
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

// Sample past services data
const pastServices = [
  { date: "2025-01-15", vehicle: "Honda Civic", service: "Oil Change", cost: 50 },
  { date: "2025-02-20", vehicle: "Toyota Corolla", service: "Brake Check", cost: 75 },
  { date: "2025-03-10", vehicle: "Suzuki Swift", service: "Battery Replacement", cost: 100 },
  { date: "2025-04-05", vehicle: "Honda Civic", service: "Tire Rotation", cost: 40 },
  { date: "2025-05-18", vehicle: "Toyota Corolla", service: "AC Service", cost: 60 },
];

const TrackHistory = () => {
  const [search, setSearch] = useState("");

  // Filter services based on search input
  const filteredServices = pastServices.filter(
    (service) =>
      service.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      service.service.toLowerCase().includes(search.toLowerCase())
  );

  // Chart data
  const chartData = {
    labels: pastServices.map((s) => s.date),
    datasets: [
      {
        label: "Service Cost ($)",
        data: pastServices.map((s) => s.cost),
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
        bodyColor: "#fff" 
      },
      title: { display: false },
    },
    scales: {
      x: {
        type: "category",
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
        <h2 className="text-center mb-4">Track Your Vehicle Service History</h2>

        {/* Chart Section */}
        <Card className="p-4 shadow glass-card mb-5">
          <Line data={chartData} options={chartOptions} />
        </Card>

        {/* Search & Table Section */}
        <Card className="p-4 shadow glass-card">
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Search by vehicle or service"
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
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.date}</td>
                  <td>{s.vehicle}</td>
                  <td>{s.service}</td>
                  <td>{s.cost}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default TrackHistory;
