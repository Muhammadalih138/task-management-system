'use client';

import { useState } from 'react';
import Button from '../ui/Button';

interface TaskFormProps {
  onTaskCreated: () => void;
}

export default function TaskForm({ onTaskCreated }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError('');

    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, priority, dueDate }),
    });

    setLoading(false);

    if (res.ok) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      onTaskCreated(); // Trigger a refreshing sync on parent dashboard
    } else {
      const data = await res.json();
      setError(data.error || 'Failed to build task.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-4">
      <h3 className="font-bold text-slate-900 text-lg">Create New Task</h3>
      
      {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-lg border border-rose-100">{error}</div>}

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Task Title</label>
        {/* Added text-black utility below */}
        <input 
          type="text" 
          required 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-black focus:outline-none focus:border-indigo-600" 
          placeholder="e.g., Design database model schema" 
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Description (Optional)</label>
        {/* Added text-black utility below */}
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-black focus:outline-none focus:border-indigo-600 h-20 resize-none" 
          placeholder="Add more contextual notes..." 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Priority</label>
          {/* Added text-black utility below */}
          <select 
            value={priority} 
            onChange={(e) => setPriority(e.target.value as any)} 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-black focus:outline-none focus:border-indigo-600"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Due Date</label>
          {/* Added text-black utility below */}
          <input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 text-black focus:outline-none focus:border-indigo-600" 
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full mt-2 py-2.5">
        {loading ? 'Creating Task...' : 'Add Task to Dashboard'}
      </Button>
    </form>
  );
}
