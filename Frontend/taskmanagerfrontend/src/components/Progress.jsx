import React, { useEffect, useState } from 'react';
import './Progress.css';

function Progress() {
  const [stats, setStats] = useState({
    completed: 0,
    pending: 0,
    notCompleted: 0,
    completionPercentage: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username'); // ✅

      const res = await fetch(`http://localhost:2006/tasks/progress/${encodeURIComponent(username)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setStats(data);
    };
    fetchStats();
  }, []);

  const total = stats.completed + stats.pending + stats.notCompleted;

  const percent = stats.completionPercentage
    ? Math.round(stats.completionPercentage)
    : total > 0
      ? Math.round((stats.completed / total) * 100)
      : 0;

  return (
    <div className="page-container">
      <div className="progress-box">
        <div className="progress-header">
          <h2 className="progress-title">Progress:</h2>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
          </div>
          <span className="progress-percent">{percent}%</span>
        </div>
        <div className="progress-details">
          <div>Completed: <b>{stats.completed}</b></div>
          <div>Pending: <b>{stats.pending}</b></div>
          <div>Not Completed: <b>{stats.notCompleted}</b></div>
          <div>Total Tasks: <b>{total}</b></div>
        </div>
      </div>
    </div>
  );
}

export default Progress;
