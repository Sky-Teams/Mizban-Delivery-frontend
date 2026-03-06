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
    }
}))
export default useOrderStore