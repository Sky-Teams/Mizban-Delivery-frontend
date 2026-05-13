import apiClient from "../config/apiClient";
import { normalizeApiError } from "../utils/normalizeApiError";

export const getDrivers = async (limit, page) => {
  try {
    const searchParams = {};

    if (limit != null) searchParams.limit = limit;
    if (page != null) searchParams.page = page;

    return await apiClient.get("drivers", { searchParams }).json();
  } catch (error) {
    throw await normalizeApiError(error, "Failed to fetch drivers");
  }
};

export const updateDriver = async (id, data) => {
  try {
    return await apiClient.put(`drivers/${id}`, { json: data }).json();
  } catch (error) {
    throw await normalizeApiError(error, "Failed to update driver");
  }
};

export const deleteDriver = async (id) => {
  try {
    return await apiClient.delete(`drivers/${id}`).json();
  } catch (error) {
    throw await normalizeApiError(error, "Failed to delete driver");
  }
};

export const getDriverById = async (id) => {
  try {
    return await apiClient.get(`drivers/${id}`).json();
  } catch (error) {
    throw await normalizeApiError(error, "Failed to fetch driver");
  }
};
