import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Mock login — accept any credentials
      await new Promise((resolve) => setTimeout(resolve, 400));
      login();
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#23282d] font-sans selection:bg-vastintPrimary selection:text-white">
      <div className="bg-[#2c3338] p-11 w-full max-w-[440px] shadow-lg rounded-xl border border-[#444]">
        <div className="mb-8 flex items-center gap-3">
           <img src="/logo_vastint_white.svg" alt="Vastint" className="h-8" />
           <span className="text-sm font-light tracking-widest uppercase text-white/60">Privacy Hub</span>
        </div>

        <form onSubmit={handleLogin}>
          <h1 className="text-[24px] font-semibold text-white mb-2 text-left">Welcome back</h1>
          <p className="text-left text-[14px] mb-8 text-gray-400">
            Please enter your credentials to access the platform.
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-900/30 border border-red-700 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-[#444] rounded-lg bg-[#23282d] text-white focus:ring-2 focus:ring-vastintPrimary focus:border-transparent outline-none"
                placeholder="privacy@vastint.eu"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-[#444] rounded-lg bg-[#23282d] text-white focus:ring-2 focus:ring-vastintPrimary focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-vastintPrimary text-white px-8 py-3 rounded-lg font-semibold hover:bg-vastintPrimary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vastintPrimary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
