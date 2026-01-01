import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAgency?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAgency = false,
  requireAdmin = false
}) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAgency && user?.role !== 'agency' && user?.role !== 'broker') {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
