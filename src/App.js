import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./Content";
import AddBook from "./AddBook";
import Quotes from "./Quotes";
import YearlyGoals from "./YearlyGoals";
import LandingPage from "./LandingPage";
import Registration from "./reg";
import Login from "./login";
import Contact from "./contact";
import About from "./About";
import LibraryPage from "./Library";
import Journal from "./Journal";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/journal" element={<Journal/>}></Route>
          <Route path="/library" element={<LibraryPage/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/signup" element={<Registration/>}></Route>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/content" element={<Content />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/yeargoals" element={<YearlyGoals/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
