import api from "./api";
import { VEHICLE_TYPES, DRIVER_STATUS } from "../utils/types";
import { toEnglishDigits } from "../utils/numberConverter";

// Error Handler
const parseErrorMessage = async (error, fallback) => {
  try {
    const data = await error?.response?.json();
    return data?.message || data?.error || fallback;
  } catch {
    return error?.message || fallback;
  }
};

// Backend  Frontend Mapping
const mapDriver = (driver = {}) => ({
  id: driver._id || "",
  userId: driver.user?._id || "",
  fullName: driver.user?.name || "",
  email: driver.user?.email || "",
  phone: driver.user?.phone || "",
  vehicleType: driver.vehicleType || VEHICLE_TYPES.MOTORBIKE,
  status:
    typeof driver.status === "string"
      ? driver.status.toLowerCase()
      : DRIVER_STATUS.OFFLINE,
  vehicleRegistrationNumber: driver.vehicleRegistrationNumber || "",
  address: driver.address || "",
  maxWeightKg: driver.capacity?.maxWeightKg ?? 0,
  maxPackages: driver.capacity?.maxPackages ?? 0,
  shiftStart: driver.timeAvailability?.start || "",
  shiftEnd: driver.timeAvailability?.end || "",
  currentLocation: driver.currentLocation || null,
  image: driver.profilePicture || null,
});

// Frontend  Backend Payload (ALL NORMALIZATION HERE)
const toDriverPayload = (data = {}) => ({
  userId: data.userId || "",
  name: data.fullName?.trim() || "",
  email: data.email?.trim() || "",

  // ONLY PLACE we ensure backend-safe format
  phone: toEnglishDigits(data.phone || ""),

  vehicleType: data.vehicleType || VEHICLE_TYPES.MOTORBIKE,
  status: data.status || DRIVER_STATUS.OFFLINE,
  vehicleRegistrationNumber: data.vehicleRegistrationNumber?.trim() || "",
  address: data.address?.trim() || "",

  capacity: {
    maxWeightKg: Number(toEnglishDigits(data.maxWeightKg)) || 0,
    maxPackages: Number(toEnglishDigits(data.maxPackages)) || 0,
  },

  timeAvailability: {
    start: data.shiftStart || "",
    end: data.shiftEnd || "",
  },

  currentLocation: data.currentLocation || {
    type: "Point",
    coordinates: [62.1915, 34.352],
  },
});

//  API METHODS

// Get Driver
export const getDrivers = async (limit, page) => {
  try {
    const response = await api
      .get(`drivers?limit=${limit}&page=${page}`)
      .json();

    return {
      data: (response.data || []).map(mapDriver),
      totalPages: response.totalPages || 0,
    };
  } catch (error) {
    const errorMessage = await parseErrorMessage(
      error,
      "Failed to fetch drivers",
    );
    throw new Error(errorMessage);
  }
};

export const createDriver = async (data) => {
  try {
    const response = await api
      .post("drivers", { json: toDriverPayload(data) })
      .json();

    return mapDriver(response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to create driver"));
  }
};

export const updateDriver = async (id, data) => {
  try {
    const response = await api
      .put(`drivers/${id}`, { json: toDriverPayload(data) })
      .json();

    return mapDriver(response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to update driver"));
  }
};

export const deleteDriver = async (id) => {
  try {
    return await api.delete(`drivers/${id}`).json();
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to delete driver"));
  }
};

export const getDriverById = async (id) => {
  try {
    const response = await api.get(`drivers/${id}`).json();
    return mapDriver(response.data || response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to fetch driver"));
  }
};
