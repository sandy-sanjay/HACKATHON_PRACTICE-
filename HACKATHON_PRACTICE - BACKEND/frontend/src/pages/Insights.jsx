import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';
import './Insights.css';

const Insights = () => {
  const { insights, fetchInsights, loading } = useWallet();

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  if (loading) return <div className="container insights-loading">Loading Insights...</div>;
  if (!insights) return <div className="container insights-no-data">No data yet. Go record some transactions!</div>;

  // Backend returns: { totalTagsTracked, insight, suggestedNudge: { message, triggerType } }
  const { totalTagsTracked, insight, suggestedNudge } = insights;

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
            <span className="insights-card-count">{totalTagsTracked ?? 0}</span>
          </div>
          <p className="insights-card-text">
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

      <div className="glass-card insights-fact-card">
        <h4 className="insights-fact-title">💡 Did you know?</h4>
        <p className="insights-fact-text">
          Users who track their mood with transactions save 18% more on average by simply being aware
          of their emotional spending triggers. NudgeWallet is helping you build long-term financial resilience.
        </p>
      </div>
    </div>
  );
};

export default Insights;
