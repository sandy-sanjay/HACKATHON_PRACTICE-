import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';
import './GoalWallet.css';

const GoalWallet = () => {
  const { goals, fetchGoals, addGoal, loading } = useWallet();
  const [newTitle, setNewTitle] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addGoal({
      name: newTitle,
      targetAmount: parseFloat(newTarget),
    });
    if (result.success) {
      setNewTitle('');
      setNewTarget('');
      setNewDeadline('');
    }
  };

  return (
    <div className="container">
      <Link to="/" className="goal-wallet-back-link">← Back to Dashboard</Link>
      <h2 className="goal-wallet-heading">Goal Wallet</h2>
      <p className="goal-wallet-subtitle">Save for what matters most.</p>

      <div className="goal-wallet-grid">
        {/* Create Goal Form */}
        <div className="glass-card animate-in goal-wallet-form-card">
          <h3 className="goal-wallet-form-title">New Goal</h3>
          <form onSubmit={handleSubmit}>
            <div className="goal-wallet-form-group">
              <label className="goal-wallet-label">TITLE (e.g., iPhone 16 Pro)</label>
              <input
                className="input-field"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            <div className="goal-wallet-form-group-last">
              <label className="goal-wallet-label">TARGET AMOUNT ($)</label>
              <input
                className="input-field"
                type="number"
                step="0.01"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                required
              />
            </div>
            <button className="btn-primary goal-wallet-submit-btn" type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Goal'}
            </button>
          </form>
        </div>

        {/* Existing Goals List */}
        <div>
          <h3 className="goal-wallet-list-title">Active Milestones</h3>
          {goals.map((g, idx) => {
            const current = Number(g.currentAmount) || 0;
            const target = Number(g.targetAmount) || 1;
            const progress = (current / target) * 100;
            return (
              <div
                key={g.id}
                className="glass-card animate-in goal-wallet-goal-card"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="goal-wallet-goal-header">
                  <h4 className="goal-wallet-goal-name">{g.name}</h4>
                  <span className="goal-wallet-goal-percent">{progress.toFixed(0)}%</span>
                </div>

                <div className="goal-wallet-progress-bar-track">
                  <div
                    className="goal-wallet-progress-bar-fill"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

                <div className="goal-wallet-goal-footer">
                  <span className="goal-wallet-goal-footer-text">
                    Progress: ${current.toFixed(2)} / ${Number(g.targetAmount).toFixed(2)}
                  </span>
                  <span className="goal-wallet-goal-footer-text">Goal ID: #{g.id}</span>
                </div>
              </div>
            );
          })}
          {!loading && goals.length === 0 && (
            <p className="goal-wallet-empty">No savings goals created. Nudge yourself to start!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalWallet;
