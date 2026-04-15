import { useTranslation } from "react-i18next";
import useOrderStore from "../../../store/useOrderStore";
import { toLocaleDigits } from "../../../utils/numberConverter";
import i18next from "i18next";

export default function OrderStatusbar() {
  const { t } = useTranslation();
  const currentLang  = i18next.language

  const baseButton = "px-4 pb-2 transition-colors duration-200 hover:text-orange-500 cursor-pointer";
  const activeButton = "text-orange-500 border-b-2 border-orange-500 font-semibold";

  const orders = useOrderStore((state) => state.orders);
  const completedOrders = orders.filter((order) => order.status === "completed");
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");
  const rejectedOrders = orders.filter((order) => order.status === "rejected");
  const expiredOrders = orders.filter((order) => order.status === "expired");
  const returnedOrders = orders.filter((order) => order.status === "returned");

  const currentOrderStatus = useOrderStore((state) => state.currentOrderStatus);
  const setCurrentOrderStatus = useOrderStore((state) => state.setCurrentOrderStatus);

  const handleStatusButtonsClick = (status) => {
    setCurrentOrderStatus(status);
  };

  const matchId = (id) => {
    return `${baseButton} ${currentOrderStatus === id ? activeButton : ""}`;
  };

  return (
    <div className="p-4 w-full">
      <div className="flex text-[18px] justify-between items-center mb-[-2px] relative z-10">
        <button
          id="all"
          className={matchId("all")}
          onClick={() => handleStatusButtonsClick("all")}
        >
          {t("all")} ({toLocaleDigits(orders.length, currentLang)})
        </button>

        <button
          id="completed"
          className={matchId("completed")}
          onClick={() => handleStatusButtonsClick("completed")}
        >
          {t("completed")} ({toLocaleDigits(completedOrders.length, currentLang)})
        </button>

        <button
          id="cancelled"
          className={matchId("cancelled")}
          onClick={() => handleStatusButtonsClick("cancelled")}
        >
          {t("cancelled")} ({toLocaleDigits(cancelledOrders.length, currentLang)})
        </button>

        <button
          id="rejected"
          className={matchId("rejected")}
          onClick={() => handleStatusButtonsClick("rejected")}
        >
          {t("rejected")} ({toLocaleDigits(rejectedOrders.length, currentLang)})
        </button>

        <button
          id="expired"
          className={matchId("expired")}
          onClick={() => handleStatusButtonsClick("expired")}
        >
          {t("expired")} ({toLocaleDigits(expiredOrders.length, currentLang)})
        </button>

        <button
          id="returned"
          className={matchId("returned")}
          onClick={() => handleStatusButtonsClick("returned")}
        >
          {t("returned")} ({toLocaleDigits(returnedOrders.length, currentLang)})
        </button>
      </div>

      <div className="bg-gray-200 w-full h-[2px]"></div>
    </div>
  );
}