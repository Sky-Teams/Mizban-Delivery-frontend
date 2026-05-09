import { create } from 'zustand';
import { getAllOrders } from '../../services/orderService';
import useOrderStore from '../admin/useOrderStore';
import { getServerMessage } from '../../utils/i18nHelper';

const useOrderHistoryStore = create((set, get) => ({
  currentOrderStatus: 'all',

  setCurrentOrderStatus: (status) => {
    set({ currentOrderStatus: status });
  },

  deliveredOrders: [],
  returnedOrders: [],
  expiredOrders: [],
  cancelledOrders: [],
  rejectedOrders: [],

  fetching: false,

  errors: {
    all: null,
    delivered: null,
    cancelled: null,
    returned: null,
    expired: null,
    rejected: null,
  },
  totalPagesByStatus: {
    all: 1,
    delivered: 1,
    cancelled: 1,
    returned: 1,
    expired: 1,
    rejected: 1,
  },
  filters: {
    startDate: '',
    endDate: '',
    paymentStatus: '',
    quickFilter: '',
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
    get().filterOrderByStatus();
    get().fetchAllStats();
    useOrderStore.setState({
      currentPage: 1,
    });
  },
  filterOrderByStatus: async (status, isInitialLoad = false) => {
    const targetStatus = status || get().currentOrderStatus;

    try {
      set((state) => ({
        fetching: true,
        errors: {
          ...state.errors,
          [targetStatus]: null,
        },
      }));

      const { currentLimit, currentPage } = useOrderStore.getState();
      const queryStatus = targetStatus === 'all' ? '' : targetStatus;
      const { filters } = get();
      const parameters = {
        status: queryStatus,
        startDate: filters.startDate,
        endDate: filters.endDate,
        paymentStatus: filters.paymentStatus,
      };
      const response = await getAllOrders(currentLimit, currentPage, parameters);
      if (targetStatus === 'all') {
        useOrderStore.setState({
          orders: response.data,
          totalOrders: response.totalOrders,
        });
      } else {
        set({ [`${targetStatus}Orders`]: response.data });
      }
      set((state) => ({
        totalPagesByStatus: {
          ...state.totalPagesByStatus,
          [targetStatus]: response.totalPage || 1,
        },
      }));
    } catch (error) {
      const errorMessage = getServerMessage(error);
      set((state) => ({
        errors: {
          ...state.errors,
          [targetStatus]: errorMessage,
        },
      }));
    } finally {
      set({ fetching: false });
    }
  },

  fetchAllStats: async () => {
    const statuses = ['delivered', 'cancelled', 'returned', 'expired', 'rejected'];

    const { currentOrderStatus } = get();

    await Promise.all(
      statuses.map((status) => {
        const isActive = status === currentOrderStatus;
        return get().filterOrderByStatus(status, !isActive);
      }),
    );
  },
}));

useOrderStore.subscribe(
  (state) => [state.currentLimit, state.currentPage],
  // newVal  == newCurrentLimit, newCurrentPage
  // oldVal == oldCurrentLimit, oldCurrentPage
  (newVal, oldVal) => {
    if (newVal[0] !== oldVal[0] || newVal[1] !== oldVal[1]) {
      const store = useOrderHistoryStore.getState();
      const status = store.currentOrderStatus;

      if (!store.fetching) {
        store.filterOrderByStatus(status, false);
      }
    }
  },
);

export default useOrderHistoryStore;
