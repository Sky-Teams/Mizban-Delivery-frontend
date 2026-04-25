import { useTranslation } from "react-i18next";
import useOrderStore from "../../../store/admin/useOrderStore";
import { toLocaleDigits } from "../../../utils/numberConverter";
import i18next from "i18next";
import useOrderHistoryStore from "../../../store/orders/useOrderHistoryStore";
import { useEffect, useState } from "react";

export default function OrderStatusbar() {
  const { t } = useTranslation();
  const currentLang  = i18next.language

  const baseButton = "px-4 pb-2 transition-colors duration-200 hover:text-orange-500 cursor-pointer";
  const activeButton = "text-orange-500 border-b-2 border-orange-500 font-semibold";

  const orders = useOrderStore((state) => state.orders);
  const currentOrderStatus = useOrderHistoryStore((state) => state.currentOrderStatus);
  const currentPage = useOrderStore((state)=> state.currentPage)
  const currentLimit  = useOrderStore((state)=> state.currentLimit)
  const setCurrentOrderStatus = useOrderHistoryStore((state) => state.setCurrentOrderStatus);
  const filterOrderByStatus = useOrderHistoryStore((state)=> state.filterOrderByStatus)
  const totalOrders = useOrderStore((state)=> state.totalOrders)
  const totalPages = useOrderStore((state)=> state.totalPages)
    const completedOrders = useOrderHistoryStore((state)=> state.completedOrders)
    const returnedOrders =useOrderHistoryStore((state)=> state.returnedOrders)
    const expiredOrders   = useOrderHistoryStore((state)=> state.expiredOrders) 
    const cancelledOrders = useOrderHistoryStore((state)=> state.cancelledOrders)
    const rejectedOrders = useOrderHistoryStore((state)=> state.rejectedOrders) 

const handleStatusButtonsClick = async (status) => {
  setCurrentOrderStatus(status);
    useOrderStore.setState({ currentPage: 1 });
    await filterOrderByStatus(status, false);
};
  const matchId = (id) => {
    return `${baseButton} ${currentOrderStatus === id ? activeButton : ""}`;
  };

  return (
    <div className="p-4 w-full">
      <div className="flex text-[18px] md: justify-between items-center mb-[-2px] relative z-10">
        <button
          id="all"
          className={matchId("all")}
          onClick={() => handleStatusButtonsClick("all")}
        >
          {t("ALL")} ({toLocaleDigits(totalOrders, currentLang)})
        </button>

        <button
          id="completed"
          className={matchId("completed")}
          onClick={() => handleStatusButtonsClick("completed")}
        >
          {t("COMPLETED")} ({toLocaleDigits(completedOrders.length, currentLang)})
        </button>

        <button
          id="cancelled"
          className={matchId("cancelled")}
          onClick={() => handleStatusButtonsClick("cancelled")}
        >
          {t("CANCELLED")} ({toLocaleDigits(cancelledOrders.length, currentLang)})
        </button>

        <button
          id="rejected"
          className={matchId("rejected")}
          onClick={() => handleStatusButtonsClick("rejected")}
        >
          {t("REJECTED")} ({toLocaleDigits(rejectedOrders.length, currentLang)})
        </button>

        <button
          id="expired"
          className={matchId("expired")}
          onClick={() => handleStatusButtonsClick("expired")}
        >
          {t("EXPIRED")} ({toLocaleDigits(expiredOrders.length, currentLang)})
        </button>

        <button
          id="returned"
          className={matchId("returned")}
          onClick={() => handleStatusButtonsClick("returned")}
        >
          {t("RETURNED")} ({toLocaleDigits(returnedOrders.length, currentLang)})
        </button>
      </div>

      <div className="bg-gray-200 w-full h-[2px]"></div>
    </div>
  );
}