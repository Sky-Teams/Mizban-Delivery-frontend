export const toLocaleDigits = (val, lng) => {
  if (!val && val !== 0) return "";
  const str = val.toString();

  if (lng === "en") return str;

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return str.replace(/[0-9]/g, (w) => persianDigits[+w]);
};
export const toLocalePrice = (val, lng) => {
  if (!val && val !== 0) return "۰";
  return new Intl.NumberFormat(lng).format(val);
};
