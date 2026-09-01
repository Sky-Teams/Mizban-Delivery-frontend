import apiClient from '../config/apiClient';
import { handleApiError } from './handleApiError';

export const getDriverOffers = async ({ page = 1, limit = 10 }) => {
  try {
    const response = await apiClient
      .get('offers', {
        searchParams: {
          page,
          limit,
        },
      })
      .json();

    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const getOfferById = async (offerId) => {
  try {
    const response = await apiClient.get(`offers/${offerId}`).json();
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const acceptOffer = async (offerId) => {
  try {
    const response = await apiClient.patch(`offers/${offerId}/accept`).json();
    return response;
  } catch (error) {
    handleApiError(error);
  }
};

export const rejectOffer = async (offerId) => {
  try {
    const response = await apiClient.patch(`offers/${offerId}/reject`).json();
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
