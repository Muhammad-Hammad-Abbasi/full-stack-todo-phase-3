'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return <DashboardLayout onLogout={handleLogout}>{children}</DashboardLayout>;
}
