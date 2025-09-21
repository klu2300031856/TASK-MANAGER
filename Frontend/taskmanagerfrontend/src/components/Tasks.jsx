import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username'); // ✅ username

        const res = await fetch(`http://localhost:2006/tasks/view/${encodeURIComponent(username)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        setTasks(data || []);
      } catch {
        setTasks([]);
      }
    };
    fetchTasks();
  }, []);

  const handleComplete = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";

    const res = await fetch(`http://localhost:2006/tasks/complete/${encodeURIComponent(username)}/${id}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({ status: newStatus })
    });

    if (res.ok) {
      setTasks(tasks =>
        tasks.map(task =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    await fetch(`http://localhost:2006/tasks/delete/${encodeURIComponent(username)}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const today = new Date().toISOString().split('T')[0];
  const activeTasks = tasks.filter(task => !task.deadline || task.deadline >= today);

  return (
    <div className="page-container">
      <div className="tasks-box">
        <h2 className="form-title">Tasks</h2>
        <ul className="tasks-list">
          {activeTasks.map(task => (
            <li key={task.id} className="task-item">
              <span className="delete-icon" onClick={() => handleDelete(task.id)}>🗑️</span>
              <input
                type="checkbox"
                checked={task.status === "COMPLETED"}
                onChange={() => handleComplete(task.id, task.status)}
              />
              <span className={task.status === "COMPLETED" ? 'task-completed' : ''}>
                <strong>{task.title}</strong> - {task.description}
                <span className="task-deadline"> ({task.deadline || 'No deadline'})</span>
              </span>
            </li>
          ))}
        </ul>
        <button className="add-task-btn" onClick={() => navigate('/add-task')}>
          + Add Task
        </button>
      </div>
    </div>
  );
}

export default Tasks;
