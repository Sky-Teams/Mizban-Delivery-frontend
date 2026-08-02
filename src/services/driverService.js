import apiClient from '../config/apiClient';
import { normalizeApiError } from '../utils/normalizeApiError';

export const getDrivers = async (limit, page) => {
  try {
    const searchParams = {};

    if (limit != null) searchParams.limit = limit;
    if (page != null) searchParams.page = page;

    return await apiClient.get('drivers', { searchParams }).json();
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to fetch drivers');
  }
};

/*
export const createDriver = async (data) => {
  try {
    return await apiClient.post('drivers', { json: data }).json();
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to create driver');
  }
};
*/

export const updateDriver = async (id, data) => {
  try {
    return await apiClient.put(`drivers/${id}`, { json: data }).json();
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to update driver');
  }
};

export const deleteDriver = async (id) => {
  try {
    return await apiClient.delete(`drivers/${id}`).json();
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to delete driver');
  }
};

export const getDriverById = async (id) => {
  try {
    return await apiClient.get(`drivers/${id}`).json();
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to fetch driver');
  }
};

// verificationStatus = "pending"
export const getPendingDrivers = async () => {
  try {
    const response = await apiClient
      .get(`drivers`, {
        searchParams: {
          verificationStatus: 'pending',
        },
      })
      .json();
    return response;
  } catch (error) {
    throw await normalizeApiError(error, 'Falied to fetch pending drivers');
  }
};

export const approveDriver = async (id) => {
  try {
    const res = apiClient.patch(`drivers/${id}/verification/approve`).json();
    return res;
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to approve driver');
  }
};

export const rejectDriver = async (id, rejectReason) => {
  try {
    return await apiClient
      .patch(`drivers/${id}/verification/reject`, {
        json: {
          rejectReason,
        },
      })
      .json();
  } catch (error) {
    throw await normalizeApiError(error, 'Failed to reject driver');
  }
};

const API = import.meta.env.VITE_API_BASE_URL;
export const getImageUrl = (filePath) => {
  if (!filePath) return '';

  return `${API}/${filePath}`;
};
