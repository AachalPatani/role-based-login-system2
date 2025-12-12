import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocations } from '../utils/storage';
import VendorSubVendorForm from '../components/VendorSubVendorForm';
import SubVendorList from '../components/SubVendorList';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalLocations: 0,
    totalSubVendors: 0,
    activeSubVendors: 0,
    pendingSubVendors: 0,
    todayAccess: 24,
    monthlyAccess: 156
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
          
          // Load sub-vendors stats
          const allSubVendors = JSON.parse(localStorage.getItem('subVendors') || '[]');
          const vendorSubVendors = allSubVendors.filter(sv => sv.vendorId === userData.id);
          
          setStats({
            totalLocations: vendorLocations.length,
            totalSubVendors: vendorSubVendors.length,
            activeSubVendors: vendorSubVendors.filter(sv => sv.status === 'active').length,
            pendingSubVendors: vendorSubVendors.filter(sv => sv.status === 'pending').length,
            todayAccess: 24,
            monthlyAccess: 156
          });
        }
      } catch (error) {
        console.error('Error loading vendor data:', error);
      }
    }
  }, [activeTab]); // Reload when tab changes

  const handleSubVendorCreated = (subVendor) => {
    alert(`Sub-Vendor "${subVendor.name}" created successfully!\n\nLogin Details:\nUsername: ${subVendor.username}\nPassword: ${subVendor.password}\n\nThey can now login to the system.`);
    setActiveTab('subvendors'); // Switch to sub-vendors list
  };

  if (!vendorData) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading vendor dashboard...</p>
      </div>
    );
  }

  // Tab navigation
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { id: 'locations', label: 'My Locations', icon: 'fas fa-map-marker-alt' },
    { id: 'add-subvendor', label: 'Add Sub-Vendor', icon: 'fas fa-user-plus' },
    { id: 'subvendors', label: 'My Sub-Vendors', icon: 'fas fa-users' },
    { id: 'reports', label: 'Reports', icon: 'fas fa-chart-bar' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <>
            {/* Welcome Card */}
            <div className="card mb-4">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-user-tie"></i>
                  Welcome, {vendorData.name}!
                </h2>
                <div className="badge badge-success">
                  Vendor Account
                </div>
              </div>
              <div className="p-3">
                <p>You can manage your locations and create sub-vendors from this dashboard.</p>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="info-card">
                      <i className="fas fa-envelope"></i>
                      <div>
                        <strong>Email:</strong>
                        <p>{vendorData.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="info-card">
                      <i className="fas fa-phone"></i>
                      <div>
                        <strong>Phone:</strong>
                        <p>{vendorData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
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
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.totalSubVendors}</h3>
                  <p>Sub-Vendors</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon orange">
                  <i className="fas fa-door-open"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.todayAccess}</h3>
                  <p>Today's Access</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon purple">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-info">
                  <h3>{stats.pendingSubVendors}</h3>
                  <p>Pending Approval</p>
                </div>
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
                    <div 
                      className="quick-action-card"
                      onClick={() => setActiveTab('add-subvendor')}
                    >
                      <div className="action-icon primary">
                        <i className="fas fa-user-plus"></i>
                      </div>
                      <h4>Add Sub-Vendor</h4>
                      <p className="text-light">Create new sub-vendor account</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div 
                      className="quick-action-card"
                      onClick={() => setActiveTab('subvendors')}
                    >
                      <div className="action-icon secondary">
                        <i className="fas fa-users"></i>
                      </div>
                      <h4>View Sub-Vendors</h4>
                      <p className="text-light">Manage your sub-vendors</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div 
                      className="quick-action-card"
                      onClick={() => setActiveTab('locations')}
                    >
                      <div className="action-icon success">
                        <i className="fas fa-map"></i>
                      </div>
                      <h4>View Locations</h4>
                      <p className="text-light">See all your locations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 'locations':
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-map-marker-alt"></i>
                My Assigned Locations ({locations.length})
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
                        <div className="meta-item">
                          <i className="fas fa-user-friends"></i>
                          <span>{stats.activeSubVendors || 0} sub-vendors</span>
                        </div>
                      </div>
                      <div className="mt-3 d-flex gap-2">
                        <button className="btn btn-primary btn-sm">
                          <i className="fas fa-eye"></i> View Logs
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          <i className="fas fa-qrcode"></i> Generate QR
                        </button>
                        <button 
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            setActiveTab('add-subvendor');
                            // You can pass location data if needed
                          }}
                        >
                          <i className="fas fa-user-plus"></i> Add Sub-Vendor
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <i className="fas fa-map-marker-alt empty-icon"></i>
                  <h3>No Locations Assigned</h3>
                  <p>Contact administrator to get locations assigned to your account.</p>
                  <button className="btn btn-primary mt-3">
                    <i className="fas fa-envelope"></i> Request Locations
                  </button>
                </div>
              )}
            </div>
          </div>
        );

      case 'add-subvendor':
        return (
          <div>
            <div className="mb-4">
              <h1 className="mb-1">Add New Sub-Vendor</h1>
              <p className="text-light">Create sub-vendor accounts for your locations</p>
            </div>
            
            <VendorSubVendorForm 
              vendorData={vendorData} 
              onSubmit={handleSubVendorCreated}
            />
            
            <div className="mt-4">
              <button 
                className="btn btn-secondary"
                onClick={() => setActiveTab('dashboard')}
              >
                <i className="fas fa-arrow-left"></i> Back to Dashboard
              </button>
            </div>
          </div>
        );

      case 'subvendors':
        return (
          <div>
            <div className="mb-4">
              <div className="d-flex justify-between align-center">
                <div>
                  <h1 className="mb-1">My Sub-Vendors</h1>
                  <p className="text-light">Manage all sub-vendors under your account</p>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('add-subvendor')}
                >
                  <i className="fas fa-user-plus"></i> Add New Sub-Vendor
                </button>
              </div>
            </div>
            
            <SubVendorList vendorId={vendorData.id} />
            
            <div className="alert alert-info mt-4">
              <i className="fas fa-info-circle"></i>
              <div>
                <strong>Note:</strong> When you create a sub-vendor, they will receive:
                <ul className="mt-1 mb-0">
                  <li>Login credentials (username & password)</li>
                  <li>Access to only their assigned location</li>
                  <li>Pending status until you activate them</li>
                  <li>Ability to request access to their location</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <i className="fas fa-chart-bar"></i>
                Access Reports
              </h2>
            </div>
            <div className="p-3">
              <div className="empty-state">
                <i className="fas fa-chart-line empty-icon"></i>
                <h3>Reports Coming Soon</h3>
                <p>Access reports and analytics will be available in the next update.</p>
                <div className="mt-3">
                  <button className="btn btn-primary mr-2">
                    <i className="fas fa-download"></i> Export Current Data
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <i className="fas fa-arrow-left"></i> Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="tabs-navigation mb-4">
        <div className="tabs-list">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}

      {/* Role Info */}
      <div className="alert alert-info mt-4">
        <i className="fas fa-shield-alt"></i>
        <div>
          <strong>Vendor Permissions Summary:</strong>
          <div className="row mt-2">
            <div className="col-md-6">
              <ul>
                <li>✓ Create and manage sub-vendors</li>
                <li>✓ View all assigned locations</li>
                <li>✓ Monitor access logs for your locations</li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul>
                <li>✓ Activate/deactivate sub-vendors</li>
                <li>✓ Generate access reports</li>
                <li>✓ Request new locations from admin</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;