import api from "./api";

function pickFirstString(...values) {
  return values.find((value) => typeof value === "string" && value.trim()) || "";
}

async function getErrorMessage(error, fallbackMessage) {
  if (error?.response) {
    try {
      const data = await error.response.clone().json();
      return (
        data?.message ||
        data?.error ||
        data?.errors?.[0]?.message ||
        fallbackMessage
      );
    } catch {
      return fallbackMessage;
    }
  }

  return error?.message || fallbackMessage;
}

function extractCourierCollection(response) {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.drivers)) {
    return response.data.drivers;
  }

  if (Array.isArray(response?.data?.couriers)) {
    return response.data.couriers;
  }

  if (Array.isArray(response?.drivers)) {
    return response.drivers;
  }

  if (Array.isArray(response?.couriers)) {
    return response.couriers;
  }

  if (Array.isArray(response?.results)) {
    return response.results;
  }

  return [];
}

export function normalizeCourier(driver = {}) {
  return {
    ...driver,
    id: driver.id || driver._id || "",
    fullName: pickFirstString(
      driver.fullName,
      driver.name,
      driver.username,
      driver.user?.fullName,
      driver.user?.name,
      driver.user?.username,
      driver.profile?.fullName,
      driver.profile?.name,
    ),
    contactNumber:
      pickFirstString(
        driver.contactNumber,
        driver.phoneNumber,
        driver.phone,
        driver.user?.phone,
        driver.profile?.phone,
      ),
    vehicleType: driver.vehicleType || "",
    vehicleRegistration:
      pickFirstString(
        driver.vehicleRegistration,
        driver.vehicleRegistrationNumber,
      ),
    maxWeightKg: driver.maxWeightKg ?? driver.capacity?.maxWeightKg ?? "",
    maxPackages: driver.maxPackages ?? driver.capacity?.maxPackages ?? "",
    shiftStart: driver.shiftStart || driver.timeAvailability?.start || "",
    shiftEnd: driver.shiftEnd || driver.timeAvailability?.end || "",
    homeAddress: driver.homeAddress || driver.address || "",
    status: driver.status || "",
    profilePicture:
      driver.profilePicture ||
      driver.profileImage ||
      driver.avatar ||
      driver.user?.profilePicture ||
      driver.user?.avatar ||
      null,
  };
}

export function toCourierPayload(formData = {}, existingCourier = {}) {
  return {
    name: formData.fullName?.trim() || existingCourier.name || "",
    email: formData.email?.trim() || existingCourier.email || "",
    phone: formData.contactNumber?.trim() || existingCourier.phone || "",
    vehicleType:
      formData.vehicleType?.toLowerCase() || existingCourier.vehicleType || "",
    status: formData.status?.toLowerCase() || existingCourier.status || "",
    vehicleRegistrationNumber:
      formData.vehicleRegistration?.trim() ||
      existingCourier.vehicleRegistrationNumber ||
      "",
    address: formData.homeAddress?.trim() || existingCourier.address || "",
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
    return extractCourierCollection(response).map(normalizeCourier);
  } catch (error) {
    throw new Error(await getErrorMessage(error, "Failed to fetch drivers"));
  }
};

export const createCourier = async (data) => {
  try {
    return await api.post("drivers", { json: data }).json();
  } catch (error) {
    throw new Error(await getErrorMessage(error, "Failed to create driver"));
  }
};

export const updateCourier = async (id, data) => {
  try {
    return await api.put(`drivers/${id}`, { json: data }).json();
  } catch (error) {
    throw new Error(await getErrorMessage(error, "Failed to update driver"));
  }
};

export const deleteCourier = async (id) => {
  try {
    return await api.delete(`drivers/${id}`).json();
  } catch (error) {
    throw new Error(await getErrorMessage(error, "Failed to delete courier"));
  }
};
