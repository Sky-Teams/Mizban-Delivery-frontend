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
        item:[],
        payment: {
            paymentMethod: "",
            paymentStatus: ""
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
    setItemsdata : (newItem)=>{
        set((state)=>({
            orderData: {
            ...state.orderData,
            item: [...state.orderData.item, newItem]
            }
        }))
    },
    isItemModalOpen: false,
    setItemModalOpen : ()=>{
       set({isItemModalOpen : !get().isItemModalOpen}) 
    }
}))
export default useOrderStore