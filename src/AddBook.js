import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./index.css";

export default function AddBooksPage() {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentNotes, setCurrentNotes] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    image: "",
    review: "",
    color: "#f9f9f9",
    notes: "",
  });

  useEffect(() => {
    const savedBooks = localStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addOrUpdateBook = () => {
    if (!formData.title || !formData.author || !formData.image) return;
    if (editingIndex !== null) {
      const updatedBooks = books.map((book, index) =>
        index === editingIndex ? { ...formData, date: book.date } : book
      );
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      const newBook = { ...formData, date: new Date().toLocaleDateString() };
      setBooks([...books, newBook]);
    }
    setFormData({ title: "", author: "", genre: "", image: "", review: "", color: "#f9f9f9", notes: "" });
    setModalOpen(false);
  };

  const deleteBook = (index) => {
    setBooks(books.filter((_, i) => i !== index));
  };

  const editBook = (index) => {
    setFormData(books[index]);
    setEditingIndex(index);
    setModalOpen(true);
  };

  const openNotes = (index) => {
    setCurrentNotes(books[index].notes || "");
    setEditingIndex(index);
    setNotesOpen(true);
  };

  const saveNotes = () => {
    const updatedBooks = books.map((book, index) =>
      index === editingIndex ? { ...book, notes: currentNotes } : book
    );
    setBooks(updatedBooks);
    setNotesOpen(false);
  };
  const toggleNav = () => {
    setNavOpen(!navOpen); // ✅ Toggle the menu
  };

  return (
    <motion.div
    className="container"
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.5 }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate("/content")}>LIBER</h1>
        <p class="tagline-review">"A book review is a mirror to a book’s soul, reflecting its essence and inviting others to explore its world"</p>
        <button className="add-book-btn" onClick={() => setModalOpen(true)}>+ ADD NEW BOOK</button>
        
        {/* Circle button */}
        <div className="circle" onClick={toggleNav}></div>

        {/* Navigation Pop-out */}
        <div className={`popout-nav ${navOpen ? "active" : ""}`}>
          <Link to="/content">Home</Link>
          <a href="/quotes">Quotes</a>
          <a href="/yeargoals">Yearly Goals</a>
          <a href="/library">My Library</a>
          <a href="/journal">My Journal</a>
        </div>
      </div>

      {/* Book List */}
      <div className="book-list">
        {books.length === 0 ? (
          <p className="no-books">No books added yet.</p>
        ) : (
          books.map((book, index) => (
            <div key={index} className="book-card" style={{ backgroundColor: book.color }}>
              <img src={book.image} alt="Book" className="book-image" />
              <div className="book-details">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-info">{book.author} | {book.genre}</p>
                <p className="book-review">{book.review}</p>
                <p className="book-date">Added on: {book.date}</p>
                <button className="edit-btn" onClick={() => editBook(index)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteBook(index)}>Delete</button>
                <button className="notes-btn" onClick={() => openNotes(index)}>More Notes</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Book Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingIndex !== null ? "Edit Book" : "Add a New Book"}</h2>
            <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleInputChange} />
            <input type="text" placeholder="Author" name="author" value={formData.author} onChange={handleInputChange} />
            <input type="text" placeholder="Genre" name="genre" value={formData.genre} onChange={handleInputChange} />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <textarea placeholder="Review" name="review" value={formData.review} onChange={handleInputChange}></textarea>
            <label>Choose Card Color:</label>
            <input type="color" name="color" value={formData.color} onChange={handleInputChange} />
            <button onClick={addOrUpdateBook}>{editingIndex !== null ? "Update Book" : "Save Book"}</button>
            <button onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      {/* More Notes Modal */}
      {notesOpen && (
        <div className="modal">
          <div className="modal-content diary">
            <h2>More Notes</h2>
            <textarea class="text" value={currentNotes} onChange={(e) => setCurrentNotes(e.target.value)}></textarea>
            <button onClick={saveNotes}>Save Notes</button>
            <button onClick={() => setNotesOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
