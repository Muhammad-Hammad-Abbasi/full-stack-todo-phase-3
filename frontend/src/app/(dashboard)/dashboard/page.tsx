'use client';

import { useState, useEffect, useCallback } from 'react';
import { StatsCards } from '@/components/features/StatsCards';
import { DashboardTaskList } from '@/components/features/DashboardTaskList';
import { fetchAPI } from '@/lib/api';
import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await fetchAPI('/tasks/');
      setAllTasks(data || []);
    } catch (e) {
      console.error("Dashboard data load failed", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggle = async (task: Task) => {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    setAllTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    
    try {
        await fetchAPI(`/tasks/${task.id}/`, {
            method: 'PATCH',
            body: JSON.stringify({ is_completed: updatedTask.is_completed })
        });
    } catch (error) {
        console.error("Toggle failed", error);
        loadData(); 
    }
  };

  const handleUpdate = async (taskId: string, title: string, description: string) => {
    setAllTasks(prev => prev.map(t => t.id === taskId ? { ...t, title, description } : t));
    try {
      await fetchAPI(`/tasks/${taskId}/`, {
        method: "PATCH",
        body: JSON.stringify({ title, description })
      });
    } catch (error) {
      console.error("Update failed", error);
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
      setAllTasks(prev => prev.filter(t => t.id !== id));
      try {
          await fetchAPI(`/tasks/${id}/`, { method: 'DELETE' });
      } catch (error) {
          console.error("Delete failed", error);
          loadData();
      }
  };

  const total = allTasks.length;
  const completed = allTasks.filter(t => t.is_completed).length;
  const pending = total - completed;
  const recentTasks = allTasks.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-[#EB6824] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 bg-white min-h-screen p-6">
      <div className="space-y-1">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">Welcome back!</h3>
        <p className="text-muted-foreground text-sm">Here's what's happening with your tasks today.</p>
      </div>

      <StatsCards total={total} completed={completed} pending={pending} />
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold tracking-tight">Recent Tasks</h4>
            <Link href="/tasks">
                <Button variant="ghost" size="sm" className="text-[#EB6824] hover:text-[#EB6824] hover:bg-[#EB6824]/5">
                    View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
        </div>
        
        <DashboardTaskList 
          tasks={recentTasks} 
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}