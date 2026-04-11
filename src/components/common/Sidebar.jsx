import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RxPeople } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { GiKnifeFork } from "react-icons/gi";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { BsQuestionCircle } from "react-icons/bs";
import { RiLogoutCircleLine } from "react-icons/ri"; // logout en
import { RiLogoutCircleRLine } from "react-icons/ri"; // logout fa
import useAuthStore from "../../store/useAuthStore";
import courier from "../../assets/png/courier 1.png"
import { useEffect } from "react";

export default function Sidebar({isOpen, setIsOpen}) {

  const isRTL = i18next.language === "fa" || i18next.language === "ps"
  const {t} = useTranslation()

  const navItems = [
    { key: "dashboard", path: "/", icon: <RxDashboard size={20} />, label: t("Dashboard") },
    { key: "orders", path: "/orders", icon: <MdOutlineDeliveryDining size={18} />, label: t("Orders") },
    { key: "couriers", path: "/drivers", icon: <RxPeople size={20} />, label: t("Couriers") },
    { key: "analytics", path: "/analytics", icon: <GrAnalytics size={20} />, label: t("Analytics") },
    { key: "menu-manager", path: "/menu-manager", icon: <GiKnifeFork size={20} />, label: t("Menu Manager") },
    { key: "settings", path: "/settings", icon: <IoSettingsOutline size={20} />, label: t("Settings")},
  ];

  const activeStyle = ({ isActive }) =>
    isActive
      ? "text-[#ff4b1e]"
      : "text-gray-700 hover:bg-gray-200 hover:rounded-lg";


  const { user } = useAuthStore();


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) { // for mobile
        setIsOpen(false)
      } else { // for desktop
        setIsOpen(true)
      }
    };

    handleResize()
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* desktop lg */}
      <aside
        className={`
          hidden md:flex flex-col px-4 py-4 overflow-x-hidden
          fixed top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200
          transition-all duration-300
          ${isOpen ? "w-64" : "w-20"}
          ${isRTL ? "right-0" : "left-0"}
        `}
      >
        <nav className="flex flex-col gap-2 overflow-y-auto flex-1 transition-all duration-200 ease-in-out">
          {navItems.map((item) => (
            <NavLink key={item.key} to={item.path} className={activeStyle}>
              <div className="flex items-center gap-3 p-2 rounded-md">
                {item.icon}
                <span className={`whitespace-nowrap transition-all duration-200 ${isOpen ? "opacity-100 ml-1" : "opacity-0 w-0 overflow-hidden"}`}>
                  {item.label}
                </span>
              </div>
            </NavLink>
          ))}
          <div className={`mt-auto flex-col gap-4 w-full px-2 ${isOpen ? "flex" : "hidden"}`}>
            <NavLink
              className="text-gray-800 py-2 text-sm font-semibold transition-all w-full"
            >
              <span className="flex items-center gap-3 justify-start w-full">
                <BsQuestionCircle size={20} />
                {t("Help and Support")}
              </span>
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-800 py-2 text-sm font-semibold transition-all w-full"
            >
              <span className="flex items-center gap-3 justify-start w-full">
                {isRTL ? <RiLogoutCircleRLine size={20} /> :  <RiLogoutCircleLine size={20} />}
                {user ? t("Logout") : t("Login")}
              </span>
            </NavLink>
            <div className="mt-auto flex flex-col gap-4 w-full px-2">
              <img src={courier} alt="courier-image" 
                  className={`object-contain ${isOpen ? "w-42 h-42" : "hidden"}
                    max-w-full
                  `}
              />
              {/* <img
                src={courier}
                alt="courier-image"
                className={`
                  object-contain mx-auto transition-all duration-300
                  ${isOpen ? "w-32 h-32" : "w-10 h-10"}
                `}
              /> */}
            </div>
          </div>
        </nav>
      </aside>

      {/* mobile sm, md */}      
      <aside
        className={`
          md:hidden fixed top-0 left-0 z-40
          w-64 h-screen bg-white border-r border-gray-200 p-4
          transform transition-transform duration-300 
          ${isOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"}
          ${isRTL ? "right-0" : "left-0"}
        `}
      >
        <nav className="flex flex-col gap-2 mt-16 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              className={activeStyle}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3 p-2 rounded-md">
                {item.icon} {item.label}
              </div>
            </NavLink>
          ))}
          <div className="absolute bottom-4 items-baseline flex flex-col gap-4 w-full px-2">
            <NavLink
              className="text-gray-800 py-2 text-sm font-semibold transition-all w-full"
            >
              <span className="flex items-center gap-3 justify-start w-full">
                <BsQuestionCircle size={20} />
                {t("Help and Support")}
              </span>
            </NavLink>
            <NavLink
              to="/login"
              className="text-gray-800 py-2 text-sm font-semibold transition-all w-full"
            >
              <span className="flex items-center gap-3 justify-start w-full">
                {isRTL ? <RiLogoutCircleRLine size={20} /> :  <RiLogoutCircleLine size={20} />}
                {user ? t("Logout") : t("Login")}
              </span>
            </NavLink>
            <div className="px-2">
              <img src={courier} alt="courier-image" 
                    className={`w-full object-contain h-40 
                      ${isRTL ? "pl-8" : "pr-8"}
                    `}
              />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}