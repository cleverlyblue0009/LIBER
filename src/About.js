import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="logo-about" onClick={() => navigate("/")}>
      Curiosity is the wick in the candle of learning
      </div>

      <div className="about-content">
        <h2>About LIBER</h2>

        <p>
          <strong>LIBER</strong> is your ultimate companion for tracking your reading journey.
          Our mission is to help readers discover, review, and cherish their favorite books
          while staying motivated to reach their yearly reading goals.
        </p>

        <p>
          Whether you're looking for a space to record your thoughts on each book, save
          your favorite quotes, or track your yearly reading goals, LIBER is here to guide
          you every step of the way.
        </p>

        <p>
          With our seamless and intuitive interface, you'll enjoy an organized and inspiring
          reading experience. Join us on this literary journey and be a part of the LIBER community!
        </p>
      </div>
    </div>
  );
};

export default About;
