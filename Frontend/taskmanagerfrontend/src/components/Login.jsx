import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopup('');
    try {
      const response = await fetch('http://localhost:2006/task/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }

      if (response.ok) {
        // ✅ Save username & token
        localStorage.setItem('username', data.username || username);
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        navigate('/user');
      } else {
        setPopup(data.message || 'Incorrect credentials');
      }
    } catch (error) {
      setPopup('Network error!');
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <form className="form-box" onSubmit={handleLogin}>
        {popup && <div className={`form-popup${popup === 'Incorrect credentials' ? ' error' : ''}`}>{popup}</div>}
        <h2 className="form-title">Login</h2>
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
        <span className="signup-link">
          New user? <span className="signup-link-text" onClick={() => navigate('/signup')}>Signup</span>
        </span>
        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
