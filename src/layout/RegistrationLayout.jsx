import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import { useState } from "react";
import { useTranslation } from "react-i18next"; // 1. Import the hook

export default function RegistrationLayout() {
  // 2. Use the hook to subscribe to language changes
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // 3. This will now re-calculate and trigger a re-render automatically
  const isRTL = i18n.language === "fa" || i18n.language === "ps";

  return (
    <div
      className={`min-h-screen flex flex-col bg-gray-100 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <Header onMenuClick={() => setIsOpen(!isOpen)} />

      <div className="flex flex-1">
        <main className="flex-1 p-6 min-h-screen overflow-x-hidden flex justify-center">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
