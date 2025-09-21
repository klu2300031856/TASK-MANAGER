import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css';

function AdminHome() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const admin = localStorage.getItem('admin');

  useEffect(() => {
    if (!admin) {
      navigate('/admin/login');
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:2006/task/admin/alltasks');
        const data = await res.json();
        setTasks(data || []);
      } catch {
        setTasks([]);
      }
    };
    fetchTasks();
  }, [admin, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  return (
    <div className="page-container">
      <div className="admin-box">
        <div className="admin-header">
          <h2 className="form-title">Users and Progresses</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Task Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, i) => (
              <tr key={i}>
                <td>{task.id}</td>
                <td>{task.username}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
