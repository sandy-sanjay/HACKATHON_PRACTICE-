import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';

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
      title: newTitle,
      targetAmount: parseFloat(newTarget),
      deadline: newDeadline
    });
    if (result.success) {
      setNewTitle('');
      setNewTarget('');
      setNewDeadline('');
    }
  };

  return (
    <div className="container">
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>← Back to Dashboard</Link>
      <h2 style={{ marginBottom: '0.5rem' }}>Goal Wallet</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Save for what matters most.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}>
        {/* Create Goal Form */}
        <div className="glass-card animate-in" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>New Goal</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TITLE (e.g., iPhone 16 Pro)</label>
              <input className="input-field" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TARGET AMOUNT ($)</label>
              <input className="input-field" type="number" step="0.01" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DEADLINE</label>
              <input className="input-field" type="date" value={newDeadline} onChange={(e) => setNewDeadline(e.target.value)} required />
            </div>
            <button className="btn-primary" style={{ width: '100%' }} type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Goal'}
            </button>
          </form>
        </div>

        {/* Existing Goals List */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', opacity: 0.8 }}>Active Milestones</h3>
          {goals.map((g, idx) => {
            const progress = (g.currentAmount / g.targetAmount) * 100;
            return (
              <div key={g._id} className="glass-card animate-in" style={{ padding: '2rem', marginBottom: '1.5rem', animationDelay: `${idx * 0.1}s` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{g.title}</h4>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold' }}>{progress.toFixed(0)}%</span>
                </div>
                
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(progress, 100)}%`, 
                    background: 'linear-gradient(to right, #10b981, #34d399)',
                    boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                  }} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Progress: ${g.currentAmount} / ${g.targetAmount}</span>
                  <span style={{ color: 'var(--text-muted)' }}>Target: {new Date(g.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
          {!loading && goals.length === 0 && (
            <p style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)', background: 'var(--glass-bg)', borderRadius: '24px' }}>No savings goals created. Nudge yourself to start!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalWallet;
