import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as AuthService from './utils/auth';

import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ModeratorPanel from './pages/ModeratorPanel';

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    navigate('/login');
  };

  return (
    <div>
      <NavBar currentUser={currentUser} onLogout={handleLogout} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']}>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/mod" element={
            <ProtectedRoute roles={['ROLE_MODERATOR']}>
              <ModeratorPanel />
            </ProtectedRoute>
          }/>
          <Route path="/admin" element={
            <ProtectedRoute roles={['ROLE_ADMIN']}>
              <AdminPanel />
            </ProtectedRoute>
          }/>
        </Routes>
      </main>
    </div>
  );
}

export default App;