import { toEnglishDigits } from "../utils/numberConverter";

export const cleanNumber = (v = "") =>
  toEnglishDigits(String(v)).replace(/\D/g, "");

export const cleanPhone = (v = "") => {
  let cleaned = toEnglishDigits(String(v)).replace(/[^\d+]/g, "");
  const hasPlus = cleaned.startsWith("+");
  cleaned = cleaned.replace(/\+/g, "");
  return hasPlus ? `+${cleaned}` : cleaned;
};

export const isValidAfghanPhone = (phone) => {
  if (!phone) return false;
  const clean = phone.replace(/\s+/g, "");
  return /^(\+93|93|0)?7\d{8}$/.test(clean);
};
