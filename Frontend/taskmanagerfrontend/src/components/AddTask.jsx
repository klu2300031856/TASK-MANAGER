import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTask.css';

function AddTask() {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleCalendar = () => setShowCalendar(!showCalendar);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); // ✅ add username

    await fetch('http://localhost:2006/tasks/addtask', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: task,
        description,
        deadline,
        username // ✅ send username
      })
    });
    navigate('/tasks');
  };

  const handleCalendarSelect = () => {
    if (year && month && date) {
      setDeadline(`${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`);
      setShowCalendar(false);
    }
  };

  return (
    <div className="page-container">
      <form className="form-box" onSubmit={handleSave}>
        <h2 className="form-title">Add Task</h2>
        <input
          className="form-input"
          type="text"
          placeholder="Task"
          value={task}
          required
          onChange={e => setTask(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Description"
          value={description}
          required
          onChange={e => setDescription(e.target.value)}
        />
        <div className="deadline-row">
          <input
            className="form-input"
            type="text"
            placeholder="Deadline (YYYY-MM-DD)"
            value={deadline}
            readOnly
            required
          />
          <span className="calendar-icon" onClick={handleCalendar}>📅</span>
        </div>
        {showCalendar && (
          <div className="calendar-popup">
            <input
              className="calendar-input"
              type="number"
              placeholder="Year"
              value={year}
              onChange={e => setYear(e.target.value)}
              min="2024"
              max="2100"
              required
            />
            <input
              className="calendar-input"
              type="number"
              placeholder="Month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              min="1"
              max="12"
              required
            />
            <input
              className="calendar-input"
              type="number"
              placeholder="Date"
              value={date}
              onChange={e => setDate(e.target.value)}
              min="1"
              max="31"
              required
            />
            <button type="button" className="calendar-save-btn" onClick={handleCalendarSelect}>Set</button>
          </div>
        )}
        <button type="submit" className="form-btn">Save</button>
      </form>
    </div>
  );
}

export default AddTask;
