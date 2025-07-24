
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2575fc 0%, #6a11cb 100%)',
    }}>
      <div style={{
        background: '#fff',
        padding: '40px 32px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(37,117,252,0.15)',
        minWidth: '320px',
        textAlign: 'center',
      }}>
        <h1 style={{ color: '#6a11cb', marginBottom: '24px', fontWeight: 700, letterSpacing: '1px' }}>JWT Login App</h1>
        <p style={{ color: '#2575fc', fontSize: '18px', marginBottom: '32px', fontWeight: 500 }}>
          Secure login for Admins and Users
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #2575fc 0%, #6a11cb 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(37,117,252,0.10)',
            marginBottom: '8px',
            transition: 'background 0.2s',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

// ...existing code...

// ...existing code...

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
