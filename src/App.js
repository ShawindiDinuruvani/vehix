import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Appoinments from "./pages/Appoinments";
import NavbarComponent from "./components/Navbar";
import Service from "./pages/Service";
import TrackHistory from "./pages/TrackHistory";
import 'leaflet/dist/leaflet.css';
import axiosInstance from './api/axios';



function App() {
  return (
    <div className="app-container">
      <Router>
        <NavbarComponent />

        <main className="main-content">
         

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Signin />} />
  <Route path="/appoinments" element={<Appoinments />} />
  <Route path="/service" element={<Service />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/track-history" element={<TrackHistory />} />

</Routes>

        </main>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
