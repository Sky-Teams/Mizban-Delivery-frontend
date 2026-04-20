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

// Backend → Frontend Mapping
const mapCourier = (driver = {}) => ({
  id: driver._id || "",
  userId: driver.user?._id || "",
  fullName: driver.user?.name || "",
  email: driver.user?.email || "",
  phone: driver.user?.phone || "",
  vehicleType: driver.vehicleType || VEHICLE_TYPES.BIKE,
  status: driver.status || DRIVER_STATUS.OFFLINE,
  vehicleRegistrationNumber: driver.vehicleRegistrationNumber || "",
  address: driver.address || "",
  maxWeightKg: driver.capacity?.maxWeightKg ?? 0,
  maxPackages: driver.capacity?.maxPackages ?? 0,
  shiftStart: driver.timeAvailability?.start || "",
  shiftEnd: driver.timeAvailability?.end || "",
  currentLocation: driver.currentLocation || null,
  image: driver.profilePicture || null,
});

// Frontend → Backend Payload (ALL NORMALIZATION HERE)
const toCourierPayload = (data = {}) => ({
  userId: data.userId || "",
  name: data.fullName?.trim() || "",
  email: data.email?.trim() || "",

  // ✅ ONLY PLACE we ensure backend-safe format
  phone: toEnglishDigits(data.phone || ""),

  vehicleType: data.vehicleType || VEHICLE_TYPES.BIKE,
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

export const getCouriers = async () => {
  try {
    const response = await api.get("drivers?limit=8&page=1").json();

    const drivers = Array.isArray(response) ? response : response?.data || [];

    return drivers.map(mapCourier);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to fetch drivers"));
  }
};

export const createCourier = async (data) => {
  try {
    const response = await api
      .post("drivers", { json: toCourierPayload(data) })
      .json();

    return mapCourier(response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to create driver"));
  }
};

export const updateCourier = async (id, data) => {
  try {
    const response = await api
      .put(`drivers/${id}`, { json: toCourierPayload(data) })
      .json();

    return mapCourier(response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to update driver"));
  }
};

export const deleteCourier = async (id) => {
  try {
    return await api.delete(`drivers/${id}`).json();
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to delete driver"));
  }
};

export const getCourierById = async (id) => {
  try {
    const response = await api.get(`drivers/${id}`).json();
    return mapCourier(response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to fetch driver"));
  }
};
