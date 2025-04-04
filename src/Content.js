import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import "./index.css";

const Content = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <div className="content-container">
      {/* Animated Black Book */}
      <motion.div
        className="book-animation"
        initial={{ scale: 1, x: 0, y: 0 }}
        animate={{ scale: 0.6, x: -100, y: -290 }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        {/* Black Book SVG */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="black"
          strokeWidth="4"
        >
          <rect x="15" y="15" width="70" height="70" rx="6" ry="6" stroke="black" fill="white" />
          <line x1="15" y1="25" x2="85" y2="25" stroke="black" />
          <line x1="15" y1="45" x2="85" y2="45" stroke="black" />
          <line x1="15" y1="65" x2="85" y2="65" stroke="black" />
          <line x1="15" y1="85" x2="85" y2="85" stroke="black" />
        </svg>
      </motion.div>

      {/* Content Appears After Animation */}
      <motion.div
        className="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        <header className="header">
          <h1> LIBER </h1>
          <p className="tagline">"Track your reads, cherish your quotes, and achieve your goals!"</p>
        </header>
        <div className="sections">
          <button className="btn" onClick={() => navigate("/add-book")}>Book Review</button><br/>
          <button className="btn" onClick={() => navigate("/quotes")}>Quotes</button><br/>
          <button className="btn" onClick={() => navigate("/yeargoals")}>Yearly Goals</button><br/>
          <button className="btn" onClick={() => navigate("/library")}>My Library</button><br/>
          <button className="btn" onClick={() => navigate("/journal")}>My Journal</button><br/>
        </div>
      </motion.div>
    </div>
  );
};

export default Content;
