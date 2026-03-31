import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add JWT token and userId to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (userId) {
    config.headers['X-User-Id'] = userId;
  }
  return config;
});

export const apiService = {
  auth: {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (data) => api.post('/auth/register', data),
  },
  transactions: {
<<<<<<< HEAD
    create: (data) => api.post('/transactions/add', data),
    getAll: () => api.get('/transactions/history'),
    getInsights: () => api.get('/behavior/insights'),
    getWallet: () => api.get('/transactions/wallet'),
  },
  goals: {
    create: (data) => api.post('/goals/create', data),
    contribute: (data) => api.post('/goals/contribute', data),
    getProgress: (goalId) => api.get(`/goals/progress?goalId=${goalId}`),
    getAll: () => api.get('/goals'),
=======
    // Backend: POST /api/transactions/add
    create: (data) => api.post('/transactions/add', data),
    // Backend: GET /api/transactions/history
    getAll: () => api.get('/transactions/history'),
    // Backend: GET /api/behavior/insights
    getInsights: () => api.get('/behavior/insights'),
  },
  goals: {
    // Backend: POST /api/goals/create  (uses @RequestParam, not body)
    create: (data) => api.post(`/goals/create?name=${encodeURIComponent(data.name)}&targetAmount=${data.targetAmount}`),
    // Backend: GET /api/goals/{id}/progress
    getProgress: (id) => api.get(`/goals/${id}/progress`),
    // Backend: POST /api/goals/contribute
    contribute: (goalId, amount) => api.post(`/goals/contribute?goalId=${goalId}&amount=${amount}`),
  },
  behavior: {
    // Backend: POST /api/behavior/tag
    tag: (transactionId, mood) => api.post(`/behavior/tag?transactionId=${transactionId}&mood=${mood}`),
    // Backend: GET /api/behavior/insights
    getInsights: () => api.get('/behavior/insights'),
>>>>>>> b88a4a62041c4f9af991a75fb1ab5f91422c1890
  },
};

export default api;
