import { Navigate } from "react-router-dom"
import { PERMISSIONS } from "../constants/permissions"


export default function CheckPermission({ children, requiredPermission }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const role = user?.role
    if (!requiredPermission) {
        return children
    }
    if (!user) {
        return <Navigate to="/login" replace />
    }

    const hasPermission = PERMISSIONS[role].includes(requiredPermission)

    if (!hasPermission) {
        return <Navigate to="/access-denied" replace />
    }
    return children
}