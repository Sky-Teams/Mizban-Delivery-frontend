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
        item: {
            itemName: "",
            quantity: "",
            unitPrice: ""
        },
        payment: {
            paymentMethod: "",
            paymentStatus: ""
        }
    },
    setOrderData: (section, item, value) => {
        set((state) => ({
            orderData: {
                ...state.orderData,
                [section]: {
                    ...state.orderData[section],
                    [item]: value
                }
            }
        }))
    }
}))
export default useOrderStore