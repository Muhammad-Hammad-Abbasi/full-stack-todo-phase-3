import React from 'react';
import { Card, CardContent } from '../ui/card';
import { ListTodo, CheckCircle2, Clock } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  completed: number;
  pending: number;
}

export function StatsCards({ total, completed, pending }: StatsCardsProps) {
  const stats = [
    { label: 'Total Tasks', value: total, icon: ListTodo, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Completed', value: completed, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'To Do', value: pending, icon: Clock, color: 'text-[#EB6824]', bg: 'bg-[#EB6824]/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="border-t-4 border-t-[#EB6824]">
            <CardContent className="p-6 flex items-center space-x-4 pt-6">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <h4 className="text-2xl font-bold tracking-tight">{stat.value}</h4>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
