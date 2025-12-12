import React from 'react';

const LocationCard = ({ name, address, status, accessCount, lastAccess }) => {
  const statusColor = {
    active: 'badge-success',
    inactive: 'badge-warning',
    pending: 'badge-info'
  };

  return (
    <div className="location-card">
      <div className="location-header">
        <h3 className="location-name">{name}</h3>
        <span className={`badge ${statusColor[status] || 'badge-warning'}`}>
          {status}
        </span>
      </div>
      
      <p className="text-light">{address}</p>
      
      <div className="location-meta">
        <div className="meta-item">
          <i className="fas fa-door-open"></i>
          <span>{accessCount} accesses</span>
        </div>
        <div className="meta-item">
          <i className="fas fa-clock"></i>
          <span>Last: {lastAccess}</span>
        </div>
      </div>
      
      <div className="mt-3 d-flex gap-2">
        <button className="btn btn-primary btn-sm">
          <i className="fas fa-eye"></i> View Details
        </button>
        <button className="btn btn-secondary btn-sm">
          <i className="fas fa-history"></i> Access Log
        </button>
      </div>
    </div>
  );
};

export default LocationCard;