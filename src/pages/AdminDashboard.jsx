import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import LocationCard from '../components/LocationCard';
import { getVendors, getSubVendors, getLocations } from '../utils/storage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeVendors: 0,
    totalSubVendors: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    const vendors = getVendors();
    const subVendors = getSubVendors();
    const locations = getLocations();
    
    setStats({
      totalVendors: vendors.length,
      activeVendors: vendors.filter(v => v.status === 'active').length,
      totalSubVendors: subVendors.length,
      pendingRequests: subVendors.filter(sv => sv.status === 'pending').length
    });
  }, []);

  const quickActions = [
    {
      title: 'Add New Vendor',
      icon: 'fas fa-user-plus',
      description: 'Create vendor account',
      action: () => navigate('/add-vendor'),
      color: 'primary'
    },
    {
      title: 'Add Sub-Vendor',
      icon: 'fas fa-users',
      description: 'Create sub-vendor account',
      action: () => navigate('/add-subvendor'),
      color: 'secondary'
    },
    {
      title: 'View Vendors',
      icon: 'fas fa-list',
      description: 'Manage all vendors',
      action: () => navigate('/vendors'),
      color: 'success'
    },
    {
      title: 'View Locations',
      icon: 'fas fa-map-marker-alt',
      description: 'Manage all locations',
      action: () => navigate('/locations'),
      color: 'warning'
    }
  ];

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Admin Dashboard</h1>
        <p className="text-light">Manage vendors, sub-vendors, and system access</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid mb-4">
        <StatsCard 
          icon="fas fa-users" 
          title="Total Vendors" 
          value={stats.totalVendors} 
          color="blue" 
        />
        <StatsCard 
          icon="fas fa-user-check" 
          title="Active Vendors" 
          value={stats.activeVendors} 
          color="green" 
        />
        <StatsCard 
          icon="fas fa-user-friends" 
          title="Sub-Vendors" 
          value={stats.totalSubVendors} 
          color="orange" 
        />
        <StatsCard 
          icon="fas fa-clock" 
          title="Pending Requests" 
          value={stats.pendingRequests} 
          color="purple" 
        />
      </div>

      {/* Quick Actions */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="card-title">
            <i className="fas fa-bolt"></i>
            Quick Actions
          </h2>
        </div>
        <div className="p-3">
          <div className="row">
            {quickActions.map((action, index) => (
              <div className="col-md-3 col-sm-6 mb-3" key={index}>
                <div 
                  className="quick-action-card"
                  onClick={action.action}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={`action-icon ${action.color}`}>
                    <i className={action.icon}></i>
                  </div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p className="text-light">{action.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-history"></i>
                Recent Activity
              </h2>
            </div>
            <div className="p-3">
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <p><strong>New vendor registered:</strong> Tech Solutions Ltd</p>
                    <small className="text-light">2 hours ago</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon primary">
                    <i className="fas fa-key"></i>
                  </div>
                  <div className="activity-content">
                    <p><strong>Access granted:</strong> Raj Kumar at Mumbai Store</p>
                    <small className="text-light">1 day ago</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon warning">
                    <i className="fas fa-exclamation-circle"></i>
                  </div>
                  <div className="activity-content">
                    <p><strong>Pending approval:</strong> Priya Singh (Sub-Vendor)</p>
                    <small className="text-light">2 days ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-chart-bar"></i>
                System Overview
              </h2>
            </div>
            <div className="p-3">
              <div className="system-status">
                <div className="status-item">
                  <span>Database</span>
                  <span className="badge badge-success">Online</span>
                </div>
                <div className="status-item">
                  <span>Users Online</span>
                  <span className="badge badge-info">3</span>
                </div>
                <div className="status-item">
                  <span>Today's Access</span>
                  <span className="badge badge-primary">24</span>
                </div>
                <div className="status-item">
                  <span>System Load</span>
                  <span className="badge badge-success">Low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;