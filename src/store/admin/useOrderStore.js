import toast from "react-hot-toast";
import { create } from "zustand";
import { assignDriver, cancelOrder, createNewOrder, getAllOrders, markOrderDelivered, pickUpOrder, updatedOrder } from "../../services/orderService";
import { getServerMessage } from "../../utils/i18nHelper";
import i18n from "../../i18n";
import {SERVICE_TYPES, ORDER_TYPES,PRIORITIES, PACKAGE_SIZES,SERVICE_LEVELS} from "../../constants/orderEnums"
import { VALIDATION_RULES } from "../../constants/validations";
const orderDataObject = {
      type: "",
      serviceType: SERVICE_TYPES.IMMEDIATE,
      scheduledFor: null,
      deliveryDeadline: null,
      priority: PRIORITIES.NORMAL,
      sender: {
        name: "",
        phone: ""
      },
      receiver: {
        name: "",
        phone: "",
        address: ""
      },
      pickupLocation: {
        type: "Point",
        coordinates: [0, 0]
      },
      dropoffLocation: {
        type: "Point",
        coordinates: [0, 0]
      },
      items: [],
      packageDetails: {
        weight: 0.00,
        size: "",
        fragile: false,
        note: ""
      },
      serviceLevel: SERVICE_LEVELS.STANDARD,
      paymentType: "",
      amountToCollect: 0,
      deliveryPrice: {
        discount: 0,
        total: 0
      },
      finalPrice: 0,
    }

const useOrderStore = create(
  (set, get) => ({
  orderData: {...orderDataObject},
  visited: {},
  getRequiredFields : (data) => {
  const fields = [
    "type", "serviceLevel", "serviceType", "priority", "paymentType",
    "sender.name", "sender.phone", "receiver.name", "receiver.phone", 
    "receiver.address", "pickupLocation.coordinates", "dropoffLocation.coordinates"
  ];
  if (data.serviceType === SERVICE_TYPES.SCHEDULED) fields.push("scheduledFor");
  if (data.type === ORDER_TYPES.FOOD) fields.push("items");
  if (data.type === ORDER_TYPES.PARCEL) {
    fields.push("packageDetails.size", "packageDetails.weight");
  }
  return fields;
},
visitAll: () => {
  const data = get().orderData
  const requiredFields = get().getRequiredFields(data)
  const visited = {}
  requiredFields.forEach(f => visited[f] = true)
  set({ visited:visited })
},
// helper function to get the value from nested objects
getValueByPath :(obj, path)=>{
  return path.split(".").reduce((acc, part)=> acc?.[part], obj)  
},
isOrderValid: () => {
  const data = get().orderData;
  const requiredFields = get().getRequiredFields(data);

  return requiredFields.every(fieldPath => {
    const value = get().getValueByPath(data, fieldPath);
    
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
      let separatedPath = path.split(".");
      const updateNested = (currentState, separatedPath, value) => {
        if (separatedPath.length === 1) {
          if (Array.isArray(currentState)) {
            let copy = [...currentState]
            copy[separatedPath[0]] = value
            return copy
          } else {
            return { ...currentState, [separatedPath[0]]: value }
          }
        } else {
          const [first, ...rest] = separatedPath
          let newCopy = Array.isArray(currentState) ? [...currentState] : { ...currentState }
          newCopy[first] = updateNested(currentState?.[first] || {}, rest, value);
          return newCopy
        }
      }
      set((state) => ({
        orderData: updateNested(state.orderData, separatedPath, value),
        visited: { ...state.visited, [path]: true }
      }))
    },

    isItemModalOpen: false,
    setItemModalOpen: () => {
      set((state) => ({
        isItemModalOpen: !state.isItemModalOpen
      }))
    },

    increaseQuantity: (id) => {
      set((state) => ({
        orderData: {
          ...state.orderData,
          items: state.orderData.items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        },
      }))
    },

    decreaseQuantity: (id) => {
      set((state) => ({
        orderData: {
          ...state.orderData,
          items: state.orderData.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
          )
        }
      }))
    },

    deleteItem: (id) => {
      set((state) => ({
        orderData: {
          ...state.orderData,
          items: state.orderData.items.filter((item) => item.id !== id)
        },
      }))
      toast.success("Item deleted successfully!")
    },
    isEditingOrder: false,
    isViewingOrder: false,

    initailOrderDataObject: {...orderDataObject},
    resetOrderForm: () => {
      set((state) => ({
        orderData: state.isEditingOrder === true ? { ...state.originalData } : { ...state.initailOrderDataObject }
      }))
    },
    createNewOrder: () => {
      set({
        isEditingOrder: false,
        isViewingOrder: false,
        orderData: get().initailOrderDataObject,
        visited: {}
      })
    },
    getOrderDetailsToShow: (order, isViewing, isEditingOrder) => {
      const orderDetails = {
        ...order,
        sender: { ...order.sender },
        receiver: { ...order.receiver },
        pickupLocation: { ...order.pickupLocation },
        dropoffLocation: { ...order.dropoffLocation },
        items: [...order.items],
        packageDetails: { ...order.packageDetails },
        deliveryPrice: { ...order.deliveryPrice },
      }
      set({
        isEditingOrder: isEditingOrder,
        isViewingOrder: isViewing,
        orderData: orderDetails,
        originalData: orderDetails
      })
    },

    isFetchingOrders: false,
    fetchingOrdersError: null,
    currentPage: 1,
    totalPages: null,
    currentLimit: 20,
    orders: [],
    fetchAllOrders: async (limit, page) => {
      try {
        set({ isFetchingOrders: true, fetchingOrdersError: null })
        const response = await getAllOrders(limit, page)
        const responseData = response.data
        set({
          orders: responseData, totalPages: response.totalPage
        })
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        set({ fetchingOrdersError: errorMessage })
      } finally {
        set({ isFetchingOrders: false })
      }
    },
    handleNextButton: () => {
      const { isLoading, currentPage, totalPages } = get()
      if (isLoading || currentPage >= totalPages) return
      set({ currentPage: currentPage + 1 })
    },
    handlePrevButton: () => {
      const { isLoading, currentPage } = get()
      if (isLoading || currentPage <= 1) return
      set({ currentPage: currentPage - 1 })
    },
    handlePageNumberClick: (page) => {
      const { isLoading } = get()
      if (isLoading) return
      set({ currentPage: page })
    },
    updateCurrentLimit: (limit) => {
      set({ currentLimit: limit, currentPage: 1 })
    },
    addNewOrder: async (newOrder) => {
      try {
        toast.loading(i18n.t("adding_order_loading"))
        const response = await createNewOrder(newOrder)
        const createdOrder = response.data
        set((state) => {
          const updatedOrders = [createdOrder, ...state.orders];
          return {
            orders: updatedOrders,
            filteredList: updatedOrders
          };
        });
        toast.dismiss()
        toast.success(i18n.t("order_added_success"))
        return true
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        toast.dismiss()
        toast.error(errorMessage || i18n.t("error_general"))
        return false
      }
    },
    editOrder: async (orderId, orderData) => {
      try {
        toast.loading(i18n.t("updating_order_loading"))
        const response = await updatedOrder(orderId, orderData)
        const responseData = response.data
        set((state) => {
          const updatedOrders = state.orders.map((order) => {
            return order._id === orderId ? responseData : order
          })
          const updatedFilteredList = state.filteredList.map((order) => {
            return order._id === orderId ? responseData : order
          })
          return {
            orderData: responseData,
            orders: updatedOrders,
            filteredList: updatedFilteredList
          }
        })
        toast.dismiss()
        toast.success(i18n.t("order_updated_success"))
        return true
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        toast.dismiss()
        toast.error(errorMessage || i18n.t("error_general"))
        return false
      }
    },

    assignDriverToOrder: async (orderId, driverId) => {
      try {
        toast.dismiss()
        toast.loading(i18n.t("assigning_driver_loading"))
        const response = await assignDriver(orderId, driverId)
        const responseData = response.data
        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order._id === orderId ? responseData : order
          );
          return {
            orders: updatedOrders,
            filteredList: updatedOrders
          };
        });
        toast.dismiss()
        toast.success(i18n.t("driver_assigned_success"))
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        toast.dismiss()
        toast.error(errorMessage || i18n.t("error_general"))
      }

    },

    markOrderDelivered: async (orderId) => {
      try {
        toast.dismiss()
        toast.loading(i18n.t("updating_order_loading"))
        const response = await markOrderDelivered(orderId)
        const responseData = response.data

        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order._id === orderId ? responseData : order
          );
          return {
            orders: updatedOrders,
            filteredList: updatedOrders
          };
        });
        toast.dismiss()
        toast.success(i18n.t("order_delivered_success"))
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        toast.dismiss()
        toast.error(errorMessage || i18n.t("error_general"))
      }
    },

    cancelOrder: async (orderId, reason) => {
      try {
        toast.dismiss()
        toast.loading(i18n.t("cancelling_order_loading"))
        const response = await cancelOrder(orderId, reason)
        const updatedOrderData = response.data
        set((state) => {
          const updatedOrders = state.orders.map((order) => {
            return order._id === orderId ? updatedOrderData : order
          });
          return {
            orders: updatedOrders,
            filteredList: updatedOrders
          };
        });
        toast.dismiss()
        toast.success(i18n.t("order_cancelled_success"))
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        toast.dismiss()
        toast.error(errorMessage || i18n.t("error_general"))
      }

    },
    pickupOrder: async (orderId) => {
      try {
        toast.dismiss()
        toast.loading(i18n.t("pickup_order_loading"))
        const response = await pickUpOrder(orderId)
        const responseData = response.data
        set((state) => {
          const updatedOrders = state.orders.map((order) => {
            return order._id === orderId ? responseData : order
          });
          return {
            orders: updatedOrders,
            filteredList: updatedOrders
          };
        });
        toast.dismiss()
        toast.success(i18n.t("order_pickup_success"))
      } catch (error) {
        const err = await error.response.json()
        const errorMessage = getServerMessage(err)
        toast.dismiss()
        toast.error(errorMessage || i18n.t("error_general"))
      }
    },
    deleteOrder: (orderId) => {
      if (!window.confirm("Are you sure that you want to delete this order?")) return;
      set((state) => {
        const updatedOrders = state.orders.filter((order) => {
          if (order._id !== orderId) return true;
          const isDelivered = order.status === "delivered";
          const isPaid = order.paymentStatus === "paid";
          return isDelivered || isPaid;
        });

        return {
          orders: updatedOrders,
          filteredList: updatedOrders
        };
      });
    },
    filteredList: [],
    applyFilters: (filters, searchTerm) => {
      let lowerCaseSearchTerm = searchTerm.toLowerCase().trim()
      const { courier, paymentStatus, orderStatus, startDate, endDate, senderName } = filters
      set((state) => ({
        filteredList: state.orders.filter((order) => {
          if (lowerCaseSearchTerm) {
            const matchSearchTerm =
              order._id?.toLowerCase().includes(lowerCaseSearchTerm) ||
              order.receiver?.name.toLowerCase().includes(lowerCaseSearchTerm) ||
              order.receiver?.phone.includes(lowerCaseSearchTerm);
            if (!matchSearchTerm) return false
          }
          if (courier && courier !== order.courier?.toLowerCase()) return false
          if (paymentStatus && paymentStatus !== order.paymentStatus?.toLowerCase()) return false
          if (orderStatus && orderStatus !== order.status?.toLowerCase()) return false
          if (senderName && senderName.toLowerCase() !== order.sender?.name.toLowerCase()) return false

          if (startDate || endDate) {
            const orderDate = new Date(order.createdAt).getTime();

            if (startDate) {
              const start = new Date(startDate).setHours(0, 0, 0, 0);
              if (orderDate < start) return false;
            }

            if (endDate) {
              const end = new Date(endDate).setHours(23, 59, 59, 999);
              if (orderDate > end) return false;
            }
          }
          return true
        })
      }))
    }
  })
)

export default useOrderStore;