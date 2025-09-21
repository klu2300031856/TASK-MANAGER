import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-bg">
      <div className="home-box">
        <h1 className="home-title">Welcome to TaskManager</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png"
          alt="Task Logo"
          className="home-logo"
        />
        <div className="home-description">
          <p>
            <strong>TaskManager</strong> helps you organize your tasks and projects efficiently.
          </p>
          <div className="project-section">
            <strong>Features:</strong>
            <ul>
              <li>Enter tasks and deadlines, mark as completed</li>
              <li>Track progress visually with project sections</li>
              <li>See completion percentage for each project</li>
              <li>View completed and pending tasks by deadline</li>
              <li>Boost your productivity and never miss a deadline!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;