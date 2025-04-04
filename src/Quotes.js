import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    color: "#f9f9f9"
  });

  // Load saved quotes from localStorage
  useEffect(() => {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
      setQuotes(JSON.parse(savedQuotes));
    }
  }, []);

  // Save quotes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }, [quotes]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addQuote = () => {
    if (!formData.quote || !formData.author) return;
    const newQuote = { ...formData, date: new Date().toLocaleDateString() };
    setQuotes([...quotes, newQuote]);
    setFormData({ quote: "", author: "", color: "#f9f9f9" });
    setModalOpen(false);
  };

  const deleteQuote = (index) => {
    setQuotes(quotes.filter((_, i) => i !== index));
  };

  return (
    <motion.div
    className="container"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}
    >
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate("/content")}>LIBER</h1>
        <p class="tagline-review" >"Quotes are the whispers of wisdom, capturing the essence of thought in just a few words."</p>
        <button className="add-quote-btn" onClick={() => setModalOpen(true)}>
          + ADD NEW QUOTE
        </button>

        {/* Circle button */}
        <div className="circle" onClick={() => setNavOpen(!navOpen)}></div>

        {/* Navigation Pop-out */}
        <div className={`popout-nav ${navOpen ? "active" : ""}`}>
          <Link to="/content">Home Page</Link>
          <Link to="/add-book">Book Reviews</Link>
          <Link to="/yeargoals">Yearly Goals</Link>
          <Link to="/library">My Library</Link>
          <Link to="/library">My Journal</Link>
        </div>
      </div>

      {/* Quote List */}
      <div className="quote-list">
        {quotes.length === 0 ? (
          <p className="no-quotes">A good quote stays in the heart forever!</p>
        ) : (
          quotes.map((quote, index) => (
            <div key={index} className="quote-card" style={{ backgroundColor: quote.color }}>
              <p className="quote-text">"{quote.quote}"</p>
              <p className="quote-author">- {quote.author}</p>
              <p className="quote-date">Added on: {quote.date}</p>
              <button className="delete-btn" onClick={() => deleteQuote(index)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">Add a Favorite Quote</h2>
            <textarea
              placeholder="Enter Quote"
              name="quote"
              value={formData.quote}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
            <label>Choose Card Color:</label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
            <button className="save-btn" onClick={addQuote}>Save Quote</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
