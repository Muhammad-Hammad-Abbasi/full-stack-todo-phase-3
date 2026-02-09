import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="group bg-card text-card-foreground border border-border rounded-lg p-5 flex items-start justify-between shadow-sm transition-all-smooth hover:shadow-md hover:border-primary/20 bg-white">
      <div className="flex items-start space-x-4 flex-1">
        <div className="pt-1">
            <input 
                type="checkbox" 
                checked={task.is_completed} 
                onChange={onToggle}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-input shadow-sm checked:bg-primary checked:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all"
            />
             {/* Custom Checkbox Indicator SVG could go here if appearance-none is used completely, but basic styling via tailwind forms plugin or manual classes is okay for MVP */}
             <svg 
                className={`pointer-events-none absolute h-5 w-5 text-primary-foreground opacity-0 peer-checked:opacity-100 transition-opacity top-0 left-0 hidden`} 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
             >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        </div>
        
        <div className="flex-1 space-y-1">
           <h3 className={`text-base font-semibold leading-none transition-colors ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
             {task.title}
           </h3>
           {task.description && (
            <p className={`text-sm text-muted-foreground leading-relaxed ${task.is_completed ? 'line-through opacity-70' : ''}`}>
                {task.description}
            </p>
           )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onDelete} 
        className="ml-4 text-muted-foreground hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all-smooth"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
      </Button>
    </div>
  );
}