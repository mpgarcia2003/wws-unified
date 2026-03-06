'use client';

import { useState } from 'react';
import { adminLogin } from './actions';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await adminLogin(password);
    if (result.success) {
      window.location.reload();
    } else {
      setError('Invalid password');
      setLoading(false);
    }
  };

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <h1>World Wide <em>Shades</em></h1>
        <p>Admin Dashboard</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            autoFocus
          />
          {error && <span className="adm-login-err">{error}</span>}
          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>

      <style>{`
        .adm-login {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          background: #0c0c0c; font-family: -apple-system, 'Segoe UI', sans-serif;
        }
        .adm-login-card {
          width: 100%; max-width: 360px; padding: 3rem 2.5rem;
          background: #1a1a1a; border-radius: 12px; border: 1px solid #333;
          text-align: center;
        }
        .adm-login-card h1 {
          font-family: Georgia, serif; font-size: 1.5rem; font-weight: 400;
          color: #fff; margin-bottom: .25rem;
        }
        .adm-login-card h1 em { color: #c0993a; font-style: italic; }
        .adm-login-card p { font-size: .8rem; color: #666; margin-bottom: 2rem; }
        .adm-login-card input {
          width: 100%; padding: .8rem 1rem; background: #111; border: 1px solid #333;
          border-radius: 8px; color: #fff; font-size: .9rem; outline: none;
          margin-bottom: .75rem;
        }
        .adm-login-card input:focus { border-color: #c0993a; }
        .adm-login-err { display: block; font-size: .78rem; color: #ef4444; margin-bottom: .5rem; }
        .adm-login-card button {
          width: 100%; padding: .8rem; background: #c0993a; color: #fff;
          font-weight: 600; font-size: .9rem; border: none; border-radius: 8px;
          cursor: pointer; transition: all .2s;
        }
        .adm-login-card button:hover { background: #9a7a2a; }
        .adm-login-card button:disabled { opacity: .5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
