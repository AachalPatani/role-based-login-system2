import React, { useState, useEffect } from 'react';
import { getSubVendors } from '../utils/storage';

const SubVendorList = ({ vendorId }) => {
  const [subVendors, setSubVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadSubVendors();
  }, [vendorId]);

  const loadSubVendors = () => {
    const allSubVendors = getSubVendors();
    const vendorSubVendors = allSubVendors.filter(sv => sv.vendorId === vendorId);
    setSubVendors(vendorSubVendors);
  };

  const filteredSubVendors = subVendors.filter(subVendor => {
    const matchesSearch = subVendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subVendor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subVendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (subVendorId, newStatus) => {
    if (window.confirm(`Change status to ${newStatus}?`)) {
      const allSubVendors = getSubVendors();
      const updatedSubVendors = allSubVendors.map(sv => 
        sv.id === subVendorId ? { ...sv, status: newStatus } : sv
      );
      localStorage.setItem('subVendors', JSON.stringify(updatedSubVendors));
      
      // Also update user status
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = allUsers.map(user => 
        user.id === subVendorId ? { ...user, status: newStatus } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      loadSubVendors();
      alert(`Status updated to ${newStatus}`);
    }
  };

  const handleDelete = (subVendor) => {
    if (window.confirm(`Delete ${subVendor.name}? This action cannot be undone.`)) {
      const allSubVendors = getSubVendors();
      const updatedSubVendors = allSubVendors.filter(sv => sv.id !== subVendor.id);
      localStorage.setItem('subVendors', JSON.stringify(updatedSubVendors));
      
      // Also delete from users
      const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = allUsers.filter(user => user.id !== subVendor.id);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      loadSubVendors();
      alert('Sub-vendor deleted successfully');
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'active': return 'badge-success';
      case 'pending': return 'badge-warning';
      case 'inactive': return 'badge-danger';
      default: return 'badge-secondary';
    }
  };

  const stats = {
    total: subVendors.length,
    active: subVendors.filter(sv => sv.status === 'active').length,
    pending: subVendors.filter(sv => sv.status === 'pending').length
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <i className="fas fa-users"></i>
          My Sub-Vendors ({subVendors.length})
        </h2>
        <div className="d-flex gap-2">
          <span className={`badge ${getStatusBadge('active')}`}>
            Active: {stats.active}
          </span>
          <span className={`badge ${getStatusBadge('pending')}`}>
            Pending: {stats.pending}
          </span>
        </div>
      </div>

      <div className="p-3">
        {/* Filters */}
        <div className="row mb-4">
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

        {/* Sub-Vendors Table */}
        {filteredSubVendors.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubVendors.map(subVendor => (
                  <tr key={subVendor.id}>
                    <td>
                      <div className="d-flex align-center gap-2">
                        <div className="user-avatar-small">
                          {subVendor.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{subVendor.name}</strong>
                          <div className="text-light small">@{subVendor.username}</div>
                        </div>
                      </div>
                    </td>
                    <td>{subVendor.email}</td>
                    <td>
                      <div className="d-flex align-center gap-1">
                        <i className="fas fa-map-marker-alt text-primary"></i>
                        <span>{subVendor.location}</span>
                      </div>
                    </td>
                    <td>
                      <select
                        className={`form-select-sm ${getStatusBadge(subVendor.status)}`}
                        value={subVendor.status}
                        onChange={(e) => handleStatusChange(subVendor.id, e.target.value)}
                        style={{
                          border: 'none',
                          background: 'transparent',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      {new Date(subVendor.createdAt).toLocaleDateString()}
                      <div className="text-light small">
                        {subVendor.accessCount || 0} accesses
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button 
                          className="btn btn-sm btn-primary"
                          onClick={() => alert(`View details for ${subVendor.name}`)}
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(subVendor)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <i className="fas fa-users"></i>
            </div>
            <h3>No Sub-Vendors Found</h3>
            <p>You haven't created any sub-vendors yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubVendorList;