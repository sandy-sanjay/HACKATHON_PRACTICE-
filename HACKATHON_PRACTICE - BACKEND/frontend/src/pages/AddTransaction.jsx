import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';

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
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>← Back to Dashboard</Link>
      <div className="glass-card animate-in" style={{ padding: '3rem', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>Record a Transaction</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AMOUNT ($)</label>
            <input className="input-field" style={{ fontSize: '2rem', height: 'auto', textAlign: 'center' }} type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" required />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CATEGORY</label>
            <input className="input-field" type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Dinner, Groceries" required />
          </div>

          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>HOW ARE YOU FEELING?</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
            {moods.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMood(m.id)}
                style={{
                  background: selectedMood === m.id ? 'rgba(56, 189, 248, 0.1)' : 'var(--glass-bg)',
                  border: selectedMood === m.id ? '2px solid var(--accent)' : '1px solid var(--glass-border)',
                  padding: '1rem 0.5rem',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{m.emoji}</span>
                <span style={{ fontSize: '0.7rem', color: selectedMood === m.id ? 'var(--accent)' : 'var(--text-muted)', fontWeight: 'bold' }}>{m.id.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button className="btn-primary" style={{ width: '100%' }} type="submit" disabled={loading}>
            {loading ? 'Recording...' : 'Save Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
