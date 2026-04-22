export const VALIDATION_RULES = {
  phone: (value) => /^07\d{8}$/.test(value),
  required: (value) =>
    value !== null && value !== undefined && value.toString().trim() !== "",
  notEmptyArray: (arr) => Array.isArray(arr) && arr.length > 0,

  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  fileSize: (file, maxKb = 50) => {
    if (!file) return true;
    const maxSizeInBytes = maxKb * 1024;
    return file.size <= maxSizeInBytes;
  },
};

export const validatePersonalInfo = (data) => {
  const errors = {};

  if (!VALIDATION_RULES.required(data.fullName)) {
    errors.fullName = "ERRORS_REQUIRED";
  }

  if (!VALIDATION_RULES.required(data.phone)) {
    errors.phone = "ERRORS_REQUIRED";
  } else if (!VALIDATION_RULES.phone(data.phone)) {
    errors.phone = "ERRORS_INVALID_PHONE";
  }

  if (!VALIDATION_RULES.required(data.email)) {
    errors.email = "ERRORS_REQUIRED";
  } else if (!VALIDATION_RULES.email(data.email)) {
    errors.email = "ERRORS_INVALID_EMAIL";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
