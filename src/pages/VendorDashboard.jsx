import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations, getSubVendorsByVendor } from '../utils/storage';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [subVendors, setSubVendors] = useState([]);
  const [stats, setStats] = useState({
    totalLocations: 0,
    activeSubVendors: 0,
    accessToday: 0,
    pendingApprovals: 0
  });

  useEffect(() => {
    // Get current vendor from localStorage
    const userStr = localStorage.getItem('currentUser') || localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setVendorData(userData);
        
        if (userData.role === 'vendor') {
          // Load vendor's locations
          const allLocations = getLocations();
          const vendorLocations = allLocations.filter(loc => 
            userData.locations?.includes(loc.name)
          );
          setLocations(vendorLocations);
          
          // Load sub-vendors (you'll need to implement getVendorById)
          // For now, use mock data
          setSubVendors([
            { id: 1, name: 'Raj Kumar', location: 'Mumbai Store', status: 'active', lastAccess: '2 hours ago' },
            { id: 2, name: 'Amit Sharma', location: 'Delhi Warehouse', status: 'pending', lastAccess: '3 days ago' },
          ]);
          
          setStats({
            totalLocations: vendorLocations.length,
            activeSubVendors: 1,
            accessToday: 24,
            pendingApprovals: 1
          });
        }
      } catch (error) {
        console.error('Error loading vendor data:', error);
      }
    }
  }, []);

  if (!vendorData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading vendor dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Welcome, {vendorData.name}</h1>
        <p className="text-light">Vendor Dashboard - Manage your locations and sub-vendors</p>
        <div className="badge badge-success mt-2">
          Role: {vendorData.role.toUpperCase()}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.totalLocations}</h3>
            <p>My Locations</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-user-friends"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.activeSubVendors}</h3>
            <p>Active Sub-Vendors</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-door-open"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.accessToday}</h3>
            <p>Today's Access</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon purple">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.pendingApprovals}</h3>
            <p>Pending Approvals</p>
          </div>
        </div>
      </div>

      {/* My Locations */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-map-marker-alt"></i>
            My Assigned Locations
          </h2>
          <button className="btn btn-primary btn-sm">
            <i className="fas fa-plus"></i> Request New Location
          </button>
        </div>
        <div className="p-3">
          {locations.length > 0 ? (
            <div className="locations-grid">
              {locations.map(location => (
                <div key={location.id} className="location-card">
                  <div className="location-header">
                    <h3 className="location-name">{location.name}</h3>
                    <span className="badge badge-success">Active</span>
                  </div>
                  <p className="text-light">{location.address}</p>
                  <div className="location-meta">
                    <div className="meta-item">
                      <i className="fas fa-door-open"></i>
                      <span>{location.accessCount || 0} accesses</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-clock"></i>
                      <span>Last: {location.lastAccess || 'Never'}</span>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm mt-2">
                    <i className="fas fa-eye"></i> View Access Log
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-map-marker-alt empty-icon"></i>
              <h3>No Locations Assigned</h3>
              <p>Contact administrator to get locations assigned to your account.</p>
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
              <div className="quick-action-card" onClick={() => alert('Feature coming soon!')}>
                <div className="action-icon primary">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h4>Add Sub-Vendor</h4>
                <p className="text-light">Create new sub-vendor account</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="quick-action-card" onClick={() => alert('Feature coming soon!')}>
                <div className="action-icon secondary">
                  <i className="fas fa-key"></i>
                </div>
                <h4>Generate Access Key</h4>
                <p className="text-light">Create temporary access keys</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="quick-action-card" onClick={() => alert('Feature coming soon!')}>
                <div className="action-icon success">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h4>View Reports</h4>
                <p className="text-light">Access and usage reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Info */}
      <div className="alert alert-info mt-4">
        <i className="fas fa-info-circle"></i>
        <div>
          <strong>Vendor Permissions:</strong>
          <ul className="mt-1">
            <li>Access only to assigned locations</li>
            <li>Can create and manage sub-vendors</li>
            <li>Can view access logs for your locations</li>
            <li>Cannot access other vendor's data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;