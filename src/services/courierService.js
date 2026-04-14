import api from "./api";

// Error Handler

const parseErrorMessage = async (error, fallback) => {
  try {
    const data = await error?.response?.json();
    return data?.message || data?.error || fallback;
  } catch {
    return error?.message || fallback;
  }
};

// Normalizers

const normalizePhone = (phone = "") => {
  const p = String(phone).trim().replace(/\s+/g, "");

  if (!p) return "";
  if (p.startsWith("+")) return p;
  if (p.startsWith("0")) return `+93${p.slice(1)}`;
  if (p.startsWith("93")) return `+${p}`;
  if (/^7\d{8}$/.test(p)) return `+93${p}`;

  return p;
};

const normalizeVehicleType = (type = "") => {
  const t = String(type).toLowerCase().trim();

  if (["motorbike", "motor bike", "motor-bike", "motorcycle"].includes(t)) {
    return "bike";
  }

  if (["bike", "car", "van"].includes(t)) return t;

  return "bike";
};

// Backend → Frontend

const mapCourier = (driver = {}) => ({
  id: driver._id || "",
  userId: driver.userId || "",
  fullName: driver.user?.name || "",
  email: driver.user?.email || "",
  phone: driver.user?.phone || "",
  vehicleType: driver.vehicleType || "bike",
  status: driver.status || "offline",
  vehicleRegistrationNumber: driver.vehicleRegistrationNumber || "",
  address: driver.address || "",
  maxWeightKg: driver.capacity?.maxWeightKg ?? 0,
  maxPackages: driver.capacity?.maxPackages ?? 0,
  shiftStart: driver.timeAvailability?.start || "",
  shiftEnd: driver.timeAvailability?.end || "",
  currentLocation: driver.currentLocation || null,
  profilePicture: driver.profilePicture || null,
});

// Frontend → Backend

const toCourierPayload = (data = {}) => ({
  userId: data.userId || "",
  name: data.fullName?.trim() || "",
  email: data.email?.trim() || "",
  phone: normalizePhone(data.phone),
  vehicleType: normalizeVehicleType(data.vehicleType),
  status: data.status || "offline",
  vehicleRegistrationNumber: data.vehicleRegistrationNumber?.trim() || "",
  address: data.address?.trim() || "",
  capacity: {
    maxWeightKg: Number(data.maxWeightKg) || 0,
    maxPackages: Number(data.maxPackages) || 0,
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

// API METHODS

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
    const payload = toCourierPayload(data);

    const response = await api.post("drivers", { json: payload }).json();

    return mapCourier(response);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to create driver"));
  }
};

export const updateCourier = async (id, data) => {
  try {
    const payload = toCourierPayload(data);

    const response = await api.put(`drivers/${id}`, { json: payload }).json();

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
