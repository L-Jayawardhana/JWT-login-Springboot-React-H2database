import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    }}>
      <div style={{
        background: '#fff',
        padding: '40px 32px',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(106,17,203,0.15)',
        minWidth: '320px',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#2575fc', marginBottom: '24px', fontWeight: 700, letterSpacing: '1px' }}>Hello Admin!</h2>
        <p style={{ color: '#6a11cb', fontSize: '18px', marginBottom: '32px', fontWeight: 500 }}>
          Welcome to the Admin Dashboard.
        </p>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '18px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(106,17,203,0.10)',
            marginBottom: '8px',
            transition: 'background 0.2s',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
