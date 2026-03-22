import { MdDeliveryDining } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { AiFillBell } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import avatar from "../../assets/avatar.png"
export default function Header () {

  const activeStyle = ({isActive})=> 
    isActive ? "text-orange-600 font-bold border-b-2 border-orange-600 pb-1" : "hover:text-orange-600 transition-colors";

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-col md:flex-row md:w-auto gap-y-3">
          <div className="flex items-center justify-center gap-4 md:gap-2 sm:gap-1">
            {/* Mizban */}
            <div className="flex items-center gap-2 md:gap-1 mx-2 ">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold"><MdDeliveryDining size={20} /></div>
              <span className="text-xl font-bold text-gray-800 tracking-tight truncate">Mizban <span className="text-orange-600">Delivery</span></span>
            </div>

            {/* Search box */}
            <div className="bg-gray-100 rounded-md shadow-sm flex items-center justify-center ">
              <button
                className="hover:cursor-pointer"
              >
                <IoSearchSharp 
                  size={18}
                  className="text-gray-400 ml-1 "
                />
              </button>
              <input 
                className="bg-gray-100 rounded-md pr-4 pl-2.5 md:px-0 sm:px-0  placeholder:text-gray-400 placeholder:text-sm  py-1 text-gray-400 outline-none"
                placeholder="Search deliveries, drivers ..."
                type="text" 
              />
            </div>
          </div>
          
          <div className="flex items-center justify-center ">
            {/* notifs, and settings */}
            <div className="flex items-center justify-center gap-2 border-r border-gray-300 px-2">
              <div className="bg-gray-100 rounded-xl p-1.5 text-gray-500">
                <button className="hover:cursor-pointer flex justify-center">
                  <AiFillBell size={24} />
                </button>
              </div>

              <div className="bg-gray-100 rounded-xl p-1.5 text-gray-500">
                <button className="hover:cursor-pointer flex justify-center">
                  <IoMdSettings size={24} />
                </button>
              </div>
            </div>

            {/* admin part */}
            <div className="ml-4 flex gap-4 items-center justify-center px-4">
              <div className="text-right">
                <h3 className="text-gray-600 text-xs font-semibold ">Mizban Central</h3>
                <h6 className="text-gray-400 text-[10px]">Admin Account</h6>
              </div>
              <div>
                <div className="rounded-full">
                  <img src={avatar} className="w-10 h-10 bg-green-200 rounded-full p-1 border border-slate-200  "  alt="admin" />
                </div>
              </div>
            </div>
            
          </div>
          

          
          
        
          {/* <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
            <NavLink to="/" className={activeStyle}>Dashboard</NavLink>
            <NavLink to="/orders" className={activeStyle}>Orders</NavLink>
            <NavLink to="/settings"className={activeStyle}>Settings</NavLink>
          </nav> */}

          {/* <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-semibold transition-all">
            Login
          </button> */}
      </div>
    </header>
  );
};

