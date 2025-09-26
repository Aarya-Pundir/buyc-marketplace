// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth';
import AddCar from './pages/AddCar';
import Inventory from './pages/Inventory';
import Home from './pages/Home';
import { getUser } from './services/api';

function PrivateRoute({ children }) {
  const user = getUser();
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<PrivateRoute><AddCar /></PrivateRoute>} />
        <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
