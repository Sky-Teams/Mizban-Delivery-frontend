import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex flex-1 w-full flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 max-w-7xl mx-auto p-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
}