import { PERMISSIONS } from '../constants/permissions';

export function getStoredUser() {
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

export function hasPermission(user, permission) {
  if (!user || !permission) {
    return false;
  }

  const userPermissions = PERMISSIONS[user.role] || [];

  return userPermissions.includes(permission);
}
