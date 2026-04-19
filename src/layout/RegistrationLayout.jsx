import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useState } from "react";
import i18next from "i18next";

export default function RegistrationLayout() {
  // Maintaining the same state pattern as AppLayout even if sidebar is absent
  // to prevent any potential header prop errors.
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = i18next.language === "fa" || i18next.language === "ps";

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 ${isRTL ? "rtl" : "ltr"}`}
    >
      {/* Header exactly like AppLayout to keep behavior consistent */}
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        {/* Sidebar removed as requested */}

        <main className="flex-1 p-6 min-h-screen overflow-x-hidden flex justify-center">
          <div className="w-full max-w-5xl">
            {/* This Outlet renders PersonalInfo, VehicleInfo, etc. */}
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="py-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Your Company Name
      </footer>
    </div>
  );
}
