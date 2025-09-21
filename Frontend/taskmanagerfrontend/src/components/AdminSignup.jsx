import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminSignup.css';

function AdminSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup('');
    try {
      const response = await fetch('http://localhost:2006/task/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setPopup('Successfully registered!');
        setTimeout(() => {
          setPopup('');
          navigate('/admin/home');
        }, 1500);
      } else {
        setPopup(data.message || 'Signup failed!');
      }
    } catch (error) {
      setPopup('Network error!');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <form className="form-box" onSubmit={handleSignup}>
        {popup && <div className="form-popup">{popup}</div>}
        <h2 className="form-title">Admin Signup</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
}

export default AdminSignup;
