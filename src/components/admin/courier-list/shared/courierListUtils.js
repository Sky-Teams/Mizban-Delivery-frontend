import { toEnglishDigits } from "../../../../utils/numberConverter";

// Basic Getters

export const getCourierName = (courier) => courier?.fullName || "";

export const getCourierContact = (courier) => courier?.phone || "";

export const getCourierEmail = (courier) => courier?.email || "";

export const getCourierImage = (courier) => courier?.profilePicture || null;

// Vehicle

export const getCourierVehicleLabel = (courier) => {
  const type = courier?.vehicleType || "";
  const registration = courier?.vehicleRegistrationNumber || "";

  if (type && registration) {
    return `${type} (${registration})`;
  }

  return type || registration || "N/A";
};

// Stats

export const getCourierRating = (courier) => Number(courier?.rating ?? 0);

export const getCourierDeliveries = (courier) => courier?.deliveries ?? 0;

export const getCourierLastActive = (courier) => courier?.lastActive || "N/A";

// UI Helpers

export const getCourierInitials = (courier) => {
  const name = courier?.fullName?.trim();

  if (!name) return "NA";

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export const formatStatus = (status) => {
  if (!status) return "Unknown";

  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// Filtering

export const filterCouriers = (couriers = [], searchQuery = "") => {
  const query = toEnglishDigits(searchQuery.toLowerCase().trim());

  if (!query) return couriers;

  return couriers.filter((courier) => {
    const fullName = courier?.fullName?.toLowerCase() || "";
    const id = courier?.id?.toString() || "";
    const phone = courier?.phone || "";
    const email = courier?.email?.toLowerCase() || "";

    return (
      fullName.includes(query) ||
      id.includes(query) ||
      phone.includes(query) ||
      email.includes(query)
    );
  });
};

// UI Positioning

export const getMenuPosition = (buttonElement) => {
  const rect = buttonElement.getBoundingClientRect();

  return {
    top: rect.bottom + window.scrollY,
    left: rect.right + window.scrollX - 160,
  };
};
