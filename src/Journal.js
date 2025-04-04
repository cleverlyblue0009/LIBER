import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Journal.css";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState("");
  const [navOpen, setNavOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const addOrUpdateEntry = () => {
    if (!currentEntry.trim()) return;

    const newEntry = {
      text: currentEntry,
      date: new Date().toLocaleDateString(),
    };

    if (editingIndex !== null) {
      const updatedEntries = entries.map((entry, index) =>
        index === editingIndex ? newEntry : entry
      );
      setEntries(updatedEntries);
      setEditingIndex(null);
    } else {
      setEntries([...entries, newEntry]);
    }

    setCurrentEntry("");
    setModalOpen(false);
  };

  const deleteEntry = (index) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const openEntry = (index) => {
    setCurrentEntry(entries[index].text);
    setEditingIndex(index);
    setModalOpen(true);
  };
  const toggleNav = () => {
    setNavOpen(!navOpen); // ✅ Toggle the menu
  };


  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate("/content")}>LIBER</h1>
        <p className="tagline-review">"Fill your paper with the breathings of your heart."</p>
        <button className="add-book-btn" onClick={() => setModalOpen(true)}>
          + ADD NEW ENTRY 
        </button>
        {/* Circle button */}
        <div className="circle" onClick={toggleNav}></div>

        {/* Navigation Pop-out */}
        <div className={`popout-nav ${navOpen ? "active" : ""}`}>
          <Link to="/content">Home</Link>
          <a href="/add-book">Book Review</a>
          <a href="/quotes">Quotes</a>
          <a href="/yeargoals">Yearly Goals</a>
          <a href="/library">My Library</a>
        
        </div>
      </div>

      {/* Journal Entries List */}
      <div className="book-list">
        {entries.length === 0 ? (
          <p className="no-books">No journal entries yet.</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="book-card">
              <div className="book-details">
                <h2 className="book-title">{entry.date}</h2>
                <p className="book-review">{entry.text.slice(0, 100)}...</p>
                <button className="edit-btn" onClick={() => openEntry(index)}>
                  View
                </button>
                <button className="delete-btn" onClick={() => deleteEntry(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="journal-modal-content">
            <textarea
              className="journal-textarea"
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="Write your thoughts here..."
            />
            <div className="button-group">
              <button className="save-btn" onClick={addOrUpdateEntry}>
                Save
              </button>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
