import { LuClock, LuWallet } from "react-icons/lu";
import { useClickOutside } from "../../../hooks/useOutsideClick";
import { useRef } from "react";

export default function FilterCard({ onClose }) {
  const cardRef = useRef();
  useClickOutside(cardRef, onClose);

  const radioClass = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2";
  const labelClass = "ms-2 text-sm font-medium text-gray-700 mr-4";
  const sectionTitle = "text-md font-bold text-gray-900 flex items-center gap-2 mb-4";
  const subHeading = "block text-sm font-semibold text-gray-800 mb-3";

  return (
    <div className="relative">
      <div 
        ref={cardRef} 
        className="absolute top-0 right-0  w-80 p-6 bg-white rounded-sm shadow-xl border border-gray-100 z-50"
      >
          <h2 className={sectionTitle}>
            <LuClock className="w-5 h-5" /> Filter based on time
          </h2>
          
          <span className={subHeading}>Quick filter</span>
          <div className="flex items-center mb-6">
            <div className="flex items-center">
              <input type="radio" name="time" id="today" className={radioClass} />
              <label htmlFor="today" className={labelClass}>Today</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="time" id="week" className={radioClass} />
              <label htmlFor="week" className={labelClass}>This Week</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="time" id="month" className={radioClass} />
              <label htmlFor="month" className={labelClass}>This Month</label>
            </div>
          </div>

          <span className={subHeading}>Specific date</span>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="From" 
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>
            <div className="relative flex-1">
              <input 
                type="text" 
                placeholder="To" 
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>
          </div>
        <hr className="my-6 border-gray-100" />

         <h2 className={sectionTitle}>
            <LuWallet className="w-5 h-5" /> Filter based on payment
          </h2>
          <div className="flex items-center">
            <div className="flex items-center">
              <input type="radio" name="payment" id="paid" className={radioClass} />
              <label htmlFor="paid" className={labelClass}>Paid</label>
            </div>
            <div className="flex items-center">
              <input type="radio" name="payment" id="unpaid" className={radioClass} />
              <label htmlFor="unpaid" className={labelClass}>Unpaid</label>
            </div>
          </div>
   
      </div>
    </div>
  );
}