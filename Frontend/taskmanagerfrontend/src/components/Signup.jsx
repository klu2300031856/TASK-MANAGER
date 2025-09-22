import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
  e.preventDefault();
  setLoading(true);
  setPopup('');

  const payload = { username, password };
  console.log('Signup payload:', payload);

  try {
    const response = await fetch('http://localhost:2006/task/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('Response status:', response.status, response.statusText);
    // show response headers (useful to see content-type)
    for (const [k, v] of response.headers.entries()) {
      console.log('Response header:', k, v);
    }

    // read text first so we don't blow up if server returns non-JSON / empty body
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (err) {
      console.warn('Response not JSON:', text);
      data = { raw: text };
    }
    console.log('Response body parsed:', data);

    if (response.ok) {
      setPopup('Successfully registered!');
      setTimeout(() => {
        setPopup('');
        navigate('/login');
      }, 1500);
    } else {
      // show any message backend returned, otherwise show generic
      setPopup((data && (data.message || data.error)) || `Signup failed (status ${response.status})`);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    setPopup('Network error!');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="page-container">
      <form className="form-box" onSubmit={handleSignup}>
        {popup && <div className="form-popup">{popup}</div>}
        <h2 className="form-title">Signup</h2>
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

export default Signup;