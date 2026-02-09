'use client';

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { ChatInterface } from '@/components/features/ChatInterface';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/'); // Redirect to home/login
    } else {
        setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (isLoading) return null; // Or spinner
  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar onLogout={handleLogout} />

      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-6">AI Assistant</h1>
        <ChatInterface />
      </main>
    </div>
  );
}
