import { Outlet } from "react-router-dom";

export default function AuthLayout () {
  return (
      <main className="flex flex-1 w-full flex-col md:flex-row">
        <div className="flex-1 max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>
  );
}