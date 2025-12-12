import React, { useState, useEffect } from 'react';

const SubVendorDashboard = () => {
  const [subVendorData, setSubVendorData] = useState(null);
  const [stats, setStats] = useState({
    totalAccess: 0,
    thisMonth: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    // Get current sub-vendor from localStorage
    const userStr = localStorage.getItem('currentUser') || localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setSubVendorData(userData);
        
        if (userData.role === 'subvendor') {
          setStats({
            totalAccess: 156,
            thisMonth: 24,
            pendingRequests: 2
          });
        }
      } catch (error) {
        console.error('Error loading sub-vendor data:', error);
      }
    }
  }, []);

  if (!subVendorData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading sub-vendor dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Welcome, {subVendorData.name}</h1>
        <p className="text-light">Sub-Vendor Dashboard - Access your assigned location</p>
        <div className="badge badge-info mt-2">
          Role: {subVendorData.role.toUpperCase()}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-door-open"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalAccess}</h3>
            <p>Total Accesses</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.thisMonth}</h3>
            <p>This Month</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.pendingRequests}</h3>
            <p>Pending Requests</p>
          </div>
        </div>
      </div>

      {/* Assigned Location */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-map-marker-alt"></i>
            My Assigned Location
          </h2>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-key"></i> Request Access
          </button>
        </div>
        <div className="p-3">
          {subVendorData.location ? (
            <div className="location-card">
              <div className="location-header">
                <h3 className="location-name">{subVendorData.location}</h3>
                <span className="badge badge-success">Active</span>
              </div>
              <p className="text-light">Your assigned location for access</p>
              <div className="location-meta">
                <div className="meta-item">
                  <i className="fas fa-building"></i>
                  <span>Vendor: {subVendorData.vendor || 'Not specified'}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-door-open"></i>
                  <span>{stats.totalAccess} total accesses</span>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-primary mr-2">
                  <i className="fas fa-key"></i> Request Access Now
                </button>
                <button className="btn btn-secondary">
                  <i className="fas fa-history"></i> View Access History
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-map-marker-alt empty-icon"></i>
              <h3>No Location Assigned</h3>
              <p>Contact your vendor to get a location assigned.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-bolt"></i>
            Quick Actions
          </h2>
        </div>
        <div className="p-3">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="quick-action-card" onClick={() => alert('Requesting access...')}>
                <div className="action-icon primary">
                  <i className="fas fa-key"></i>
                </div>
                <h4>Request Access</h4>
                <p className="text-light">Request location access</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="quick-action-card" onClick={() => alert('QR Code generated!')}>
                <div className="action-icon secondary">
                  <i className="fas fa-qrcode"></i>
                </div>
                <h4>My QR Code</h4>
                <p className="text-light">Show access QR code</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="quick-action-card" onClick={() => alert('Opening profile...')}>
                <div className="action-icon success">
                  <i className="fas fa-id-card"></i>
                </div>
                <h4>Access Card</h4>
                <p className="text-light">View digital access card</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Info */}
      <div className="alert alert-info mt-4">
        <i className="fas fa-info-circle"></i>
        <div>
          <strong>Sub-Vendor Permissions:</strong>
          <ul className="mt-1">
            <li>Access only to single assigned location</li>
            <li>Must request access for each entry</li>
            <li>Can view your own access history</li>
            <li>Cannot create other users</li>
            <li>Cannot access other locations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubVendorDashboard;