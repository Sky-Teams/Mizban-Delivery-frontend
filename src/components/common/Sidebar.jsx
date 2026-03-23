import { FaBox } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { GrAnalytics } from "react-icons/gr";
import { GiKnifeFork } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";



export default function Sidebar() {
  const activeStyle = ({ isActive }) =>
    isActive ? "bg-orange-600 text-white rounded-lg shadow-orange-100" : "text-gray-700 hover:bg-gray-200 hover:rounded-lg";

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col p-4">

      <nav className="flex flex-col gap-2">
        <NavLink to="/" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <MdDashboard size={20}/> Dashboard
          </div>
        </NavLink>

        <NavLink to="/orders" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <FaBox size={18} /> Orders
          </div>
        </NavLink>

        <NavLink to="*" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <FaTruckMoving size={20}/> Deliveries
          </div>
        </NavLink>

        <NavLink to="*" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <IoPeopleSharp size={20}/> Drivers
          </div>
        </NavLink>

        <NavLink to="*" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <GrAnalytics size={20}/> Analytics
          </div>
        </NavLink>

        <NavLink to="*" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <GiKnifeFork size={20}/> Menu Manager
          </div>
        </NavLink>

        <NavLink to="/settings" className={activeStyle}>
          <div className="flex items-center gap-3 p-2 rounded-md">
            <IoMdSettings size={20}/> Settings
          </div>
        </NavLink>

      </nav>
    </aside>
  );
}