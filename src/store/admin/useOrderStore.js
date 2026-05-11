import toast from 'react-hot-toast';
import { create } from 'zustand';
import {
  assignDriver,
  cancelOrder,
  createNewOrder,
  getAllOrders,
  markOrderDelivered,
  pickUpOrder,
  updatedOrder,
} from '../../services/orderService';
import { getServerMessage } from '../../utils/i18nHelper';
import i18n from '../../i18n';
import {
  SERVICE_TYPES,
  ORDER_TYPES,
  PRIORITIES,
  PACKAGE_SIZES,
  SERVICE_LEVELS,
} from '../../constants/orderEnums';
import { VALIDATION_RULES } from '../../utils/validations';
import { immer } from 'zustand/middleware/immer';
import { getValueByPath } from '../../utils/getValueByPath';
import { isWithinDateRange } from '../../utils/date.helper';
import { subscribeWithSelector } from 'zustand/middleware';
const orderDataObject = {
  type: '',
  serviceType: SERVICE_TYPES.IMMEDIATE,
  scheduledFor: null,
  deliveryDeadline: null,
  priority: PRIORITIES.NORMAL,
  sender: {
    name: '',
    phone: '',
  },
  receiver: {
    name: '',
    phone: '',
    address: '',
  },
  pickupLocation: {
    type: 'Point',
    coordinates: [0, 0],
  },
  dropoffLocation: {
    type: 'Point',
    coordinates: [0, 0],
  },
  items: [],
  packageDetails: {
    weight: 0.0,
    size: '',
    fragile: false,
    note: '',
  },
  serviceLevel: SERVICE_LEVELS.STANDARD,
  paymentType: '',
  amountToCollect: 0,
  deliveryPrice: {
    discount: 0,
    total: 0,
  },
  finalPrice: 0,
};

const useOrderStore = create(
subscribeWithSelector(
  immer((set, get) => ({
    orderData: { ...orderDataObject },
    visited: {},
    getRequiredFields: (data) => {
      const fields = [
        'type',
        'serviceLevel',
        'serviceType',
        'priority',
        'paymentType',
        'sender.name',
        'sender.phone',
        'receiver.name',
        'receiver.phone',
        'receiver.address',
        'pickupLocation.coordinates',
        'dropoffLocation.coordinates',
      ];
      if (data.serviceType === SERVICE_TYPES.SCHEDULED) fields.push('scheduledFor');
      if (data.type === ORDER_TYPES.FOOD) fields.push('items');
      if (data.type === ORDER_TYPES.PARCEL) {
        fields.push('packageDetails.size', 'packageDetails.weight');
      }
      return fields;
    },
    visitAll: () => {
      const data = get().orderData;
      const requiredFields = get().getRequiredFields(data);
      const visited = {};
      requiredFields.forEach((f) => (visited[f] = true));
      set({ visited: visited });
    },

    isOrderValid: () => {
      const data = get().orderData;
      const requiredFields = get().getRequiredFields(data);

      return requiredFields.every((fieldPath) => {
        const value = getValueByPath(fieldPath, data);

        if (!VALIDATION_RULES.required(value)) return false;

        if (fieldPath.includes('phone')) {
          return VALIDATION_RULES.phone(value);
        }

        if (fieldPath === 'items') {
          return VALIDATION_RULES.notEmptyArray(value);
        }

        if (fieldPath === 'packageDetails.weight') {
          return value > 0;
        }

        return true;
      });
    },
    updateOrderData: (path, value) =>
      set((draft) => {
        let separatedPath = path.split('.');
        const lastKey = separatedPath.pop();
        const finalPath = separatedPath.reduce((acc, path) => acc[path], draft.orderData);
        if (finalPath) {
          finalPath[lastKey] = value;
        }
        draft.visited[path] = true;
      }),
    isItemModalOpen: false,
    setItemModalOpen: () => {
      set((state) => ({
        isItemModalOpen: !state.isItemModalOpen,
      }));
    },

    increaseQuantity: (id) => {
      set((draft) => {
        const item = draft.orderData.items.find((item) => item.id === id);
        if (item) {
          item.quantity = item.quantity + 1;
        }
      });
    },

    decreaseQuantity: (id) => {
      set((draft) => {
        const item = draft.orderData.items.find((item) => item.id === id);
        if (item) {
          item.quantity = Math.max(1, item.quantity - 1);
        }
      });
    },

    deleteItem: (id) => {
      set((draft) => {
        draft.orderData.items = draft.orderData.items.filter((item) => item.id !== id);
      });
      toast.success(i18n.t('ITEM_DELETED_SUCCESS'));
    },
    isEditingOrder: false,
    isViewingOrder: false,

    initialOrderDataObject: { ...orderDataObject },
    resetOrderForm: () => {
      set((state) => {
        const data = state.isEditingOrder ? state.originalData : state.initialOrderDataObject;
        visited: {}
        return {
          orderData: JSON.parse(JSON.stringify(data)),
          visited: {}
        };
      });
    },
    createNewOrder: () => {
      set({
        isEditingOrder: false,
        isViewingOrder: false,
        orderData: get().initialOrderDataObject,
        visited: {},
      });
    },
    getOrderDetailsToShow: (order, isViewing, isEditingOrder) => {
      set((draft) => {
        ((draft.isEditingOrder = isEditingOrder),
          (draft.isViewingOrder = isViewing),
          (draft.orderData = order),
          (draft.originalData = order));
      });
    },

    isFetchingOrders: false,
    fetchingOrdersError: null,
    currentPage: 1,
    totalPages: 0,
    totalOrders: 0,
    currentLimit: 20,
    orders: [],
    fetchAllOrders: async (limit, page) => {
      try {
        set({ isFetchingOrders: true, fetchingOrdersError: null });
        const response = await getAllOrders(limit, page);
        const responseData = response.data;
        set({
          orders: responseData,
          totalPages: response.totalPage,
        });
      } catch (error) {
        const errorMessage = getServerMessage(error);
        set({ fetchingOrdersError: errorMessage });
      } finally {
        set({ isFetchingOrders: false });
      }
    },
    handleNextButton: () => {
      const { isLoading, currentPage, totalPages } = get();
      if (isLoading || currentPage >= totalPages) return;
      set({ currentPage: currentPage + 1 });
    },
    handlePrevButton: () => {
      const { isLoading, currentPage } = get();
      if (isLoading || currentPage <= 1) return;
      set({ currentPage: currentPage - 1 });
    },
    handlePageNumberClick: (page) => {
      const { isLoading } = get();
      if (isLoading) return;
      set({ currentPage: page });
    },
    updateCurrentLimit: (limit) => {
      set({ currentLimit: limit, currentPage: 1 });
    },
    addNewOrder: async (newOrder) => {
      try {
        toast.loading(i18n.t('ADDING_ORDER_LOAD'));
        const response = await createNewOrder(newOrder);
        const createdOrder = response.data;
        set((state) => {
          const updatedOrders = [createdOrder, ...state.orders];
          return {
            orders: updatedOrders,
            filteredList: updatedOrders,
          };
        });
        // toast.dismiss();                               the toast are temporarily commented here,
        // toast.success(i18n.t('order_added_success'));  they are handeled well in the refactor
        return true;
      } catch (error) {
        const err = await error.response?.json();
        const errorMessage = getServerMessage(err);
        toast.dismiss();
        toast.error(errorMessage || i18n.t('ERROR_GENERAL'));
        return false;
      }
    },
    editOrder: async (orderId, orderData) => {
      try {
        toast.loading(i18n.t('updating_order_loading'));
        const response = await updatedOrder(orderId, orderData);
        const responseData = response.data;
        set((state) => {
          const updatedOrders = state.orders.map((order) => {
            return order._id === orderId ? responseData : order;
          });
          const updatedFilteredList = state.filteredList.map((order) => {
            return order._id === orderId ? responseData : order;
          });
          return {
            orderData: responseData,
            orders: updatedOrders,
            filteredList: updatedFilteredList,
          };
        });
        toast.dismiss();
        toast.success(i18n.t('ORDER_UPDATES_SUCCESS'));
        return true;
      } catch (error) {
        const err = await error.response.json();
        const errorMessage = getServerMessage(err);
        toast.dismiss();
        toast.error(errorMessage || i18n.t('ERROR_GENERAL'));
        return false;
      }
    },

    assignDriverToOrder: async (orderId, driverId) => {
      try {
        toast.dismiss();
        toast.loading(i18n.t('ASSIGNING_DRIVER_LOADING'));
        const response = await assignDriver(orderId, driverId);
        const responseData = response.data;
        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order._id === orderId ? responseData : order,
          );
          return {
            orders: updatedOrders,
            filteredList: updatedOrders,
          };
        });
        toast.dismiss();
        toast.success(i18n.t('DRIVER_ASSIGNED_SUCCESS'));
      } catch (error) {
        const err = await error.response.json();
        const errorMessage = getServerMessage(err);
        toast.dismiss();
        toast.error(errorMessage || i18n.t('ERROR_GENERAL'));
      }
    },

    markOrderDelivered: async (orderId) => {
      try {
        toast.dismiss();
        toast.loading(i18n.t('UPDATING_ORDER_LOADING'));
        const response = await markOrderDelivered(orderId);
        const responseData = response.data;

        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order._id === orderId ? responseData : order,
          );
          return {
            orders: updatedOrders,
            filteredList: updatedOrders,
          };
        });
        toast.dismiss();
        toast.success(i18n.t('ORDER_DELIVERED_SUCCESS'));
      } catch (error) {
        const err = await error.response.json();
        const errorMessage = getServerMessage(err);
        toast.dismiss();
        toast.error(errorMessage || i18n.t('ERROR_GENERAL'));
      }
    },

    cancelOrder: async (orderId, reason) => {
      try {
        toast.dismiss();
        toast.loading(i18n.t('CANCELLING_ORDER_LOADING'));
        const response = await cancelOrder(orderId, reason);
        const updatedOrderData = response.data;
        set((state) => {
          const updatedOrders = state.orders.map((order) => {
            return order._id === orderId ? updatedOrderData : order;
          });
          return {
            orders: updatedOrders,
            filteredList: updatedOrders,
          };
        });
        toast.dismiss();
        toast.success(i18n.t('ORDER_CANCELLED_SUCCESS'));
      } catch (error) {
        const err = await error.response.json();
        const errorMessage = getServerMessage(err);
        toast.dismiss();
        toast.error(errorMessage || i18n.t('ERROR_GENERAL'));
      }
    },
    pickupOrder: async (orderId) => {
      try {
        toast.dismiss();
        toast.loading(i18n.t('PICKUP_ORDER_LOADING'));
        const response = await pickUpOrder(orderId);
        const responseData = response.data;
        set((state) => {
          const updatedOrders = state.orders.map((order) => {
            return order._id === orderId ? responseData : order;
          });
          return {
            orders: updatedOrders,
            filteredList: updatedOrders,
          };
        });
        toast.dismiss();
        toast.success(i18n.t('ORDER_PICKUP_SUCCESS'));
      } catch (error) {
        const err = await error.response.json();
        const errorMessage = getServerMessage(err);
        toast.dismiss();
        toast.error(errorMessage || i18n.t('ERROR_GENERAL'));
      }
    },
    deleteOrder: (orderId) => {
      if (!window.confirm('Are you sure that you want to delete this order?')) return;
      set((state) => {
        const updatedOrders = state.orders.filter((order) => {
          if (order._id !== orderId) return true;
          const isDelivered = order.status === 'delivered';
          const isPaid = order.paymentStatus === 'paid';
          return isDelivered || isPaid;
        });

        return {
          orders: updatedOrders,
          filteredList: updatedOrders,
        };
      });
    },
    filteredList: [],
    applyFilters: (filters, searchTerm) => {
      const term = searchTerm?.toLowerCase().trim();
      const normalize = (val) => val?.toLowerCase().trim() || '';

      set((state) => ({
        filteredList: state.orders.filter((order) => {
          const matchSearchTerm =
            !term ||
            normalize(order._id).includes(term) ||
            normalize(order.receiver?.name).includes(term) ||
            order.receiver?.phone?.includes(term);
          const matchDriver =
            !filters.driver || normalize(order.driver) === normalize(filters.driver);
          const matchPaymentStatus =
            !filters.paymentStatus ||
            normalize(order.paymentStatus) === normalize(filters.paymentStatus);
          const matchStatus =
            !filters.orderStatus || normalize(order.status) === normalize(filters.orderStatus);
          const matchSenderName =
            !filters.senderName || normalize(order.sender?.name) === normalize(filters.senderName);
          const matchDate = isWithinDateRange(order.createdAt, filters.startDate, filters.endDate);
          return (
            matchSearchTerm &&
            matchDriver &&
            matchPaymentStatus &&
            matchStatus &&
            matchSenderName &&
            matchDate
          );
        }),
      }));
    },
    resetFilters: () => {
      set((state) => {
        filteredList: state.orders;
      });
    },
  })),
));

export default useOrderStore;