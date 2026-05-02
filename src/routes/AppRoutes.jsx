import { Routes, Route } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import RegistrationLayout from "../layout/RegistrationLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<RegistrationLayout />}>
        {publicRoutes
          .filter((route) => route.path.startsWith("/registration"))
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>

      <Route element={<AuthLayout />}>
        {publicRoutes
          .filter((route) => !route.path.startsWith("/registration"))
          .map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
      </Route>

      <Route path="/" element={<AppLayout />}>
        {protectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
