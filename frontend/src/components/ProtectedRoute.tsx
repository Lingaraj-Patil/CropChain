import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import type { ReactElement } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-white">Loading session…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
