import apiClient from '../config/apiClient';
export const getAllOrders = async (limit, page, filters = {}) => {
    const { status, startDate, endDate, paymentStatus } = filters
    let url = `orders?limit=${limit}&page=${page}`
    if (status) {
        url += `&status=${status}`
    }
    if (startDate) {
        url += `&startDate=${startDate}`
    }
    if (endDate) {
        url += `&endDate=${endDate}`
    }
    if (paymentStatus) {
        url += `&paymentStatus=${paymentStatus}`
    }
    try {
        const response = await apiClient.get(url).json()
        return response
    } catch (error) {
       const err = await error.response?.json() 
       throw err || error.message 
    }
}
export const createNewOrder = async (orderData) => {
  const response = await apiClient.post('orders', { json: orderData }).json();
  return response;
};

export const updatedOrder = async (orderId, updatedOrderData) => {
  const response = await apiClient.put(`orders/${orderId}`, { json: updatedOrderData }).json();
  return response;
};

export const cancelOrder = async (orderId, cancelReason) => {
  const response = await apiClient
    .patch(`orders/${orderId}/cancel`, { json: { cancelReason } })
    .json();
  return response;
};

export const markOrderDelivered = async (orderId) => {
  const response = await apiClient.patch(`orders/${orderId}/deliver`).json();
  return response;
};

export const assignDriver = async (orderId, driverId) => {
  const response = await apiClient.patch(`orders/${orderId}/assign`, { json: { driverId } }).json();
  return response;
};

export const pickUpOrder = async (orderId) => {
  const response = await apiClient.patch(`orders/${orderId}/pickup`).json();
  return response;
};
