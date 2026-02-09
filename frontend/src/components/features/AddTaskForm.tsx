'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchAPI } from '@/lib/api';

interface AddTaskFormProps {
  onTaskAdded: () => void;
}

export function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      await fetchAPI('/tasks/', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      setTitle('');
      setDescription('');
      onTaskAdded();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
      <p className="text-sm text-muted-foreground mb-6">Start by adding a new task to your list. You can always edit it later!</p>

    <form onSubmit={handleSubmit} className="space-y-5">
       <div className="space-y-4">
           <Input 
             id="new-task-title"
             label="Title"
             placeholder="e.g., Review project proposal"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             required
           />
           <div className="space-y-2">
                <label className="text-sm font-medium leading-none text-foreground">Description (Optional)</label>
                <textarea 
                    className="flex min-h-25 w-full rounded-xl border border-border border-t-2 border-t-[#EB6824] bg-slate-50/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB6824]/20 focus-visible:border-[#EB6824]/50 disabled:cursor-not-allowed disabled:opacity-50 transition-all-smooth"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add details..."
                />
            </div>
       </div>
       
       <div className="flex justify-end pt-2">
          <Button type="submit" disabled={!title.trim() || loading} className="min-w-30">
             {loading ? 'Creating...' : 'Create Task'}
          </Button>
       </div>
    </form>
    </div>
  );
}