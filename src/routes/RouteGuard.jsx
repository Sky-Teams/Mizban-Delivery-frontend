import { Navigate } from 'react-router-dom';
import { PERMISSIONS } from '../constants/permissions';
import { ROUTE_PATHS } from './routePaths';

function getStoredUser() {
  const storedUser = localStorage.getItem('user');

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export default function RouteGuard({ children, requireAuth = false, requiredPermission }) {
  const user = getStoredUser();

  if (requireAuth && !user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  if (!requiredPermission) {
    return children;
  }

  if (!user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  const userPermissions = PERMISSIONS[user.role] || [];

  if (!userPermissions.includes(requiredPermission)) {
    return <Navigate to={ROUTE_PATHS.ACCESS_DENIED} replace />;
  }

  return children;
}
