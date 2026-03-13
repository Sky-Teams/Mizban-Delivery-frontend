import { X } from "lucide-react";
import { useState, useRef } from "react";
import { useClickOutside } from "../../../hooks/useOutsideClick";

export default function SearchableDropdown({ onSelect, placeholder = "Search..." }) {
  const items = [
    { id: 1, name: "Ali", value: "ali" },
    { id: 2, name: "Ahmad", value: "ahmad" },
    { id: 3, name: "Hamed", value: "hamed" },
    { id: 4, name: "Hassan", value: "hassan" },
    { id: 5, name: "Hussain", value: "hussain" },
  ];
  const dropdownRef = useRef(null)

  const [isDropdownOpen, setDrowdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState(items);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredList(filtered);
  };
  useClickOutside(dropdownRef, ()=> setDrowdownOpen(false))
  const handleSelect = (item) => {
    setSearchTerm(item.name); 
    setDrowdownOpen(false);
    onSelect(item.value)
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredList(items);
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
            placeholder={placeholder}
          />
          {searchTerm && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors cursor-pointer"
              onClick={handleClear}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {isDropdownOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-y-auto max-h-60 py-1" >
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-orange-600 cursor-pointer flex items-center transition-colors group/item"
                  onClick={() => handleSelect(item)}
                >
                  <div className="w-6 h-6 rounded-full bg-orange-100 mr-3 flex items-center justify-center text-[10px] font-bold uppercase text-orange-700 group-hover/item:bg-orange-200">
                    {item.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-700 group-hover/item:text-orange-600">
                    {item.name}
                  </span>
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
