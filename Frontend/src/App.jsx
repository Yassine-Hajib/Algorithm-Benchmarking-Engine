import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import Benchmark from './Pages/Benchmark';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="nav-brand">AlgoBench <span>v1.0</span></div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/benchmark" className="btn-nav">Start Testing</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/benchmark" element={<Benchmark />} />
      </Routes>
    </Router>
  );
}

export default App;