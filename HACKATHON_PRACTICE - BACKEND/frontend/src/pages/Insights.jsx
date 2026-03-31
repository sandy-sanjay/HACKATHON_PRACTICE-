import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../controller/useWallet';

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

  if (loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>Loading Insights...</div>;
  
  const hasData = processedInsights.length > 0;

  return (
    <div className="container">
      <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', marginBottom: '1.5rem', display: 'inline-block' }}>← Back to Dashboard</Link>
      <h2 style={{ marginBottom: '0.5rem' }}>Behavioral Insights</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>
        {insights?.insight || "How your emotions drive your spending."}
      </p>

      {!hasData ? (
        <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', opacity: 0.6 }}>
          <p>No behavioral data yet. Start recording transactions with moods to see insights!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
          {processedInsights.map((item, idx) => (
            <div key={item.mood} className="glass-card animate-in" style={{ padding: '2rem', animationDelay: `${idx * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '1px', color: 'var(--accent)' }}>{item.mood}</h3>
                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{item.percentage}%</span>
              </div>
              
              {/* Progress Bar */}
              <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <div style={{ 
                  height: '100%', 
                  width: `${item.percentage}%`, 
                  background: 'linear-gradient(to right, #38bdf8, #818cf8)',
                  boxShadow: '0 0 10px var(--accent-glow)'
                }} />
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <span>Total Spent</span>
                <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>${item.amount.toFixed(2)}</span>
              </div>

              {/* Frontend-driven Nudges */}
              {item.mood.toLowerCase() === 'stressed' && item.percentage > 30 && (
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
                  <p style={{ fontSize: '0.85rem', color: '#f87171', lineHeight: '1.5' }}>
                    <strong>Nudge:</strong> High stress-spending detected. Try a 5-minute break before your next checkout.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {insights?.suggestedNudge && (
        <div className="glass-card" style={{ marginTop: '3rem', padding: '2rem', border: '1px solid var(--accent)' }}>
          <h4 style={{ color: 'var(--accent)', marginBottom: '1rem' }}>💡 AI Personalized Nudge</h4>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            {insights.suggestedNudge.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Insights;
