import { IoSearchSharp } from "react-icons/io5";
import avatar from "../../assets/avatar.png"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiBellRingingThin } from "react-icons/pi";
import { PiChatTeardropDotsThin } from "react-icons/pi";
import { PiLineVerticalThin } from "react-icons/pi";
import logo from "../../assets/png/logo.png"
import { VscMenu } from "react-icons/vsc";

export default function Header({ onMenuClick }) {
  const { t, i18n } = useTranslation()
  const [langOpen, setLangOpen] = useState(false)

   const languages = [
    { code: "en", label: "English" },
    { code: "fa", label: "فارسی" },
    { code: "ps", label: "پښتو" },
  ];

  const handleLanguageChange = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center md:w-auto ">
        <div className="flex items-center justify-center gap-4 md:gap-2 sm:gap-1">
          {/* hamburger menu */}
          <button
            onClick={onMenuClick}
            className="p-2 rounded hover:bg-gray-100 mx-2 text-md"
          >
            <VscMenu size={22} />
          </button>

          {/* Mizban */}
          <div className="flex items-center gap-2 px-2 sm:px-4">
  
            {/* Logo */}
            <img
              src={logo}
              alt="logo"
              className="h-8 sm:h-10 md:h-10 lg:h-10 xl:h-10 w-auto object-contain"
            />

            {/* description */}
            <div className="hidden lg:flex  flex-col leading-tight">
              <h3 className="text-xs md:text-sm text-slate-600 font-semibold">
                {t("Your Dashboard")}
              </h3>
              <p className="text-[9px] md:text-xs text-slate-500">
                {t("All of your activity analytics will be here!")}
              </p>
            </div>

          </div>          
        </div>

        <div className="flex items-center justify-center gap-0 mx-2">

          {/* Language Dropdown */}
          <div className="relative mx-2">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center justify-between min-w-1/2 border 
                border-slate-400 rounded-sm px-2 py-1.5 text-sm font-medium text-slate-400 
                hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition
              "
            >
              <span>
                {languages.find((l) => l.code === i18n.language.split("-")[0])
                  ?.label || "Language"}
              </span>
              <svg
                className={`w-4 h-4 ml-2 text-gray-500 transition-transform ${langOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)}></div>
                <div className="absolute left-0 mt-2 w-full min-w-30 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full text-left px-4 py-1.5 text-sm transition-colors ${
                        i18n.language.split("-")[0] === lang.code
                          ? "bg-orange-50 text-orange-400 font-semibold"
                          : "text-slate-400 hover:bg-gray-100"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Search box */}
          <div className="px-2 rounded-sm flex items-center gap-2 w-32 sm:w-48 md:w-52 lg:w-62 transition-all duration-300 border border-slate-400">
          
            <input
              className="w-full outline-none placeholder:text-slate-400 placeholder:text-sm py-1 text-gray-500"
              placeholder={t("Search deliveries, drivers ...")}
              type="text"
            />
            <button className="hover:cursor-pointer">
              <IoSearchSharp size={18} className="text-slate-500" />
            </button>
          </div>

          {/* notifs, and settings */}
          <div className="hidden sm:flex items-center justify-center gap-0">
            <div className="flex items-center justify-center gap-1 px-2 ">
              <div className="rounded-sm p-1.5 text-slate-500">
                <button className="hover:cursor-pointer flex justify-center border rounded-sm p-1 border-slate-300">
                  <PiBellRingingThin size={24} />
                </button>
              </div>

              <div className=" rounded-sm p-1.5 text-slate-500 flex justify-center items-center gap-4">
                <button className="hover:cursor-pointer flex justify-center border p-1 rounded-sm border-slate-300">
                  <PiChatTeardropDotsThin size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* admin part */}
          <div className="hidden lg:flex xl:flex gap-2 items-center justify-center mx-2">
            <div className="flex items-center justify-center gap-0">
              <PiLineVerticalThin size={40} className="text-slate-400" />
              <div className="rounded-full">
                <img src={avatar} className="w-10 h-10 bg-green-200 rounded-full p-1 border border-slate-200" alt="admin" />
              </div>
            </div>
            <div className="">
              <h3 className="text-gray-600 text-xs font-semibold ">{t("Mizban Central")}</h3>
              <h6 className="text-gray-400 text-[10px]">{t("phoneNum")}</h6>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}