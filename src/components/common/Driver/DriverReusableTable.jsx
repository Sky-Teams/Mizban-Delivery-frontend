import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuSlidersHorizontal } from 'react-icons/lu';
import DriverOrderStatusbar from './DriverOrderStatusBar';

import SearchBar from '../SearchBar';
import OrderHistoryHeader from '../order/OrderHistroyHeader';
import FilterCard from '../order/FilterCard';
import OrderStatusbar from '../order/OrderStatusbar';
import OrderHistroyTable from '../order/OrderHistoryTable';
import Pagination from '../Pagination';

export default function DriverReusableTable({ orders = [], currentStatus, setCurrentStatus }) {
  const { t } = useTranslation();

  const [isFilterCardOpen, setFilterCardOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = orders.filter((order) => {
    if (!searchTerm) return true;

    return order._id?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="border border-gray-300 rounded-md">
      <div className="p-2 pt-7 flex md:flex-row flex-col gap-4 justify-between lg:p-7">
        <OrderHistoryHeader />

        <div className="flex gap-2">
          <SearchBar placeholder={t('SEARCH')} onChange={(e) => setSearchTerm(e.target.value)} />

          <button
            onClick={() => setFilterCardOpen(true)}
            className="
              flex items-center gap-2
              border border-gray-300
              px-3 py-1
              rounded-sm
            "
          >
            <LuSlidersHorizontal size={18} />

            <span className="font-medium text-sm">{t('FILTER')}</span>
          </button>
        </div>
      </div>

      <DriverOrderStatusbar
        orders={orders}
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />

      {isFilterCardOpen && <FilterCard onClose={() => setFilterCardOpen(false)} />}

      <OrderHistroyTable displayData={filteredOrders} />

      <div className="flex justify-center py-5">
        <Pagination
          config={{
            currentPage,
            totalPages: 1,
            handleNextButton: () => {},
            handlePrevButton: () => {},
            handlePageNumberClick: (page) => setCurrentPage(page),
            updateCurrentLimit: () => {},
            isLoading: false,
            dropup: true,
          }}
        />
      </div>
    </div>
  );
}
