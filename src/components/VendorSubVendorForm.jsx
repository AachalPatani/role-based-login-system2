import React, { useState, useEffect } from 'react';
import { getLocations } from '../utils/storage';

const VendorSubVendorForm = ({ vendorData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [vendorLocations, setVendorLocations] = useState([]);

  useEffect(() => {
    if (vendorData && vendorData.locations) {
      // Get detailed location info
      const allLocations = getLocations();
      const filteredLocations = allLocations.filter(loc => 
        vendorData.locations.includes(loc.name)
      );
      setVendorLocations(filteredLocations);
    }
  }, [vendorData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.location) newErrors.location = 'Please select a location';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create sub-vendor object
    const subVendor = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      username: formData.username,
      password: formData.password,
      vendorId: vendorData.id,
      vendorName: vendorData.name,
      location: formData.location,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      accessCount: 0,
      createdBy: 'vendor'
    };

    // Save to localStorage
    const existingSubVendors = JSON.parse(localStorage.getItem('subVendors') || '[]');
    existingSubVendors.push(subVendor);
    localStorage.setItem('subVendors', JSON.stringify(existingSubVendors));

    // Also save as user for login
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = {
      id: subVendor.id,
      username: subVendor.username,
      password: subVendor.password,
      name: subVendor.name,
      email: subVendor.email,
      role: 'subvendor',
      phone: subVendor.phone,
      status: 'pending',
      vendor: subVendor.vendorName,
      location: subVendor.location,
      createdByVendor: vendorData.id
    };
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setSuccess(true);
    if (onSubmit) onSubmit(subVendor);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        location: ''
      });
      setSuccess(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <i className="fas fa-user-plus"></i>
          Add New Sub-Vendor
        </h2>
        <div className="badge badge-info">
          Vendor: {vendorData?.name}
        </div>
      </div>

      {success && (
        <div className="alert alert-success mb-3">
          <i className="fas fa-check-circle"></i>
          Sub-Vendor created successfully! They can now login with the credentials provided.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter sub-vendor's full name"
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                className={`form-input ${errors.phone ? 'error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Username *</label>
              <input
                type="text"
                name="username"
                className={`form-input ${errors.username ? 'error' : ''}`}
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a unique username"
              />
              {errors.username && <small className="text-danger">{errors.username}</small>}
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Set password (min. 6 characters)"
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="form-group">
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-12">
            <div className="form-group">
              <label className="form-label">Assign Location *</label>
              <select
                name="location"
                className={`form-select ${errors.location ? 'error' : ''}`}
                value={formData.location}
                onChange={handleChange}
              >
                <option value="">Select a location</option>
                {vendorLocations.map(location => (
                  <option key={location.id} value={location.name}>
                    {location.name} - {location.address}
                  </option>
                ))}
              </select>
              {errors.location && <small className="text-danger">{errors.location}</small>}
              <small className="text-light">
                Sub-vendor will only have access to this selected location
              </small>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="alert alert-info">
            <i className="fas fa-info-circle"></i>
            <div>
              <strong>Sub-Vendor Permissions:</strong>
              <ul className="mt-1 mb-0">
                <li>Access only to the selected location</li>
                <li>Will need approval for first access</li>
                <li>Can request access to their assigned location</li>
                <li>Cannot create other users</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="d-flex justify-end gap-2 mt-4">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => {
              setFormData({
                name: '',
                email: '',
                phone: '',
                username: '',
                password: '',
                confirmPassword: '',
                location: ''
              });
              setErrors({});
            }}
          >
            <i className="fas fa-redo"></i> Clear Form
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-user-plus"></i> Create Sub-Vendor
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorSubVendorForm;