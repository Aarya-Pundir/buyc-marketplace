import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import Navbar from '../components/Navbar';
import '../components/Navbar.css';

export default function Home() {
  return (
    <>
      {/* Use the Navbar component here */}
      <Navbar />

      <div className="homepage">
        <div className="homepage-content">
          <h2>Welcome to BUYC Marketplace</h2>
          <p>Manage your cars and explore new listings easily.</p>
        </div>
      </div>
    </>
  );
}
