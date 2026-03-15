import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "en", label: "English" },
    { code: "fa", label: "فارسی" },
    { code: "ps", label: "پښتو" },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1"
      : "hover:text-orange-600 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">
            M
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            {t("Mizban")}{" "}
            <span className="text-orange-600">{t("Delivery")}</span>
          </span>

          {/* Improved Language Dropdown */}
          <div className="relative ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between min-w-[110px] bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            >
              <span>
                {languages.find((l) => l.code === i18n.language.split("-")[0])
                  ?.label || "Language"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                ></div>
                <div className="absolute left-0 mt-2 w-full min-w-30 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                        i18n.language.split("-")[0] === lang.code
                          ? "bg-orange-50 text-orange-600 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <NavLink to="/" className={activeStyle}>
            {t("Dashboard")}
          </NavLink>
          <NavLink to="orders" className={activeStyle}>
            {t("Orders")}
          </NavLink>
          <NavLink to="/settings" className={activeStyle}>
            {t("Settings")}
          </NavLink>
        </nav>

        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold transition-all">
          {t("Login")}
        </button>
      </div>
    </header>
  );
};

export default Header;
