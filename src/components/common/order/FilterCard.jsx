import { LuClock, LuWallet } from "react-icons/lu";
import { useClickOutside } from "../../../hooks/useOutsideClick";
import { useRef } from "react";
import useOrderHistoryStore from "../../../store/orders/useOrderHistoryStore";
import { useTranslation } from "react-i18next";

export default function FilterCard({ onClose }) {
  const { t } = useTranslation();
  const cardRef = useRef();
  useClickOutside(cardRef, onClose);
  
  const filters = useOrderHistoryStore((state) => state.filters);
  const setFilters = useOrderHistoryStore((state) => state.setFilters);

  const handleQuickFilter = (type) => {
    let start = "";
    const end = new Date().toISOString().split("T")[0]; 
    const d = new Date();

    if (type === "today") {
      start = end;
    } else if (type === "week") {
      d.setDate(d.getDate() - 7);
      start = d.toISOString().split("T")[0];
    } else if (type === "month") {
      d.setMonth(d.getMonth() - 1);
      start = d.toISOString().split("T")[0];
    }
    setFilters({ startDate: start, endDate: end, quickFilter: type });
  };

  const radioClass = "w-4 h-4 text-blue-600 mr-3 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2";
  const labelClass = "text-sm font-medium text-gray-700 mr-2 cursor-pointer";
  return (
    <div className="relative">
      <div ref={cardRef} className="absolute top-[-80px] end-0 w-80 p-6 bg-white rounded-sm shadow-xl border border-gray-100 z-50">
        <h2 className="text-md font-bold text-gray-900 flex items-center gap-2 mb-4">
          <LuClock className="w-5 h-5" /> {t("FILTER_BASED_ON_TIME")}
        </h2>

        <span className="block text-sm font-semibold text-gray-800 mb-3">{t("QUICK_FILTER")}</span>
        <div className="flex items-center mb-6">
          {["today", "week", "month"].map((timeRange) => ( 
           <div key={timeRange} className="flex items-center">
              <input
                type="radio"
                name="time"
                id={timeRange}
                checked={filters.quickFilter === timeRange}
                onChange={() => handleQuickFilter(timeRange)}
                className={radioClass}
              />
              <label htmlFor={timeRange} className={labelClass}>
                {t(timeRange.toUpperCase())}
              </label>
            </div>
          ))}
        </div>

        <span className="block text-sm font-semibold text-gray-800 mb-3">{t("SPECIFIC_DATE")}</span>
        <div className="flex gap-3">
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ startDate: e.target.value, quickFilter: "" })}
            className="w-full px-1 py-2 text-sm border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ endDate: e.target.value, quickFilter: "" })}
            className="w-full px-1 py-2 text-sm border border-gray-300 rounded-md"
          />
        </div>

        <hr className="my-6 border-gray-100" />

        <h2 className="text-md font-bold text-gray-900 flex items-center gap-2 mb-4">
          <LuWallet className="w-5 h-5" /> {t("FILTER_BASED_ON_PAYMENT")}
        </h2>
        <div className="flex items-center">
          {["paid", "unpaid"].map((paymentStatus) => (
            <div key={paymentStatus} className="flex items-center">
              <input
                type="radio"
                name="payment"
                id={paymentStatus}
                checked={filters.paymentStatus === paymentStatus}
                onChange={() => setFilters({ paymentStatus: paymentStatus })}
                className={radioClass}
              />
              <label htmlFor={paymentStatus} className={labelClass}>
                {t(paymentStatus.toUpperCase())}
              </label>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => setFilters({ startDate: "", endDate: "", paymentStatus: "", quickFilter: "" })}
          className="mt-4 text-[12px] rounded-lg w-full cursor-pointer font-bold bg-orange-500 text-white p-2"
        >
          {t("CLEAR_FILTERS")}
        </button>
      </div>
    </div>
  );
}