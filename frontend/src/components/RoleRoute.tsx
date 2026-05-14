import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import type { ReactElement } from 'react';

export const RoleRoute = ({ roles, children }: { roles: Array<'farmer' | 'consumer' | 'admin'>; children: ReactElement }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-white">Loading session…</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to={user.role === 'farmer' ? '/farmer' : '/consumer'} replace />;
  }

  return children;
};
