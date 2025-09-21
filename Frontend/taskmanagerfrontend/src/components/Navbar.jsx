import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // ✅ clear username too
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" className="logo-img" />
        <span className="navbar-title">TaskManager</span>
      </div>
      {isLoggedIn ? (
        <button className="navbar-login" onClick={handleLogout}>Logout</button>
      ) : (
        <button className="navbar-login" onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
}

export default Navbar;
