import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorForm from '../components/VendorForm';
import { getVendors, getSubVendorsByVendor } from '../utils/storage';

const AddSubVendor = () => {
  const navigate = useNavigate();
  const vendors = getVendors();
  const [selectedVendorId, setSelectedVendorId] = useState('');

  const handleSubVendorSubmit = (subVendor) => {
    alert(`Sub-Vendor "${subVendor.name}" created successfully!`);
    setSelectedVendorId('');
  };

  const subVendors = selectedVendorId 
    ? getSubVendorsByVendor(parseInt(selectedVendorId))
    : [];

  return (
    <div>
      <div className="mb-4">
        <h1 className="mb-1">Add New Sub-Vendor</h1>
        <p className="text-light">Create sub-vendor accounts under existing vendors</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <VendorForm type="subvendor" onSubmit={handleSubVendorSubmit} />
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-info-circle"></i>
                Sub-Vendor Guide
              </h3>
            </div>
            <div className="p-3">
              <p><strong>What is a Sub-Vendor?</strong></p>
              <p className="text-light">Sub-vendors work under a parent vendor and have access to specific locations only.</p>
              
              <div className="mt-3">
                <h5>Permissions:</h5>
                <ul>
                  <li>Access to single assigned location</li>
                  <li>Can request access to location</li>
                  <li>Can view their access history</li>
                  <li>Cannot create other users</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <i className="fas fa-building"></i>
                Available Vendors
              </h3>
            </div>
            <div className="p-3">
              {vendors.map(vendor => (
                <div key={vendor.id} className="vendor-item mb-2 p-2 border-bottom">
                  <div className="d-flex justify-between align-center">
                    <div>
                      <strong>{vendor.name}</strong>
                      <div className="text-light small">
                        {vendor.locations?.length || 0} locations
                      </div>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex justify-between">
        <button className="btn btn-secondary" onClick={() => navigate('/admin')}>
          <i className="fas fa-arrow-left"></i> Back to Dashboard
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/subvendors')}>
          <i className="fas fa-list"></i> View All Sub-Vendors
        </button>
      </div>
    </div>
  );
};

export default AddSubVendor;