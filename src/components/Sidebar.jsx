import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ user, sidebarOpen, toggleSidebar }) => {
  const getMenu = () => {
    if (user?.role === 'admin') {
      return [
        { path: '/admin', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
        { path: '/profile', icon: 'fas fa-user', label: 'Profile' },
        { path: '/settings', icon: 'fas fa-cog', label: 'Settings' },
      ];
    } else if (user?.role === 'vendor') {
      return [
        { path: '/vendor', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
        { path: '/profile', icon: 'fas fa-user', label: 'Profile' },
      ];
    } else {
      return [
        { path: '/subvendor', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
        { path: '/profile', icon: 'fas fa-user', label: 'Profile' },
      ];
    }
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
      <nav>
        <ul className="sidebar-menu">
          {getMenu().map((item, index) => (
            <li className="sidebar-item" key={index}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                <i className={item.icon + " sidebar-icon"}></i>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;