import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';

const Dashboard = () => {
  const { transactions, fetchTransactions, loading } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

<<<<<<< HEAD
  // Robust calculation for total spending
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  const totalSpent = safeTransactions.reduce((acc, curr) => acc + (curr.amount || 0), 0);
=======
  const totalSpent = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
>>>>>>> b88a4a62041c4f9af991a75fb1ab5f91422c1890

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>NudgeWallet</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Welcome back, User</p>
        </div>
        <button onClick={handleLogout} style={{ background: 'none', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          Logout
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Balance Card */}
        <div className="glass-card animate-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.5rem' }}>TOTAL SPENDING</span>
          <h2 style={{ fontSize: '3rem', fontWeight: '800' }}>${totalSpent.toFixed(2)}</h2>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <Link to="/add-transaction" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>+ Record</Link>
            <Link to="/insights" style={{ textDecoration: 'none', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '12px 24px', borderRadius: '12px', fontWeight: '600' }}>Insights</Link>
          </div>
        </div>

        {/* Goals Summary Card */}
        <div className="glass-card animate-in" style={{ padding: '2rem', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Active Goals</h3>
            <Link to="/goals" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8rem' }}>View All</Link>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Keep nudging! You're 15% closer to your targets than last week.</p>
        </div>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <h3 style={{ marginBottom: '2rem', opacity: 0.8 }}>Recent Transactions</h3>
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          {loading ? (
            <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.02)', textAlign: 'left' }}>
                  <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>CATEGORY</th>
                  <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>DATE</th>
                  <th style={{ padding: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
<<<<<<< HEAD
                {safeTransactions.map((t, idx) => (
                  <tr key={t.id || idx} style={{ borderBottom: idx === safeTransactions.length - 1 ? 'none' : '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1.5rem' }}>{t.category}</td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '99px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', fontSize: '0.8rem' }}>
                        {(t.moodTag || 'MODERATE').toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: '600' }}>-${(t.amount || 0).toFixed(2)}</td>
=======
                {transactions.map((t, idx) => (
                  <tr key={t.id} style={{ borderBottom: idx === transactions.length - 1 ? 'none' : '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1.5rem' }}>{t.category}</td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ padding: '4px 12px', borderRadius: '99px', background: 'rgba(56, 189, 248, 0.1)', color: 'var(--accent)', fontSize: '0.8rem' }}>
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: '600' }}>-${Number(t.amount).toFixed(2)}</td>
>>>>>>> b88a4a62041c4f9af991a75fb1ab5f91422c1890
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && safeTransactions.length === 0 && (
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No transactions yet. Start recording!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
