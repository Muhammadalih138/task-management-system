'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || 'Something went wrong');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 text-center tracking-tight">Welcome Back</h2>
        <p className="text-slate-500 text-sm text-center mt-1">Sign in to manage your pipeline tasks.</p>
        
        {error && <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">{error}</div>}
        
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
            {/* Added text-black utility below */}
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-black focus:outline-none focus:border-indigo-600 transition-colors" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">Password</label>
            {/* Added text-black utility below */}
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-black focus:outline-none focus:border-indigo-600 transition-colors" 
              placeholder="••••••••"
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full mt-2 py-2.5">
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account? <Link href="/signup" className="text-indigo-600 font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
