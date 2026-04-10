import toast from "react-hot-toast";
import { create } from "zustand";
import { assignDriver, cancelOrder, createNewOrder, getAllOrders, markOrderDelivered, pickUpOrder, updatedOrder } from "../../services/orderService";
import { getServerMessage } from "../../utils/i18nHelper";
import i18n from "../../i18n";
import { createJSONStorage, persist } from "zustand/middleware";

const useOrderStore = create(
  persist(
  (set, get) => ({
    orderData: {
    type: "", 
    serviceType: "immediate", 
    scheduledFor: null, 
    deliveryDeadline: null, 
    priority: "normal", 
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
        coordinates: [0,0] 
    },
    dropoffLocation: {
        type: "Point",
        coordinates: [0,0] 
    },
    items: [], 
    packageDetails: {
        weight: 0.00,
        size: "",
        fragile: false, 
        note: "" 
    },
    serviceLevel: "standard", 
    paymentType: "", 
    amountToCollect: 0, 
    deliveryPrice: {
        discount: 0,
        total: 0 
    },
    finalPrice: 0, 
    },
  visited: {},
  setAllVisitedFields: () => {
    const currentOrderData = get().orderData;
    const visitedFields = {};

    const baseRequiredFields = [
      "type",
      "serviceLevel",
      "serviceType",
      "priority",
      "paymentType",
      "sender.name",
      "sender.phone",
      "receiver.name",
      "receiver.phone",
      "receiver.address",
      "pickupLocation.coordinates",
      "dropoffLocation.coordinates"
    ];

    baseRequiredFields.forEach(field => {
      visitedFields[field] = true;
    });

    if (currentOrderData.serviceType === "scheduled") {
      visitedFields["scheduledFor"] = true;
    }

    if (currentOrderData.type !== "parcel") {
      visitedFields["items"] = true;
    }

    if (currentOrderData.type === "parcel") {
      visitedFields["packageDetails.size"] = true;
      visitedFields["packageDetails.weight"] = true;
    }

    set({ visited: visitedFields });
  },
  isOrderValid: () => {
    const data = get().orderData;
   const isPhoneValid = (phone) => {
    const regex = /^07\d{8}$/;
    return regex.test(phone);
  };
      const isBaseInfoValid =
      data.type !== "" &&
      data.sender.name.trim() !== "" &&
      isPhoneValid(data.sender.phone) &&
      data.receiver.name.trim() !== "" &&
      isPhoneValid(data.receiver.phone) &&
      data.receiver.address.trim() !== "" &&
      data.paymentType !== "";

    const areItemsValid = data.type === "parcel" ? true : data.items.length > 0;
    const isScheduleValid = data.serviceType === "scheduled" ? !!data.scheduledFor : true;
    const isPackageValid = data.type === "parcel" ? data.packageDetails.weight !== 0 : true &&  data.type === "parcel" ? data.packageDetails.size !== "select size" : true;

    return isBaseInfoValid && areItemsValid && isScheduleValid && isPackageValid;
  },

 visitAll: () => {
  set({
    visited: {
      "type": true,
      "sender.name": true,     
      "sender.phone": true,    
      "receiver.name": true,   
      "receiver.phone": true,  
      "receiver.address": true, 
      "paymentType": true,
      "items": true,
      "packageDetails.weight": true,
      "packageDetails.size": true,
      "scheduledFor": true,
      "pickupLocation.coordinates": true,
      "dropoffLocation.coordinates": true,
      }
  });
},

    updateOrderData : (path, value) =>{
        let separatedPath = path.split(".");
         const updateNested = (currentState, separatedPath, value)=>{
            if(separatedPath.length === 1){
             if(Array.isArray(currentState)){
              let copy =  [...currentState]
              copy[separatedPath[0]] = value
              return copy
             }else{
              return  { ...currentState, [separatedPath[0]] : value}
             }
            }else{
                const [first, ...rest] = separatedPath
                let newCopy = Array.isArray(currentState) ? [...currentState] : {...currentState}
                newCopy[first] = updateNested(currentState?.[first] || {}, rest, value);
                return newCopy
            }
         }
         set((state)=> ({
            orderData: updateNested(state.orderData, separatedPath, value),
            visited: {...state.visited, [path]:true}
         }))
    },

    isItemModalOpen: false,
    setItemModalOpen: () => {
        set((state)=>({
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
        }))},
    decreaseQuantity: (id)=>{
        set((state)=> ({
            orderData: {
                ...state.orderData,
                items: state.orderData.items.map((item)=>
                 item.id === id ? {...item, quantity: Math.max(1, item.quantity - 1)}: item
                )
            }
        }))
    },
    
    deleteItem: (id)=>{
      set((state)=> ({
        orderData: {
            ...state.orderData,
            items: state.orderData.items.filter((item)=> item.id !== id)
        },
      })),
      toast.success("Item deleted successfully!")
    },
    isEditingOrder: false,
    isViewingOrder: false,

   initailOrderDataObject : {
      type: "",
      serviceType: "immediate",
      scheduledFor: null,
      deliveryDeadline: null,
      priority: "normal",

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
        coordinates: [0.000000, 0.000000]
      },

      dropoffLocation: {
        type: "Point",
        coordinates: [0.000000, 0.000000]
      },

      items: [],

      packageDetails: {
        weight: 0,
        size: "",
        fragile: false,
        note: ""
      },

      serviceLevel: "standard",
      paymentType: "",
      amountToCollect: 0,

      deliveryPrice: {
        discount: 0,
        total: 0
      },

      finalPrice: 0,
  },
   resetOrderForm : ()=>{
    set((state)=> ({
        orderData: state.isEditingOrder === true ? {...state.originalData} : {...state.initailOrderDataObject}
    }))
  },
  createNewOrder: () => {
  set({
     isEditingOrder: false,
     isViewing: false,
     orderData: get().initailOrderDataObject
  })
},
  getOrderDetailsToShow: (order, isViewing, isEditingOrder) => {
    const orderDetails = {
          ...order,
        sender: {...order.sender},
        receiver: {...order.receiver},
        pickupLocation: {...order.pickupLocation},
        dropoffLocation: {...order.dropoffLocation },
        items: [...order.items], 
        packageDetails: {...order.packageDetails} ,
        serviceLevel: order.serviceLevel, 
        paymentType: order.paymentType, 
        amountToCollect: order.amountToCollect,
        deliveryPrice: {...order.deliveryPrice},
        id: order.id,
        type: order.type,
        serviceType: order.serviceType, 
        scheduledFor: order.scheduledFor,
        deliveryDeadline: order.deliveryDeadline, 
        priority: order.priority, 
        finalPrice: order.finalPrice,
        status: order.status,
        createdAt: order.createdAt,
        paymentStatus: order.paymentStatus
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
 currentLimit : 20,
 orders :[],
  fetchAllOrders : async(limit,page)=>{
    try{
     const response = await getAllOrders(limit, page)
     console.log(response)
     const responseData = response.data
     set({orders: responseData, totalPages: response.totalPage
     })
    }catch(error){
      const err = await error.response.json()
       const errorMessage = getServerMessage(err)
       set({fetchingOrdersError: errorMessage})
    }
  },
   handleNextButton :()=>{
  const{isLoading, currentPage, totalPages} = get()
     if(isLoading || currentPage>= totalPages) return
     set({currentPage: currentPage + 1})  
 },
 handlePrevButton: ()=>{
     const{isLoading, currentPage} = get()
     if(isLoading || currentPage <=  1) return
     set({currentPage: currentPage - 1})
 },
 handlePageNumberClick : (page)=>{
    const {isLoading} = get()
    if(isLoading ) return
    set({currentPage: page})
 },
 updateCurrentLimit: (limit)=>{
   set({currentLimit: limit})
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
       set((state)=> {
        const updatedOrders = state.orders.map((order)=>{
            return order._id === orderId ? responseData : order 
        })
        const updatedFilteredList = state.filteredList.map((order)=>{
          return order._id === orderId ? responseData : order
        })
        return{
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

assignDriverToOrder: async(orderId, driverId) => {
  try{
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
  }catch(error){
    const err = await error.response.json()
    const errorMessage = getServerMessage(err)
    toast.dismiss()
    toast.error(errorMessage || i18n.t("error_general"))
  }

},

markOrderDelivered: async(orderId) => {
  try{
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
} catch(error){
    const err = await error.response.json()
    const errorMessage = getServerMessage(err)
    toast.dismiss()
    toast.error(errorMessage || i18n.t("error_general"))
  }
},

cancelOrder: async(orderId, reason) => {
  try{
    toast.dismiss()
    toast.loading(i18n.t("cancelling_order_loading"))
    const response = await cancelOrder(orderId, reason)
    const updatedOrder = response.data
    set((state) => {
    const updatedOrders = state.orders.map((order) => {
       return order._id === orderId ? updatedOrder : order
    });
    return {
      orders: updatedOrders,
      filteredList: updatedOrders 
    };
  });
  toast.dismiss()
  toast.success(i18n.t("order_cancelled_success"))
  }catch(error){
    const err = await error.response.json()
    const errorMessage = getServerMessage(err)
    toast.dismiss()
    toast.error(errorMessage || i18n.t("error_general"))
  }

},
pickupOrder: async(orderId)=>{
  try{
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
  }catch(error){
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
      if (order.id !== orderId) return true;
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
filteredList : [],
applyFilters: (filters, searchTerm)=>{
  let lowerCaseSearchTerm = searchTerm.toLowerCase().trim()
  const {courier, paymentStatus, orderStatus, startDate, endDate, senderName} = filters
  set((state)=> ({
    filteredList: state.orders.filter((order)=>{
      if(lowerCaseSearchTerm){
        const matchSearchTerm = 
        order._id?.toLowerCase().includes(lowerCaseSearchTerm)||
        order.receiver?.name.toLowerCase().includes(lowerCaseSearchTerm)||
        order.receiver?.phone.includes(lowerCaseSearchTerm);
        if(!matchSearchTerm) return false
      }
     if(courier && courier !== order.courier?.toLowerCase()) return false
     if(paymentStatus && paymentStatus !== order.paymentStatus?.toLowerCase()) return false
     if(orderStatus && orderStatus !== order.status?.toLowerCase()) return false
     if(senderName && senderName.toLowerCase() !== order.sender?.name.toLowerCase()) return false
     
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
},
resetFilters: ()=>{
    set((state)=> ({
        filteredList:state.orders
    }))
}
}),{
    name: "order-storage",
    storage: createJSONStorage(()=> localStorage),
    partialize: (state)=> ({orders: state.orders})
}

))
export default useOrderStore