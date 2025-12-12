// LocalStorage utility functions

// Users
export const getUsers = () => {
  return JSON.parse(localStorage.getItem('users') || '[]');
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getUserByUsername = (username) => {
  const users = getUsers();
  return users.find(u => u.username === username);
};

// Vendors
export const getVendors = () => {
  return JSON.parse(localStorage.getItem('vendors') || '[]');
};

export const saveVendor = (vendor) => {
  const vendors = getVendors();
  vendors.push(vendor);
  localStorage.setItem('vendors', JSON.stringify(vendors));
};

export const getVendorById = (id) => {
  const vendors = getVendors();
  return vendors.find(v => v.id === id);
};

export const deleteVendor = (id) => {
  const vendors = getVendors();
  const updatedVendors = vendors.filter(v => v.id !== id);
  localStorage.setItem('vendors', JSON.stringify(updatedVendors));
  return true;
};

// Sub-vendors
export const getSubVendors = () => {
  return JSON.parse(localStorage.getItem('subVendors') || '[]');
};

export const saveSubVendor = (subVendor) => {
  const subVendors = getSubVendors();
  subVendors.push(subVendor);
  localStorage.setItem('subVendors', JSON.stringify(subVendors));
};

export const getSubVendorsByVendor = (vendorId) => {
  const subVendors = getSubVendors();
  return subVendors.filter(sv => sv.vendorId === vendorId);
};

export const deleteSubVendor = (id) => {
  const subVendors = getSubVendors();
  const updatedSubVendors = subVendors.filter(sv => sv.id !== id);
  localStorage.setItem('subVendors', JSON.stringify(updatedSubVendors));
  return true;
};

// Locations
export const getLocations = () => {
  return JSON.parse(localStorage.getItem('locations') || '[]');
};

export const saveLocation = (location) => {
  const locations = getLocations();
  locations.push(location);
  localStorage.setItem('locations', JSON.stringify(locations));
};

export const deleteLocation = (id) => {
  const locations = getLocations();
  const updatedLocations = locations.filter(loc => loc.id !== id);
  localStorage.setItem('locations', JSON.stringify(updatedLocations));
  return true;
};

// Initialize default data
export const initializeData = () => {
  // Initialize vendors if empty
  if (getVendors().length === 0) {
    const defaultVendors = [
      {
        id: 1,
        name: 'John Electronics',
        email: 'john@electronics.com',
        phone: '+91 9876543211',
        username: 'vendor1',
        password: 'vendor123',
        locations: ['Mumbai Store', 'Delhi Warehouse'],
        status: 'active',
        createdAt: '2024-01-15',
        totalAccess: 156
      },
      {
        id: 2,
        name: 'Smith Suppliers',
        email: 'smith@suppliers.com',
        phone: '+91 9876543212',
        username: 'vendor2',
        password: 'vendor123',
        locations: ['Chennai Outlet', 'Bangalore Hub'],
        status: 'active',
        createdAt: '2024-01-20',
        totalAccess: 89
      }
    ];
    localStorage.setItem('vendors', JSON.stringify(defaultVendors));
  }

  // Initialize sub-vendors if empty
  if (getSubVendors().length === 0) {
    const defaultSubVendors = [
      {
        id: 1,
        name: 'Raj Kumar',
        email: 'raj@subvendor.com',
        phone: '+91 9876543213',
        username: 'subvendor1',
        password: 'subvendor123',
        vendorId: 1,
        vendorName: 'John Electronics',
        location: 'Mumbai Store',
        status: 'active',
        createdAt: '2024-01-16',
        accessCount: 45
      },
      {
        id: 2,
        name: 'Priya Singh',
        email: 'priya@subvendor.com',
        phone: '+91 9876543214',
        username: 'subvendor2',
        password: 'subvendor123',
        vendorId: 2,
        vendorName: 'Smith Suppliers',
        location: 'Chennai Outlet',
        status: 'pending',
        createdAt: '2024-01-22',
        accessCount: 12
      }
    ];
    localStorage.setItem('subVendors', JSON.stringify(defaultSubVendors));
  }

  // Initialize locations if empty
  if (getLocations().length === 0) {
    const defaultLocations = [
      {
        id: 1,
        name: 'Mumbai Store',
        address: '123 Main Street, Mumbai, Maharashtra',
        type: 'Retail Store',
        capacity: 50,
        status: 'active',
        vendorId: 1,
        accessCount: 245,
        lastAccess: '2024-01-15 09:30 AM'
      },
      {
        id: 2,
        name: 'Delhi Warehouse',
        address: '456 Industrial Area, Delhi',
        type: 'Warehouse',
        capacity: 200,
        status: 'active',
        vendorId: 1,
        accessCount: 189,
        lastAccess: '2024-01-14 02:15 PM'
      },
      {
        id: 3,
        name: 'Chennai Outlet',
        address: '789 Retail Park, Chennai, Tamil Nadu',
        type: 'Outlet',
        capacity: 30,
        status: 'active',
        vendorId: 2,
        accessCount: 156,
        lastAccess: '2024-01-13 11:00 AM'
      }
    ];
    localStorage.setItem('locations', JSON.stringify(defaultLocations));
  }

  // Initialize users if empty
  if (getUsers().length === 0) {
    const defaultUsers = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        name: 'System Administrator',
        email: 'admin@vas.com',
        role: 'admin',
        phone: '+91 9876543210',
        status: 'active'
      },
      {
        id: 2,
        username: 'vendor1',
        password: 'vendor123',
        name: 'John Electronics',
        email: 'john@electronics.com',
        role: 'vendor',
        phone: '+91 9876543211',
        status: 'active',
        locations: ['Mumbai Store', 'Delhi Warehouse']
      },
      {
        id: 3,
        username: 'subvendor1',
        password: 'subvendor123',
        name: 'Raj Kumar',
        email: 'raj@subvendor.com',
        role: 'subvendor',
        phone: '+91 9876543213',
        status: 'active',
        vendor: 'John Electronics',
        location: 'Mumbai Store'
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
};