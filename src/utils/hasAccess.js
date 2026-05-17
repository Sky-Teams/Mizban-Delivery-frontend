import { getStoredUser, hasPermission } from './auth';

export const hasAccess = (requiredPermission) => {
  const user = getStoredUser();
  return hasPermission(user, requiredPermission);
};
