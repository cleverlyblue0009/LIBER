import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Handle login logic here (API request, validation, etc.)
      navigate("/content"); // Redirect to homepage or dashboard after login
    } else {
      setError("Please fill out both fields.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-reg" onClick={() => navigate("/")}>Glad To Have You Back~</div>
      <div className="login-form">
        <h2>Login to LIBER</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <div className="error">{error}</div>}

          <button type="submit" className="submit-btn" onClick={() => navigate("/content")}>Login</button>
        </form>
        
        <div className="signup-link">
          <p>Don't have an account? <span onClick={() => navigate("/signup")} className="link-text">Sign Up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
