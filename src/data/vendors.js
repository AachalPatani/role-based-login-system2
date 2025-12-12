const vendors = [
  {
    id: 1,
    name: 'John Electronics',
    email: 'john@electronics.com',
    phone: '+91 9876543211',
    username: 'vendor1',
    password: 'vendor123',
    locations: ['Mumbai Store', 'Delhi Warehouse'],
    status: 'active',
    subVendors: [4, 5], // IDs of sub-vendors
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
    subVendors: [6],
    createdAt: '2024-01-20',
    totalAccess: 89
  },
  {
    id: 3,
    name: 'Tech Solutions Ltd',
    email: 'info@techsolutions.com',
    phone: '+91 9876543215',
    username: 'vendor3',
    password: 'vendor123',
    locations: ['Pune Office'],
    status: 'pending',
    subVendors: [],
    createdAt: '2024-02-01',
    totalAccess: 0
  }
];

// Add to localStorage if not exists
if (!localStorage.getItem('vendors')) {
  localStorage.setItem('vendors', JSON.stringify(vendors));
}

// Get all vendors
export const getAllVendors = () => {
  const stored = localStorage.getItem('vendors');
  return stored ? JSON.parse(stored) : vendors;
};

// Add new vendor
export const addVendor = (vendor) => {
  const vendors = getAllVendors();
  const newVendor = {
    ...vendor,
    id: Date.now(),
    status: 'active',
    subVendors: [],
    createdAt: new Date().toISOString().split('T')[0],
    totalAccess: 0
  };
  
  vendors.push(newVendor);
  localStorage.setItem('vendors', JSON.stringify(vendors));
  return newVendor;
};

// Update vendor
export const updateVendor = (id, updates) => {
  const vendors = getAllVendors();
  const index = vendors.findIndex(v => v.id === id);
  if (index !== -1) {
    vendors[index] = { ...vendors[index], ...updates };
    localStorage.setItem('vendors', JSON.stringify(vendors));
    return vendors[index];
  }
  return null;
};

// Delete vendor
export const deleteVendor = (id) => {
  const vendors = getAllVendors();
  const filtered = vendors.filter(v => v.id !== id);
  localStorage.setItem('vendors', JSON.stringify(filtered));
  return true;
};

export default getAllVendors;