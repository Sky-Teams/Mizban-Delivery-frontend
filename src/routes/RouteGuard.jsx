import { Navigate } from 'react-router-dom';
import { getStoredUser, hasPermission } from '../utils/auth';
import { ROUTE_PATHS } from './routePaths';

export default function RouteGuard({
  children,
  requireAuth = false,
  guestOnly = false,
  requiredPermission,
}) {
  const user = getStoredUser();

  if (guestOnly && user) {
    return <Navigate to={ROUTE_PATHS.DASHBOARD} replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (!requiredPermission) {
    return children;
  }

  if (!user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (!hasPermission(user, requiredPermission)) {
    return <Navigate to={ROUTE_PATHS.ACCESS_DENIED} replace />;
  }

  return children;
}
