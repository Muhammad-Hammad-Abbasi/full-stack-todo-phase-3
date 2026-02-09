import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListTodo, MessageSquare, Settings, LogOut, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface SidebarProps {
  onLogout?: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Tasks', href: '/tasks', icon: ListTodo },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#fcd897] border-r border-border h-screen flex flex-col sticky top-0 shadow-sm">
      <div className="p-6 pb-4">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="h-10 w-10 bg-[#EB6824] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#EB6824]/20 group-hover:scale-105 transition-transform">
            T
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-medium tracking-tighter text-slate-900 leading-none">TodoPro</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#EB6824] mt-0.5">Workspace</span>
          </div>
        </Link>
      </div>

      <div className="px-4 py-6">
        <Link href="/tasks/create" className="block w-full">
          <Button fullWidth className="space-x-2 shadow-md">
            <Plus className="h-4 w-4" />
            <span>New Task</span>
          </Button>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors border-b ${
                isActive 
                  ? 'bg-[#EB6824]/10 text-[#EB6824]' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        {onLogout && (
          <button 
            onClick={onLogout}
            className="flex items-center space-x-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}