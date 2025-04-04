import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

export default function Library() {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    tags: "",
    file: null,
    fileUrl: ""
  });

  useEffect(() => {
    const savedBooks = localStorage.getItem("libraryBooks");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
  }, [books]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({ ...formData, file, fileUrl });
    }
  };

  const addOrUpdateBook = () => {
    if (!formData.title || !formData.author || !formData.file) return;
    if (editingIndex !== null) {
      const updatedBooks = books.map((book, index) =>
        index === editingIndex ? { ...formData } : book
      );
      setBooks(updatedBooks);
      setEditingIndex(null);
    } else {
      setBooks([...books, { ...formData }]);
    }
    setFormData({ title: "", author: "", tags: "", file: null, fileUrl: "" });
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
        <p class="tagline-review" >"The only thing that you absolutely have to know is the location of the library."</p>
        <button className="add-book-btn" onClick={() => setModalOpen(true)}>
          + ADD NEW BOOK
        </button>
        {/* Circle button */}
      <div className="circle" onClick={() => setNavOpen(!navOpen)}></div>
      {/* Navigation Pop-out */}
      <div className={`popout-nav ${navOpen ? "active" : ""}`}>
      <Link to="/content">Home Page</Link>
      <Link to="/add-book">Book Reviews</Link>
      <Link to="/quotes">Quotes</Link>
      <Link to="/yeargoals">Yearly Goals</Link>
      <Link to="/journal">My Journal</Link>
      </div>
      </div>

      {/* Book List */}
      <div className="book-list">
        {books.length === 0 ? (
          <p className="no-books">No books added yet.</p>
        ) : (
          books.map((book, index) => (
            <div key={index} className="book-card">
              <div className="book-details">
                <h2 className="book-title">{book.title}</h2>
                <p className="book-info">{book.author}</p>
                <p className="book-tags">Tags: {book.tags}</p>
                <a href={book.fileUrl} target="_blank" rel="noopener noreferrer" className="view-file">
                  View PDF
                </a>
                <button className="edit-btn" onClick={() => editBook(index)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteBook(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title">{editingIndex !== null ? "Edit Book" : "Add a New Book"}</h2>
            <input type="text" placeholder="Title" name="title" value={formData.title} onChange={handleInputChange} />
            <input type="text" placeholder="Author" name="author" value={formData.author} onChange={handleInputChange} />
            <input type="text" placeholder="Tags (comma separated)" name="tags" value={formData.tags} onChange={handleInputChange} />
            <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            <button className="save-btn" onClick={addOrUpdateBook}>{editingIndex !== null ? "Update Book" : "Save Book"}</button>
            <button className="close-btn" onClick={() => setModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
