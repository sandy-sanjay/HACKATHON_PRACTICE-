import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';
import './Insights.css';

const Insights = () => {
  const { insights, fetchInsights, loading } = useWallet();

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

<<<<<<< Updated upstream
  if (loading) return <div className="container insights-loading">Loading Insights...</div>;
  if (!insights) return <div className="container insights-no-data">No data yet. Go record some transactions!</div>;
=======
  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading Insights...</div>;
  if (!insights) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>No data yet. Go record some transactions!</div>;
>>>>>>> Stashed changes

  // Backend returns: { totalTagsTracked, insight, suggestedNudge: { message, triggerType } }
  const { totalTagsTracked, insight, suggestedNudge } = insights;

  return (
    <div className="container">
<<<<<<< Updated upstream
      <Link to="/" className="insights-back-link">← Back to Dashboard</Link>
      <h2 className="insights-heading">Behavioral Insights</h2>
      <p className="insights-subtitle">How your emotions drive your spending.</p>

      <div className="insights-grid">

        {/* Tags Summary Card */}
        <div className="glass-card animate-in insights-card">
          <div className="insights-card-header">
            <h3 className="insights-card-label">Total Tags Tracked</h3>
            <span className="insights-card-count">{totalTagsTracked ?? 0}</span>
          </div>
          <p className="insights-card-text">
=======
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>← Back to Dashboard</Link>
      <h2 style={{ marginBottom: '0.5rem' }}>Behavioral Insights</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>How your emotions drive your spending.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>

        {/* Tags Summary Card */}
        <div className="glass-card animate-in" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', color: 'var(--accent)' }}>Total Tags Tracked</h3>
            <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>{totalTagsTracked ?? 0}</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
>>>>>>> Stashed changes
            {insight || 'Keep tracking your moods to unlock insights!'}
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
      </div>

<<<<<<< Updated upstream
      <div className="glass-card insights-fact-card">
        <h4 className="insights-fact-title">💡 Did you know?</h4>
        <p className="insights-fact-text">
          Users who track their mood with transactions save 18% more on average by simply being aware
          of their emotional spending triggers. NudgeWallet is helping you build long-term financial resilience.
=======
      <div className="glass-card" style={{ marginTop: '3rem', padding: '2rem', border: '1px solid var(--accent)' }}>
        <h4 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>💡 Did you know?</h4>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
          Users who track their mood with transactions save 18% more on average by simply being aware of their emotional spending triggers. NudgeWallet is helping you build long-term financial resilience.
>>>>>>> Stashed changes
        </p>
      </div>
    </div>
  );
};

export default Insights;
