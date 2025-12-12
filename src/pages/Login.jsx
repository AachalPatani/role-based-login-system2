import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import users from '../data/users';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Simulate API call
  setTimeout(() => {
    const user = users.find(
      u => u.username === username && 
           u.password === password && 
           u.role === role
    );

    if (user) {
      // Create complete user object
      const userData = {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        status: user.status,
        // Add role-specific data
        ...(user.role === 'vendor' && { 
          locations: user.locations || [] 
        }),
        ...(user.role === 'subvendor' && { 
          vendor: user.vendor || '',
          location: user.location || '' 
        })
      };

      console.log('Login successful:', userData);
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(userData));
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLogin(userData);
      navigate(`/${user.role}`);
    } else {
      setError('Invalid credentials! Please check username, password, and role.');
    }
    setLoading(false);
  }, 500);
};

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <h1 className="login-title">Vendor Access System</h1>
              <p className="login-subtitle">Professional Management Portal</p>
            </div>
          </div>
          <p className="text-light">Secure login to access your dashboard</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <select 
              className="form-select" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="admin">Administrator</option>
              <option value="vendor">Vendor</option>
              <option value="subvendor">Sub-Vendor</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Authenticating...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Login to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-light mb-2">Demo Credentials:</p>
          <div className="d-flex justify-center gap-3 flex-wrap">
            <div className="card p-2">
              <strong>Admin:</strong> admin / admin123
            </div>
            <div className="card p-2">
              <strong>Vendor:</strong> vendor1 / vendor123
            </div>
            <div className="card p-2">
              <strong>Sub-Vendor:</strong> subvendor1 / subvendor123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Add this function in Login component
const checkStoredData = () => {
  const currentUser = localStorage.getItem('currentUser');
  const user = localStorage.getItem('user');
  console.log('currentUser:', currentUser);
  console.log('user:', user);
  console.log('All localStorage:', localStorage);
};

// Add this button in the form (temporary for debugging)
<button 
  type="button" 
  onClick={checkStoredData}
  className="btn btn-secondary mt-2"
>
  <i className="fas fa-bug"></i> Debug Storage
</button>

export default Login;