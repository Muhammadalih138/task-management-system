'use client';
import { useEffect, useState, useCallback } from 'react';
import Sidebar from '../../components/layouts/Sidebar';
import TaskForm from '../../components/features/TaskForm';
import TaskCard from '../../components/features/TaskCard';
import TaskFilters from '../../components/features/TaskFilters';

interface TaskItem {
  _id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  isCompleted: boolean;
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('/api/tasks');
      const data = await res.json();
      if (res.ok && data.success) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error('Failed to parse active database connection collection tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted }),
    });
    if (res.ok) fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    if (res.ok) fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.isCompleted;
    if (filter === 'pending') return !task.isCompleted;
    return true;
  });

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">Organize your priorities and track workflow updates.</p>
          </div>
          <TaskFilters currentFilter={filter} onFilterChange={setFilter} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={fetchTasks} />
          </div>

          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <p className="text-slate-400 text-sm font-medium animate-pulse">Syncing tasks pipeline...</p>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                <p className="text-slate-400 text-sm font-medium">No tasks found matching this criteria.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={handleToggleComplete}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
