'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Search, Filter } from 'lucide-react';

interface DashboardFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (status: 'all' | 'pending' | 'completed') => void;
}

export function DashboardFilter({ onSearch, onFilterChange }: DashboardFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // 300ms Debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleFilterClick = (status: 'all' | 'pending' | 'completed') => {
    setActiveFilter(status);
    onFilterChange(status);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          className="pl-10" 
          placeholder="Search tasks..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex items-center bg-muted/50 p-1 rounded-lg border border-border self-start">
        {(['all', 'pending', 'completed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => handleFilterClick(status)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              activeFilter === status 
                ? 'bg-white text-[#EB6824] shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
