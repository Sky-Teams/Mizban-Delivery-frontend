import { VEHICLE_TYPES, DRIVER_STATUS } from "./types";
import { toEnglishDigits } from "./numberConverter";

export const mapDriverFromApi = (driver = {}) => ({
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
  profilePicture: driver.profilePicture || null,
});

export const mapDriverToApi = (data = {}) => ({
  userId: data.userId || "",
  name: data.fullName?.trim() || "",
  email: data.email?.trim() || "",
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
