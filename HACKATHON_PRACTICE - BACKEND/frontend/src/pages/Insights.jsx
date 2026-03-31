import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';
import './Insights.css';

const Insights = () => {
  const { transactions, insights, fetchTransactions, fetchInsights, loading } = useWallet();

  useEffect(() => {
    fetchTransactions();
    fetchInsights();
  }, [fetchTransactions, fetchInsights]);

  // Frontend-centric logic to aggregate data
  const processedInsights = useMemo(() => {
    if (!transactions || !Array.isArray(transactions) || transactions.length === 0) return [];

    const moodMap = {};
    let totalSpent = 0;

    transactions.forEach(t => {
      const mood = (t.moodTag || 'MODERATE').toLowerCase();
      const amount = t.amount || 0;

      if (!moodMap[mood]) {
        moodMap[mood] = { count: 0, amount: 0 };
      }

      moodMap[mood].count += 1;
      moodMap[mood].amount += amount;
      totalSpent += amount;
    });

    return Object.keys(moodMap).map(mood => ({
      mood: mood.charAt(0).toUpperCase() + mood.slice(1),
      amount: moodMap[mood].amount,
      percentage: totalSpent > 0 ? Math.round((moodMap[mood].amount / totalSpent) * 100) : 0,
      count: moodMap[mood].count
    }));
  }, [transactions]);

  if (loading) return <div className="container insights-loading">Loading Insights...</div>;

  // Backend returns: { totalTagsTracked, insight, suggestedNudge: { message, triggerType } }
  const totalTagsTracked = insights?.totalTagsTracked ?? 0;
  const backendInsight = insights?.insight || 'Keep tracking your moods to unlock more behavioral insights!';
  const suggestedNudge = insights?.suggestedNudge;

  return (
    <div className="container">
      <Link to="/" className="insights-back-link">← Back to Dashboard</Link>
      <h2 className="insights-heading">Behavioral Insights</h2>
      <p className="insights-subtitle">How your emotions drive your spending.</p>

      <div className="insights-grid">
        {/* Tags Summary Card */}
        <div className="glass-card animate-in insights-card">
          <div className="insights-card-header">
            <h3 className="insights-card-label">Total Tags Tracked</h3>
            <span className="insights-card-count">{totalTagsTracked}</span>
          </div>
          <p className="insights-card-text">
            {backendInsight}
          </p>
        </div>

        {/* Suggested Nudge Card */}
        {suggestedNudge && (
          <div className="glass-card animate-in insights-nudge-card">
            <div className="insights-card-header">
              <h3 className="insights-card-label">
                {suggestedNudge.triggerType || 'Nudge'}
              </h3>
              <span className="insights-nudge-icon">💡</span>
            </div>

            <div className="insights-nudge-message-box">
              <p className="insights-nudge-message-text">
                <strong>Nudge:</strong> {suggestedNudge.message}
              </p>
            </div>
          </div>
        )}

        {/* Mood-based spending breakdown (Processed Insights) */}
        {processedInsights.map((item, idx) => (
          <div key={item.mood} className="glass-card animate-in insights-card" style={{ animationDelay: `${(idx + 1) * 0.1}s` }}>
            <div className="insights-card-header">
              <h3 className="insights-card-label">{item.mood} Spending</h3>
              <span className="insights-card-count" style={{ fontSize: '1.2rem' }}>{item.percentage}%</span>
            </div>

            <div className="insights-progress-track">
              <div className="insights-progress-fill" style={{ width: `${item.percentage}%` }} />
            </div>

            <div className="insights-card-footer">
              <span className="insights-footer-text">Total: ${item.amount.toFixed(2)}</span>
              <span className="insights-footer-text">{item.count} Transactions</span>
            </div>
          </div>
        ))}
      </div>

      {!loading && (!transactions || transactions.length === 0) && (
        <div className="insights-no-data">
          No data yet. Start recording transactions with moods to see detailed insights!
        </div>
      )}

      <div className="glass-card insights-fact-card">
        <h4 className="insights-fact-title">💡 Did you know?</h4>
        <p className="insights-fact-text">
          Users who track their mood with transactions save 18% more on average by simply being aware of their emotional spending triggers. NudgeWallet is helping you build long-term financial resilience.
        </p>
      </div>
    </div>
  );
};

export default Insights;
