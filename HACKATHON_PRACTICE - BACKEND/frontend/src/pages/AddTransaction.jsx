import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';
import './AddTransaction.css';

const moods = [
  { id: 'happy', emoji: '😊', color: '#10b981' },
  { id: 'stressed', emoji: '😫', color: '#f59e0b' },
  { id: 'impulsive', emoji: '🤯', color: '#ef4444' },
  { id: 'bored', emoji: '😐', color: '#6366f1' },
  { id: 'planned', emoji: '📅', color: '#38bdf8' }
];

const AddTransaction = () => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [selectedMood, setSelectedMood] = useState('planned');
  const { addTransaction, loading } = useWallet();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addTransaction({
      amount: parseFloat(amount),
      category,
      moodTag: selectedMood
    });
    if (result.success) navigate('/');
  };

  return (
    <div className="container">
      <Link to="/" className="add-transaction-back-link">← Back to Dashboard</Link>
      <div className="glass-card animate-in add-transaction-card">
        <h2 className="add-transaction-heading">Record a Transaction</h2>

        <form onSubmit={handleSubmit}>
          <div className="add-transaction-form-group">
            <label className="add-transaction-label">AMOUNT ($)</label>
            <input
              className="input-field add-transaction-amount-input"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="add-transaction-form-group-last">
            <label className="add-transaction-label">CATEGORY</label>
            <input
              className="input-field"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Dinner, Groceries"
              required
            />
          </div>

          <label className="add-transaction-mood-label">HOW ARE YOU FEELING?</label>
          <div className="add-transaction-mood-grid">
            {moods.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                className={`add-transaction-mood-btn${selectedMood === m.id ? ' selected' : ''}`}
              >
                <span className="add-transaction-mood-emoji">{m.emoji}</span>
                <span className={`add-transaction-mood-name${selectedMood === m.id ? ' selected' : ''}`}>
                  {m.id.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          <button className="btn-primary add-transaction-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Recording...' : 'Save Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
