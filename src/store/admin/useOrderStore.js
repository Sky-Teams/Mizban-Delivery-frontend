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
                    name: "Ahmad Shah",
                    phone: "0799123456",
                    address: "House #12, Silo Street, District 5, Kabul",
                },
                items: [
                    { id: 101, name: "Qabuli Palaw (Large)", quantity: 2, price: 450 },
                    { id: 102, name: "Mantu (12 pcs)", quantity: 1, price: 300 }
                ],
                status: "PENDING",
                paymentStatus: "Unpaid",
                paymentMethod: "Cash on Delivery",
                total: 1200,
                createdAt: "2026-03-06T18:30:00Z",
            },
            {
                id: "ORD-2002",
                customer: {
                    name: "Zohra Karim",
                    phone: "0788112233",
                    address: "Apartment 4, Darulaman Road, District 6, Kabul",
                },
                items: [
                    { id: 103, name: "Bolani (Gandana)", quantity: 4, price: 100 },
                    { id: 104, name: "Sheer Yakh", quantity: 2, price: 150 }
                ],
                status: "ASSIGNED",
                paymentStatus: "Paid",
                paymentMethod: "Online",
                total: 700,
                createdAt: "2026-03-06T19:00:00Z",
            },
            {
                id: "ORD-2003",
                customer: {
                    name: "Ali Ahmadi",
                    phone: "0700445566",
                    address: "Near Blue Mosque, District 4, Kabul",
                },
                items: [
                    { id: 105, name: "Chopan Kabab", quantity: 3, price: 600 }
                ],
                status: "DELIVERED",
                paymentStatus: "Paid",
                paymentMethod: "Cash on Delivery",
                total: 1800,
                createdAt: "2026-03-05T20:15:00Z",
            },
            {
                id: "ORD-2004",
                customer: {
                    name: "Mariam Sadat",
                    phone: "0777998877",
                    address: "Street 3, Kart-e-Char, District 3, Kabul",
                },
                items: [
                    { id: 106, name: "Ashak (Regular)", quantity: 2, price: 250 },
                    { id: 107, name: "Dogh ", quantity: 1, price: 150 }
                ],
                status: "CANCELLED",
                paymentStatus: "Failed",
                paymentMethod: "Online",
                total: 650,
                createdAt: "2026-03-06T12:00:00Z",
            }
        ]
}))
export default useOrderStore