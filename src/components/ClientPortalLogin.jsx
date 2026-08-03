import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';
import { AlertCircle, Loader } from 'lucide-react';

const DARK1 = '#081730';
const DARK2 = '#1A3586';

export default function ClientPortalLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaChecked) {
      setError('Please verify the CAPTCHA');
      return;
    }

    if (!email || !password) {
      setError('Email and password required');
      return;
    }

    setLoading(true);
    try {
      await base44.auth.login(email, password);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: `linear-gradient(135deg, ${DARK1} 0%, ${DARK2} 100%)` }}>
      <div className="w-full max-w-md rounded-2xl p-8 border border-white/10"
        style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>
        
        <h1 className="text-3xl font-black text-white mb-2">Client Portal</h1>
        <p className="text-slate-400 mb-8">Sign in to access your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-slate-400"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-slate-400"
              disabled={loading}
            />
          </div>

          {/* Simple CAPTCHA checkbox */}
          <div className="flex items-start gap-3 p-3 rounded-lg border border-white/20 bg-white/5">
            <input
              type="checkbox"
              id="captcha"
              checked={captchaChecked}
              onChange={(e) => setCaptchaChecked(e.target.checked)}
              className="mt-1 w-4 h-4 rounded cursor-pointer accent-blue-500"
              disabled={loading}
            />
            <label htmlFor="captcha" className="text-sm text-slate-300 cursor-pointer flex-1">
              I'm not a robot
            </label>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-6 rounded-xl text-white"
            style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <p className="text-xs text-slate-400 text-center mt-6">
          Don't have an account? <button onClick={() => base44.auth.redirectToLogin()} className="text-blue-300 hover:text-blue-200 underline">Register here</button>
        </p>
      </div>
    </div>
  );
}