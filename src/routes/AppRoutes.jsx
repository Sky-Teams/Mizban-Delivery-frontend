import { Routes, Route } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import protectedRoutes from "./protectedRoutes";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* auth pages */}
      <Route element={<AuthLayout />}>
        {publicRoutes.map((route, index) => (
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