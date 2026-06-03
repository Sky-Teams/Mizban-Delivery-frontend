import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useOrderPaginationStore = create(
  subscribeWithSelector((set, get) => ({
    currentPage: 1,
    totalPages: 0,
    totalOrders: 0,
    currentLimit: 20,

    setCurrentPage: (page) => {
      set({
        currentPage: page,
      });
    },

    setTotalPages: (pages) => {
      set({
        totalPages: pages,
      });
    },

    setTotalOrders: (total) => {
      set({
        totalOrders: total,
      });
    },

    updateCurrentLimit: (limit) => {
      set({
        currentLimit: limit,
        currentPage: 1,
      });
    },

    handleNextButton: () => {
      const { currentPage, totalPages } = get();

      if (currentPage >= totalPages) return;

      set({
        currentPage: currentPage + 1,
      });
    },

    handlePrevButton: () => {
      const { currentPage } = get();

      if (currentPage <= 1) return;

      set({
        currentPage: currentPage - 1,
      });
    },

    handlePageNumberClick: (page) => {
      set({
        currentPage: page,
      });
    },

    resetPagination: () => {
      set({
        currentPage: 1,
        totalPages: 0,
        totalOrders: 0,
        currentLimit: 20,
      });
    },
  })),
);

export default useOrderPaginationStore;
