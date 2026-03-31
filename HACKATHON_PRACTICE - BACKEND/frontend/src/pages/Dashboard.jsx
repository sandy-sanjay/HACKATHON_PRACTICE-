import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';
import './Dashboard.css';

const Dashboard = () => {
  const { transactions, fetchTransactions, loading } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const totalSpent = transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="container">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-brand-title">NudgeWallet</h1>
          <p className="dashboard-brand-subtitle">Welcome back, User</p>
        </div>
        <button onClick={handleLogout} className="dashboard-logout-btn">
          Logout
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Balance Card */}
        <div className="glass-card animate-in dashboard-balance-card">
          <span className="dashboard-balance-label">TOTAL SPENDING</span>
          <h2 className="dashboard-balance-amount">${totalSpent.toFixed(2)}</h2>
          <div className="dashboard-balance-actions">
            <Link to="/add-transaction" className="btn-primary dashboard-record-link">+ Record</Link>
            <Link to="/insights" className="dashboard-insights-link">Insights</Link>
          </div>
        </div>

        {/* Goals Summary Card */}
        <div className="glass-card animate-in dashboard-goals-card">
          <div className="dashboard-goals-header">
            <h3 className="dashboard-goals-title">Active Goals</h3>
            <Link to="/goals" className="dashboard-goals-link">View All</Link>
          </div>
          <p className="dashboard-goals-text">Keep nudging! You're 15% closer to your targets than last week.</p>
        </div>
      </div>

      <div className="dashboard-transactions-section">
        <h3 className="dashboard-transactions-heading">Recent Transactions</h3>
        <div className="glass-card dashboard-transactions-card">
          {loading ? (
            <p className="dashboard-loading-text">Loading...</p>
          ) : (
            <table className="dashboard-table">
              <thead>
                <tr className="dashboard-table-head-row">
                  <th className="dashboard-table-th">CATEGORY</th>
                  <th className="dashboard-table-th">DATE</th>
                  <th className="dashboard-table-th-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, idx) => (
                  <tr key={t.id} style={{ borderBottom: idx === transactions.length - 1 ? 'none' : '1px solid var(--glass-border)' }}>
                    <td className="dashboard-table-td">{t.category}</td>
                    <td className="dashboard-table-td">
                      <span className="dashboard-date-badge">
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
<<<<<<< Updated upstream
                    <td className="dashboard-table-td-right">-${Number(t.amount).toFixed(2)}</td>
=======
                    <td style={{ padding: '1.5rem', textAlign: 'right', fontWeight: '600' }}>-${Number(t.amount).toFixed(2)}</td>
>>>>>>> Stashed changes
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!loading && transactions.length === 0 && (
<<<<<<< Updated upstream
            <p className="dashboard-empty-text">No transactions yet. Start recording!</p>
=======
            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No transactions yet. Start recording!</p>
>>>>>>> Stashed changes
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
