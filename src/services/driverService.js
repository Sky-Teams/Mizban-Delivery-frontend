import api from "./api";

const normalizeDriverError = async (error, fallback) => {
  try {
    const data = await error?.response?.json();

    return {
      message: data?.message || data?.error || fallback,
      status: error?.response?.status ?? null,
      cause: error,
    };
  } catch {
    return {
      message: error?.message || fallback,
      status: error?.response?.status ?? null,
      cause: error,
    };
  }
};

export const getDrivers = async (limit, page) => {
  try {
    const searchParams = {};

    if (limit != null) searchParams.limit = limit;
    if (page != null) searchParams.page = page;

    return await api.get("drivers", { searchParams }).json();
  } catch (error) {
    throw await normalizeDriverError(error, "Failed to fetch drivers");
  }
};

export const createDriver = async (data) => {
  try {
    return await api.post("drivers", { json: data }).json();
  } catch (error) {
    throw await normalizeDriverError(error, "Failed to create driver");
  }
};

export const updateDriver = async (id, data) => {
  try {
    return await api.put(`drivers/${id}`, { json: data }).json();
  } catch (error) {
    throw await normalizeDriverError(error, "Failed to update driver");
  }
};

export const deleteDriver = async (id) => {
  try {
    return await api.delete(`drivers/${id}`).json();
  } catch (error) {
    throw await normalizeDriverError(error, "Failed to delete driver");
  }
};

export const getDriverById = async (id) => {
  try {
    return await api.get(`drivers/${id}`).json();
  } catch (error) {
    throw await normalizeDriverError(error, "Failed to fetch driver");
  }
};
