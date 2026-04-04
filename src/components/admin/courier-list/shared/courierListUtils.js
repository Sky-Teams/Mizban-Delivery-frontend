import { toEnglishDigits } from "../../../../utils/numberConverter";

export function getCourierContact(courier) {
  return courier?.contactNumber || courier?.phoneNumber || "";
}

export function getCourierVehicleLabel(courier) {
  const type = courier?.vehicleType?.trim();
  const registration = courier?.vehicleRegistration?.trim();

  if (type && registration) {
    return `${type} (${registration})`;
  }

  return type || registration || "N/A";
}

export function getCourierRating(courier) {
  const rating = courier?.rating ?? courier?.averageRating ?? 0;
  return Number(rating) || 0;
}

export function getCourierDeliveries(courier) {
  return (
    courier?.deliveries ??
    courier?.totalDeliveries ??
    courier?.completedDeliveries ??
    0
  );
}

export function getCourierLastActive(courier) {
  return courier?.lastActive || courier?.lastActiveLabel || "N/A";
}

export function getCourierImage(courier) {
  return courier?.profilePicture || null;
}

export function getCourierInitials(courier) {
  const name = courier?.fullName?.trim();

  if (!name) {
    return "NA";
  }

  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function normalizeStatus(status) {
  const value = status?.trim()?.toLowerCase();

  switch (value) {
    case "active":
      return "Active";
    case "idle":
      return "Idle";
    case "delivering":
      return "Delivering";
    case "pending approval":
      return "Pending Approval";
    case "suspended":
      return "Suspended";
    case "offline":
      return "Offline";
    default:
      return status || "Unknown";
  }
}

export function filterCouriers(couriers = [], searchQuery = "") {
  const query = toEnglishDigits(searchQuery.toLowerCase().trim());

  if (!query) {
    return couriers;
  }

  return couriers.filter((courier) => {
    const fullName = courier?.fullName?.toLowerCase() || "";
    const id = courier?.id?.toString() || "";
    const contact = getCourierContact(courier);
    const email = courier?.email?.toLowerCase() || "";

    return (
      fullName.includes(query) ||
      id.includes(query) ||
      contact.includes(query) ||
      email.includes(query)
    );
  });
}

export function getMenuPosition(buttonElement) {
  const rect = buttonElement.getBoundingClientRect();

  return {
    top: rect.bottom + window.scrollY,
    left: rect.right + window.scrollX - 160,
  };
}
