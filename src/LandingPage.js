import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Top Bar */}
      <header className="top-bar">
        <h1 className="logo">LIBER</h1>
        <nav>
          <button onClick={() => navigate("/login")} className="nav-btn">LOGIN</button>
          <button onClick={() => navigate("/contact")} className="nav-btn">CONTACT US</button>
          <button onClick={() => navigate("/about")} className="nav-btn">ABOUT US</button>
        </nav>
      </header>

      {/* Main Content */}
      <div className="main-content">
          <button className="get-started-btn" onClick={() => navigate("/signup")}>GET STARTED</button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Upasana Bhaumik | Reg No: 23BCB0074</p>
      </footer>
    </div>
  );
};

export default LandingPage;