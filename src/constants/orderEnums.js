

// Object.freez is used to add a layer of secruity to our enums, so the enums are read-only and cannot be changed.
export const SERVICE_TYPES = Object.freeze({
    IMMEDIATE: "immediate",
    SCHEDULED: "scheduled"
});

export const ORDER_TYPES = Object.freeze({
    FOOD: "food",
    PARCEL: "parcel",
    GROCERY: "grocery",
    OTHER: "other"
});

export const PRIORITIES = Object.freeze({
    NORMAL: "normal",
    HIGH: "high",
    CRITICAL: "critical"
});

export const SERVICE_LEVELS = Object.freeze({
    STANDARD: "standard",
    EXPRESS: "express"
});

export const PACKAGE_SIZES = Object.freeze({
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large"
});

export const PAYMENT_TYPES = Object.freeze({
    COD: "COD",
    ONLINE: "online"
});