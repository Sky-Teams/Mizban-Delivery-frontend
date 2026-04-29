import apiClient from '../config/apiClient';

const request = async requestType => {
  try {
    const response = await requestType();
    return response;
  } catch (error) {
    const err = await error.response?.json();
    throw {
      message: err.message || "Something went wrong",
      status: error.response?.status,
    }
  }
}

export const getAllOrders = async (limit, page) => {
  request(() => apiClient.get(`orders?limit=${limit}&page=${page}`).json());
};

export const createNewOrder = async (orderData) => {
  request(() => apiClient.post('orders', { json: orderData }).json())
};

export const updatedOrder = async (orderId, updatedOrderData) => {
  request(() => apiClient.put(`orders/${orderId}`, { json: updatedOrderData }).json());
};

export const cancelOrder = async (orderId, cancelReason) => {
  request(() => apiClient.patch(`orders/${orderId}/cancel`, { json: { cancelReason } }).json());
};

export const markOrderDelivered = async (orderId) => {
  request(() => apiClient.patch(`orders/${orderId}/deliver`).json());
};

export const assignDriver = async (orderId, driverId) => {
  request(() => apiClient.patch(`orders/${orderId}/assign`, { json: { driverId } }).json());
};

export const pickUpOrder = async (orderId) => {
  request(() => apiClient.patch(`orders/${orderId}/pickup`).json());
};
