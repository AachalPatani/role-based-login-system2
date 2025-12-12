import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  // Get user from localStorage
  const userStr = localStorage.getItem('currentUser') || localStorage.getItem('user');
  
  if (!userStr) {
    alert('Please login first!');
    return <Navigate to="/login" />;
  }

  try {
    const user = JSON.parse(userStr);
    
    // Debug: Log user and required role
    console.log('PrivateRoute Check:', {
      userRole: user.role,
      requiredRole: role,
      user: user
    });
    
    // Check if user has the required role
    if (user.role !== role) {
      // Instead of showing alert and redirecting, show a friendly message
      // and redirect to their own dashboard
      console.warn(`Access Denied: User is ${user.role}, but ${role} is required`);
      
      // Redirect to their own dashboard
      if (user.role === 'admin') {
        return <Navigate to="/admin" />;
      } else if (user.role === 'vendor') {
        return <Navigate to="/vendor" />;
      } else if (user.role === 'subvendor') {
        return <Navigate to="/subvendor" />;
      } else {
        return <Navigate to="/login" />;
      }
    }
    
    return children;
  } catch (error) {
    console.error('Error parsing user data:', error);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute;