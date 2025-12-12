import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorCard from '../components/VendorCard';
import { getVendors, deleteVendor } from '../utils/storage';

const VendorList = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = () => {
    const allVendors = getVendors();
    setVendors(allVendors);
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (vendor) => {
    if (window.confirm(`Are you sure you want to delete ${vendor.name}?`)) {
      deleteVendor(vendor.id);
      loadVendors();
      alert('Vendor deleted successfully!');
    }
  };

  const handleEdit = (vendor) => {
    // For now, just show alert. You can create edit page later.
    alert(`Edit vendor: ${vendor.name}`);
  };

  const handleView = (vendor) => {
    // For now, just show alert. You can create details page later.
    alert(`View vendor: ${vendor.name}\nEmail: ${vendor.email}\nLocations: ${vendor.locations?.join(', ')}`);
  };

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    pending: vendors.filter(v => v.status === 'pending').length
  };

  return (
    <div>
      <div className="mb-4">
        <div className="d-flex justify-between align-center">
          <div>
            <h1 className="mb-1">Vendor Management</h1>
            <p className="text-light">Manage all vendor accounts and their permissions</p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/add-vendor')}
          >
            <i className="fas fa-plus"></i> Add New Vendor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid mb-4">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.total}</h3>
            <p>Total Vendors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.active}</h3>
            <p>Active Vendors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>{stats.pending}</h3>
            <p>Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-header">
          <h3 className="card-title">
            <i className="fas fa-filter"></i>
            Filters & Search
          </h3>
        </div>
        <div className="p-3">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vendors List */}
      {filteredVendors.length > 0 ? (
        <div className="vendors-grid">
          {filteredVendors.map(vendor => (
            <VendorCard
              key={vendor.id}
              vendor={vendor}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <i className="fas fa-users"></i>
          </div>
          <h3>No Vendors Found</h3>
          <p>No vendors match your search criteria.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/add-vendor')}
          >
            <i className="fas fa-plus"></i> Add Your First Vendor
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorList;