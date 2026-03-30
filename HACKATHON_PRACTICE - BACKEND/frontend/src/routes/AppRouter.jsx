import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AddTransaction from '../pages/AddTransaction';
import Insights from '../pages/Insights';
import GoalWallet from '../pages/GoalWallet';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/add-transaction" element={<PrivateRoute><AddTransaction /></PrivateRoute>} />
        <Route path="/insights" element={<PrivateRoute><Insights /></PrivateRoute>} />
        <Route path="/goals" element={<PrivateRoute><GoalWallet /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
