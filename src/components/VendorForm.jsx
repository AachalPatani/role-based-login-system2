import React, { useState } from 'react';
import { getVendors, saveVendor, saveUser } from '../utils/storage';

const VendorForm = ({ type = 'vendor', onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    locations: '',
    vendorId: '',
    location: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const vendors = getVendors();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    if (type === 'vendor' && !formData.locations.trim()) {
      newErrors.locations = 'At least one location is required';
    }
    
    if (type === 'subvendor') {
      if (!formData.vendorId) newErrors.vendorId = 'Please select a vendor';
      if (!formData.location) newErrors.location = 'Please select a location';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Create vendor or sub-vendor
    if (type === 'vendor') {
      const vendor = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        locations: formData.locations.split(',').map(loc => loc.trim()),
        status: 'active',
        subVendors: [],
        createdAt: new Date().toISOString().split('T')[0],
        totalAccess: 0
      };

      // Save to storage
      saveVendor(vendor);
      
      // Also create user for login
      const user = {
        id: vendor.id,
        username: vendor.username,
        password: vendor.password,
        name: vendor.name,
        email: vendor.email,
        role: 'vendor',
        phone: vendor.phone,
        status: 'active',
        locations: vendor.locations
      };
      saveUser(user);

      setSuccess(true);
      if (onSubmit) onSubmit(vendor);

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          username: '',
          password: '',
          confirmPassword: '',
          locations: '',
          vendorId: '',
          location: ''
        });
        setSuccess(false);
      }, 2000);

    } else {
      // Handle sub-vendor creation
      const selectedVendor = vendors.find(v => v.id === parseInt(formData.vendorId));
      
      const subVendor = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        vendorId: parseInt(formData.vendorId),
        vendorName: selectedVendor?.name || '',
        location: formData.location,
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        accessCount: 0
      };

      // Save sub-vendor
      const subVendors = JSON.parse(localStorage.getItem('subVendors') || '[]');
      subVendors.push(subVendor);
      localStorage.setItem('subVendors', JSON.stringify(subVendors));

      // Create user for login
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
        location: subVendor.location
      };
      saveUser(user);

      setSuccess(true);
      if (onSubmit) onSubmit(subVendor);

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          username: '',
          password: '',
          confirmPassword: '',
          locations: '',
          vendorId: '',
          location: ''
        });
        setSuccess(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <i className={`fas fa-${type === 'vendor' ? 'user-tie' : 'user'}`}></i>
          Add New {type === 'vendor' ? 'Vendor' : 'Sub-Vendor'}
        </h2>
      </div>

      {success && (
        <div className="alert alert-success mb-3">
          <i className="fas fa-check-circle"></i>
          {type === 'vendor' ? 'Vendor' : 'Sub-Vendor'} created successfully!
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
                placeholder="Enter full name"
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
                placeholder="Choose a username"
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
        
        {type === 'vendor' ? (
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label className="form-label">Assigned Locations *</label>
                <input
                  type="text"
                  name="locations"
                  className={`form-input ${errors.locations ? 'error' : ''}`}
                  value={formData.locations}
                  onChange={handleChange}
                  placeholder="Enter locations separated by commas (e.g., Mumbai Store, Delhi Warehouse)"
                />
                <small className="text-light">Separate multiple locations with commas</small>
                {errors.locations && <small className="text-danger d-block">{errors.locations}</small>}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Parent Vendor *</label>
                  <select
                    name="vendorId"
                    className={`form-select ${errors.vendorId ? 'error' : ''}`}
                    value={formData.vendorId}
                    onChange={handleChange}
                  >
                    <option value="">Select Vendor</option>
                    {vendors.map(vendor => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.name}
                      </option>
                    ))}
                  </select>
                  {errors.vendorId && <small className="text-danger">{errors.vendorId}</small>}
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="form-group">
                  <label className="form-label">Assigned Location *</label>
                  <select
                    name="location"
                    className={`form-select ${errors.location ? 'error' : ''}`}
                    value={formData.location}
                    onChange={handleChange}
                  >
                    <option value="">Select Location</option>
                    {formData.vendorId && vendors
                      .find(v => v.id === parseInt(formData.vendorId))
                      ?.locations?.map(loc => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))
                    }
                  </select>
                  {errors.location && <small className="text-danger">{errors.location}</small>}
                </div>
              </div>
            </div>
          </>
        )}
        
        <div className="d-flex justify-end gap-2 mt-4">
          <button type="button" className="btn btn-secondary" onClick={() => {
            setFormData({
              name: '',
              email: '',
              phone: '',
              username: '',
              password: '',
              confirmPassword: '',
              locations: '',
              vendorId: '',
              location: ''
            });
            setErrors({});
          }}>
            Clear Form
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-plus"></i> Create {type === 'vendor' ? 'Vendor' : 'Sub-Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VendorForm;