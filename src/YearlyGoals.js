import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

const YearlyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [goalInput, setGoalInput] = useState({ title: "", author: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedGoals = localStorage.getItem("yearlyGoals");
    if (savedGoals) setGoals(JSON.parse(savedGoals));
  }, []);

  useEffect(() => {
    localStorage.setItem("yearlyGoals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!goalInput.title || !goalInput.author) return;
    setGoals([...goals, { ...goalInput, completed: false }]);
    setGoalInput({ title: "", author: "" });
    setModalOpen(false);
  };

  const markCompleted = (index) => {
    const updatedGoals = goals.map((goal, i) =>
      i === index ? { ...goal, completed: true } : goal
    );
    setGoals(updatedGoals);
  };

  const allCompleted = goals.length > 0 && goals.every((goal) => goal.completed);

  return (
    <motion.div
    className="container"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}>
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate("/content")} style={{ cursor: "pointer" }}>LIBER</h1>
        <p className="tagline-review">"Years pass by like pages in a book, each chapter shaping who we are, yet the story always continues."</p>
        <button className="add-book-btn" onClick={() => setModalOpen(true)}>
          + ADD NEW GOAL
        </button>
      {/* Circle button */}
      <div className="circle" onClick={() => setNavOpen(!navOpen)}></div>

      {/* Navigation Pop-out */}
      <div className={`popout-nav ${navOpen ? "active" : ""}`}>
        <Link to="/content">Home Page</Link>
        <Link to="/add-book">Book Reviews</Link>
        <Link to="/quotes">Quotes</Link>
        <Link to="/library">My Library</Link>
        <Link to="/journal">My Journal</Link>
      </div>
      </div>

      <div className="goal-list">
        {goals.length === 0 ? (
          <p className="no-goals">No goals added yet. Start planning your reads!</p>
        ) : (
          goals.map((goal, index) => (
            <div
              key={index}
              className={`goal-card ${goal.completed ? "completed" : ""}`}
            >
              <h2 className="goal-title">{goal.title}</h2>
              <p className="goal-author">by {goal.author}</p>
              {!goal.completed && (
                <button className="complete-btn" onClick={() => markCompleted(index)}>
                  Mark as Completed
                </button>
              )}
              {goal.completed && <p className="completed-label">Completed</p>}
            </div>
          ))
        )}
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add a New Goal</h2>
            <input
              type="text"
              placeholder="Book Title"
              value={goalInput.title}
              onChange={(e) => setGoalInput({ ...goalInput, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={goalInput.author}
              onChange={(e) => setGoalInput({ ...goalInput, author: e.target.value })}
            />
            <button className="save-btn" onClick={addGoal}>Save Goal</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {allCompleted && <div className="congrats-message">🎉 Congratulations! You completed all your goals! 🎉</div>}
    </motion.div>
  );
};

export default YearlyGoals;