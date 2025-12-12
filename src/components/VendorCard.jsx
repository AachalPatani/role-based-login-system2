import React from 'react';

const VendorCard = ({ vendor, onEdit, onDelete, onView }) => {
  const statusColors = {
    active: 'badge-success',
    pending: 'badge-warning',
    inactive: 'badge-danger'
  };

  return (
    <div className="card vendor-card">
      <div className="card-header">
        <div className="d-flex align-center gap-2">
          <div className="vendor-avatar">
            {vendor.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="vendor-name">{vendor.name}</h3>
            <p className="vendor-email">{vendor.email}</p>
          </div>
        </div>
        <span className={`badge ${statusColors[vendor.status] || 'badge-warning'}`}>
          {vendor.status}
        </span>
      </div>

      <div className="vendor-details">
        <div className="detail-row">
          <i className="fas fa-phone"></i>
          <span>{vendor.phone}</span>
        </div>
        <div className="detail-row">
          <i className="fas fa-user"></i>
          <span>@{vendor.username}</span>
        </div>
        <div className="detail-row">
          <i className="fas fa-map-marker-alt"></i>
          <span>{vendor.locations?.length || 0} locations</span>
        </div>
        <div className="detail-row">
          <i className="fas fa-users"></i>
          <span>{vendor.subVendors?.length || 0} sub-vendors</span>
        </div>
      </div>

      <div className="vendor-footer">
        <div className="vendor-stats">
          <div className="stat">
            <div className="stat-value">{vendor.totalAccess || 0}</div>
            <div className="stat-label">Total Access</div>
          </div>
          <div className="stat">
            <div className="stat-value">{new Date(vendor.createdAt).toLocaleDateString()}</div>
            <div className="stat-label">Since</div>
          </div>
        </div>

        <div className="vendor-actions">
          {onView && (
            <button className="btn btn-sm btn-primary" onClick={() => onView(vendor)}>
              <i className="fas fa-eye"></i> View
            </button>
          )}
          {onEdit && (
            <button className="btn btn-sm btn-secondary" onClick={() => onEdit(vendor)}>
              <i className="fas fa-edit"></i> Edit
            </button>
          )}
          {onDelete && (
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(vendor)}>
              <i className="fas fa-trash"></i> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorCard;