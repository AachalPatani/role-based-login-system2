import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="d-flex align-center">
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <span>Vendor Access</span>
        </div>
      </div>
      
      <div className="user-info">
        <div className="d-flex align-center gap-2">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <strong>{user?.name || 'User'}</strong>
            <br />
            <small className="text-light">{user?.role || 'Role'}</small>
          </div>
        </div>
        
        <button className="btn btn-secondary btn-sm ml-3" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </header>
  );
};

export default Header;