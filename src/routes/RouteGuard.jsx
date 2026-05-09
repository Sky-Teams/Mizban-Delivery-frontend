import { Navigate } from 'react-router-dom';
import { getStoredUser, hasPermission } from '../utils/auth';

export default function RouteGuard({
  children,
  requireAuth = false,
  guestOnly = false,
  requiredPermission,
}) {
  const user = getStoredUser();

  if (guestOnly && user) {
    return <Navigate to="/" replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!requiredPermission) {
    return children;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!hasPermission(user, requiredPermission)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
