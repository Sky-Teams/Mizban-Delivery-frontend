import { LuChevronLeft, LuSlidersHorizontal } from "react-icons/lu";
import { Link } from "react-router-dom";
import OrderHistoryHeader from "../../components/common/order/OrderHistroyHeader";
import SearchBar from "../../components/common/SearchBar"
import OrderHistroyTable from "../../components/common/order/OrderHistoryTable";
export default function OrderHistory() {
    return (

        <div>
            <div className="flex gap-2 items-center">
                <button className="p-2 shadow-sm shadow-gray-300 rounded-[50%] text-orange-500">
                    <Link to="/orders"><LuChevronLeft size={25}></LuChevronLeft></Link>
                </button>
                <h2 className="font-bold text-lg">Order History</h2>
            </div>
            <div className="p-7 flex justify-between w-full">
                <OrderHistoryHeader />
                <div className="flex gap-2">
                    <SearchBar placeholder="Search..." />
                    <button className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-sm  transition-colors cursor-pointer">
                        <LuSlidersHorizontal size={18} />
                        <span className="font-medium text-sm">Filter</span>
                    </button>
                </div>
            </div>

            <OrderHistroyTable />
        </div>
    )
}