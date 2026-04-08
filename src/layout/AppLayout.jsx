import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import { useState } from "react";
import i18next from "i18next";

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const isRTL = i18next.language === "fa" || i18next.language === "ps"
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className={`flex-1 p-6 min-h-screen overflow-x-hidden transition-all duration-300
          ${isRTL
            ? isOpen ? "md:mr-64" : "md:mr-20"
            : isOpen ? "md:ml-64" : "md:ml-20"
          }`}
        >
          <Outlet />
        </main>
      </div>

    </div>
  );
}