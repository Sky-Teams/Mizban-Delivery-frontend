import { useState, useRef, useTransition } from "react";
import { useClickOutside } from "../../hooks/useOutsideClick";
import { LuX } from "react-icons/lu";
import { useTranslation } from "react-i18next";
export default function SearchableDropdown({ onSelect, drivers, placeholder, getDriverDetails }) {
   const {t} = useTranslation()
  const dropdownRef = useRef(null)

  const [isDropdownOpen, setDrowdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState(drivers);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = drivers.filter((driver) =>
      driver.user.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };
  useClickOutside(dropdownRef, ()=> setDrowdownOpen(false))
  const handleSelect = (driver) => {
    setSearchTerm(driver.user.name); 
    setDrowdownOpen(false);
    onSelect(driver.user.name)
    getDriverDetails(driver)
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredList(drivers);
    setDrowdownOpen(false);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setDrowdownOpen(true)}
            className="w-full h-11 pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl shadow-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm"
            placeholder={placeholder || t("Search...")}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors cursor-pointer"
              onClick={handleClear}
            >
              <LuX size={18} />
            </button>
          )}
        </div>

        {isDropdownOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-y-auto max-h-60 py-1" >
            {filteredList.length > 0 ? (
              filteredList.map((driver) => (
                <li
                  key={driver._id}
                  className="px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-600 flex cursor-pointer transition-colors group/driver"
                  onClick={() => handleSelect(driver)}
                >
                  <div className="flex justify-between flex-1 drivers-center">
                    <div className="flex drivers-center">
                      <div className="w-6 h-6 rounded-full bg-orange-100 me-3 flex drivers-center justify-center text-[10px] font-bold uppercase text-orange-700 group-hover/driver:bg-orange-200">
                        {driver.user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-700 group-hover/driver:text-orange-600">
                        {driver.user.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 group-hover/driver:text-orange-400">{driver.status}</span>
                  </div>
                </li>
      
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
