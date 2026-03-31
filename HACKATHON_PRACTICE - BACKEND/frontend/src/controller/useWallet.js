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
      // Backend returns List<Transaction> directly (not wrapped in ApiResponse)
      setTransactions(Array.isArray(response.data) ? response.data : []);
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
      // Backend returns ApiResponse<Map<String,Object>> with keys:
      // totalTagsTracked, insight, suggestedNudge
      const data = response.data?.data ?? response.data;
      setInsights(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchGoals = useCallback(async () => {
    // No GET /goals/all endpoint on backend; goals list is managed locally
    // after creation. Nothing to fetch remotely in this version.
    setGoals((prev) => prev);
  }, []);

  const addTransaction = async (data) => {
    setLoading(true);
    try {
      // Backend only stores amount + category; moodTag is frontend-only for now
      await apiService.transactions.create({ amount: data.amount, category: data.category });
      await fetchTransactions();
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to add transaction';
      setError(String(msg));
      return { success: false, message: String(msg) };
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (data) => {
    setLoading(true);
    try {
      // Backend uses @RequestParam name + targetAmount (not a JSON body)
      const response = await apiService.goals.create({
        name: data.title || data.name,
        targetAmount: data.targetAmount,
      });
      const created = response.data?.data ?? response.data;
      // Add the new goal to local state (backend has no GET-all-goals endpoint)
      setGoals((prev) => [...prev, created]);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data || 'Failed to add goal';
      setError(String(msg));
      return { success: false, message: String(msg) };
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
