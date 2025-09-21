import React from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

function User() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="user-btns-box">
        <button className="user-btn big-btn" onClick={() => navigate('/tasks')}>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="Tasks" className="user-btn-icon big-icon" />
          Tasks
        </button>
        <button className="user-btn big-btn" onClick={() => navigate('/progress')}>
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Progress" className="user-btn-icon big-icon" />
          Progress
        </button>
      </div>
    </div>
  );
}

export default User;