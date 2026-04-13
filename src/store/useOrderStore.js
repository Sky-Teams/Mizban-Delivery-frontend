import toast from "react-hot-toast";
import { create } from "zustand";

const useOrderStore = create((set, get) => ({
    orderData: {
    type: "", 
    serviceType: "", 
    scheduledFor: null, 
    deliveryDeadline: null, 
    priority: "", 
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
    serviceLevel: "", 
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
      data.serviceType !== "" &&
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
      "serviceLevel": true,
      "serviceType": true,
      "priority": true,
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
      serviceType: "",
      scheduledFor: null,
      deliveryDeadline: null,
      priority: "",

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

      serviceLevel: "",
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
     orderData: get().initailOrderDataObject
  })
},
  editOrder: (order, isViewing) => {
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
      isEditingOrder: true,
      isViewingOrder: isViewing,
      orderData: orderDetails,
      originalData: orderDetails
    })
  },
 orders :[
  {
    id: "ORD-001",
    type: "food",
    serviceType: "immediate",
    priority: "normal",
    sender: { name: "Shahmama Restaurant", phone: "020123456" },
    receiver: {
      name: "Ahmad Rahmani",
      phone: "0799123456",
      address: "Apartment 4B, Silo Street, District 5, Kabul"
    },
    pickupLocation: { type: "Point", coordinates: [34.5320, 69.1300] },
    dropoffLocation: { type: "Point", coordinates: [34.5353, 69.1324] },
    items: [
      { id: 101, name: "Qabuli Palaw", quantity: 2, unitPrice: 450 },
      { id: 102, name: "Mantu", quantity: 1, unitPrice: 300 }
    ],
    packageDetails: { weight: 1.5, size: "medium", fragile: false, note: "" },
    serviceLevel: "standard",
    paymentType: "COD",
    paymentStatus: "paid",
    amountToCollect: 1200,
    deliveryPrice: { discount: 0, total: 100 },
    finalPrice: 1300,
    status: "pending",
    createdAt: "2026-03-14T08:30:00Z"
  },
  {
    id: "ORD-002",
    type: "food",
    serviceType: "immediate",
    priority: "high",
    sender: { name: "Shahy Hotel", phone: "020654321" },
    receiver: {
      name: "Zohra Sadat",
      phone: "0788112233",
      address: "House 12, Darulaman Road, District 6, Kabul"
    },
    pickupLocation: { type: "Point", coordinates: [34.5100, 69.1450] },
    dropoffLocation: { type: "Point", coordinates: [34.5120, 69.1500] },
    items: [
      { id: 103, name: "Bolani Gandana", quantity: 5, unitPrice: 100 },
      { id: 104, name: "Sheer Yakh", quantity: 2, unitPrice: 150 }
    ],
    packageDetails: { weight: 0.8, size: "small", fragile: false, note: "Keep ice cream cold" },
    serviceLevel: "express",
    paymentType: "online",
    paymentStatus: "unpaid",
    amountToCollect: 0,
    deliveryPrice: { discount: 10, total: 80 },
    finalPrice: 80,
    status: "assigned",
    courier: "Ahmad",
    createdAt: "2026-03-13T14:00:00Z"
  },
  {
    id: "ORD-003",
    type: "food",
    serviceType: "scheduled",
    scheduledFor: "2026-03-07T20:00:00Z",
    priority: "normal",
    sender: { name: "Zuhak Resturant", phone: "020998877" },
    receiver: {
      name: "Mustafa Nazari",
      phone: "0700445566",
      address: "Green Valley Road, Kart-e-Char, Kabul"
    },
    pickupLocation: { type: "Point", coordinates: [34.4980, 69.1150] },
    dropoffLocation: { type: "Point", coordinates: [34.5000, 69.1200] },
    items: [
      { id: 105, name: "Chopan Kabab", quantity: 1, unitPrice: 800 },
      { id: 106, name: "Afghan Naan", quantity: 3, unitPrice: 20 }
    ],
    packageDetails: { weight: 1.2, size: "medium", fragile: false, note: "" },
    serviceLevel: "standard",
    paymentType: "COD",
    paymentStatus: "paid",
    amountToCollect: 860,
    deliveryPrice: { discount: 0, total: 120 },
    finalPrice: 980,
    status: "delivered",
    deliveredAt: "2026-03-10 18:45:00",
    createdAt: "2026-03-07T19:20:00Z"
  },
  {
    id: "ORD-004",
    type: "other",
    serviceType: "immediate",
    priority: "critical",
    sender: { name: "Shahmama Restaurant", phone: "020554433" },
    receiver: {
      name: "Mariam Kohistani",
      phone: "0777998877",
      address: "Business Square, Shahr-e-Naw, Kabul"
    },
    pickupLocation: { type: "Point", coordinates: [34.5150, 69.1650] },
    dropoffLocation: { type: "Point", coordinates: [34.5200, 69.1700] },
    items: [
      { id: 107, name: "Ashak", quantity: 2, unitPrice: 300 },
      { id: 108, name: "Dogh", quantity: 2, unitPrice: 100 }
    ],
    packageDetails: { weight: 2.0, size: "medium", fragile: true, note: "Fragile items inside" },
    serviceLevel: "express",
    paymentType: "online",
    paymentStatus: "unpaid",
    amountToCollect: 0,
    deliveryPrice: { discount: 0, total: 150 },
    finalPrice: 150,
    status: "cancelled",
    cancellationReason: "Address was unreachable",
    createdAt: "2026-02-15T11:00:00Z"
  }
],
    addNewOrder: (newOrder) => {
        set((state) => {
            const updatedOrders = [newOrder, ...state.orders];
            return {
                orders: updatedOrders,
                filteredList: updatedOrders
            };
        });
    },
    editExitingOrder: (updatedOrder)=>{
       set((state)=>({
           orders: state.orders.map((order)=>
           order.id === updatedOrder.id ? {...order, ...updatedOrder} : order
        )
       }))
    },

    selectedCourier: null,
  
setCourier: (courier, orderId) => {
  set((state) => {
    const updatedOrders = state.orders.map((order) =>
      order.id === orderId 
        ? { ...order, status: "assigned", courier: courier } 
        : order
    );
    return {
      selectedCourier: courier,
      orders: updatedOrders,
      filteredList: updatedOrders
    };
  });
},
  clearCourier: () => {
    set({ selectedCourier: null });
  },
markOrderDelivered: (orderId) => {
  set((state) => {
    const updatedOrders = state.orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "delivered",
            deliveredAt: new Date().toLocaleString(),
            payment: {
              ...order.payment,
              paymentStatus: order.paymentType === "COD" ? "paid" : order.paymentType,
            },
          }
        : order
    );
    return {
      orders: updatedOrders,
      filteredList: updatedOrders 
    };
  });
},
cancelationReason: null,

cancelOrder: (orderId, reason) => {
  set((state) => {
    const updatedOrders = state.orders.map((order) => {
      if (order.id === orderId && order.status !== "delivered") {
        return { ...order, status: "cancelled", cancellationReason: reason };
      }
      return order;
    });
    return {
      orders: updatedOrders,
      filteredList: updatedOrders 
    };
  });
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
        order.id.toLowerCase().includes(lowerCaseSearchTerm)||
        order.receiver.name.toLowerCase().includes(lowerCaseSearchTerm)||
        order.receiver.phone.includes(lowerCaseSearchTerm);
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
}))
export default useOrderStore