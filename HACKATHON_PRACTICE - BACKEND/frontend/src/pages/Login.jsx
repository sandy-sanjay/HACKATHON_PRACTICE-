import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../service/api.service';
import './Login.css';

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
    <div className="container login-container">
      <div className="glass-card animate-in login-card">
        <h1 className="login-title">NudgeWallet</h1>
        <p className="login-subtitle">Master your money, nudge your future.</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleAuth}>
          <div className="login-form-group">
            <label className="login-label">EMAIL</label>
            <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="login-form-group-last">
            <label className="login-label">PASSWORD</label>
            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary login-submit-btn" type="submit">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <button onClick={() => setIsLogin(!isLogin)} className="login-toggle-btn">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
