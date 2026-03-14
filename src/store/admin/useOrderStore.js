import toast from "react-hot-toast";
import { create } from "zustand";

const useOrderStore = create((set, get) => ({
    orderData: {
        customer: {
            customerName: "",
            phoneNumber: "",
            deliveryAddress: "",
            latitude: "",
            longitude: ""
        },
        item: [],
        status: "pending",
        payment: {
            paymentMethod: "",
            paymentStatus: "",
        }
    },
    setCustomerAndPaymentData: (section, item, value) => {
        set((state) => ({
            orderData: {
                ...state.orderData,
                [section]: {
                    ...state.orderData[section],
                    [item]: value
                }
            }
        }))
    },
    setItemsdata: (newItem) => {
        set((state) => ({
            orderData: {
                ...state.orderData,
                item: [...state.orderData.item, newItem]
            }
        }))
    },
    isItemModalOpen: false,
    setItemModalOpen: () => {
        set({ isItemModalOpen: !get().isItemModalOpen })
    },

    increaseQuantity: (id) => {
        set((state) => ({
            orderData: {
                ...state.orderData,
                item: state.orderData.item.map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                ),
            },
        }))},
    decreaseQuantity: (id)=>{
        set((state)=> ({
            orderData: {
                ...state.orderData,
                item: state.orderData.item.map((item)=>
                 item.id === id ? {...item, quantity: Math.max(1, item.quantity - 1)}: item
                )
            }
        }))
    },
    deleteItem: (id)=>{
      set((state)=> ({
        orderData: {
            ...state.orderData,
            item: state.orderData.item.filter((item)=> item.id !== id)
        },
      })),
      toast.success("Item deleted successfully!")
    },
    isEditingOrder: false,
    isViewingOrder: false,
    createNewOrder: ()=>{
        set({
            isEditingOrder:false,
          orderData: {
            customer: {},
            item: [],
            payment: {
                paymentMethod: "",
                paymentStatus: "Pending",
            },
        },
        })
    },

    editOrder: (order, isViewing)=>{
       set({
        isEditingOrder: true,
        isViewingOrder:isViewing,
          orderData: {
            ...order,
            id: order.id,
            customer: {...order.customer},
            item: [...order.item],
            payment: {
                paymentMethod: order.payment.paymentMethod,
                paymentStatus: order.payment.paymentStatus,
            },
        },
        })
    },
    itemsTotalFee: 0,
    resetOrderData: () => set({
        orderData: {
            customer: {},
            item: [],
            payment: {
                paymentMethod: "",
                paymentStatus: "Pending",
            },
        },
    }),
    getItemTotalFee: () => {
        const items = get().orderData.item;
        if (items.length === 0) {
            set({ itemsTotalFee: 0 })
        }

        const total = items.reduce(
            (sum, item) => sum + item.quantity * item.unitPrice,
            0
        );

        set({ itemsTotalFee: total });
    },
    orders: [
    {
        id: "ORD-2026-001",
        customer: {
            customerName: "Ahmad Rahmani",
            phoneNumber: "0799123456",
            deliveryAddress: "Apartment 4B, Silo Street, District 5, Kabul",
            latitude: "34.5353",
            longitude: "69.1324"
        },
        item: [
            { id: 101, itemName: "Qabuli Palaw", quantity: 2, unitPrice: 450 },
            { id: 102, itemName: "Mantu", quantity: 1, unitPrice: 300 }
        ],
        status: "pending",
        payment: {
            paymentMethod: "COD",
            paymentStatus: "Unpaid",
        },
        total: 1200,
        createdAt: "2026-03-14T08:30:00Z", 
    },
    {
        id: "ORD-2026-002",
        customer: {
            customerName: "Zohra Sadat",
            phoneNumber: "0788112233",
            deliveryAddress: "House 12, Darulaman Road, District 6, Kabul",
            latitude: "34.5120",
            longitude: "69.1500"
        },
        item: [
            { id: 103, itemName: "Bolani Gandana", quantity: 5, unitPrice: 100 },
            { id: 104, itemName: "Sheer Yakh", quantity: 2, unitPrice: 150 }
        ],
        status: "assigned",
        courier: "James",
        payment: {
            paymentMethod: "Online",
            paymentStatus: "Paid",
        },
        total: 800,
        createdAt: "2026-03-13T14:00:00Z", 
    },
    {
        id: "ORD-2026-003",
        customer: {
            customerName: "Mustafa Nazari",
            phoneNumber: "0700445566",
            deliveryAddress: "Green Valley Road, Kart-e-Char, Kabul",
            latitude: "34.5000",
            longitude: "69.1200"
        },
        item: [
            { id: 105, itemName: "Chopan Kabab", quantity: 1, unitPrice: 800 },
            { id: 106, itemName: "Afghan Naan", quantity: 3, unitPrice: 20 }
        ],
        status: "delivered",
        deliveredAt: "2026-03-10 18:45:00",
        payment: {
            paymentMethod: "COD",
            paymentStatus: "Paid",
        },
        total: 860,
        createdAt: "2026-03-07T19:20:00Z", 
    },
    {
        id: "ORD-2026-004",
        customer: {
            customerName: "Mariam Kohistani",
            phoneNumber: "0777998877",
            deliveryAddress: "Business Square, Shahr-e-Naw, Kabul",
            latitude: "34.5200",
            longitude: "69.1700"
        },
        item: [
            { id: 107, itemName: "Ashak", quantity: 2, unitPrice: 300 },
            { id: 108, itemName: "Dogh", quantity: 2, unitPrice: 100 }
        ],
        status: "cancelled",
        cancellationReason: "Address was unreachable",
        payment: {
            paymentMethod: "Online",
            paymentStatus: "Unpaid",
        },
        total: 800,
        createdAt: "2026-02-15T11:00:00Z", 
    },
    {
        id: "ORD-2025-005",
        customer: {
            customerName: "Omar Halimi",
            phoneNumber: "0744001122",
            deliveryAddress: "Red Bridge Area, Kabul",
            latitude: "34.5100",
            longitude: "69.1100"
        },
        item: [
            { id: 109, itemName: "Kofta Chalaw", quantity: 2, unitPrice: 350 }
        ],
        status: "delivered",
        payment: {
            paymentMethod: "COD",
            paymentStatus: "Paid",
        },
        total: 700,
        createdAt: "2025-12-25T22:15:00Z", 
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
              paymentStatus: order.payment.paymentMethod === "COD" ? "Paid" : order.payment.paymentStatus,
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
      const isPaid = order.payment.paymentStatus === "Paid";
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
  const {courier, paymentStatus, orderStatus, startDate, endDate} = filters
  set((state)=> ({
    filteredList: state.orders.filter((order)=>{
      if(lowerCaseSearchTerm){
        const matchSearchTerm = 
        order.id.toLowerCase().includes(lowerCaseSearchTerm)||
        order.customer.customerName.toLowerCase().includes(lowerCaseSearchTerm)||
        order.customer.phoneNumber.includes(lowerCaseSearchTerm);
        if(!matchSearchTerm) return false
      }
     if(courier && courier !== order.courier?.toLowerCase()) return false
     if(paymentStatus && paymentStatus !== order.payment.paymentStatus?.toLowerCase()) return false
     if(orderStatus && orderStatus !== order.status?.toLowerCase()) return false
     
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