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

import { immer } from 'zustand/middleware/immer';
import { isWithinDateRange } from '../../utils/date.helper';
import { subscribeWithSelector } from 'zustand/middleware';
import useOrderPaginationStore from './useOrderPaginationStore';
const useOrderStore = create(
  subscribeWithSelector(
    immer((set) => ({
      isFetchingOrders: false,
      fetchingOrdersError: null,

      orders: [],

      fetchAllOrders: async (limit, page) => {
        try {
          set({ isFetchingOrders: true, fetchingOrdersError: null });
          const response = await getAllOrders(limit, page);
          const responseData = response.data;

          set({
            orders: responseData,
          });
          useOrderPaginationStore.getState().setTotalPages(response.totalPage);

          useOrderPaginationStore.getState().setTotalOrders(response.totalOrders);
        } catch (error) {
          set({ fetchingOrdersError: error.message });
        } finally {
          set({ isFetchingOrders: false });
        }
      },

      addNewOrder: async (newOrder) => {
        const response = await createNewOrder(newOrder);
        const createdOrder = response.data;
        set((state) => {
          const updatedOrders = [createdOrder, ...state.orders];
          return {
            orders: updatedOrders,
            filteredList: updatedOrders,
          };
        });

        return {
          success: true,
          data: createdOrder,
        };
      },

      editOrder: async (orderId, orderData) => {
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
        return {
          success: true,
          data: responseData,
        };
      },

      assignDriverToOrder: async (orderId, driverId) => {
        try {
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

          return {
            success: true,
            data: responseData,
          };
        } catch (error) {
          console.log(error.message);
          return {
            success: false,
            error: error.message,
          };
        }
      },

      markOrderDelivered: async (orderId) => {
        try {
          const response = await markOrderDelivered(orderId);

          set((state) => ({
            orders: state.orders.map((o) => (o._id === orderId ? response.data : o)),
          }));

          return {
            success: true,
            data: response.data,
          };
        } catch (error) {
          return { 
            success: false, 
            error: error.message 
          };
        }
      },

      cancelOrder: async (orderId, reason) => {
        try {
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
          return {
            success: true,
            data: updatedOrderData,
          };
        } catch (error) {
          console.log(error.message);
          return {
            success: false,
            error: error.message,
          };
        }
      },
      pickupOrder: async (orderId) => {
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
        return {
          success: true,
          data: responseData,
        };
      },

      deleteOrder: (orderId) => {
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
              !filters.senderName ||
              normalize(order.sender?.name) === normalize(filters.senderName);
            const matchDate = isWithinDateRange(
              order.createdAt,
              filters.startDate,
              filters.endDate,
            );
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
        set((state) => ({
          filteredList: state.orders,
        }));
      },
    })),
  ),
);

export default useOrderStore;
