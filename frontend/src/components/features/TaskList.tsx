import { Task } from '@/types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskList({ tasks, loading, onToggle, onDelete }: TaskListProps) {
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <p className="text-muted-foreground text-sm">Loading your tasks...</p>
    </div>
  );

  if (tasks.length === 0) {
      return (
        <div className="text-center py-16 px-4 bg-white rounded-xl border border-dashed border-border">
            <div className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">No tasks yet</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-sm mx-auto">
                Get started by creating a new task above. Your productivity journey begins here!
            </p>
        </div>
      );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem 
            key={task.id} 
            task={task} 
            onToggle={() => onToggle(task)}
            onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  );
}