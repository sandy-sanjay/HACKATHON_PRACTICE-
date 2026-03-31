import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';

const Insights = () => {
  const { insights, fetchInsights, loading } = useWallet();

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading Insights...</div>;
  if (!insights) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>No data yet. Go record some transactions!</div>;

  // Backend returns: { totalTagsTracked, insight, suggestedNudge: { message, triggerType } }
  const { totalTagsTracked, insight, suggestedNudge } = insights;

  return (
    <div className="container">
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
            {insight || 'Keep tracking your moods to unlock insights!'}
          </p>
        </div>

        {/* Suggested Nudge Card */}
        {suggestedNudge && (
          <div className="glass-card animate-in" style={{ padding: '2rem', animationDelay: '0.1s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', color: 'var(--accent)' }}>
                {suggestedNudge.triggerType || 'Nudge'}
              </h3>
              <span style={{ fontSize: '1.5rem' }}>💡</span>
            </div>

            <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                <strong>Nudge:</strong> {suggestedNudge.message}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="glass-card" style={{ marginTop: '3rem', padding: '2rem', border: '1px solid var(--accent)' }}>
        <h4 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>💡 Did you know?</h4>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
          Users who track their mood with transactions save 18% more on average by simply being aware of their emotional spending triggers. NudgeWallet is helping you build long-term financial resilience.
        </p>
      </div>
    </div>
  );
};

export default Insights;
