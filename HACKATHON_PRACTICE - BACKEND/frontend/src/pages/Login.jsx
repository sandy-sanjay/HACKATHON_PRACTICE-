import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../service/api.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await apiService.auth.login(email, password);
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('userId', response.data.data.userId);
        navigate('/');
      } else {
        await apiService.auth.register({ email, password, name: 'User' });
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="glass-card animate-in" style={{ padding: '3rem', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ marginBottom: '0.5rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NudgeWallet</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Master your money, nudge your future.</p>
        
        {error && <p style={{ color: 'var(--error)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        
        <form onSubmit={handleAuth}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>EMAIL</label>
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PASSWORD</label>
            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary" style={{ width: '100%' }} type="submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent)', marginTop: '1.5rem', width: '100%', cursor: 'pointer', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
