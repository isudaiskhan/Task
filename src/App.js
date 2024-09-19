import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Pages/Login/Login';
import Profile from './Components/Pages/Profile/Profile';
import About from './Components/Pages/About/About';
import Home from './Components/Pages/Home/Home';
import Contact from './Components/Pages/Contact/Contact';
import PrivateRoute from './Components/Pages/PrivateRoute/PrivateRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
    </>
  );
}

export default App;