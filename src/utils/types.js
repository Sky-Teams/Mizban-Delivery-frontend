export const VEHICLE_TYPES = {
  CAR: "car",
  VAN: "van",
  BIKE: "bike", // Kept lowercase to match backend logic
};

export const COURIER_STATUS = {
  OFFLINE: "offline",
  IDLE: "idle",
  ASSIGNED: "assigned",
  DELIVERING: "delivering",
};

export const DEFAULT_COURIER_STATUS = COURIER_STATUS.OFFLINE;
