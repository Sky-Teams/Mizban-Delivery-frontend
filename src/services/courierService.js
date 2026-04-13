import api from "./api";

async function parseErrorMessage(error, fallbackMessage) {
  if (error?.response) {
    try {
      const data = await error.response.clone().json();
      return data?.message || data?.error || fallbackMessage;
    } catch {
      return fallbackMessage;
    }
  }

  return error?.message || fallbackMessage;
}

function extractDrivers(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data?.drivers)) {
    return response.data.drivers;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.drivers)) {
    return response.drivers;
  }

  return [];
}

function normalizePhoneNumber(phone = "") {
  const rawPhone = String(phone).trim().replace(/\s+/g, "");

  if (!rawPhone) {
    return "";
  }

  if (rawPhone.startsWith("+")) {
    return rawPhone;
  }

  if (rawPhone.startsWith("93")) {
    return `+${rawPhone}`;
  }

  if (rawPhone.startsWith("0")) {
    return `+93${rawPhone.slice(1)}`;
  }

  if (/^7\d{8}$/.test(rawPhone)) {
    return `+93${rawPhone}`;
  }

  return rawPhone;
}

function normalizeVehicleType(vehicleType = "") {
  const normalizedValue = String(vehicleType).trim().toLowerCase();

  if (!normalizedValue) {
    return "";
  }

  if (["motorbike", "motor bike", "motor-bike", "motorcycle"].includes(normalizedValue)) {
    return "motorcycle";
  }

  return normalizedValue;
}

function mapCourier(driver = {}) {
  return {
    ...driver,
    id: driver._id || driver.driverId || driver.id || driver.user?._id || "",
    driverId: driver._id || driver.driverId || driver.id || "",
    userId: driver.user?._id || driver.userId || "",
    fullName:
      driver.fullName ||
      driver.name ||
      driver.user?.fullName ||
      driver.user?.name ||
      driver.profile?.fullName ||
      driver.profile?.name ||
      "",
    phone:
      driver.phone ||
      driver.contactNumber ||
      driver.user?.phone ||
      driver.profile?.phone ||
      "",
    email: driver.email || driver.user?.email || driver.profile?.email || "",
    vehicleType: normalizeVehicleType(driver.vehicleType || ""),
    vehicleRegistrationNumber:
      driver.vehicleRegistrationNumber || driver.vehicleRegistration || "",
    maxWeightKg: driver.maxWeightKg ?? driver.capacity?.maxWeightKg ?? "",
    maxPackages: driver.maxPackages ?? driver.capacity?.maxPackages ?? "",
    shiftStart: driver.shiftStart || driver.timeAvailability?.start || "",
    shiftEnd: driver.shiftEnd || driver.timeAvailability?.end || "",
    address: driver.address || "",
    status: driver.status || "",
    profilePicture: driver.profilePicture || null,
  };
}

function toCourierPayload(formData = {}, existingCourier = {}) {
  const phone = normalizePhoneNumber(
    formData.phone ||
      existingCourier.phone ||
      existingCourier.contactNumber ||
      existingCourier.user?.phone ||
      "",
  );

  return {
    userId:
      formData.userId ||
      existingCourier.userId ||
      existingCourier.user?._id ||
      "",
    name:
      formData.fullName?.trim() ||
      existingCourier.name ||
      existingCourier.fullName ||
      existingCourier.user?.name ||
      existingCourier.user?.fullName ||
      "",
    email:
      formData.email?.trim() ||
      existingCourier.email ||
      existingCourier.user?.email ||
      "",
    phone:
      phone,
    vehicleType:
      normalizeVehicleType(formData.vehicleType || existingCourier.vehicleType),
    status: formData.status?.toLowerCase() || existingCourier.status || "",
    vehicleRegistrationNumber:
      formData.vehicleRegistrationNumber?.trim() ||
      existingCourier.vehicleRegistrationNumber ||
      "",
    address: formData.address?.trim() || existingCourier.address || "",
    capacity: {
      maxWeightKg: Number(
        formData.maxWeightKg ?? existingCourier.capacity?.maxWeightKg ?? 0,
      ),
      maxPackages: Number(
        formData.maxPackages ?? existingCourier.capacity?.maxPackages ?? 0,
      ),
    },
    timeAvailability: {
      start:
        formData.shiftStart || existingCourier.timeAvailability?.start || "",
      end: formData.shiftEnd || existingCourier.timeAvailability?.end || "",
    },
    currentLocation: existingCourier.currentLocation || {
      type: "Point",
      coordinates: [62.1915, 34.352],
    },
  };
}

export const getCouriers = async () => {
  try {
    const response = await api.get("drivers?limit=8&page=1").json();
    const drivers = extractDrivers(response);
    return drivers.map(mapCourier);
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to fetch drivers"));
  }
};

export const createCourier = async (data) => {
  try {
    return await api.post("drivers", { json: toCourierPayload(data) }).json();
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to create driver"));
  }
};

export const updateCourier = async (id, data, existingCourier = {}) => {
  const candidateIds = [
    existingCourier.driverId,
    existingCourier._id,
    id,
    existingCourier.id,
    existingCourier.userId,
    existingCourier.user?._id,
  ].filter(Boolean);

  let lastError;

  for (const candidateId of [...new Set(candidateIds)]) {
    try {
      return await api.put(`drivers/${candidateId}`, {
        json: toCourierPayload(data, existingCourier),
      }).json();
    } catch (error) {
      lastError = error;
      const message = await parseErrorMessage(error, "Failed to update driver");
      if (
        !["user not found", "driver not found"].includes(
          String(message).trim().toLowerCase(),
        )
      ) {
        throw new Error(message);
      }
    }
  }

  throw new Error(
    await parseErrorMessage(lastError, "Failed to update driver"),
  );
};

export const deleteCourier = async (id) => {
  try {
    return await api.delete(`drivers/${id}`).json();
  } catch (error) {
    throw new Error(await parseErrorMessage(error, "Failed to delete courier"));
  }
};
