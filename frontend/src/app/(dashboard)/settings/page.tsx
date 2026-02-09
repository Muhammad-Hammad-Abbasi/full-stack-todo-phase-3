import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold tracking-tight">Settings</h3>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Settings functionality is coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}