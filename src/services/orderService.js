import apiClient from '../config/apiClient';

const request = async (requestFn) => {
  try {
    return await requestFn();
  } catch (error) {
    let message = "Something went wrong";
    let status = error?.response?.status;

    try {
      if (error?.response) {
        const data = await error.response.json();
        message = data?.message || data?.error || message;
      }
    } catch (err) {
      throw new err.message;
    }

    throw { message, status };
  }
};

export const getAllOrders = (limit, page) => {
  return request(() => apiClient.get(`orders?limit=${limit}&page=${page}`).json());
};

export const createNewOrder = (orderData) => {
  return request(() => apiClient.post('orders', { json: orderData }).json())
};

export const updatedOrder = (orderId, updatedOrderData) => {
  return request(() => apiClient.put(`orders/${orderId}`, { json: updatedOrderData }).json());
};

export const cancelOrder = (orderId, cancelReason) => {
  return request(() => apiClient.patch(`orders/${orderId}/cancel`, { json: { cancelReason } }).json());
};

export const markOrderDelivered = (orderId) => {
  return request(() => apiClient.patch(`orders/${orderId}/deliver`).json());
};

export const assignDriver = (orderId, driverId) => {
  return request(() => apiClient.patch(`orders/${orderId}/assign`, { json: { driverId } }).json());
};

export const pickUpOrder = (orderId) => {
  return request(() => apiClient.patch(`orders/${orderId}/pickup`).json());
};
