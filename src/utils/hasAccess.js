import { PERMISSIONS } from "../constants/permissions";

export const hasAccess = (requiredPermission) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user.role;
    if (!user) {
        return false
    }
    return PERMISSIONS[role].includes(requiredPermission);
};