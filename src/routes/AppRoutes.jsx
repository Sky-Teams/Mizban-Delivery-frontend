import { Routes, Route } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import RegistrationLayout from "../layout/RegistrationLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Registration Flow: Uses new Layout */}
      <Route element={<RegistrationLayout />}>
        {publicRoutes
          .filter((route) => route.path.startsWith("/registration"))
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>

      {/* Auth pages: Now filters out registration so they don't double-match */}
      <Route element={<AuthLayout />}>
        {publicRoutes
          .filter((route) => !route.path.startsWith("/registration"))
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>

      {/* app pages */}
      <Route path="/" element={<AppLayout />}>
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
