import { Navigate } from 'react-router-dom';
import { PERMISSIONS } from '../constants/permissions';
import { ROUTE_PATHS } from '../routes/routePaths';

export default function CheckPermission({ children, requiredPermission }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;
  if (!requiredPermission) {
    return children;
  }
  if (!user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} replace />;
  }

  const hasPermission = PERMISSIONS[role].includes(requiredPermission);

  if (!hasPermission) {
    return <Navigate to={ROUTE_PATHS.ACCESS_DENIED}replace />;
  }
  return children;
}
