const locations = [
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
  },
  {
    id: 4,
    name: 'Bangalore Hub',
    address: '101 Tech Park, Bangalore, Karnataka',
    type: 'Distribution Hub',
    capacity: 100,
    status: 'active',
    vendorId: 2,
    accessCount: 312,
    lastAccess: '2024-01-15 04:45 PM'
  },
  {
    id: 5,
    name: 'Pune Office',
    address: '202 Business Center, Pune',
    type: 'Office',
    capacity: 20,
    status: 'inactive',
    vendorId: 3,
    accessCount: 45,
    lastAccess: '2024-01-10 10:00 AM'
  }
];

// Add to localStorage if not exists
if (!localStorage.getItem('locations')) {
  localStorage.setItem('locations', JSON.stringify(locations));
}

// Get all locations
export const getAllLocations = () => {
  const stored = localStorage.getItem('locations');
  return stored ? JSON.parse(stored) : locations;
};

// Get locations by vendor ID
export const getLocationsByVendor = (vendorId) => {
  const locations = getAllLocations();
  return locations.filter(loc => loc.vendorId === vendorId);
};

// Add new location
export const addLocation = (location) => {
  const locations = getAllLocations();
  const newLocation = {
    ...location,
    id: Date.now(),
    accessCount: 0,
    lastAccess: 'Never',
    status: 'active'
  };
  
  locations.push(newLocation);
  localStorage.setItem('locations', JSON.stringify(locations));
  return newLocation;
};

export default getAllLocations;