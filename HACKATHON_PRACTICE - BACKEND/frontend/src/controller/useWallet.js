import { useState, useCallback } from 'react';
import { apiService } from '../service/api.service';

export const useWallet = () => {
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.transactions.getAll();
      setTransactions(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.transactions.getInsights();
      setInsights(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGoals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.goals.getAll();
      setGoals(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (data) => {
    setLoading(true);
    try {
      await apiService.transactions.create(data);
      await fetchTransactions();
      await fetchInsights();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add transaction';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (data) => {
    setLoading(true);
    try {
      await apiService.goals.create(data);
      await fetchGoals();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add goal';
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    insights,
    goals,
    loading,
    error,
    fetchTransactions,
    fetchInsights,
    fetchGoals,
    addTransaction,
    addGoal,
  };
};
