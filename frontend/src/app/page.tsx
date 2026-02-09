'use client';

import { useState, useEffect } from 'react';
import { AuthForm } from '@/components/features/AuthForm';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      router.push('/dashboard');
    } else {
        setIsLoadingAuth(false);
    }
  }, [router]);

  const handleAuthSuccess = (token: string) => {
    setIsAuthenticated(true);
    router.push('/dashboard');
  };

  if (isLoadingAuth) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#EB6824] border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-lg border border-border">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 bg-[#EB6824] rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-sm">
                T
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            TodoPro
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your professional workspace.
          </p>
        </div>
        
        <AuthForm onSuccess={handleAuthSuccess} />
        
      </div>
      <p className="mt-8 text-center text-xs text-muted-foreground">
        &copy; 2026 TodoPro Inc. All rights reserved.
      </p>
    </div>
  );
}