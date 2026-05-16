'use client';

interface TaskFiltersProps {
  currentFilter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  const filterTabs: Array<'all' | 'pending' | 'completed'> = ['all', 'pending', 'completed'];

  return (
    <div className="flex bg-slate-100 p-1 rounded-xl w-fit border border-slate-200">
      {filterTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onFilterChange(tab)}
          className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
            currentFilter === tab
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
