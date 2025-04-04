import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./reg.css";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/content");
  };

  return (
    <div className="registration-container">
      <header>
        <h1 className="logo-reg" onClick={() => navigate("/")}>Welcome to LIBER</h1>
        <p className="tagline">“The secret to getting ahead is getting started.” – Mark Twain</p>
      </header>
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Getting you started :)</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="error">{errors.name}</p>}

        <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" className="submit-btn" onClick={() => navigate("/content")}>Sign Up</button>
        <p className="login-link" onClick={() => navigate("/login")}>
          Already have an account?
        </p>
      </form>
    </div>
  );
};

export default Registration;
