import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Login button clicked');
    try {
      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      console.log('Fetch response status:', response.status);
      if (!response.ok) {
        setError('Invalid credentials');
        return;
      }
      const data = await response.json();
      console.log('Fetch response data:', data);
      // Assume backend returns { token, role }
    localStorage.setItem('token', data.jwtToken);
    const role = data.roles && data.roles.length > 0 ? data.roles[0] : '';
    console.log('Role value:', role);
    if (role === 'ADMIN' || role === 'ROLE_ADMIN') {
        navigate('/admin');
    } else if (role === 'ROLE_USER' || role === 'USER') {
        navigate('/user');
    } else {
        setError('Unknown role: ' + role);
    }
    } catch (err) {
      setError('Login failed');
      console.error('Login error:', err);
    }
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
        <h2 style={{ color: '#2575fc', marginBottom: '24px', fontWeight: 700, letterSpacing: '1px' }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px', textAlign: 'left' }}>
            <label style={{ color: '#6a11cb', fontWeight: 600 }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                marginTop: '6px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ marginBottom: '18px', textAlign: 'left' }}>
            <label style={{ color: '#6a11cb', fontWeight: 600 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                marginTop: '6px',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
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
            Login
          </button>
          {error && <div style={{ color: '#e53935', marginTop: '10px', fontWeight: 600 }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
