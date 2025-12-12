import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import VendorDashboard from './pages/VendorDashboard';
import SubVendorDashboard from './pages/SubVendorDashboard';
import AddVendor from './pages/AddVendor';
import AddSubVendor from './pages/AddSubVendor';
import VendorList from './pages/VendorList';
import LocationList from './pages/LocationList';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import { initializeData } from './utils/storage';
import './styles/global.css';

function App() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
  // Initialize data
  initializeData();

  // Check for existing user session - check both keys
  const storedUser = localStorage.getItem('currentUser') || localStorage.getItem('user');
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      console.log('Loaded user from storage:', userData);
      setUser(userData);
    } catch (error) {
      console.error('Error parsing stored user:', error);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('user');
    }
  }
}, []);

const handleLogin = (userData) => {
  console.log('Logging in user:', userData);
  setUser(userData);
  // Store in both keys for compatibility
  localStorage.setItem('currentUser', JSON.stringify(userData));
  localStorage.setItem('user', JSON.stringify(userData));
};

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="App">
        {user && (
          <Header 
            user={user} 
            onLogout={handleLogout} 
            toggleSidebar={toggleSidebar} 
          />
        )}
        
        <div className="app-content">
          {user && (
            <Sidebar 
              user={user} 
              sidebarOpen={sidebarOpen} 
              toggleSidebar={toggleSidebar} 
            />
          )}
          
          <main className={`main-content ${!user ? 'full-width' : ''}`}>
            <Routes>
              <Route path="/" element={
                user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
              } />
              
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              } />
              
              <Route path="/add-vendor" element={
                <PrivateRoute role="admin">
                  <AddVendor />
                </PrivateRoute>
              } />
              
              <Route path="/add-subvendor" element={
                <PrivateRoute role="admin">
                  <AddSubVendor />
                </PrivateRoute>
              } />
              
              <Route path="/vendors" element={
                <PrivateRoute role="admin">
                  <VendorList />
                </PrivateRoute>
              } />
              
              <Route path="/locations" element={
                <PrivateRoute role="admin">
                  <LocationList />
                </PrivateRoute>
              } />
              
              {/* Vendor Routes */}
              <Route path="/vendor" element={
                <PrivateRoute role="vendor">
                  <VendorDashboard />
                </PrivateRoute>
              } />
              
              {/* Sub-Vendor Routes */}
              <Route path="/subvendor" element={
                <PrivateRoute role="subvendor">
                  <SubVendorDashboard />
                </PrivateRoute>
              } />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
            {user && (
              <footer className="footer">
                <p>Vendor Access System v2.0 • © {new Date().getFullYear()} All rights reserved</p>
                <p className="mt-1">Role: {user.role} | Access Level: {
                  user.role === 'admin' ? 'Full System Access' :
                  user.role === 'vendor' ? 'Vendor Management' :
                  'Location Access Only'
                }</p>
              </footer>
            )}
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;