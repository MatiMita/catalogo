'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface AdminGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AdminGuard({ children, redirectTo = '/admin/login' }: AdminGuardProps) {
  const { user, isAdmin, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push(redirectTo);
    }
  }, [user, isAdmin, loading, router, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Verificando acceso...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Se redirige en el useEffect
  }

  return <>{children}</>;
}