const users = [
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
    username: 'vendor2',
    password: 'vendor123',
    name: 'Smith Suppliers',
    email: 'smith@suppliers.com',
    role: 'vendor',
    phone: '+91 9876543212',
    status: 'active',
    locations: ['Chennai Outlet', 'Bangalore Hub']
  },
  {
    id: 4,
    username: 'subvendor1',
    password: 'subvendor123',
    name: 'Raj Kumar',
    email: 'raj@subvendor.com',
    role: 'subvendor',
    phone: '+91 9876543213',
    status: 'active',
    vendor: 'John Electronics',
    location: 'Mumbai Store'
  },
  {
    id: 5,
    username: 'subvendor2',
    password: 'subvendor123',
    name: 'Priya Singh',
    email: 'priya@subvendor.com',
    role: 'subvendor',
    phone: '+91 9876543214',
    status: 'pending',
    vendor: 'Smith Suppliers',
    location: 'Chennai Outlet'
  }
];

// Default export
export default users;

// Get vendors for dropdown
export const getVendors = () => {
  return users.filter(user => user.role === 'vendor');
};