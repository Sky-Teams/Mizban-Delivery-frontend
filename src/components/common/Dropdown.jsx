import { useState, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useClickOutside } from "../../hooks/useOutsideClick";

const Dropdown = ({ options, onSelect,value, placeholder}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, ()=> setIsOpen(false))
  const handleSelect = (option) => {
    onSelect(option.value);
    setIsOpen(false);
  };
  return (
    <div className="relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200
          ${isOpen 
            ? "border-orange-500 ring-4 ring-orange-500/10 bg-white" 
            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 shadow-sm"}
        `}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`
                flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors
                ${value.id === option.id 
                  ? "bg-orange-50 text-orange-600 font-semibold" 
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {option.name}
              {value.id === option.id && <Check className="h-4 w-4" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
