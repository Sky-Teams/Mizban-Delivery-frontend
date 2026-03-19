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

export const toEnglishDigits = (value = "") => {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";

  return value
    .toString()
    .replace(/[۰-۹]/g, (d) => persian.indexOf(d))
    .replace(/[٠-٩]/g, (d) => arabic.indexOf(d));
};
