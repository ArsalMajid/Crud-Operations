import axios from 'axios';

// Ensure this matches your backend PORT
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchCustomers = () => API.get('/customers');
export const addCustomer = (data) => API.post('/customers', data);
export const updateCustomer = (id, data) => API.put(`/customers/${id}`, data);
export const deleteCustomer = (id) => API.delete(`/customers/${id}`);

// user API functions
export const fetchUsers = () => API.get('/users');
export const addUser = (data) => API.post('/users', data);