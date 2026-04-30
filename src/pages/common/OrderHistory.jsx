import { LuChevronLeft, LuSlidersHorizontal } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import OrderHistoryHeader from '../../components/common/order/OrderHistroyHeader';
import SearchBar from '../../components/common/SearchBar';
import OrderHistroyTable from '../../components/common/order/OrderHistoryTable';
import { useEffect, useState } from 'react';
import FilterCard from '../../components/common/order/FilterCard';
import OrderStatusbar from '../../components/common/order/OrderStatusbar';
import useOrderStore from '../../store/admin/useOrderStore';
import { useTranslation } from 'react-i18next';
import Pagination from '../../components/common/Pagination';
import useOrderHistoryStore from '../../store/orders/useOrderHistoryStore';
import { isRTL } from '../../utils/IsRTLDirection';
export default function OrderHistory() {
  const [isFilterCardOpen, setFilterCardOpen] = useState(false);

  const orders = useOrderStore((state) => state.orders);
  const currentOrderStatus = useOrderHistoryStore((state) => state.currentOrderStatus);
  const currentPage = useOrderStore((state) => state.currentPage);
  const totalPages = useOrderHistoryStore(
    (state) => state.totalPagesByStatus[state.currentOrderStatus],
  );
  const currentLimit = useOrderStore((state) => state.currentLimit);
  const updateCurrentLimit = useOrderStore((state) => state.updateCurrentLimit);
  const handlePageNumberClick = useOrderStore((state) => state.handlePageNumberClick);
  const handlePrevButton = useOrderStore((state) => state.handlePrevButton);
  const handleNextButton = useOrderStore((state) => state.handleNextButton);
  const completedOrders = useOrderHistoryStore((state) => state.completedOrders);
  const returnedOrders = useOrderHistoryStore((state) => state.returnedOrders);
  const expiredOrders = useOrderHistoryStore((state) => state.expiredOrders);
  const cancelledOrders = useOrderHistoryStore((state) => state.cancelledOrders);
  const rejectedOrders = useOrderHistoryStore((state) => state.rejectedOrders);
  const fetchAllStats = useOrderHistoryStore((state) => state.fetchAllStats);
  const fetching = useOrderHistoryStore((state) => state.fetching);
  const filterOrderByStatus = useOrderHistoryStore((state) => state.filterOrderByStatus);

  const orderStatus = {
    all: orders,
    completed: completedOrders,
    cancelled: cancelledOrders,
    rejected: rejectedOrders,
    expired: expiredOrders,
    returned: returnedOrders,
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await filterOrderByStatus('all', true);
      fetchAllStats();
    };
    loadInitialData();
  }, [currentLimit, currentPage, filterOrderByStatus]);
  const { t } = useTranslation();

  return (
    <div>
      <div className="flex gap-2 items-center">
        <button className="p-2 shadow-sm shadow-gray-300 rounded-[50%] text-orange-500">
          <Link to="/orders">
            <LuChevronLeft size={25} className={isRTL() ? 'rotate-[180deg]' : ''}></LuChevronLeft>
          </Link>
        </button>
        <h2 className="font-bold text-lg">{t('ORDER_HISTORY')}</h2>
      </div>
      <div className="border mt-3 border-gray-300 rounded-md">
        <div className="p-2 pt-7 flex md:flex-row flex-col gap-4 justify-between lg:p-7 w-full">
          <OrderHistoryHeader />
          <div className="flex gap-2">
            <div className="">
              <SearchBar
                placeholder={t('SEARCH')}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              className="flex items-center gap-2 border border-gray-300 px-3 py-1 rounded-sm  transition-colors cursor-pointer"
              onClick={() => setFilterCardOpen(true)}
            >
              <LuSlidersHorizontal size={18} />
              <span className="font-medium text-sm">{t('FILTER')}</span>
            </button>
          </div>
        </div>
        <div>
          <OrderStatusbar />
        </div>
        {isFilterCardOpen && <FilterCard onClose={() => setFilterCardOpen(false)} />}
        <OrderHistroyTable displayData={orderStatus[currentOrderStatus]} />
        <div className="w-full flex items-center justify-center pt-5">
          <Pagination
            config={{
              currentPage,
              totalPages,
              handleNextButton,
              isLoading: fetching,
              handlePrevButton,
              handlePageNumberClick,
              updateCurrentLimit,
              dropup: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
