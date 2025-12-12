import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorForm from '../components/VendorForm';

const AddVendor = () => {
  const navigate = useNavigate();
  const [recentVendors, setRecentVendors] = useState([]);

  const handleVendorSubmit = (vendor) => {
    // Add to recent vendors list
    setRecentVendors(prev => [vendor, ...prev.slice(0, 4)]);
    
    // Show success message
    alert(`Vendor "${vendor.name}" created successfully!`);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Add New Vendor</h1>
        <p className="text-light">Create new vendor accounts and assign locations</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <VendorForm type="vendor" onSubmit={handleVendorSubmit} />
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-info-circle"></i>
                Vendor Creation Guide
              </h3>
            </div>
            <div className="p-3">
              <ol className="guide-list">
                <li>Fill all required fields (marked with *)</li>
                <li>Username must be unique</li>
                <li>Password must be at least 6 characters</li>
                <li>Enter locations separated by commas</li>
                <li>Vendor will receive login credentials</li>
                <li>Status will be set to "active" by default</li>
              </ol>
              
              <div className="mt-3">
                <h4>Default Permissions:</h4>
                <ul>
                  <li>Access to assigned locations only</li>
                  <li>Can create sub-vendors</li>
                  <li>Can view access logs</li>
                  <li>Can manage their profile</li>
                </ul>
              </div>
            </div>
          </div>

          {recentVendors.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <i className="fas fa-history"></i>
                  Recently Added
                </h3>
              </div>
              <div className="p-3">
                {recentVendors.map((vendor, index) => (
                  <div key={index} className="recent-vendor mb-2 p-2 border-bottom">
                    <strong>{vendor.name}</strong>
                    <div className="text-light small">
                      {vendor.email} • {vendor.locations?.length || 0} locations
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 d-flex justify-between">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/vendors')}>
          <i className="fas fa-list"></i> View All Vendors
        </button>
      </div>
    </div>
  );
};

export default AddVendor;