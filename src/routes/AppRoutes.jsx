import { Routes, Route } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import RegistrationLayout from "../layout/RegistrationLayout";
import { RegistrationProvider } from "../context/RegistrationContext";

function AppRoutes() {
  return (
    // Wrap everything or just the Registration routes here
    <Routes>
      {/* Registration Flow */}
      <Route
        element={
          <RegistrationProvider>
            <RegistrationLayout />
          </RegistrationProvider>
        }
      >
        {publicRoutes
          .filter((route) => route.path.startsWith("/registration"))
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>

      {/* Auth pages */}
      <Route element={<AuthLayout />}>
        {publicRoutes
          .filter((route) => !route.path.startsWith("/registration"))
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>

      {/* App pages */}
      <Route path="/" element={<AppLayout />}>
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
