import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  auth: {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data),
  },
  transactions: {
    create: (data) => api.post('/transactions', data),
    getAll: () => api.get('/transactions'),
    getInsights: () => api.get('/insights'),
  },
  goals: {
    create: (data) => api.post('/goals', data),
    getAll: () => api.get('/goals'),
  },
};

export default api;
