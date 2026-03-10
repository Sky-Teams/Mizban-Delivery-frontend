import toast from "react-hot-toast";
import { create } from "zustand";

const useOrderStore = create((set, get) => ({
    orderData: {
        customer: {
            customerName: "",
            phoneNumber: "",
            deliveryAddress: "",
            activeZone: "",
            latitude: "",
            longitude: ""
        },
        item: [],
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
    orders:
        [
            {
                id: "ORD-2001",
                customer: {
                    customerName: "Ahmad Shah",
                    phoneNumber: "0799123456",
                    deliveryAddress: "House #12, Silo Street, District 5, Kabul",
                },
                item: [
                    { id: 101, itemName: "Qabuli Palaw (Large)", quantity: 2, unitPrice: 450 },
                    { id: 102, itemName: "Mantu (12 pcs)", quantity: 1, unitPrice: 300 }
                ],
                status: "PENDING",
                payment: {
                paymentStatus: "Unpaid",
                paymentMethod: "COD",
                },
                total: 1200,
                createdAt: "2026-03-06T18:30:00Z",
            },
            {
                id: "ORD-2002",
                customer: {
                    customerName: "Zohra Karim",
                    phoneNumber: "0788112233",
                    deliveryAddress: "Apartment 4, Darulaman Road, District 6, Kabul",
                },
                item: [
                    { id: 103, itemName: "Bolani (Gandana)", quantity: 4, unitPrice: 100 },
                    { id: 104, itemName: "Sheer Yakh", quantity: 2, unitPrice: 150 }
                ],
                status: "PENDING",
                payment: {
                paymentStatus: "Paid",
                paymentMethod: "Online"
                },
                total: 700,
                createdAt: "2026-03-06T19:00:00Z",
            },
            {
                id: "ORD-2003",
                customer: {
                    customerName: "Ali Ahmadi",
                    phoneNumber: "0700445566",
                    deliveryAddress: "Near Blue Mosque, District 4, Kabul",
                },
                item: [
                    { id: 105, itemName: "Chopan Kabab", quantity: 3, unitPrice: 600 }
                ],
               status: "PENDING",
                payment: {
                 paymentStatus: "Paid",
                 paymentMethod: "COD",
                },

                total: 1800,
                createdAt: "2026-03-05T20:15:00Z",
            },
            {
                id: "ORD-2004",
                customer: {
                    customerName: "Mariam Sadat",
                    phoneNumber: "0777998877",
                    deliveryAddress: "Street 3, Kart-e-Char, District 3, Kabul",
                },
                item: [
                    { id: 106, itemName: "Ashak (Regular)", quantity: 2, unitPrice: 250 },
                    { id: 107, itemName: "Dogh ", quantity: 1, unitPrice: 150 }
                ],
                status: "PENDING",
                payment:{
                paymentStatus: "Failed",
                paymentMethod: "Online",
                },

                total: 650,
                createdAt: "2026-03-06T12:00:00Z",
            }
        ],
    addNewOrder: (newOrder)=>{
        set((state)=>({
            orders: [
                newOrder,
                ...state.orders
            ]
        }))
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
    set((state) => ({
      selectedCourier: courier,
      orders: state.orders.map((order) =>
        order.id === orderId 
          ? { ...order, status: "ASSIGNED", courier: courier } 
          : order
      ),
    }));
  },

  clearCourier: () => {
    set({ selectedCourier: null });
  },

}))
export default useOrderStore