import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import { VALIDATION_RULES } from '../../utils/validations';
import { getValueByPath } from '../../utils/getValueByPath';

import { orderDataObject } from '../../constants/orderData';
import { SERVICE_TYPES, ORDER_TYPES } from '../../constants/orderEnums';

const useOrderFormStore = create(
  subscribeWithSelector(
    immer((set, get) => ({
      orderData: structuredClone(orderDataObject),

      originalData: null,

      visited: {},

      isEditingOrder: false,
      isViewingOrder: false,
      //for form
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

      

      isOrderValid: () => { // but I have this and it checks for the errors I think I don't need getFieldError
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

      updateOrderData: (path, value) => {
        set((draft) => {
          const separatedPath = path.split('.');
          const lastKey = separatedPath.pop();

          const finalPath = separatedPath.reduce(
            (acc, currentPath) => acc[currentPath],
            draft.orderData,
          );

          if (finalPath && lastKey) {
            finalPath[lastKey] = value;
          }

          draft.visited[path] = true;
        });
      },

      setVisited: (path) => {
        set((draft) => {
          draft.visited[path] = true;
        });
      },

      visitAll: () => {
        const data = get().orderData;
        const requiredFields = get().getRequiredFields(data);

        set((draft) => {
          requiredFields.forEach((field) => {
            draft.visited[field] = true;
          });
        });
      },

      resetVisited: () => {
        set({
          visited: {},
        });
      },

      resetOrderForm: () => {
        set((state) => {
          const data = state.isEditingOrder ? state.originalData : orderDataObject;

          return {
            orderData: JSON.parse(JSON.stringify(data)),
            visited: {},
          };
        });
      },

      createNewOrder: () => {
        set({
          isEditingOrder: false,
          isViewingOrder: false,
          originalData: null,
          orderData: structuredClone(orderDataObject),
          visited: {},
        });
      },

      getOrderDetailsToShow: (order, isViewing, isEditingOrder) => {
        set((draft) => {
          ((draft.isEditingOrder = isEditingOrder),
            (draft.isViewingOrder = isViewing),
            (draft.orderData = structuredClone(order)),
            (draft.originalData = structuredClone(order)));
        });
      },

      clearOrderForm: () => {
        set({
          orderData: structuredClone(orderDataObject),
          originalData: null,
          visited: {},
          isEditingOrder: false,
          isViewingOrder: false,
        });
      },

      // the part of items manupilations

      isItemModalOpen: false,

      toggleItemModal: () => {
        set((state) => {
          state.isItemModalOpen = !state.isItemModalOpen;
        });
      },

      addItem: (item) => {
        set((draft) => {
          draft.orderData.items.push(item);
        });
      },

      deleteItem: (id) => {
        set((draft) => {
          draft.orderData.items = draft.orderData.items.filter((item) => item.id !== id);
        });
      },

      increaseQuantity: (id) => {
        set((draft) => {
          const item = draft.orderData.items.find((item) => item.id === id);

          if (item) {
            item.quantity += 1;
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

      updateItem: (id, updatedData) => {
        set((draft) => {
          const item = draft.orderData.items.find((item) => item.id === id);

          if (item) {
            Object.assign(item, updatedData);
          }
        });
      },
    })),
  ),
);

export default useOrderFormStore;
