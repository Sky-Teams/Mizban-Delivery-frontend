import { LuChevronLeft, LuSlidersHorizontal } from "react-icons/lu";
import { Link } from "react-router-dom";
import OrderHistoryHeader from "../../components/common/order/OrderHistroyHeader";
import SearchBar from "../../components/common/SearchBar"
import OrderHistroyTable from "../../components/common/order/OrderHistoryTable";
import { useEffect, useState } from "react";
import FilterCard from "../../components/common/order/FilterCard";
import OrderStatusbar from "../../components/common/order/OrderStatusbar";
import useOrderStore from "../../store/useOrderStore";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function OrderHistory() {
  const [isFiltereCardOpen,setFilterCardOpen] = useState(false)
  const orders = useOrderStore((state)=> state.orders)
  const currentOrderStatus = useOrderStore((state)=> state.currentOrderStatus)
  const completedOrders = orders.filter((order) => order.status === "completed");
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");
  const rejectedOrders = orders.filter((order) => order.status === "rejected");
  const expiredOrders = orders.filter((order) => order.status === "expired");
  const returnedOrders = orders.filter((order) => order.status === "returned");
  
  const orderStatus = {
   all: orders,
  completed: completedOrders,
  cancelled: cancelledOrders,
  rejected: rejectedOrders,
  expired: expiredOrders,
  returned: returnedOrders,
  }
  const isRTL = i18next.dir() === "rtl"
  const {t} = useTranslation()
    return (

        <div>
            <div className="flex gap-2 items-center">
                <button className="p-2 shadow-sm shadow-gray-300 rounded-[50%] text-orange-500">
                    <Link to="/orders"><LuChevronLeft size={25} className={isRTL ? "rotate-[180deg]": ""}></LuChevronLeft></Link>
                </button>
                <h2 className="font-bold text-lg">{t("OrderHistory")}</h2>
            </div>
            <div className="p-7 flex justify-between w-full">
                <OrderHistoryHeader />
                <div className="flex gap-2">
                    <SearchBar placeholder={t("Search...")} />
                    <button className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-sm  transition-colors cursor-pointer"
                    onClick={()=> setFilterCardOpen(true)}
                    >
                        <LuSlidersHorizontal size={18} />
                        <span className="font-medium text-sm">{t("Filter")}</span>
                    </button>
                </div>
            </div>
         <div>
            <OrderStatusbar />
         </div>
            {isFiltereCardOpen && (
                <FilterCard  onClose={()=> setFilterCardOpen(false)}/>
            )}
            <OrderHistroyTable displayData={orderStatus[currentOrderStatus]}/>
        </div>
    )
}