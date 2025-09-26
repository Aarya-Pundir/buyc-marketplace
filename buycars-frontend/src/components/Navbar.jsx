import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">BUYC Marketplace</Link>
      </div>
      <div className="nav-links">
        <Link to="/auth">Login / Signup</Link>
        <Link to="/add">Add Car</Link>
        <Link to="/inventory">My Inventory</Link>
      </div>
    </nav>
  );
}
