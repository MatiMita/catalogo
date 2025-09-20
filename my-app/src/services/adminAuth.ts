import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { auth } from '@/app/lib/firebase';

class AdminAuthService {
  // Email del administrador (hardcodeado por seguridad)
  private readonly ADMIN_EMAIL = 'admin@oyc.com';

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      // Verificar que sea el email del admin
      if (email !== this.ADMIN_EMAIL) {
        throw new Error('Acceso no autorizado');
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return !!userCredential.user;
    } catch (error) {
      console.error('Error en login de admin:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  isAdmin(user: User | null): boolean {
    return user?.email === this.ADMIN_EMAIL;
  }

  onAuthStateChanged(callback: (user: User | null, isAdmin: boolean) => void) {
    return onAuthStateChanged(auth, (user) => {
      const isAdmin = this.isAdmin(user);
      callback(user, isAdmin);
    });
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  isCurrentUserAdmin(): boolean {
    return this.isAdmin(auth.currentUser);
  }
}

export const adminAuthService = new AdminAuthService();