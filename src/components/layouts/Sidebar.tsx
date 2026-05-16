'use client';

import { useRouter } from 'next/navigation';
import { LayoutDashboard, LogOut, CheckSquare } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      router.push('/login');
      router.refresh();
    }
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 min-h-screen flex flex-col border-r border-slate-800 shrink-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <CheckSquare className="w-6 h-6 text-indigo-400" />
        <span className="font-bold text-xl text-white tracking-tight">TaskSync</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 mt-4">
        <a href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 bg-indigo-600/10 text-indigo-400 rounded-xl font-medium text-sm transition-colors">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard Overview
        </a>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 rounded-xl font-medium text-sm transition-colors group">
          <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          Sign Out Account
        </button>
      </div>
    </aside>
  );
}
