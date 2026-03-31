import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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
    create: (data) => api.post('/transactions/add', data),
    getAll: () => api.get('/transactions/history'),
    getInsights: () => api.get('/behavior/insights'),
    getWallet: () => api.get('/transactions/wallet'),
  },
  goals: {
    create: (data) => api.post('/goals/create', data),
    contribute: (data) => api.post('/goals/contribute', data),
    getProgress: (goalId) => api.get(`/goals/progress?goalId=${goalId}`),
    getAll: () => api.get('/goals'), // Note: Backend currently missing a 'get all' endpoint
  },
};

export default api;
