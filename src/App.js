import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';

// Components
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Appoinments from "./pages/Appoinments"; // File 
import Service from "./pages/Service";
import TrackHistory from "./pages/TrackHistory";
import Profile from "./pages/Profile";
import GarageDashboard from "./pages/GarageDashboard"; // Garage Dashboard

function App() {
  return (
    <div className="app-container">
      <Router>
        <NavbarComponent />

        <main className="main-content">
          <Routes>
            {/* General Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="/appointments" element={<Appoinments />} />
            
            <Route path="/service" element={<Service />} />
            <Route path="/track-history" element={<TrackHistory />} />
            <Route path="/profile" element={<Profile />} />

            {/* ✅ Garage Owner Dashboard Route */}
            <Route path="/garage-dashboard" element={<GarageDashboard />} /> 
            
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;