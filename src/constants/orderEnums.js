// Object.freez is used to add a layer of secruity to our enums, so the enums are read-only and cannot be changed.
import i18n from "../i18n";

export const SERVICE_TYPES = Object.freeze({
  IMMEDIATE: i18n.t('IMMEDIATE'),
  SCHEDULED: i18n.t('SCHEDULED'),
});

export const ORDER_TYPES = Object.freeze({
  FOOD: i18n.t('FOOD'),
  PARCEL: i18n.t('PARCEL'),
  GROCERY: i18n.t('GROCERY'),
  OTHER: i18n.t('OTHER'),
});

export const PRIORITIES = Object.freeze({
  NORMAL: i18n.t('NORMAL'),
  HIGH: i18n.t('HIGH'),
  CRITICAL: i18n.t('CRITICAL'),
});

export const SERVICE_LEVELS = Object.freeze({
  STANDARD: i18n.t('STANDARD'),
  EXPRESS: i18n.t('EXPRESS'),
});

export const PACKAGE_SIZES = Object.freeze({
  SMALL: i18n.t('SMALL'),
  MEDIUM: i18n.t('MEDIUM'),
  LARGE: i18n.t('LARGE'),
});

export const PAYMENT_TYPES = Object.freeze({
  COD: i18n.t('COD'),
  ONLINE: i18n.t('ONLINE'),
});
