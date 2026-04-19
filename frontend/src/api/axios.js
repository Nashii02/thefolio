// frontend/src/api/axios.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Extract backend URL (remove /api path) for file uploads
export const BACKEND_URL = API_URL.replace('/api', '');

const instance = axios.create({
    baseURL: API_URL,
});

// This interceptor runs before EVERY request.
// It reads the token from localStorage and adds it to the Authorization header.
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default instance;