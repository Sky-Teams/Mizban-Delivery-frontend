import { Navigate } from 'react-router-dom';
import { getStoredUser, hasPermission } from '../utils/auth';

export default function RouteGuard({
  children,
  requireAuth = false,
  guestOnly = false,
  requiredPermission,
  allowedRoles,
  registrationRoute = false,
}) {
  const user = getStoredUser();

  if (guestOnly && user) {
    return <Navigate to="/" replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return children;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  if (user.role === 'driver' && user.registrationStatus !== 'approved') {
    if (!registrationRoute) {
      return <Navigate to="/registration/personal-info" replace />;
    }
  }

  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}