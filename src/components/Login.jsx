import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../App';

export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(password.trim());
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      const VALID_HASH = '56d091b2c1863d6bf0d4896949bdc75712667bea8077e426ec38549410e92745';

      if (hashHex === VALID_HASH) {
        login();
      } else {
        setError('Invalid password. Please try again.');
      }
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pr-12 border border-[#444] rounded-lg bg-[#23282d] text-white focus:ring-2 focus:ring-vastintPrimary focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
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
