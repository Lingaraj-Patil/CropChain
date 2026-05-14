import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import api from '../lib/api';

type Role = 'farmer' | 'consumer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  walletAddress?: string;
  farmName?: string;
  location?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  register: (payload: Record<string, unknown>) => Promise<AuthUser>;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const tokenKey = 'cropchain_token';
const userKey = 'cropchain_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem(userKey);
    return stored ? JSON.parse(stored) as AuthUser : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(tokenKey));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hydrate = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/api/auth/me');
        setUser(response.data.data.user);
        localStorage.setItem(userKey, JSON.stringify(response.data.data.user));
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    void hydrate();
  }, [token]);

  const persistSession = (nextToken: string, nextUser: AuthUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem(tokenKey, nextToken);
    localStorage.setItem(userKey, JSON.stringify(nextUser));
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/api/auth/login', { email: email.trim().toLowerCase(), password });
      const nextUser = response.data.data.user as AuthUser;
      persistSession(response.data.data.token, nextUser);
      return nextUser;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error((error.response?.data as { message?: string } | undefined)?.message || 'Login failed');
      }

      throw error instanceof Error ? error : new Error('Login failed');
    }
  };

  const register = async (payload: Record<string, unknown>) => {
    try {
      const response = await api.post('/api/auth/register', payload);
      const nextUser = response.data.data.user as AuthUser;
      persistSession(response.data.data.token, nextUser);
      return nextUser;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error((error.response?.data as { message?: string } | undefined)?.message || 'Registration failed');
      }

      throw error instanceof Error ? error : new Error('Registration failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(userKey);
  };

  const value = useMemo(() => ({ user, token, loading, login, register, logout, setUser }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
