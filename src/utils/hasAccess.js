import { PERMISSIONS } from '../constants/permissions';

export const hasAccess = (requiredPermission) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return false;
  }
  const role = user.role;
  return PERMISSIONS[role].includes(requiredPermission);
};
