"use client";

import { useState, useEffect, useCallback } from "react";
import { DashboardFilter } from "@/components/features/DashboardFilter";
import { DashboardTaskList } from "@/components/features/DashboardTaskList";
import { fetchAPI } from "@/lib/api";
import { Task } from "@/types/task";

export default function TasksPage() {
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAPI("/tasks/");
      setAllTasks(data || []);
    } catch (e) {
      console.error("Tasks data load failed", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Apply filters
  useEffect(() => {
    let result = [...allTasks];

    if (statusFilter === "completed") {
      result = result.filter(t => t.is_completed);
    } else if (statusFilter === "pending") {
      result = result.filter(t => !t.is_completed);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) || 
        (t.description && t.description.toLowerCase().includes(query))
      );
    }

    setFilteredTasks(result);
  }, [allTasks, searchQuery, statusFilter]);

  const handleToggle = async (task: Task) => {
    const updatedTask = { ...task, is_completed: !task.is_completed };
    setAllTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    
    try {
        await fetchAPI(`/tasks/${task.id}/`, {
            method: "PATCH",
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
          await fetchAPI(`/tasks/${id}/`, { method: "DELETE" });
      } catch (error) {
          console.error("Delete failed", error);
          loadData();
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1">
        <h3 className="text-2xl font-bold tracking-tight">All Tasks</h3>
        <p className="text-muted-foreground text-sm">Manage and organize your full task list.</p>
      </div>

      <div className="pt-2">
        <DashboardFilter 
          onSearch={setSearchTerm} 
          onFilterChange={setStatusFilter} 
        />
        
        <DashboardTaskList 
          tasks={filteredTasks} 
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}