import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle2, Trash2, Edit2 } from 'lucide-react';
import { Task } from '@/types/task';
import { EditTaskModal } from './EditTaskModal';

interface DashboardTaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (taskId: string, title: string, description: string) => Promise<void>;
}

export function DashboardTaskList({ tasks, loading, onToggle, onDelete, onUpdate }: DashboardTaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-muted/50 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-border">
        <p className="text-muted-foreground">No tasks found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <Card key={task.id} className="group hover:border-[#EB6824]/30 transition-all-smooth border-t-0! border-l-4 border-l-[#EB6824] shadow-sm">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0 flex-1 mr-4 py-3">
              <button 
                onClick={() => onToggle(task)}
                className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${
                  task.is_completed 
                    ? 'bg-[#EB6824]/80 border-[#EB6824]/80 text-white' 
                    : 'border-muted-foreground/30 hover:border-[#EB6824]'
                }`}
              >
                {task.is_completed && <CheckCircle2 className="h-4 w-4" />}
              </button>
              
              <div className="space-y-1 min-w-0">
                <h4 className={`font-semibold text-lg leading-tight truncate ${task.is_completed ? 'text-muted-foreground line-through' : 'text-slate-900'}`}>
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-6 shrink-0">
              <Badge variant={task.is_completed ? 'success' : 'primary'} className="rounded-md px-3 py-1 text-xs">
                {task.is_completed ? 'Completed' : 'To Do'}
              </Badge>
              
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEditClick(task)}
                  className="p-2 text-muted-foreground hover:text-[#EB6824] hover:bg-[#EB6824]/5 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => onDelete(task.id)}
                  className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <EditTaskModal 
        task={editingTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdate}
      />
    </div>
  );
}
