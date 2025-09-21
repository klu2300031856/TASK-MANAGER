import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import User from './components/User';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Progress from './components/Progress';

/* ---- ADMIN COMPONENTS (make sure these files exist exactly as named) ---- */
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminHome from './components/AdminHome';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/user" element={<User />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/progress" element={<Progress />} />

            {/* Admin routes (separate URLs) */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/home" element={<AdminHome />} />

            <Route path="*" element={
              <div style={{ textAlign: 'center', width: '100%' }}>
                <h2 style={{ color: '#232526', marginTop: '3rem' }}>404 - Page Not Found</h2>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
