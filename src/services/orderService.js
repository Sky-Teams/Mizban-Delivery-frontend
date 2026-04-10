import api from "./api"
export const getAllOrders = async()=>{

}
export const createNewOrder = async (orderData) => {
    const response = await api.post("orders", { json: orderData }).json()
    return response
}
export const updatedOrder = async (orderId, updatedOrderData) => {
    const response = await api.put(`orders/${orderId}`, { json: updatedOrderData }).json()
    return response
}
export const cancelOrder = async (orderId, cancelReason) => {
    const response = await api.patch(`orders/${orderId}/cancel`, { json:{"cancelReason": cancelReason} }).json()
    return response
}
export const markOrderDelivered = async (orderId) => {
    const response = await api.patch(`orders/${orderId}/deliver`).json()
    return response
}
export const assignDriver  = async(orderId, driverId)=>{
    const response = await api.patch(`orders/${orderId}/assign`, {json: {"driverId": driverId}}).json()
    return response
}
export const pickUpOrder = async(orderId)=>{
    const response = await api.patch(`orders/${orderId}/pickup`).json()
    return response
}