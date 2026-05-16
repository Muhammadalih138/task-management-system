import Link from 'next/link';

export default function RootPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-black tracking-tight">
            TaskSync
          </h1>
          <p className="text-black text-base">
            An atomic component-driven task management system.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link 
            href="/login" 
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium text-sm transition-all shadow-sm active:scale-95"
          >
            Sign In to Dashboard
          </Link>
          <Link 
            href="/signup" 
            className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-black rounded-xl font-medium text-sm transition-all shadow-sm active:scale-95"
          >
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
}
