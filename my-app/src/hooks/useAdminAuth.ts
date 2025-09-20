'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { adminAuthService } from '@/services/adminAuth';

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = adminAuthService.onAuthStateChanged((user, isAdmin) => {
      setUser(user);
      setIsAdmin(isAdmin);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await adminAuthService.signIn(email, password);
      return true;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await adminAuthService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    isAdmin,
    loading,
    signIn,
    signOut
  };
}