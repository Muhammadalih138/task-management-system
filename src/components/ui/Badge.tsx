interface BadgeProps {
  type: 'low' | 'medium' | 'high' | 'completed' | 'pending';
}

export default function Badge({ type }: BadgeProps) {
  const styles = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
    completed: 'bg-sky-50 text-sky-700 border-sky-200',
    pending: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[type]}`}>
      {type.toUpperCase()}
    </span>
  );
}
