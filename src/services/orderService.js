import apiClient from '../config/apiClient';
import { getServerMessage } from '../utils/i18nHelper';
import i18n from '../i18n';

const request = async (requestFn) => {
  try {
    return await requestFn();
  }catch (error) {
    let message = i18n.t('error_general');

    try {
      if (error?.response) {
        const data = await error.response.json();
        message = getServerMessage(data);
      }
    }catch (error) {
      console.log(error);
    }

    throw new Error(message);
  }
};

export const getAllOrders = (limit, page, filters = {}) => {
  return request(() => {
    const { status, startDate, endDate, paymentStatus } = filters;
    let url = `orders?limit=${limit}&page=${page}`;
    if (status) {
      url += `&status=${status}`;
    }
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }
    if (paymentStatus) {
      url += `&paymentStatus=${paymentStatus}`;
    }
    return apiClient.get(url).json();
  });
};

export const createNewOrder = (orderData) => {
  return request(() => apiClient.post('orders', { json: orderData }).json());
};

export const updatedOrder = (orderId, updatedOrderData) => {
  return request(() => apiClient.put(`orders/${orderId}`, { json: updatedOrderData }).json());
};

export const cancelOrder = (orderId, cancelReason) => {
  return request(() =>
    apiClient.patch(`orders/${orderId}/cancel`, { json: { cancelReason } }).json(),
  );
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
