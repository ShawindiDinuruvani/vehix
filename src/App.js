import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Vehicles from "./pages/Vehicles";
import Appoinments from "./pages/Appoinments";
import NavbarComponent from "./components/Navbar";

function App() {
  return (
    <Router>
      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/appoinments" element={<Appoinments />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
