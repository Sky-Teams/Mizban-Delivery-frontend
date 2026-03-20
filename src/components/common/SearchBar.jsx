import { Search, Target } from "lucide-react"; 

export default function SearchBar({ placeholder, onChange}) {
  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
      </div>
      
      <input
        type="search"
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full py-3 pl-10 pr-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl 
                   focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white 
                   transition-all duration-200 outline-none shadow-sm hover:shadow-md"
      />
    </div>
  );
}
