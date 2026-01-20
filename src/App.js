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
import Appoinments from "./pages/Appoinments"; 
import Service from "./pages/Service";
import TrackHistory from "./pages/TrackHistory";
import Profile from "./pages/Profile";
import GarageDashboard from "./pages/GarageDashboard"; 

// 🔥 1. Admin Dashboard එක Import කළා
import AdminDashboard from "./pages/AdminDashboard"; 

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
            <Route path="/appointments" element={<Appoinments />} />
            <Route path="/service" element={<Service />} />
            <Route path="/history" element={<TrackHistory />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* 🔥 2. Garage Dashboard Route එක සම්බන්ධ කළා */}
            <Route path="/garage-dashboard" element={<GarageDashboard />} /> 
            
            {/* 🔥 3. Admin Dashboard Route එක සම්බන්ධ කළා */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            
          </Routes>
        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;