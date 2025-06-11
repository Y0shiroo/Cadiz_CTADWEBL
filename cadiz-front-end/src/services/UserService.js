// src/services/UserService.js
import axios from 'axios';
// import constants from '../constants'; // ❌ removed: not needed

// ✅ CHANGED: Base URL uses env variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API = axios.create({
  baseURL: `${BASE_URL}/users`, // No need for /api since it's included in BASE_URL
});

// Fetch users
export const fetchUsers = (user) => API.get('/', user);
// Create user
export const createUser = (user) => API.post('/', user);
// Update user
export const updateUser = (id, user) => API.put(`/${id}`, user);
// Delete user
export const deleteUser = (id) => API.delete(`/${id}`);
// Login user
export const loginUser = (credentials) => API.post('/login', credentials);
