import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { CheckCircle, Circle, Trash2, Calendar } from 'lucide-react';

interface TaskProps {
  task: {
    _id: string;
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    isCompleted: boolean;
  };
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskProps) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between gap-4">
      <div className="flex items-start gap-3 flex-1">
        <button onClick={() => onToggle(task._id, !task.isCompleted)} className="mt-1 text-black hover:text-indigo-600 transition-colors">
          {task.isCompleted ? <CheckCircle className="w-5 h-5 text-indigo-600" /> : <Circle className="w-5 h-5" />}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-slate-800 text-base ${task.isCompleted ? 'line-through text-black' : ''}`}>
            {task.title}
          </h3>
          {task.description && <p className="text-slate-500 text-sm mt-1">{task.description}</p>}
          
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge type={task.priority} />
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-black font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <Button variant="secondary" className="p-2 text-black hover:text-rose-600 !bg-transparent" onClick={() => onDelete(task._id)}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
